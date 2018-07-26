import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShareServiceService {
  sharedData:string="init";
  sharedDataUsingBehaviour=new BehaviorSubject("init");
  msg=this.sharedDataUsingBehaviour.asObservable();
  constructor() { }
  changeObservableData(val:string){
    this.sharedDataUsingBehaviour.next(val);
  }

}
