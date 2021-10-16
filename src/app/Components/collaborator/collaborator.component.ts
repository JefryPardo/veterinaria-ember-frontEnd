import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CollaboratorServiceService } from 'src/app/services/collaborator-service.service';
import { CollaboratorModel } from '../../models/collaborator.model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.css']
})
export class CollaboratorComponent implements OnInit {
  
  forma!: FormGroup;
  tituloValor: boolean = true;
  constructor( private router: Router, private fb: FormBuilder, 
  private serviceCollaborator: CollaboratorServiceService,
  private rout: ActivatedRoute) { 

    this.crearFormulario(); 
  }

  ngOnInit() {

    const id = this.rout.snapshot.paramMap.get('id');
     
    if(id !== 'nuevo' && id !== null){
      this.tituloValor = false;
      this.serviceCollaborator.getCollaboratorById( id ).subscribe( ( resp:CollaboratorModel ) => {
        console.log(resp)
         this.cargarDataFormulario(resp);
      });
    }
  }

  crearFormulario() {
    
    this.forma = this.fb.group({
      id:                               [''],
      collaboratorName:                 ['', [Validators.required,Validators.minLength(3)]],
      collaboratorLastName:             ['', [Validators.required,Validators.minLength(3)]],
      collaboratorPosition:             ['', Validators.required],
      specialityArea:                   ['', Validators.required],
      documentCategory:                 ['', [Validators.required]],
      identificationDocument:           ['', Validators.required],
      state:                            [''],
    });
  }

  cargarDataFormulario(collaborator: CollaboratorModel) {

    this.forma.setValue({
      id: collaborator.id,
      collaboratorName: collaborator.collaboratorName,                   
      collaboratorLastName: collaborator.collaboratorLastName,
      collaboratorPosition: collaborator.collaboratorPosition,
      specialityArea: collaborator.specialityArea,
      documentCategory: collaborator.documentCategory,
      identificationDocument: collaborator.identificationDocument,
      state: collaborator.state
    });
  }

  guardar() {

    console.log('entro')    
    console.log(this.forma)
    if( this.forma.invalid ) {

      Object.values( this.forma.controls ).forEach( control => {
        
        control.markAllAsTouched();
      });
    }else { 
      
      if ( this.forma.get('id')?.value === "" ) {
        this.forma.patchValue({
            id: null,
            state: 1
        });
      }
      
      let collaborator: CollaboratorModel = {

        "id": this.forma.get('id')?.value,
        "collaboratorName": this.forma.get('collaboratorName')?.value,
        "collaboratorLastName": this.forma.get('collaboratorLastName')?.value,
        "collaboratorPosition": this.forma.get('collaboratorPosition')?.value,
        "specialityArea": this.forma.get('specialityArea')?.value,
        "documentCategory": this.forma.get('documentCategory')?.value,
        "identificationDocument":this.forma.get('identificationDocument')?.value,
        "state": this.forma.get('state')?.value
      };
      this.saveCollaboratorPost(collaborator);
    }

  }

  saveCollaboratorPost(collaborator: CollaboratorModel) {

    Swal.fire({

      title: 'Please wait',
      text: 'Saving',
      template: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();
    let peticion : Observable<any>;

    peticion = this.serviceCollaborator.saveCollaborator(collaborator);

    peticion.subscribe( resp => {
      Swal.fire({
        title: collaborator.collaboratorName,
        text: 'Se guardo',
        template: 'success'
      })
      this.router.navigate(["collaborators"]);
    });

  }









  // Validaciones individuales.  
  get collaboratorNameNoValido() {

    return this.forma.get('collaboratorName')?.invalid && this.forma.get('collaboratorName')?.touched;
  }

  get collaboratorLastNameNoValido() {

    return this.forma.get('collaboratorLastName')?.invalid && this.forma.get('collaboratorLastName')?.touched;
  }

  get collaboratorPositionNoValido() {

    return this.forma.get('collaboratorPosition')?.invalid && this.forma.get('collaboratorPosition')?.touched;
  }

  get specialityAreaNoValido() {

    return this.forma.get('specialityArea')?.invalid && this.forma.get('specialityArea')?.touched;
  }

  get documentCategoryNoValido() {

    return this.forma.get('documentCategory')?.invalid && this.forma.get('documentCategory')?.touched;
  }

  get identificationDocumentNoValido() {

    return this.forma.get('identificationDocument')?.invalid && this.forma.get('identificationDocument')?.touched;
  }

}
