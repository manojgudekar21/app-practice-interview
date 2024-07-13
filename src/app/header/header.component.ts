import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private storageService:StorageService) { }

  ngOnInit(): void {
  }

  onSave(){
    this.storageService.onSave()
  }
  onFetch(){
    this.storageService.onFetch().subscribe()
  }


  

}
