import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { PetComponent } from './Components/pet/pet.component';
import { MemberComponent } from './Components/member/member.component';
import { CollaboratorComponent } from './Components/collaborator/collaborator.component';
import { DetailsComponent } from './Components/details/details.component';
import { MembersComponent } from './Components/members/members.component';
import { PetsComponent } from './Components/pets/pets.component';
import { CollaboratorsComponent } from './Components/collaborators/collaborators.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'pets/:id', component: PetsComponent},
  {path: 'pet/:cc/cc', component: PetComponent},
  {path: 'pet/:id', component: PetComponent},
  {path: 'member/:id', component: MemberComponent},
  {path: 'members', component: MembersComponent},
  {path: 'collaborators', component: CollaboratorsComponent},
  {path: 'collaborator/:id', component: CollaboratorComponent},
  {path: 'detail/:id', component: DetailsComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
