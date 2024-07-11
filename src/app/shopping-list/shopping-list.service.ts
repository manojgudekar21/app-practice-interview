import { Injectable } from '@angular/core';
import { Ingrident } from '../shared/ingrident.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor() { }

  private ingridents:Ingrident[] = [
    new Ingrident("mango",5),
    new Ingrident("apple",77)
  ]

  getIngridents(){
    return this.ingridents.slice();
  }
  
}
