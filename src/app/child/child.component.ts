import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from '../share-service.service';
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  recievedData:string="";
  constructor(public service:ShareServiceService) { }

  ngOnInit() {
    this.service.msg.subscribe((x)=>{
      console.log(x);
      this.recievedData=x;
      this.transformData(x);
    })
  }
  transformData(value:string){
    console.log(value.toUpperCase());
  }

}
