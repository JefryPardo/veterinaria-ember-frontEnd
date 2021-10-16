import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MemberModel } from '../models/member.model';
import { ResponseModel } from '../models/response.model';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberServiceService {
  
  constructor( private http: HttpClient ) { }

  saveMember( member: MemberModel) {
      
    return this.http.post<MemberModel>("/vet/member",member);
  }

  searchAllMembers() {
  
    delay(1500);
    return this.http.get<MemberModel[]>("/vet/member");
  }

  getMemberById( id: string ) {

    return this.http.get<MemberModel>(`/vet/member/${id}`);
  }

  getMemberByCC( id: number ) {

    return this.http.get<ResponseModel>(`/vet/member/cc/${id}`);
  }

  deleteMemberById( id: number ) {

    return this.http.delete<ResponseModel>(`/vet/member/${id}`);
  }
}
