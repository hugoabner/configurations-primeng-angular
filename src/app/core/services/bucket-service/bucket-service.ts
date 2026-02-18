import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ExcelData, StorageResponse } from '../../interfaces/interface-storage';
import { AuthService } from '../auth-service/auth-service';

@Injectable({
  providedIn: 'root',
})
export class BucketService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private readonly GCS_BUCKET_URL = environment.gcsBucketUrl;

  constructor() {
    console.log('✅ Servicio inicializado'); // Si ves este log más de una vez, NO es un singleton.
  }
  /**
   * Orquestador de la descarga de pólizas
   */

  getBatchPolizas(name: string, cache: boolean = false): Observable<ExcelData[]> {
    return this.authService.getGoogleToken().pipe(
      switchMap((googleToken) => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${googleToken}`);
        const encodedName = encodeURIComponent(name);
        const versionParam = cache ? '&v=1' : `&v=${Date.now()}`;
        const url = `${this.GCS_BUCKET_URL}/${encodedName}?alt=media${versionParam}`;
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
}
