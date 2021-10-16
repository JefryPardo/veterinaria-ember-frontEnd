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

  saveCollaborator( clinicalHistory: ClinicalHistoryModel) {
      
    return this.http.post<ClinicalHistoryModel>("/vet/collaborator",clinicalHistory);
  }

  searchAllCollaborator() {
  
    delay(1500);
    return this.http.get<ClinicalHistoryModel[]>("/vet/collaborator");
  }

  getCollaboratorById( clinicalHistory_id: string ) {

    return this.http.get<ClinicalHistoryModel>(`/vet/collaborator/${clinicalHistory_id}`);
  }

  deleteCollaboratorById( clinicalHistory_id: number ) {

    return this.http.delete<ResponseModel>(`/vet/collaborator/${clinicalHistory_id}`);
  }
}
