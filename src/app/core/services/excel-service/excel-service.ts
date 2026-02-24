import { Injectable } from '@angular/core';
import { Column, Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { from, map, Observable } from 'rxjs';
import * as XLSX from 'xlsx'; // <-- agregar

@Injectable({
  providedIn: 'root',
})
export class ExcelService {


  /**
   *
   * @param data Datos para exportar
   * @param fileName nombre del archivo sin extension .xlsx
   * @param sheetName Nombre de la hoja o pestaña (por defecto "Datos")
   */
  public exportAsExcelFile(json: any[], excelFileName: string, sheetName = 'Datos'): void {
    if (!json || json.length === 0) {
      throw new Error('Not data found to export');
    }
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    const headers = Object.keys(json[0]);
    const columnHeaders: Array<Partial<Column>> = headers.map((header) => ({
      header: header.toUpperCase(),
      key: header,
      width: 20,
    }));
    worksheet.columns = columnHeaders;
    json.forEach((item) => {
      worksheet.addRow(item);
    });
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    workbook.xlsx.writeBuffer().then((buffer) => {
      const data = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(data, `${excelFileName}.xlsx`);
    });
  }

  /**
   * @param json Datos para exportar
   * @param sheetName Nombre de la hoja o pestaña (por defecto "Datos")
   * @returns Promise que resuelve un Blob con el contenido del archivo Excel generado
   */
  public exportAsExcelFileAsync(json: any[], sheetName = 'Datos'): Observable<Blob> {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    const headers = Object.keys(json[0]);

    const columnHeaders: Array<Partial<Column>> = headers.map((header) => ({
      header: header.toUpperCase(),
      key: header,
      width: 20,
    }));

    worksheet.columns = columnHeaders;
    worksheet.addRows(json);
    return from(workbook.xlsx.writeBuffer()).pipe(
      map((buffer: ArrayBuffer) => {
        return new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
      }),
    );
  }

  /**
   * @param file Archivo Excel a convertir a JSON 
   * @returns array de objetos con el contenido del Excel a JSON 
   */
  public async excelToJson<T extends Record<string, any> = Record<string, any>>(file: File): Promise<T[]> {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    if (!firstSheetName) {
      return [];
    }
    const worksheet = workbook.Sheets[firstSheetName];
    const json = XLSX.utils.sheet_to_json<T>(worksheet, {
      defval: null,
      raw: false,
    });
    // Limpiar cada fila del JSON generado
    return json.map((row) => this.cleanRowObject(row)); 
  }

  private cleanRowObject<T extends Record<string, any>>(row: T): T {
    const newRow: any = {};
    Object.keys(row).forEach((originalKey) => {
      let newKey = originalKey;
      if (originalKey !== '#') {
        newKey = originalKey
          .replace(/#/g, '') // "#"
          .replace(/\./g, "") // "."
          .replace(/\//g, "") // "/"
          .replace(/\-/g, ' ') // "-"
          .trim()
          .replace(/\s+/g, "_") // " "
      }
      const value = row[originalKey];
      newRow[newKey] = this.normalizeValue(value);
    });
    return newRow as T;
  }

  private normalizeValue(value: any): any {
    if (value === null || value === undefined) return value;
    if (typeof value === 'number') {
      return value.toLocaleString('fullwide', { useGrouping: false });
    }
    if (typeof value === 'string' && value.includes('e+')) {
      const num = Number(value);
      if (!isNaN(num)) {
        return num.toLocaleString('fullwide', { useGrouping: false });
      }
    }
    return value;
  }
}
