import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetailClinicalHistoryModel } from '../../models/detailClinicalHistory.model';
import { DetailClinicalHistoryServiceService } from '../../services/detail-clinical-history-service.service';

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

}
