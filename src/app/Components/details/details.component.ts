import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailClinicalHistoryServiceService } from '../../services/detail-clinical-history-service.service';
import { DetailClinicalHistoryModel } from '../../models/detailClinicalHistory.model';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ClinicalHistoryServiceService } from '../../services/clinical-history-service.service';
import { ClinicalHistoryModel } from '../../models/clinicalHistory.model';
import { PetModel } from '../../models/pet.model';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  
  forma!: FormGroup;
  tituloValor: boolean = true;

  constructor(private router: Router, private fb: FormBuilder, 
    private serviceDetail: DetailClinicalHistoryServiceService,
    private serviceClinicalHistori: ClinicalHistoryServiceService,
    private rout: ActivatedRoute) {
    
      this.crearFormulario();
  }

  ngOnInit() {

    const entrada = this.rout.snapshot.paramMap.get('id');
    console.log(entrada)
    if(entrada !== '' && entrada !== null){
      
      this.tituloValor = false;
      this.serviceClinicalHistori.getClinicalHistoryByPetId( entrada ).subscribe( (resp:ClinicalHistoryModel) => {
        
        if(resp != null) {
          console.log(resp.id)
          this.forma.setValue({
            id:                     null,
            temperature:            null,
            weight:                 null,
            breathingRate:          null,
            cardiacFrequency:       null,
            dateTime:               null,
            feeding:                null,
            habitat:                null,
            comments:               null,
            collaborator:           null,
            clinicalHistory:        resp.id
          });
        }else {

          console.log('vacio')
        }
      });
    }
  }

  petView(cli: ClinicalHistoryModel) {

    console.log(cli.id)
  }

  crearFormulario() {
    
    this.forma = this.fb.group({

      id:                     [''],
      temperature:            ['',Validators.required],
      weight:                 ['',Validators.required],
      cardiacFrequency:       ['',Validators.required],
      breathingRate:          ['',Validators.required],
      dateTime:               ['',Validators.required],
      feeding:                ['',Validators.required],
      habitat:                ['',Validators.required],
      comments:               ['',Validators.required],
      collaborator:           ['',Validators.required],
      clinicalHistory:        ['',Validators.required],
    });
  }

  cargarDataFormulario(detail: DetailClinicalHistoryModel) {

    this.forma.setValue({
      
      id:                     detail.id,
      temperature:            detail.temperature,
      weight:                 detail.weight,
      breathingRate:          detail.breathingRate,
      cardiacFrequency:       detail.cardiacFrequency,
      dateTime:               moment(detail.dateTime).format('yyyy-MM-DDThh:mm'),
      feeding:                detail.feeding,
      habitat:                detail.habitat,
      comments:               detail.comments,
      collaborator:           detail.collaborator.id,
      clinicalHistory:        detail.clinicalHistory.id
    });
    console.log(moment(detail.dateTime).format('yyyy-MM-DDThh:mm'))
  }

  get temperaturePositionNoValido() {

    return this.forma.get('temperature')?.invalid && this.forma.get('temperature')?.touched;
  }
  get weightNoValido() {

    return this.forma.get('weight')?.invalid && this.forma.get('weight')?.touched;
  }
  get cardiacFrequencyNoValido() {

    return this.forma.get('cardiacFrequency')?.invalid && this.forma.get('cardiacFrequency')?.touched;
  }
  get breathingRateNoValido() {

    return this.forma.get('breathingRate')?.invalid && this.forma.get('breathingRate')?.touched;
  }
  get dateTimeNoValido() {

    return this.forma.get('dateTime')?.invalid && this.forma.get('dateTime')?.touched;
  }
  get feedingNoValido() {

    return this.forma.get('feeding')?.invalid && this.forma.get('feeding')?.touched;
  }
  get habitatNoValido() {

    return this.forma.get('habitat')?.invalid && this.forma.get('habitat')?.touched;
  }
  get commentsNoValido() {

    return this.forma.get('comments')?.invalid && this.forma.get('comments')?.touched;
  }
  get collaboratorNoValido() {

    return this.forma.get('collaborator')?.invalid && this.forma.get('collaborator')?.touched;
  }
  get clinicalHistoryNoValido() {

    return this.forma.get('clinicalHistory')?.invalid && this.forma.get('clinicalHistory')?.touched;
  }

  guardar() {
       
    if( this.forma.invalid ) {

      Object.values( this.forma.controls ).forEach( control => {
        
        control.markAllAsTouched();
      });
    }else { 
      
      if ( this.forma.get('id')?.value === "" ) {
        this.forma.patchValue({
            id: null
        });
      }
      
      let detail: any = {

        "id":                     this.forma.get('id')?.value,
        "temperature":            this.forma.get('temperature')?.value,
        "weight":                 this.forma.get('weight')?.value,
        "cardiacFrequency":       this.forma.get('cardiacFrequency')?.value,
        "breathingRate":          this.forma.get('breathingRate')?.value,
        "dateTime":               this.forma.get('dateTime')?.value,
        "feeding":                this.forma.get('feeding')?.value,
        "habitat":                this.forma.get('habitat')?.value,
        "comments":               this.forma.get('comments')?.value,
        "collaborator":           {
          "id": this.forma.get('collaborator')?.value
        },
        "clinicalHistory":        {
          "id": this.forma.get('clinicalHistory')?.value
        }
      };
      this.saveDetailPost(detail);
    }
  }

  saveDetailPost(detail: DetailClinicalHistoryModel) {

    Swal.fire({

      title: 'Please wait',
      text: 'Saving',
      template: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();
    let peticion : Observable<any>;

    peticion = this.serviceDetail.saveDetail( detail );

    peticion.subscribe( resp => {
      Swal.fire({
        title: 'Exitos',
        text: 'Se guardo',
        template: 'success'
      })
      this.router.navigate(["home"]);
    });
  }


}
