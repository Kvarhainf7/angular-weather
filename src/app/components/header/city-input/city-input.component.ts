import { CommonServiceService } from '../../../services/common-service.service';
import { CityInputService } from '../../../services/city-input-service.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-city-input',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.scss']
})
export class CityInputComponent implements OnInit {

  public cityInputValue: string | undefined = '';
  public cityExists:boolean = true;
  public presentCity:string = this.cityInputService.get("City");
  weather: any;
  window = window;
  width  =  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  constructor( private cityInputService:CityInputService, private cSS:CommonServiceService) { }

  data: any ;
  teste: any;

  apiURL = environment.apiURL;
  lat:number = 0;
  lon: number = 0;
  latPre = ``;
  lonPre = ``;
  exclude = environment.exclude;
  units = environment.units;
  lang = environment.lang;
  appId = environment.appId
  apiReqParams = `${this.exclude}${this.units}${this.lang}${this.appId}`;
  latLon = ``;

  diaDaSemana:Array<string> = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"]

  ngOnInit(): void {

    this.validate();

  }

  validate() {
    if (this.cSS.searchCity(this.presentCity) == undefined) {
      this.cityInputValue = 'Nova Pádua'
      this.cityInputService.set("City", this.cityInputValue);
      this.onClickGetCityInput(this.cityInputValue);
    }else {
      this.cityInputValue = this.cityInputService.get("City");
      this.onClickGetCityInput(this.cityInputValue);
    }
  }

  onClickGetCityInput (cityInput:string | undefined) {
    this.cityInputValue = cityInput;
    this.cityInputService.set("City", this.cityInputValue);

    console.log(this.cityInputValue);
    this.weather = this.cSS.srchCt(this.cityInputValue);
    console.log("------------------");
    //console.log(this.weather)
    this.getLatLon(this.weather);

  }

  currentWeatherObject: any;
  //
  getLatLon (arr:Array<number>) {
    this.lat = arr[0];
    this.lon = arr[1];
    this.latPre = `lat=${this.lat}`;
    this.lonPre = `&lon=${this.lon}`;
    this.latLon = `${this.latPre}${this.lonPre}`;
    this.getWeatherData(this.latLon);
    //console.log(this.data);
  }

  getWeatherData(latLon:string) {

    this.cSS.getWeatherDataS(latLon, this.apiReqParams).subscribe((res) => {
      //console.log(res);
      this.data = res;
      console.log(this.data);
    });
  }

  epochToDate(data:any) {
    var myDate = new Date(data *1000);
    console.log(myDate);

    // console.log(myDate.toUTCString()+myDate.toLocaleString('pt-BR'));
    console.log(myDate.toLocaleDateString('pt-BR'));
    return myDate.toUTCString()+myDate.toLocaleString('pt-BR');
  }

  ddmmyyyy(data:any) {
    var myDate = new Date(data *1000);

    return myDate.toLocaleDateString('pt-BR')
  }

  weekDay (data:any) {
    var myDate = new Date (data * 1000);

    // console.log(this.diaDaSemana[myDate.getDay()]);
    return this.diaDaSemana[myDate.getDay()];
  }

  feira (data:any) {
    var myDate = new Date (data * 1000);

    if (this.diaDaSemana[myDate.getDay()] == "0" || "6") {
      return this.diaDaSemana[myDate.getDay()]+'-feira'
    } else {
      return this.diaDaSemana[myDate.getDay()];
    }
  }

  mmhh (data:any) {
    var myDate = new Date(data * 1000);
    if (myDate.getMinutes() < 10) {
      var mmhh = (myDate.getHours() + ':' + '0' + myDate.getMinutes());
    } else {
      var mmhh = (myDate.getHours() + ':' + myDate.getMinutes());
    }

    // console.log(mmhh);
    return mmhh;
  }


  private auto = setInterval(this.autoClick, 1000)

  autoClick() {
    // console.log(Math.floor(new Date().getTime()))
    // console.log((Math.floor(new Date().getTime()) % 60000))

    if ((Math.floor(new Date().getTime()) % 60000) >= 0 && (Math.floor(new Date().getTime()) % 60000) <= 3000) {

      // this.mmhh(Math.floor(new Date().getTime()));
      return document.getElementById('button')?.click()
    }
  }
}

