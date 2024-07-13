import { Injectable } from '@angular/core';
import { Recepie } from '../shared/recepie.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecepieService {

  onSelectedRecepie = new Subject<number>();
  onChangedRecepie = new Subject<Recepie[]>();

  constructor() { }

  // private recepies:Recepie[] = [
  //   new Recepie("Chicken Leg Piece","Its so healthy","https://madscookhouse.com/wp-content/uploads/2020/10/Dum-Chicken-Leg-Roast.jpg",
  //     [
  //       new Ingrident("Chicken Masala",2),
  //       new Ingrident("Cicken",1)
  //     ]
  //   ),
  //   new Recepie("Mutton Leg Piece","It has high protien","https://i.pinimg.com/736x/88/c4/02/88c4023f6a5ef1d1ffe04d6a9590d86e.jpg",
  //     [
  //       new Ingrident("Mutton Masala",2),
  //       new Ingrident("Mutton",1)
  //     ]
  //   ),
  // ]

  private recepies: Recepie[] = []

  getRecepies() {
    return this.recepies;
  }
  getRecepieBYId(index: number) {
    return this.recepies[index];
  }
  updateRecepie(index: number, newRecepie: Recepie) {
    this.recepies[index] = newRecepie
    this.onChangedRecepie.next(this.recepies.slice())
  }
  addNewRecepie(newRecepie: Recepie) {
    this.recepies.push(newRecepie)
    this.onChangedRecepie.next(this.recepies.slice())
  }
  onDeleteRecepie(index: number) {
    this.recepies.splice(index, 1)
    this.onChangedRecepie.next(this.recepies.slice())
  }
  addRecepiesformDB(recepies: Recepie[]) {
    this.recepies = recepies
    this.onChangedRecepie.next(this.recepies.slice())
  }

}
