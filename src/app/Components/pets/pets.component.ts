import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  identificationDocument: number = 0;

  constructor( private service: PetServiceService, private router: Router ) { }

  ngOnInit() {

    this.cargando = true;
    this.service.searchAllPet().subscribe( (data:PetModel[]) => {      
        
      if(data !== []) {
        this.cargando = false;
        this.pets = data;
        this.identificationDocument = data[0].member.id;
      }
    });
  }


  deletePet(pet:PetModel, posicion: number) {

    console.log(pet)
  }

}
