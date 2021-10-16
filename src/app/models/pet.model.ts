import { MemberModel } from './member.model';

export class PetModel {

    id: number = 0;    
    petName: string = "";  
    breed: string = "";
    member: MemberModel = new MemberModel();
    gender: string = "";      
}