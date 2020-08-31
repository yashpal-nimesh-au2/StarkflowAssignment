import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  addUser(userData: Object) {

    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post("http://localhost:5000/user/addUser", userData, config)


  }


  verifyUser(userData: Object) {

    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post("http://localhost:5000/user/verifyUser", userData, config)

  }

  forgotPassword(userData: Object) {


    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post("http://localhost:5000/user/forgotPassword", userData, config)
      .subscribe(res => console.log(res))

  }


  addNotes(userData: Object) {


    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post("http://localhost:5000/notes/addNote", userData, config)

  }

  showNotes(userData: Object) {

    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post("http://localhost:5000/notes/showNotes", userData, config)

  }


  deleteNotes(userData: Object) {

    return this.http.delete(`http://localhost:5000/notes/deleteNotes/${userData["noteId"]}`)
      .subscribe(data => console.log(data))


  }


  editNote(userData: Object) {


    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.put("http://localhost:5000/notes/editNote", userData, config)
      .subscribe(data => console.log(data))


  }

}
