import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { ClinicalHistoryModel } from '../models/clinicalHistory.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ClinicalHistoryServiceService {

  constructor( private http: HttpClient) { }

  saveClinicalHistory( clinicalHistory: ClinicalHistoryModel) {
      
    return this.http.post<ClinicalHistoryModel>("/vet/CliHis",clinicalHistory);
  }

  searchAllClinicalHistory() {
  
    delay(1500);
    return this.http.get<ClinicalHistoryModel[]>("/vet/CliHis");
  }

  getClinicalHistoriById( clinicalHistory_id: string ) {

    return this.http.get<ClinicalHistoryModel>(`/vet/CliHis/${clinicalHistory_id}`);
  }

  getClinicalHistoryByPetId( pet_id: string ) {

    return this.http.get<ClinicalHistoryModel>(`/vet/CliHis/my/${pet_id}`);
  }

  deleteClinicalHistoryById( clinicalHistory_id: number ) {

    return this.http.delete<ResponseModel>(`/vet/CliHis/${clinicalHistory_id}`);
  }
}
