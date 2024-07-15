import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ResolverService } from "../shared/resolver.service";
import { StartComponent } from "../start/start.component";
import { EditComponent } from "./recepie-details/edit/edit.component";
import { RecepieDetailsComponent } from "./recepie-details/recepie-details.component";
import { RecepiesComponent } from "./recepies.component";
import { AuthGuard } from "../auth/auth-guard.service";

const routes:Routes=[
  {path:'',canActivate: [AuthGuard], component:RecepiesComponent, children:[
    {path:'', component:StartComponent},
    {path:'new', component:EditComponent},
    {path:':id', component:RecepieDetailsComponent, resolve : [ResolverService]},
    {path:':id/edit', component:EditComponent, resolve : [ResolverService]}
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class RecepiesRoutingModule{}
