import { Component, OnInit } from '@angular/core';
import { MemberServiceService } from '../../services/member-service.service';
import { Router } from '@angular/router';
import { MemberModel } from '../../models/member.model';
import { ResponseModel } from '../../models/response.model';
import Swal from 'sweetalert2';
import { PetServiceService } from '../../services/pet-service.service';
import { ClinicalHistoryServiceService } from '../../services/clinical-history-service.service';
import { DetailClinicalHistoryServiceService } from '../../services/detail-clinical-history-service.service';
import { PetModel } from '../../models/pet.model';
import { ClinicalHistoryModel } from '../../models/clinicalHistory.model';
import { DetailClinicalHistoryModel } from '../../models/detailClinicalHistory.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [MemberServiceService]
})
export class MembersComponent implements OnInit {
  
  members: MemberModel[] = [];
  
  petLis: PetModel[] = [];
  clinicalhistoryList: ClinicalHistoryModel[] = [];
  detailList: DetailClinicalHistoryModel[] = [];


  cargando = false;
  constructor( private service: MemberServiceService, private router: Router,
    private servicePet: PetServiceService, private serviceHistoriaClinica: ClinicalHistoryServiceService,
    private serviceDetail: DetailClinicalHistoryServiceService  
  ) {}

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
      title: '¡¡Ojo!!: Al borrar el usuario se eliminara las mascotas y todos sus registros relacionados.',
      text: `¿Seguro quieres borrar el usuario con nombre ${member.memberName}?`,
      template: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then ( resp => {
      if (resp.value) {
        this.members.splice(posicion, 1);
        this.validador(member);
      }
    });    
  } 


validador(member: MemberModel) {

  this.getPetByCC(member.id);

  // if ( pet ) {
  //   console.log('Tiene mascotas', pets)
  // }else {
  //   console.log('No tiene mascotas', pets)
  // }
}
  
deleteHttp(member:MemberModel) {

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



getPetByCC(member_id: any) {
  console.log(member_id)

  this.servicePet.searchAllPetMember( member_id ).subscribe( (data:PetModel[]) => {
    
    if(data.length != 0) {
      console.log(data)
      data.forEach(element => {
        this.geClinicalHistoryByCC( element.id );
      });
      console.log("salio de clinica")
    }

  }); 
}

geClinicalHistoryByCC(pet_id: any) {
  console.log(pet_id, 'id mascota por buscar')
  this.serviceHistoriaClinica.getClinicalHistoryByPetId( pet_id ).subscribe( (data:ClinicalHistoryModel) => {
    
    // if(data.length != 0) {
    //   console.log(data)
    //   data.forEach(element => {
    //     this.getDetailByCC( element.id);
    //   });
    //   console.log("salio de detail")
    // }
  }); 
}

getDetailByCC(clinical_history: any) {
  console.log(clinical_history, 'id historia clinica')
  this.serviceDetail.getDetailByClinicalHistoryId( clinical_history ).subscribe( (data:DetailClinicalHistoryModel[]) => {
    
    if(data.length != 0) {
      
    }

  }); 
}






}
