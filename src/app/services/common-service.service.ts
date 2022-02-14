import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import municipios from 'src/Municipios-Brasileiros-main/json/municipios.json'

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor( private http:HttpClient) { }
//private citiesReqService:CitiesReqService,

  timezone:string = '';
  description:string = "";
  cityData: any;

  searchCity(cityInputValue:any) {

    this.cityData = municipios.municipios.find((element) => {
      return element.nome == cityInputValue;
    })
    return this.cityData;
  }

  srchCt (cityInputValue:string | undefined) {
    const cityData = this.searchCity(cityInputValue);
    console.log(cityData);
    // console.log("cities-req.component");
      const arr = [];
      arr[0] = cityData.latitude;
      arr[1] = cityData.longitude;
      // console.log(arr[0]);
      // console.log(arr[1]);
    return arr;
  }

  apiURL = environment.apiURL;

  getWeatherDataS (latLon:string, apiReqParams:string) {

    return this.http.get<any>(`${this.apiURL}${latLon}${apiReqParams}`);
  }
}

