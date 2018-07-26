import { Component,ViewChild,ElementRef,AfterViewInit} from '@angular/core';
import {pipe,fromEvent, Observable, range,timer} from 'rxjs';
import {map,filter,debounceTime,distinctUntilChanged,switchMap, retryWhen,zip, mergeMap} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {ShareServiceService} from './share-service.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'app';
  enteredText:string="";
  listOfCities:any[]=[];
  inputShare:string='';
  typeAheadObservable:Observable<any>;
  inData:string="";
  @ViewChild('dataIn') inputElementRef:ElementRef;
  ngAfterViewInit(){
    this.typeAheadObservable=fromEvent(this.inputElementRef.nativeElement,'input').pipe(
      map((e:KeyboardEvent)=>this.setEnteredText(e.target['value'])),
      filter(streamData=>streamData.length>2),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(()=>ajax('http://datasevice.accuweather.com/locations/v1/cities/autocomplete?apikey=xE8pozJ0orRi3hLDDdswqJmGxYoTwGfn&q='+this.enteredText+'&language=en-us').pipe(
        this.expRetry(4,1000)
      )
    )
    );
    this.typeAheadObservable.subscribe((x)=>{console.log(x.response);this.listOfCities=x.response},err=>{console.log(err)});
  }

  setEnteredText(val:string):string{
    console.log(this.enteredText);
    this.enteredText=val;
   // console.log('http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=xE8pozJ0orRi3hLDDdswqJmGxYoTwGfn&q='+this.setEnteredText+'&language=en-us');
    return this.enteredText;
  }

  expRetry(mT,ms){
    return pipe(retryWhen(tryAttemp=>range(1,mT)
    .pipe(
      zip(tryAttemp,(i)=>i),
      map(i=>i*i),
      mergeMap(i=>timer(i*ms))
    )
  ));

  }


  constructor(public service:ShareServiceService){

  }


}
