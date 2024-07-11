import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recepie } from 'src/app/shared/recepie.model';
import { RecepieService } from '../recepie.service';

@Component({
  selector: 'app-recepie-details',
  templateUrl: './recepie-details.component.html',
  styleUrls: ['./recepie-details.component.css']
})
export class RecepieDetailsComponent implements OnInit {

  id:number;
  recepie:Recepie;

  constructor(private route:ActivatedRoute, private recepieService:RecepieService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = params['id']
      this.recepie = this.recepieService.getRecepieBYId(this.id)
    })
  }

}
