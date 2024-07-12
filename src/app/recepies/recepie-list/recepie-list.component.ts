import { Component, OnInit } from '@angular/core';
import { Recepie } from 'src/app/shared/recepie.model';
import { RecepieService } from '../recepie.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-recepie-list',
  templateUrl: './recepie-list.component.html',
  styleUrls: ['./recepie-list.component.css']
})
export class RecepieListComponent implements OnInit {

  constructor(private recepieService:RecepieService,private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.recepies = this.recepieService.getRecepies()
  }

  recepies:Recepie[] = []

  addRecepie(){
    this.router.navigate(['new'], {relativeTo:this.route})
  }

}
