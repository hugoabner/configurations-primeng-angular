import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { API_ENDPOINTS } from '../../constants/api-endpoint-constants';
import {
  BatchHistoryItem,
  ExcelData,
  StorageObject,
  StorageObjects,
  StorageResponse
} from '../../interfaces/interface-storage';
import { AuthService } from '../auth-service/auth-service';

@Injectable({
  providedIn: 'root',
})
export class BucketService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private readonly GCS_BUCKET_URL = environment.gcsBucketUrl;

  // 1. El "Estado Privado" (La verdad de los datos)
  private _history = signal<BatchHistoryItem[]>([]);
  // 2. El "Estado Publico" (Lo que la UI consume, inmutable)
  public history = this._history.asReadonly();
  
  public lastLoaded = signal<Date | null>(null);
  private cacheDuration = 1 * 60 * 1000;

  private isCacheValid(): boolean {
    const last = this.lastLoaded();
    if (!last) return false;
    return (new Date().getTime() - last.getTime()) < this.cacheDuration;
  }


  /**
   *  @method getImportBatchDetail
   * @description Obtiene los detalles de un batch específico desde el bucket de Google Cloud Storage.
   * @param name El nombre del batch (archivo) a obtener.
   * @param cache Si es true, se fuerza a usar la versión cacheada del archivo (si existe). Por defecto es false.
   * @returns Observable<ExcelData[]> Un observable que emite un array de ExcelData con los detalles del batch.
   */
  public getImportBatchDetail(name: string, cache: boolean = false): Observable<ExcelData[]> {
    return this.authService.getGoogleToken().pipe(
      switchMap((googleToken) => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${googleToken}`);
        const versionParam = cache ? '&v=1' : `&v=${Date.now()}`;
        const url = `${this.GCS_BUCKET_URL}/${API_ENDPOINTS.STORAGE_BUCKET.IMPORT_BATCH_DETAIL}/${name}?alt=media${versionParam}`;
        return this.http.get<StorageResponse[]>(url, { headers });
      }),
      map((response) => this.processData(response)),
    );
  }

  private processData(data: StorageResponse[]): ExcelData[] {
    return data.map((item) => {
      const ex = item.excel;
      // Mapeo selectivo: solo extraemos lo que la tabla realmente va a mostrar
      return { ...ex }; // Asegúrate de que PolizaRow tenga solo los campos necesarios
    });
  }

  /**
   * @method getImportBatchHistory
   * @description Obtiene el historial de batches importados desde el bucket de Google Cloud Storage.
   */
  public getImportBatchHistory(forceRefresh: boolean = false): Observable<BatchHistoryItem[]> {
    if (this.isCacheValid() && !forceRefresh) {
      return of(this._history());
    }
    return this.authService.getGoogleToken().pipe(
      switchMap((googleToken) => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${googleToken}`);
        return this.http.get<StorageObjects>(
          `${this.GCS_BUCKET_URL}${API_ENDPOINTS.STORAGE_BUCKET.IMPORT_BATCH_HISTORY}?prefix=polizasBatch%2Fjson`,
          { headers },
        );
      }),
      map((response) => response.items.map(item => this.mapStorageToBatchItem(item))),
      tap((data) => {
        // 3. Efecto secundario acrualizamos el estado global
        this._history.set(data);
        this.lastLoaded.set(new Date());
      })
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
        // Calculamos el % de éxito para una barra de progreso
        accuracy: totalCount > 0 ? (successCount / totalCount) * 100 : 0,
      },
      sizeBytes: parseInt(item.size, 10),
      user: meta.createdBy,
    };
  }
}
