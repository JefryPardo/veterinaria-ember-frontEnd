import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetailClinicalHistoryModel } from '../../models/detailClinicalHistory.model';
import { DetailClinicalHistoryServiceService } from '../../services/detail-clinical-history-service.service';
import Swal from 'sweetalert2';
import { ResponseModel } from 'src/app/models/response.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  details: DetailClinicalHistoryModel[] = [];
  cargandoAnimacion = false;

  constructor( private service: DetailClinicalHistoryServiceService,private router: Router ) { }

  ngOnInit() {
    
    this.cargandoAnimacion = true;
    this.service.searchAllDetail().subscribe( (data:DetailClinicalHistoryModel[]) => {
      
      if(data !== []) {
        this.cargandoAnimacion = false;
        this.details = data;
      }
    });
  }


  viewDetails( details : DetailClinicalHistoryModel) {

    Swal.fire({
      title: 'Details',
      text: `Datos del usuario:
            Nombre: ${details.clinicalHistory.pet.member.memberName}.
            Cedula: ${details.clinicalHistory.pet.member.identificationDocument}.
            
            Datos de la mascota:
            Cedula: ${details.clinicalHistory.pet.petName}.
            Inicio del historial clinico: ${details.clinicalHistory.creationDate}.

            Datos del detalle clinico:
            Temperatura: ${details.temperature}.
            Peso: ${details.weight}.
            cardiac_frequency: ${details.cardiacFrequency}.
            breathing_rate : ${details.breathingRate}.
            date_time: ${details.dateTime}.
            feeding: ${details.feeding}.
            habitat: ${details.habitat}.
            comments: ${details.comments}.

            Datos del colaborador:
            Nombre: ${details.collaborator.collaboratorName}.
            Especialidad: ${details.collaborator.specialityArea}.
            `,
      
      template: 'question',
      showConfirmButton: true,
    })

    console.log(details)
  }  


  deleteDetail( detail_id: number, posicion: number ) {

    Swal.fire({
      title: 'Borrar detalle clinico.',
      text: `¿Seguro quieres borrar el el detalle clinico?`,
      template: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then ( resp => {
      if (resp.value) {
        this.details.splice(posicion, 1);
        this.service.deleteDetailById( detail_id ).subscribe( (resp:ResponseModel) => {
          
          if(resp.response === 'Con exito.') {

            Swal.fire({
              title: 'Se borro',
              template: 'success'
            })
            this.router.navigate(["home"]); 
          }else {
            
            Swal.fire({
              title: 'Ups..',
              text: `No se puedo borrar el detalle clinico.`,
              template: 'question',
              showConfirmButton: true,
            })
            this.router.navigate(["home"]);
          }   
        });
      }
    });
  }

}
