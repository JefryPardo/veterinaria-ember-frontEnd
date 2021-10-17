import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { MemberComponent } from './Components/member/member.component';
import { PetComponent } from './Components/pet/pet.component';
import { CollaboratorComponent } from './Components/collaborator/collaborator.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { DetailsComponent } from './Components/details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembersComponent } from './Components/members/members.component';
import { HttpClientModule } from '@angular/common/http';
import { CollaboratorsComponent } from './Components/collaborators/collaborators.component';
import { PetsComponent } from './Components/pets/pets.component';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MemberComponent,
    PetComponent,
    CollaboratorComponent,
    NavbarComponent,
    DetailsComponent,
    MembersComponent,
    CollaboratorsComponent,
    PetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
