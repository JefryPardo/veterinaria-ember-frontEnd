import { CollaboratorModel } from './collaborator.model';
import { ClinicalHistoryModel } from './clinicalHistory.model';

export class DetailClinicalHistoryModel {

    id: number = 0;    
    temperature: string = "";  
    weight: number = 0;
    cardiacFrequency: number = 0;
    breathingRate: number = 0;
    dateTime: Date = new Date();     
    feeding: string = "";      
    habitat: string = "";     
    comments: string = "";     
    collaborator: CollaboratorModel = new CollaboratorModel();
    clinicalHistory: ClinicalHistoryModel = new ClinicalHistoryModel();   
}