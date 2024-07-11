import { Injectable } from '@angular/core';
import { Recepie } from '../shared/recepie.model';

@Injectable({
  providedIn: 'root'
})
export class RecepieService {

  constructor() { }

  private recepies:Recepie[] = [
    new Recepie("Chicken Leg Piece","Its so healthy","https://madscookhouse.com/wp-content/uploads/2020/10/Dum-Chicken-Leg-Roast.jpg"),
    new Recepie("Mutton Leg Piece","It has high protien","https://i.pinimg.com/736x/88/c4/02/88c4023f6a5ef1d1ffe04d6a9590d86e.jpg"),
  ]

  getRecepies(){
    return this.recepies.slice();
  }
  getRecepieBYId(index:number){
    return this.recepies[index];
  }

}
