import { Component, OnInit } from '@angular/core';
import { MemberServiceService } from '../../services/member-service.service';
import { Router } from '@angular/router';
import { MemberModel } from '../../models/member.model';
import { ResponseModel } from '../../models/response.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [MemberServiceService]
})
export class MembersComponent implements OnInit {
  
  members: MemberModel[] = [];
  cargando = false;
  constructor( private service: MemberServiceService, private router: Router  ) {}

  ngOnInit() {
    this.cargando = true;
    this.service.searchAllMembers().subscribe( data => {      
        
      if(data !== []) {
        this.cargando = false;
        this.members = data;
      }
    });
  }

  deleteMember(member:MemberModel, posicion: number) {
    
    Swal.fire({
      title: 'Borrar usuario.',
      text: `¿Seguro quieres borrar el usuario con nombre ${member.memberName}?`,
      template: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then ( resp => {
      if (resp.value) {
        this.members.splice(posicion, 1);
        this.service.deleteMemberById( member.id ).subscribe( (resp:ResponseModel) => {
          
          if(resp.response === 'Con exito.') {

            Swal.fire({
              title: 'Se borro',
              template: 'success'
            })
            this.router.navigate(["members"]); 
          }else {
            
            Swal.fire({
              title: 'Ups..',
              text: `No se puedo borrar el usuario.`,
              template: 'question',
              showConfirmButton: true,
            })
            this.router.navigate(["members"]);
          }   
        });
      }
    });    
  }    
}
