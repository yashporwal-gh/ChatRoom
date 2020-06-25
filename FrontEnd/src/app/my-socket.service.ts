import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MySocketService {

  SOCKET_ENDPOINT = 'http://localhost:3000/'
  socket;

  currentSelectedUser = new BehaviorSubject(null);
  currentMsg = new BehaviorSubject(null);
  allUsers= new Array(); 




  constructor() {   }

  setupSocketConnection() {
    alert("sending socket request");
    this.socket = io(this.SOCKET_ENDPOINT,{
                                              query: {
                                                email: localStorage.getItem('email')
                                              }
                     });

    console.log("socket connection stablished");
     console.log(this.socket)
    this.socket.on('newUser', (d)=>{ this.addNewUser(d) }  )
    this.socket.on('newMsg', (d)=>{ this.recieveNewMsg(d) }  )
    this.socket.on('connectedUsers', (d)=>{this.setAllConnetedUsers(d)})

  }

addNewUser(data)
{
    console.log("new User Details");
    console.log(data);
    this.allUsers.push({email:data.email, msg:[]})
}

recieveNewMsg(data)
{
    console.log("new msg Details");
    console.log(data);
    // alert(JSON.stringify(data));
    this.currentMsg.next(data);
    this.allUsers.forEach((u)=>{ 
      if(u.email == data.email)
      {
        u.msg.push({text:data.msg, isMine:false});

        // this.currentMsg.next(data);
      }

    })
}

sendNewMsg(data)
{
    console.log("new msg Details");
    console.log("sending to "+this.currentSelectedUser.value.name);
    console.log(data);
    this.allUsers.forEach((u)=>{ 
      if(u.email == this.currentSelectedUser.value.name)
      {
        u.msg.push({text:data, isMine:true});
      }

    })
    this.socket.emit('newMsg', {to:this.currentSelectedUser.value.name, text:data, from:localStorage.getItem('email') });



}

setAllConnetedUsers(data)
{

}




}