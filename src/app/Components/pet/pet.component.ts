import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberServiceService } from '../../services/member-service.service';
import { PetModel } from '../../models/pet.model';
import { PetServiceService } from '../../services/pet-service.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {
  
  forma!: FormGroup;
  tituloValor: boolean = true;
  

  constructor(private router: Router,
    private fb: FormBuilder,
    private servicePet: PetServiceService,
    private rout: ActivatedRoute) { 

    this.crearFormulario(); 
  }

  ngOnInit() {

    const cc = this.rout.snapshot.paramMap.get('cc');
    const id = this.rout.snapshot.paramMap.get('id');
    
    if(cc !== null) {
      
      this.forma.patchValue({
        id: null,
        member: cc
      });        
    }
    
    if(id !== null){
      console.log(id)
      this.tituloValor = false;
      this.servicePet.getPetById( id ).subscribe( (resp:PetModel) => {
         console.log(resp)
         this.cargarDataFormulario(resp);
      });
    }
  } 

  crearFormulario() {
    
    this.forma = this.fb.group({
      id:            [''],
      petName:       ['', [Validators.required,Validators.minLength(3)]],
      breed:         ['', [Validators.required,Validators.minLength(2)]],
      member:        ['', Validators.required],
      gender:        ['', [Validators.required]],
    });
  } 

  cargarDataFormulario(pet: PetModel) {
    console.log(pet)
    this.forma.setValue({
      id: pet.id,
      petName: pet.petName,                   
      breed: pet.breed,
      member: pet.member.id,
      gender: pet.member
    });
  }

  get petNameNoValido() {

    return this.forma.get('petName')?.invalid && this.forma.get('petName')?.touched;
  }
  get breedNoValido() {

    return this.forma.get('breed')?.invalid && this.forma.get('breed')?.touched;
  }
  get memberNoValido() {

    return this.forma.get('member')?.invalid && this.forma.get('member')?.touched;
  }
  get genderNoValido() {

    return this.forma.get('gender')?.invalid && this.forma.get('gender')?.touched;
  }








  guardar(){

    if( this.forma.invalid) {

      Object.values( this.forma.controls ).forEach( control => {

        control.markAllAsTouched();
      });
    }else {

      let pet = {
        
        "id": this.forma.get('id')?.value,
        "petName": this.forma.get('petName')?.value,
        "breed": this.forma.get('breed')?.value,
        "member": {
          "id": this.forma.get('member')?.value
        },
        "gender": this.forma.get('gender')?.value
      }  
      
      console.log(pet)
      this.savePetPost(pet);
      
    }    
  }

  savePetPost(pet: any) {

    Swal.fire({

      title: 'Please wait',
      text: 'Saving',
      template: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();
    let peticion : Observable<any>;

    peticion = this.servicePet.savePet(pet);

    peticion.subscribe( resp => {
      Swal.fire({
        title: `La mascota con el nombre: ${pet.petName}`,
        text: 'Se guardo',
        template: 'success'
      })
      this.router.navigate(["members"]);
    });

  }



}
