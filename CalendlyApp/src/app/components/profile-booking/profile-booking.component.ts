import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { IEvents } from 'src/app/interface/events';
import { IUsers } from 'src/app/interface/users';
import { BookingService } from 'src/app/services/booking-services/booking.service';
import { EventService } from 'src/app/services/event-service/event.service';

@Component({
  selector: 'app-profile-booking',
  templateUrl: './profile-booking.component.html',
  styleUrls: ['./profile-booking.component.css']
})
export class ProfileBookingComponent implements OnInit {
  availUserNameParams: string;
  errMsg!: string;
  user: IUsers[] = [];
  event: IEvents[] = [];
  userName: string = "";
  profilePicture: string = "";
  about: string = "";
  hideEventType: string = "";
  strEvent: any = [];
  constructor(private _bookingServices: BookingService, private _evtServices: EventService, private _toast: NgToastService,private route: ActivatedRoute) { 
    const routeParams = this.route.snapshot.paramMap;
    this.availUserNameParams = String(routeParams.get('username'));
   
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this._bookingServices.publicgetUserData(this.availUserNameParams).subscribe(
      res => {
      this.user = res;
      this.userName =  this.user[0].fullName;
      this.profilePicture=  this.user[0].profilePicture;
      this.about =  this.user[0].about;

      if(res.length!=null)
      {
          this._evtServices.getAllEvents(this.user[0].userId, this.user[0].userToken).subscribe(
            res => {
              for(var i =0;i<res.length;i++)
              {
                if(res[i].hideEventType == "No")
                {
                  this.strEvent.push(res[i]);
                  
                }
                else{
                  this.event = [];
                }
              }
              console.log(this.strEvent);
          
            
          }, err => {
            this.event = [];
             this.errMsg = err;
             console.log(this.errMsg)
          }, () => console.log("Get All Events method excuted successfully"))
        
      }
    }, err => {
      this.user = [];
       this.errMsg = err;
       console.log(this.errMsg)
    }, () => console.log("Get User Data method excuted successfully"))
  }

}
