import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recepie } from 'src/app/shared/recepie.model';
import { RecepieService } from '../recepie.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recepie-details',
  templateUrl: './recepie-details.component.html',
  styleUrls: ['./recepie-details.component.css']
})
export class RecepieDetailsComponent implements OnInit {

  id:number;
  recepie:Recepie;

  constructor(private route:ActivatedRoute,private router:Router, private recepieService:RecepieService, private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id']
      this.recepie = this.recepieService.getRecepieBYId(this.id)
    })
  }

  toShopping(){
    this.slService.addIngridentfromRecepie(this.recepie.ingridents)
  }

  toEdit(){
    this.router.navigate(['edit'], {relativeTo:this.route})
  }
  onDelete(){
    this.recepieService.onDeleteRecepie(this.id)
    this.router.navigate(['/recepies'])
  }

}
