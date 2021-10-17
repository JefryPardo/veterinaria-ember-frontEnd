import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetModel } from '../../models/pet.model';
import { PetServiceService } from '../../services/pet-service.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  
  pets: PetModel[] = [];
  cargando = false;
  identificationDocument: string = '';

  constructor( private service: PetServiceService, private router: Router, private rout: ActivatedRoute ) { }

  ngOnInit() {
    this.cargando = true;
    const id = this.rout.snapshot.paramMap.get('id');
    console.log(id)
     
    if(id !== '' && id !== null){      
      this.service.searchAllPetMember( id ).subscribe( ( resp:PetModel[] ) => {
        this.cargando = false;
        this.identificationDocument = id;
        this.pets = resp;
      });
    }
    
  }


  deletePet(pet:PetModel, posicion: number) {

    console.log(pet)
  }

}
