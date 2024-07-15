import { NgModule } from "@angular/core";
import { StartComponent } from "../start/start.component";
import { OpenclassDirective } from "./openclass.directive";
import { SpinnerComponent } from "./spinner/spinner.component";

@NgModule({
  declarations: [
    OpenclassDirective,
    StartComponent,
    SpinnerComponent,
  ],
  imports: [],
  exports: [
    OpenclassDirective,
    StartComponent,
    SpinnerComponent,
  ]
})
export class SharedModule{}
