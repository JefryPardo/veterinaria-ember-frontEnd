import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { DetailClinicalHistoryModel } from '../models/detailClinicalHistory.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class DetailClinicalHistoryServiceService {

  constructor( private http: HttpClient) { }

  saveDetail( detailClinicalHistory: DetailClinicalHistoryModel) {
      
    return this.http.post<DetailClinicalHistoryModel>("/vet/detail",detailClinicalHistory);
  }

  searchAllDetail() {
  
    delay(1500);
    return this.http.get<DetailClinicalHistoryModel[]>("/vet/detail");
  }

  getDetailById( detailClinicalHistory_id: string ) {

    return this.http.get<DetailClinicalHistoryModel>(`/vet/detail/${detailClinicalHistory_id}`);
  }

  getDetailByClinicalHistoryId( ClinicalHistory_id: any ) {

    return this.http.get<DetailClinicalHistoryModel[]>(`/vet/detail/my/${ClinicalHistory_id}`);
  }

  deleteDetailById( detailClinicalHistory_id: number ) {

    return this.http.delete<ResponseModel>(`/vet/detail/${detailClinicalHistory_id}`);
  }
}
