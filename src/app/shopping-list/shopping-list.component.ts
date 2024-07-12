import { Component, OnInit } from '@angular/core';
import { Ingrident } from '../shared/ingrident.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingridents = this.slService.getIngridents()
    this.slService.ingridentsChanged.subscribe((ingridents:Ingrident[])=>{
      this.ingridents = ingridents
    })
  }

  ingridents:Ingrident[] = []

  onClick(index:number){
    this.slService.onSelectedIngrident.next(index);
  }

}
