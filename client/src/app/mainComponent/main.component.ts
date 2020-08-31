import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ServiceService } from '../service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {


  constructor(private service: ServiceService, private router: Router, private Auth: AuthService) { }

  navData = null;
  isAddNew = false;
  title = "";
  description = "";
  isSaveModal = false;
  isTitle = false;
  isDescription = false;
  isEdit = false;
  editData: any = null;
  isShowDesc = false;
  noteData: any = [];

  displayedColumns: string[] = ['title', 'actions'];
  dataSource = new MatTableDataSource(this.noteData);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;




  ngOnInit(): void {

    setTimeout(() => this.dataSource.sort = this.sort);

    setTimeout(() => this.dataSource.paginator = this.paginator);


    this.navData = this.Auth.loggedInData;

    this.service.showNotes(this.Auth.loggedInData)
      .subscribe(data => {

        this.noteData = data;

        this.dataSource = new MatTableDataSource(this.noteData);

      })



  }



  handleLogOut() {

    localStorage.removeItem("userData");
    this.Auth.setLoggedIn(false);
    this.router.navigate(['auth']);

  }

  onAddNew() {

    this.isSaveModal = false;
    this.title = "";
    this.description = "";
    this.editData = null;
    this.isEdit = false;
    this.isAddNew = true;
    this.isShowDesc = false;



  }

  onSaveNote() {

    if (this.title === "" && this.description === "") {

      this.isTitle = true;
      this.isDescription = true;

    }
    else if (this.title === "") {

      this.isTitle = true;

    }
    else if (this.description === "") {

      this.isDescription = true;

    }
    else {

      this.isTitle = false;
      this.isDescription = false;

      if (this.isEdit) {      // save edit note


        let obj = {
          noteId: this.editData.noteId,
          title: this.title,
          description: this.description
        }


        this.service.editNote(obj);

        this.onRefreshToDo();

        this.isSaveModal = true;



      }

      else {   // save new note



        let obj = {
          title: this.title,
          description: this.description,
          createdBy: this.Auth.loggedInData.email
        }


        this.service.addNotes(obj)
          .subscribe(data => {

            if (data) {

              this.isSaveModal = true;

            }


          })
      }
    }


  }

  onInputTitle(event: any) {


    this.title = event;

    if (this.title === "") {
      this.isTitle = true;

    }

    else {

      this.isTitle = false;

    }

  }

  onInputDescription(event: any) {

    this.description = event;

    if (this.description === "") {

      this.isDescription = true;

    }

    else {

      this.isDescription = false;

    }



  }

  onRefreshToDo() {

    this.service.showNotes(this.Auth.loggedInData)
      .subscribe(data => {

        this.noteData = data;
        setTimeout(() => this.dataSource = new MatTableDataSource(this.noteData));
        setTimeout(() => this.dataSource.sort = this.sort);
        setTimeout(() => this.dataSource.paginator = this.paginator);


      })


  }

  onDelete(event: any) {

    this.service.deleteNotes(event);

    this.onRefreshToDo();

  }

  onEdit(event: any) {

    this.isEdit = true;
    this.editData = event;
    this.title = event.title;
    this.description = event.description;
    this.isAddNew = false;
    this.isSaveModal = false;
    this.isShowDesc = false;




  }

  onShowDescription(event) {


    this.title = event.title;
    this.description = event.description;
    this.isEdit = false;
    this.isAddNew = false;
    this.isShowDesc = true;



  }


}
