import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import * as XLSX from 'xlsx';
import { environment } from '../../../../environments/environment.development';
import { API_ENDPOINTS } from '../../constants/api-endpoint-constants';
import {
  BatchHistoryItem,
  ExcelData,
  StorageObject,
  StorageObjects,
  StorageResponse,
} from '../../interfaces/interface-storage';
import { AuthService } from '../auth-service/auth-service';
interface GenerateUrlResponse {
    mensaje: string
    url: string
  }
@Injectable({
  providedIn: 'root',
})
export class BucketService {
  /** injectables */
  private _http = inject(HttpClient);
  private _authService = inject(AuthService);

  private readonly GCS_BUCKET_URL = environment.gcsBucketUrl;
  private readonly API_URL = environment.apiUrl;

  private _history = signal<BatchHistoryItem[]>([]);
  public history = this._history.asReadonly();

  public lastLoaded = signal<Date | null>(null);
  private cacheDuration = 1 * 60 * 1000;

  private isCacheValid(): boolean {
    const last = this.lastLoaded();
    if (!last) return false;
    return new Date().getTime() - last.getTime() < this.cacheDuration;
  }

  public getImportBatchDetail(name: string, cache: boolean = false): Observable<ExcelData[]> {
    return this._authService.getGoogleToken().pipe(
      switchMap((googleToken) => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${googleToken}`);
        const versionParam = cache ? '&v=1' : `&v=${Date.now()}`;
        const url = `${this.GCS_BUCKET_URL}/${API_ENDPOINTS.STORAGE_BUCKET.IMPORT_BATCH_DETAIL}/${name}?alt=media${versionParam}`;
        return this._http.get<StorageResponse[]>(url, { headers });
      }),
      map((response) => this.processData(response)),
    );
  }

  private processData(data: StorageResponse[]): ExcelData[] {
    return data.map((item) => {
      const ex = item.excel;
      return { ...ex };
    });
  }

  public getImportBatchHistory(forceRefresh: boolean = false): Observable<BatchHistoryItem[]> {
    if (this.isCacheValid() && !forceRefresh) {
      return of(this._history());
    }
    return this._authService.getGoogleToken().pipe(
      switchMap((googleToken) => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${googleToken}`);
        return this._http.get<StorageObjects>(
          `${this.GCS_BUCKET_URL}${API_ENDPOINTS.STORAGE_BUCKET.IMPORT_BATCH_HISTORY}?prefix=polizasBatch%2Fjson`,
          { headers },
        );
      }),
      map((response) => response.items.map((item) => this.mapStorageToBatchItem(item))),
      tap((data) => {
        // 3. Efecto secundario para actualizar el estado privado
        this._history.set(data);
        this.lastLoaded.set(new Date());
      }),
    );
  }

  private mapStorageToBatchItem(item: StorageObject): BatchHistoryItem {
    const meta = item.metadata;
    const successCount = parseInt(meta.success || '0', 10);
    const totalCount = parseInt(meta.total || '0', 10);
    return {
      id: item.name,
      fileName: meta.name,
      fullPath: item.name,
      createdAt: new Date(meta.createdDate),
      completedAt: new Date(meta.createdDate),
      status: meta.status,
      stats: {
        success: successCount,
        error: parseInt(meta.error || '0', 10),
        total: totalCount,
        accuracy: totalCount > 0 ? (successCount / totalCount) * 100 : 0,
      },
      sizeBytes: parseInt(item.size, 10),
      user: meta.createdBy,
    };
  }

  public exportToExcel(data: any[], fileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = {
      Sheets: { Datos: worksheet },
      SheetNames: ['Datos'],
    };
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }

  public generateUrl(url: string): Observable<GenerateUrlResponse> {
    if (!url) return of({ mensaje: 'No se pudo generar la URL', url: '' });
    // metodo post enviar en el body el url y recibir el signedUrl
    return this._authService.getKarlosToken().pipe(
      switchMap((karlosToken) => {
          const headers = new HttpHeaders().set('X-Auth-Token', karlosToken);
        return this._http.post<GenerateUrlResponse>(
          `${this.API_URL}/utilitarios/google/generateSignedUrl`,
          { fileName: url  },
          { headers },
        );
      }),
      map((response) => response),
    );
  }
}
