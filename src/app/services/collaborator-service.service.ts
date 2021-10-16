import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/response.model';
import { delay } from 'rxjs/operators';
import { CollaboratorModel } from '../models/collaborator.model';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorServiceService {

  constructor( private http: HttpClient) { }

  saveCollaborator( collaborator: CollaboratorModel) {
      
    return this.http.post<CollaboratorModel>("/vet/collaborator",collaborator);
  }

  searchAllCollaborator() {
  
    delay(1500);
    return this.http.get<CollaboratorModel[]>("/vet/collaborator");
  }

  getCollaboratorById( id: string ) {

    return this.http.get<CollaboratorModel>(`/vet/collaborator/${id}`);
  }

  deleteCollaboratorById( id: number ) {

    return this.http.delete<ResponseModel>(`/vet/collaborator/${id}`);
  }
}
