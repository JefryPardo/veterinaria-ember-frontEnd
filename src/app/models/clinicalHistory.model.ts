import { PetModel } from "./pet.model";

export class ClinicalHistoryModel {

    id: number = 0;    
    pet: PetModel = new PetModel();  
    creationDate: Date = new Date();   
}