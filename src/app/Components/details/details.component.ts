import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailClinicalHistoryServiceService } from '../../services/detail-clinical-history-service.service';
import { DetailClinicalHistoryModel } from '../../models/detailClinicalHistory.model';

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
    private rout: ActivatedRoute) {
    
      this.crearFormulario();
  }

  ngOnInit() {

    const id = this.rout.snapshot.paramMap.get('id');
     
    if(id !== '' && id !== null){
      this.tituloValor = false;
      this.serviceDetail.getDetailById(id).subscribe( ( resp:DetailClinicalHistoryModel ) => {
        console.log(resp)
         this.cargarDataFormulario(resp);
      });
    }
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
      dateTime:               detail.dateTime,
      feeding:                detail.feeding,
      habitat:                detail.habitat,
      comments:               detail.comments,
      collaborator:           detail.collaborator,
      clinicalHistory:        detail.clinicalHistory
    });
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

  }



}
