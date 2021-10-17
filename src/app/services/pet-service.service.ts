import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/response.model';
import { delay } from 'rxjs/operators';
import { PetModel } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetServiceService {

  constructor(private http: HttpClient) { }
  
  savePet( pet: PetModel) {
      
    return this.http.post<PetModel>("/vet/pet",pet);
  }

  searchAllPet() {
  
    delay(1500);
    return this.http.get<PetModel[]>("/vet/pet");
  }

  searchAllPetMember( id: string ) {
  
    delay(1500);
    return this.http.get<PetModel[]>(`/vet/pet/my/${id}`);
  }

  getPetById( id: string ) {

    return this.http.get<PetModel>(`/vet/pet/${id}`);
  }

  deletePetById( id: number ) {

    return this.http.delete<ResponseModel>(`/vet/pet/${id}`);
  }
}
