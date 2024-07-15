import { NgModule } from "@angular/core";
import { EditComponent } from "./recepie-details/edit/edit.component";
import { RecepieDetailsComponent } from "./recepie-details/recepie-details.component";
import { RecepieItemComponent } from "./recepie-list/recepie-item/recepie-item.component";
import { RecepieListComponent } from "./recepie-list/recepie-list.component";
import { RecepiesComponent } from "./recepies.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "../app-routing.module";
import { RecepiesRoutingModule } from "./recepies-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    RecepiesComponent,
    RecepieListComponent,
    RecepieDetailsComponent,
    RecepieItemComponent,
    EditComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RecepiesRoutingModule,
    SharedModule
  ],
  exports: [
    RecepiesComponent,
    RecepieListComponent,
    RecepieDetailsComponent,
    RecepieItemComponent,
    EditComponent,
  ]
})
export class RecepiesModule { }
