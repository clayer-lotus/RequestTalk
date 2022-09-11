import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { IAvailibility } from 'src/app/interface/availibility';
import { IEvents } from 'src/app/interface/events';
import { EventService } from 'src/app/services/event-service/event.service';

@Component({
  selector: 'app-edit-event-type',
  templateUrl: './edit-event-type.component.html',
  styleUrls: ['./edit-event-type.component.css']
})
export class EditEventTypeComponent implements OnInit {
  eventDetails: IEvents[] = [];

  tempavaibility: IAvailibility[] = [];

  avaibility: any;
  status: boolean = false;
  errMsg!: string;
  userId: number  | null;
  userToken: string | null;
  eventIdParams: number;
  globalEventName: string | undefined ;
  globalEventDesc: string | undefined ;
  

  // locationArr = [
  //   { id: 1, label: "Zoom", status: "false" },
  //   { id: 2, label: "Google Meet", status: "false" },
  //   { id: 3, label: "Microsoft Teams", status: "false" }
  // ];

  locationArr = [
    { id: 2, label: "Google Meet", status: "false" }
  ];
  
  intervalArr = [
    { id: 1, label: "Use Event Length (default)", duration: 0, status: "false" },
    { id: 2, label: "5 Minutes",  duration: 5, status: "false" },
    { id: 3, label: "10 Minutes",  duration: 10, status: "false" },
    { id: 4, label: "15 Minutes",  duration: 15, status: "false" },
    { id: 5, label: "20 Minutes",  duration: 20, status: "false" },
    { id: 6, label: "30 Minutes",  duration: 30, status: "false" },
    { id: 7, label: "45 Minutes",  duration: 45, status: "false" },
    { id: 8, label: "60 Minutes",  duration: 60, status: "false" },
  ];

  hideEventCheckBox: boolean = false;
  optInBookingCheckBox: boolean = false;
  disableGuestCheckBox: boolean = false;
  userName: string | null;
  
  
  constructor(private spinner: NgxSpinnerService,private _evtServices: EventService, private _toast: NgToastService, private route: ActivatedRoute) {
    this.userId = Number(localStorage.getItem('userID'));
    this.userName=localStorage.getItem('userName');;
    this.userToken = localStorage.getItem('userToken');;
    const routeParams = this.route.snapshot.paramMap;
    this.eventIdParams = Number(routeParams.get('id'));
    this.getAllAvaibility();
  }

  ngOnInit(): void {
    
    this.getEventDetails();
   
  }


  uniqueByKey(lp: any, key: any) {
    return [...new Map(lp.map((x: any) => [x[key], x])).values()];
  }


