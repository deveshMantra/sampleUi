import {Injectable} from '@angular/core';
import csc from 'country-state-city';

@Injectable({
  providedIn: 'root'
})
export class CountryStateCityService {

  constructor() {
  }

  getCountry() {
    const countryDetails = csc.getAllCountries();
    countryDetails.forEach((element, index) => {
      if (!element.phonecode) {
        element.phonecode = '+91' + index;
      }
    });
    return countryDetails;
  }

}
