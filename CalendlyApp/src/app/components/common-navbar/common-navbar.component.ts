import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-common-navbar',
  templateUrl: './common-navbar.component.html',
  styleUrls: ['./common-navbar.component.css']
})
export class CommonNavbarComponent implements OnInit {
  currentFullName: string | null;
  currentUserName: string | null;
  currentUserProfilePicture: string | null;
  constructor(private spinner: NgxSpinnerService,private router: Router, private _toast: NgToastService) { 
    this.currentUserName = localStorage.getItem('userName');
    this.currentFullName = localStorage.getItem('fullName');
    this.currentUserProfilePicture = localStorage.getItem('profilePicture');
  }
 
  ngOnInit(): void {
  }

  logoutUser()
  {
    this.spinner.show();
 
    localStorage.clear();
    this._toast.success({ detail: "LOGGING OUT", summary: 'Redirecting to login page',position: 'br'});
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000); 
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 2000);
  
  }

}