  getAllAvaibility() {
    this.spinner.show();
    
    this._evtServices.getAllAvaibility(Number(this.userId), String(this.userToken)).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.tempavaibility = res;
        console.log(this.tempavaibility);
        this.avaibility = this.uniqueByKey(this.tempavaibility, 'availabilityId');
        for (var i = 0; i < this.avaibility.length; i++) {
          this.avaibility[i].status = "false";

        }
        console.log( "Avail " + this.avaibility);

      }, err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.tempavaibility = [];
        this.errMsg = err;
        console.log(this.errMsg)
      }, () => console.log("Get All Avaibility method excuted successfully"))
  }

  getEventDetails() {
    this.spinner.show();
    
    this._evtServices.getEventById(Number(this.userId), String(this.userToken), this.eventIdParams).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.eventDetails = res;
        console.log(this.eventDetails);
        
        this.globalEventName = this.eventDetails[0].eventName;
        
        this.globalEventDesc = this.eventDetails[0].description; 
        // CheckBox Pre Check

    
        if(this.eventDetails[0].hideEventType.startsWith("Yes"))
        {
          this.hideEventCheckBox = true;
        }
        else{
          this.hideEventCheckBox = false;
        }
      
        if(this.eventDetails[0].optInBooking.startsWith("Yes"))
        {
          this.optInBookingCheckBox = true;
        }
        else{
          this.optInBookingCheckBox = false;
        }

        if(this.eventDetails[0].disableGuests.startsWith("Yes"))
        {
          this.disableGuestCheckBox = true;
        }
        else{
          this.disableGuestCheckBox = false;
        }
        

        // Setting avaibility from db to frontend
        for(var i =0;i<this.avaibility.length;i++)
        {
          if(this.avaibility[i].availabilityId == this.eventDetails[0].availabilityId)
          {
            this.avaibility[i].status = "true";
          }
        }
        
        // Setting location from db to frontend
        for(var i =0;i<this.locationArr.length;i++)
        {
          if(this.locationArr[i].label == this.eventDetails[0].location)
          {
            this.locationArr[i].status = "true";
          }
        }

        // Setting interval from db to frontend
        for(var i =0;i<this.intervalArr.length;i++)
        {
          if(this.intervalArr[i].duration == this.eventDetails[0].timeSlotIntervals)
          {
            this.intervalArr[i].status = "true";
          }
        }
        console.log(this.intervalArr);
       
        



      }, err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.eventDetails = [];
        this.errMsg = err;
        console.log(this.errMsg)
      }, () => console.log("Get All Events method excuted successfully"))
  }
  updateEventDetails(updateForm: NgForm)
  {
    this.spinner.show();
    
    console.log(updateForm.value);
   
    var optInBookingVal="";
    var disableGuestVal="";
    var hideEventVal=""
    const getOptBookingValue = document.querySelector("#optInBooking") as HTMLInputElement;
    if (getOptBookingValue.checked == true) {
      optInBookingVal = "Yes";
    }
    else {
      optInBookingVal = "No";
    }

    const getdisableGuestValue = document.querySelector("#disableGuest") as HTMLInputElement;
    if (getdisableGuestValue.checked == true) {
      disableGuestVal = "Yes";
    }
    else {
      disableGuestVal = "No";
    }

    
    const gethideEventVal = document.querySelector("#hideEvent") as HTMLInputElement;
    if (gethideEventVal.checked == true) {
      hideEventVal = "Yes";
    }
    else {
      hideEventVal = "No";
    }

    console.log("Opt In bOOking " + optInBookingVal);
    console.log("Disable Guest" + disableGuestVal);
    console.log("Hide event tye" + hideEventVal);

    var getLocationVal = document.getElementById("location") as HTMLInputElement;
    var localtionVal = getLocationVal.value;
    console.log(localtionVal);

    var getAvaibilityVal = document.getElementById("availability") as HTMLInputElement;
    var avaibilityVal = getAvaibilityVal.value;
    console.log(avaibilityVal);

    var getIntervalsVal = document.getElementById("intervals") as HTMLInputElement;
    var intervalsVal = getIntervalsVal.value;
    console.log(intervalsVal);


 
    var getEventTitle = updateForm.value.title;

    var convertTitleToURL = getEventTitle.replace(/[^a-zA-Z0-9]/g, '');
   
    this._evtServices.updateEvent(this.eventIdParams, Number(this.userId), String(this.userToken), updateForm.value.title, updateForm.value.desc,localtionVal,convertTitleToURL, updateForm.value.length, Number(avaibilityVal), updateForm.value.eventName, optInBookingVal, disableGuestVal, hideEventVal, Number( intervalsVal)).subscribe(
      res =>{
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        if(this.status == true)
        {
          this._toast.success({detail:"UPDATE SUCCESS",summary:'Event Details has been updated', position: 'br'});
        }
        else{
          this._toast.warning({detail:"UPDATE FAILED",summary:'Unable to update event details', position: 'br'});
        }
       
      },
      err =>{
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this._toast.warning({detail:" FAILED",summary:'Please try after sometime', position: 'br'});
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      },
      () => console.log("Update Event method excuted successfully")

    )

  }

  deleteEvent(eventId: number)
  {
    this.spinner.show();
    
    this._evtServices.deleteEvent(Number(this.userId), String(this.userToken),eventId).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        if(this.status == true)
        {
          this._toast.success({detail:"DELETE SUCCESS",summary:'The Event has been deleted', position: 'br'});
          setTimeout(function () {
            window.location.replace("/event-types");
          }, 2000);
        }
        else{
          this._toast.warning({detail:"DELETE FAILED",summary:'Unable to delete the event', position: 'br'});
          setTimeout(function () {
            window.location.replace("/event-types");
          }, 2000);
        }
       
    },
    err =>{
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      this.errMsg = err;
      this._toast.warning({detail:"FAILED",summary:'Please try after sometime', position: 'br'});
  
     setTimeout(function () {
        window.location.reload();
      }, 2000);
    },
    () => console.log("Delete Event method excuted successfully"))
  }

  copyToClipBoard()
  {
    var copyText = "https://requesttalk.netlify.app/"+ "u/"+ this.userName + "/" +this.eventDetails[0].url;
  navigator.clipboard.writeText(copyText);
  this._toast.success({detail:"URL COPIED",summary:'Copied to clipboard', position: 'br'});
  }
  
}


