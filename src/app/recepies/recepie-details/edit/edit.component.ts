import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecepieService } from '../../recepie.service';
import { Recepie } from 'src/app/shared/recepie.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  formData: FormGroup;
  index: number
  recepie: Recepie;
  id: number
  editMode = false

  constructor(private recepieService: RecepieService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.editMode = params['id'] != null;
      this.recepie = this.recepieService.getRecepieBYId(this.id)
    })
    this.initform()
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  initform() {
    let recepieName = ''
    let recepieimagePath = ''
    let recepieDiscription = ''
    let recepieIngridents = new FormArray([])
    if (this.editMode) {
      const recepie = this.recepieService.getRecepieBYId(this.id)
      recepieName = recepie.name
      recepieimagePath = recepie.imagePath
      recepieDiscription = recepie.discription
      if (recepie['ingridents']) {
        for (let ingrident of recepie.ingridents) {
          recepieIngridents.push(new FormGroup({
            'ingrident': new FormControl(ingrident.ingrident, Validators.required),
            'amount': new FormControl(ingrident.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        }
      }
    }
    this.formData = new FormGroup({
      'name': new FormControl(recepieName, Validators.required),
      'imagePath': new FormControl(recepieimagePath, Validators.required),
      'discription': new FormControl(recepieDiscription, Validators.required),
      'ingridents': recepieIngridents
    })
  }

  onSubmit(){
    if(this.editMode){
      this.recepieService.updateRecepie(this.id, this.formData.value)
    }else{
      this.recepieService.addNewRecepie(this.formData.value)
    }
    this.router.navigate(['../'])
  }
  onCancel(){
    this.router.navigate(['../'])
  }

  addIngrident(){
    (<FormArray>this.formData.get('ingridents')).push(new FormGroup({
      'ingrident': new FormControl(null),
      'amount': new FormControl(null)
    }))
  }
  onRemove(index:number){
    (<FormArray>this.formData.get('ingridents')).removeAt(index)
  }





}
