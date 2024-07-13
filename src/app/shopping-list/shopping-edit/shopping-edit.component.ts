import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingrident } from 'src/app/shared/ingrident.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('f') formData: NgForm;
  index: number;
  editMode = false;
  ingrident: Ingrident;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.slService.onSelectedIngrident.subscribe((index: number) => {
      this.index = index
      this.editMode = true
      this.ingrident = this.slService.ingridentacctoindex(index)
      this.formData.form.patchValue({
        'name': this.ingrident.ingrident,
        'amount': this.ingrident.amount
      })
    })
  }

  onAddIngridents() {
    const Name = this.formData.value.name
    const Amount = this.formData.value.amount
    const NewIngrident = new Ingrident(Name, Amount)
    if (!this.editMode) {
      this.slService.addIngrident(NewIngrident)
    } else {
      this.slService.updateIngrident(this.index, NewIngrident)
    }
    this.formData.reset()
    this.editMode = false
  }

  onDelete() {
    this.slService.onRemoveIngrident(this.index);
    this.formData.reset();
    this.editMode = false
  }

  onClear() {
    this.formData.reset()
    this.editMode = false
  }

}
