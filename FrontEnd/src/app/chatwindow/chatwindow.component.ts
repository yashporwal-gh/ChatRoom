import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as $ from 'jquery'
import { DataService } from '../data.service';
import { MySocketService } from '../my-socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatwindow',
  templateUrl: './chatwindow.component.html',
  styleUrls: ['./chatwindow.component.css']
})
export class ChatwindowComponent implements OnInit {


  @ViewChild('msgContainer') msgContainer;
  @ViewChild('imgAvtar')  profilePic

  loggedInUserName;
  loggedInFirstName;
  loggedInLastName;
  loggedInUserEmail;
  loggedInUserLocation;
  loggedInUserPassword;
  friendname;
  currentSelectedFriend;
  msg;
  profile;
  imgSource;
  newPassword;
  newLocation;
  CurrentTime;

  constructor(private ds:DataService,private ss:MySocketService, private render:Renderer2, private router:Router) {
    setInterval(() => {
      this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes(),1})
   }

  ngOnInit(): void {
    this.loggedInUserEmail= localStorage.getItem('email');
    this.loggedInFirstName= localStorage.getItem('firstname');
    this.loggedInLastName= localStorage.getItem('lastname');
    this.loggedInUserName= localStorage.getItem('username');
    this.loggedInUserPassword= localStorage.getItem('password');
    this.loggedInUserLocation= localStorage.getItem('location');
    //this.imgSource="assets/dist/img/avatars/avatar-male-1.jpg"
    this.imgSource="http://localhost:3000/"+this.loggedInUserEmail+".jpg?" + new Date().getTime();


 
    this.ss.currentSelectedUser.subscribe((c)=>{ this.currentSelectedFriend=c  })
 
    
   
   $(".menu a i").on("click",function(){$(".menu a i").removeClass("active"),$(this).addClass("active")})
    ,$("#contact, #recipient").click(function(){$(this).remove()})
    // ,$(function(){$('[data-toggle="tooltip"]').tooltip()})
    ,$(document).ready(function(){$(".filterMembers").not(".all").hide(1000)
    ,$(".filterMembers").not(".all").hide(1000)
    ,$(".filterMembersBtn").click(function(){var t=$(this).attr("data-filter");
    $(".filterMembers").not("."+t).hide(1000),$(".filterMembers").filter("."+t).show(1000)})})
    ,$(document).ready(function(){$(".filterDiscussions").not(".all").hide(1000)
    ,$(".filterDiscussions").not(".all").hide(1000)
    ,$(".filterDiscussionsBtn").click(function(){var t=$(this).attr("data-filter");$(".filterDiscussions").not("."+t).hide(1000)
    ,$(".filterDiscussions").filter("."+t).show(1000)})})
    ,$(document).ready(function(){$(".filterNotifications").not(".all").hide(1000)
    ,$(".filterNotifications").not(".all").hide(1000)
    ,$(".filterNotificationsBtn").click(function(){var t=$(this).attr("data-filter");
    $(".filterNotifications").not("."+t).hide(1000),$(".filterNotifications").filter("."+t).show(1000)})})
    // ,$(document).ready(function(){$("#people").on("keyup",function(){var t=$(this).val().toString().toLowerCase();
    //$("#contacts a").filter(function(){$(this).toggle($(this).text().toString().toLowerCase().indexOf(t)>-1)})})})
    // ,$(document).ready(function(){$("#conversations").on("keyup",function(){var t=$(this).val().toString().toLowerCase();
    // $("#chats a").filter(function(){$(this).toggle($(this).text().toString().toLowerCase().indexOf(t)>-1)})})})
    // ,$(document).ready(function(){$("#notice").on("keyup",function(){var t=$(this).val().toString().toLowerCase();$("#alerts a").filter(function(){$(this).toggle($(this).text().toString().toLowerCase().indexOf(t)>-1)})})})
    // ,$(document).ready(function(){clicked=!0,$(".mode").click(function(){clicked?($("head").append('<link href="assets/dist/css/dark.min.css" id="dark" type="text/css" rel="stylesheet">'),clicked=!1):($("#dark").remove(),clicked=!0)})}),$(".back").click(function(){$("#call"+$(this).attr("name")).hide(),$("#chat"+$(this).attr("name")).removeAttr("style")})
    // ,$(".connect").click(function(){$("#chat"+$(this).attr("name")).hide()
    // ,$("#call"+$(this).attr("name")).show()});
  }




  AddFriend(){
      // this.ds.addFriend({email:this.loggedInUserEmail,friend:this.friendname})
      // .subscribe((response)=>{
      //   if(response.status=="ok")
      //   {
           
      //       alert("Friend Request sent!");
          
      //   }
      // })
    
    this.ss.sendNotif({email:this.loggedInUserEmail,friend:this.friendname})
      .subscribe((response)=>{
        if(response.status=="ok")
        {
           
            alert("Friend Request sent!");
          
        }
      })
  }

  sendMessage()
  {
    // alert(this.msg);
    this.ss.sendNewMsg(this.msg)
    // this.msgContainer.nativeElement.innerHTML += `
    //                                   <div class="message me">
    //                                         <img class="avatar-md" src=${this.imgSource} data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar">
    //                                         <div class="text-main">
    //                                             <div class="message me">
    //                                                 <div class="text">
    //                                             <p> ${this.msg}</p>
    //                                                 </div>
    //                                             </div>
    //                                             <span>${this.CurrentTime}</span>
    //                                         </div>
    //                                     </div>` 
  }

  // ngAfterViewInit()
  // {
  //   this.ss.currentMsg.subscribe((msg)=>{ 
      
  //     console.log("got a msg check it- >");
  //     console.log(msg);
  //     if(msg)
  //     {
  //     this.msgContainer.nativeElement.innerHTML += `
  //                                     <div class="message">
  //                                           <img class="avatar-md" src="assets/dist/img/avatars/avatar-female-5.jpg" data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar">
  //                                           <div class="text-main">
  //                                               <div class="message">
  //                                                   <div class="text">
  //                                               <p> ${msg.text}</p>
  //                                                   </div>
  //                                               </div>
  //                                               <span>${this.CurrentTime}</span>
  //                                           </div>
  //                                       </div>`
  //     }
      
  //     })
  // }


  deleteAccount(){
    var del=confirm("Are you sure you want to delete your account?");
    if(del){
    this.ds.deleteAccount({'email':this.loggedInUserEmail})
    .subscribe((response)=>{
      if(response.status=="ok"){
        this.router.navigate(['/']);
      }
    }
    )}
  }


  

  getProfile(e){
    this.profile=e.target.files[0];
    console.log(this.profile)
    this.postData();
  }

  postData(){

    var form=new FormData();
    
    form.set('email',this.loggedInUserEmail);
    form.set('profile',this.profile);


    this.ds.imageUpload(form).subscribe((d)=>{
 
    this.profilePic.nativeElement.style.display="none";
    this.profilePic.nativeElement.style.display="block";
    this.imgSource="http://localhost:3000/"+this.loggedInUserEmail+".jpg?" + new Date().getTime();    

     alert("Profile Photo updated");
     
    });
  }



  updateDetails(){
  

if(!this.newPassword){
  this.newPassword=this.loggedInUserPassword
}
if(!this.newLocation){
  this.newLocation=this.loggedInUserLocation
}
//alert(this.newPassword+this.newLocation)
  this.ds.updateDetails({email:this.loggedInUserEmail,newpassword:this.newPassword,newlocation:this.newLocation})
  .subscribe((response)=>{
    if(response.status=="ok")
    {
       
        alert("Updated!");
    }
  })

}
  




 }
 
