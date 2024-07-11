import { Component, OnInit } from '@angular/core';
import { Recepie } from 'src/app/shared/recepie.model';

@Component({
  selector: 'app-recepie-list',
  templateUrl: './recepie-list.component.html',
  styleUrls: ['./recepie-list.component.css']
})
export class RecepieListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  recepies:Recepie[] = [
    new Recepie("Chicken Leg Piece","Its so healthy","https://madscookhouse.com/wp-content/uploads/2020/10/Dum-Chicken-Leg-Roast.jpg"),
    new Recepie("Mutton Leg Piece","It has high protien","https://i.pinimg.com/736x/88/c4/02/88c4023f6a5ef1d1ffe04d6a9590d86e.jpg"),
  ]

}
