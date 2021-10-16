import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberModel } from '../../models/member.model';
import { MemberServiceService } from '../../services/member-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/response.model';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
    
  forma!: FormGroup;
  tituloValor: boolean = true;  

  constructor(private router: Router, private fb: FormBuilder,
     private serviceMember: MemberServiceService,
     private rout: ActivatedRoute ) { 

    this.crearFormulario();    
  }

  ngOnInit() {

    const id = this.rout.snapshot.paramMap.get('id');
     
    if(id !== 'nuevo' && id !== null){
      this.tituloValor = false;
      this.serviceMember.getMemberById( id ).subscribe( (resp:MemberModel) => {
         this.cargarDataFormulario(resp);
      });
    }
  }

  crearFormulario() {
    
    this.forma = this.fb.group({
      id:                       [''],
      nombre:                   ['', [Validators.required,Validators.minLength(3)]],
      apellido:                 ['', [Validators.required,Validators.minLength(3)]],
      genero:                   ['', Validators.required],
      tipo_documento:           ['', Validators.required],
      documento_identificacion: ['', [Validators.required]],
      estado:                   ['', Validators.required],
    });
  }

  cargarDataFormulario(member: MemberModel) {

    this.forma.setValue({
      id: member.id,
      nombre: member.memberName,                   
      apellido: member.memberLastName,
      genero: member.gender,
      tipo_documento: member.documentCantegory,
      documento_identificacion: member.identificationDocument,
      estado: member.memberState
    });
  } 
  
  get nombreNoValido() {

    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched;
  }
 
  get documentoNoValido() {

    return this.forma.get('tipo_documento')?.invalid && this.forma.get('tipo_documento')?.touched;
  }
  
  get apellidoNoValido() {

    return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched;
  }  
  
  get identificacionNoValido() {

    return this.forma.get('documento_identificacion')?.invalid && this.forma.get('documento_identificacion')?.touched;
  }

  get generoNoValido() {

    return this.forma.get('genero')?.invalid && this.forma.get('genero')?.touched;
  }

  get estadoNoValido() {

    return this.forma.get('estado')?.invalid && this.forma.get('estado')?.touched;
  }  

  validarCedula() {


  }


  



  guardar() {
    
    if( this.forma.invalid) {

      Object.values( this.forma.controls ).forEach( control => {

        control.markAllAsTouched();
      });
    }else {
      
      let cc = this.forma.get('documento_identificacion')?.value;

      this.serviceMember.getMemberByCC( cc ).subscribe( (resp:ResponseModel) => {
        console.log(resp.response)
        if(resp.response === 'Disponible.') {
          this.savePost();   
        }else {
          Swal.fire({

            title: 'Documento no disponible',
            text: 'Este numero de documento ya esta registrado.',
            template: 'info',
            showConfirmButton: true,
            allowOutsideClick: false
          });
        }
       });
    }   
  }

  savePost() {

    let id = this.forma.get('id')?.value;
    if ( this.forma.get('id')?.value === "" ) {
      id = null;
    }

    let member: MemberModel = {
        
      "id": id,
      "memberName": this.forma.get('nombre')?.value,
      "memberLastName": this.forma.get('apellido')?.value,
      "documentCantegory": this.forma.get('tipo_documento')?.value,
      "identificationDocument": this.forma.get('documento_identificacion')?.value,
      "memberState": this.forma.get('estado')?.value,
      "gender":this.forma.get('genero')?.value
    };
    this.saveMemberPost(member);
  }


  saveMemberPost(member: MemberModel) {

    Swal.fire({

      title: 'Please wait',
      text: 'Saving',
      template: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();
    let peticion : Observable<any>;

    peticion = this.serviceMember.saveMember(member);

    peticion.subscribe( resp => {
      Swal.fire({
        title: `El usuario con el nombre: ${member.memberName}`,
        text: 'Se guardo',
        template: 'success'
      })
      this.router.navigate(["members"]);
    });

  }
}
