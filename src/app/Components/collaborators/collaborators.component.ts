import { Component, OnInit } from '@angular/core';
import { CollaboratorServiceService } from 'src/app/services/collaborator-service.service';
import { CollaboratorModel } from '../../models/collaborator.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ResponseModel } from 'src/app/models/response.model';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css']
})
export class CollaboratorsComponent implements OnInit {
  
  collaborators: CollaboratorModel[] = [];
  cargandoAnimacion = false;

  constructor(private service: CollaboratorServiceService, private router: Router) { }

  ngOnInit() {
    
    this.cargandoAnimacion = true;
    this.service.searchAllCollaborator().subscribe( data => {
      
      if(data !== []) {
        this.cargandoAnimacion = false;
        this.collaborators = data;
      }
    });
  }


  deleteCollaborator(collaborator:CollaboratorModel, posicion: number) {
    
    Swal.fire({
      title: 'Borrar colaborador.',
      text: `¿Seguro quieres borrar el colaborador con el nombre ${collaborator.collaboratorName}?`,
      template: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then ( resp => {
      if (resp.value) {
        this.collaborators.splice(posicion, 1);
        this.service.deleteCollaboratorById( collaborator.id ).subscribe( (resp:ResponseModel) => {
          
          if(resp.response === 'Con exito.') {

            Swal.fire({
              title: 'Se borro',
              template: 'success'
            })
            this.router.navigate(["collaborators"]); 
          }else {
            
            Swal.fire({
              title: 'Ups..',
              text: `No se puedo borrar el colaborador.`,
              template: 'question',
              showConfirmButton: true,
            })
            this.router.navigate(["collaborator"]);
          }   
        });
      }
    });    
  }

}
