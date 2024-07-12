import { Injectable } from '@angular/core';
import { Ingrident } from '../shared/ingrident.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  onSelectedIngrident = new Subject<number>();
  ingridentsChanged = new Subject<Ingrident[]>();
  ingrident = new Subject<Ingrident>();

  constructor() { }

  private ingridents:Ingrident[] = [
    new Ingrident("mango",5),
    new Ingrident("apple",77)
  ]

  getIngridents(){
    return this.ingridents.slice();
  }
  addIngridentfromRecepie(ingrident:Ingrident[]){
    this.ingridents.push(...ingrident)
  }
  addIngrident(ingrident:Ingrident){
    this.ingridents.push(ingrident);
    this.ingridentsChanged.next(this.ingridents.slice());
  }
  ingridentacctoindex(index:number){
    return this.ingridents[index]
  }
  onRemoveIngrident(index:number){
    this.ingridents.splice(index,1)
    this.ingridentsChanged.next(this.ingridents.slice())
  }
  updateIngrident(index:number,newIngrdent:Ingrident){
    this.ingridents[index] = newIngrdent
    this.ingridentsChanged.next(this.ingridents.slice())
  }
  
}
