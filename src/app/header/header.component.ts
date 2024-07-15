import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticate = false
  constructor(private storageService:StorageService, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user:User)=>{
      this.isAuthenticate = user? true : false
    })
  }

  onSave(){
    this.storageService.onSave()
  }
  onFetch(){
    this.storageService.onFetch().subscribe()
  }

  onLogout(){
    this.authService.logout()
  }




}
