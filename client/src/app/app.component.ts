import { Component, ViewChild, OnInit } from '@angular/core';
import { ServiceService } from './service.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import {  MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {



  constructor(private service:ServiceService,private router:Router,private Auth:AuthService){

  }


ngOnInit() {


  let data=localStorage.getItem("userData");

  if(data===null||data===undefined){


    this.router.navigate(['auth']);



  }
  else{

  let userData=JSON.parse(localStorage.getItem("userData"));


    this.router.navigate(['main']);
    this.Auth.setLoggedIn(true);
    this.Auth.setLoggedInData(userData);


  }


  
}


}
