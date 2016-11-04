import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AppRate } from 'ionic-native';

/*
  Generated class for the RateService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RateService {

  appRate: any = AppRate;
  
  constructor(public platform: Platform) {
    this.platform.ready().then(
      () => {
        this.appRate.preferences.storeAppURL = {
          android: 'market://details?id=com.martsoft.movieguidev2'
        };
        this.appRate.preferences.usesUntilPrompt = 2;
        this.appRate.preferences.customLocale = {
          title: 'Rate Us...?',
          message: 'Without ratings we starve =(',
          cancelButtonLabel: 'Pass',
          rateButtonLabel: 'Rate it!',
          laterButtonLabel: 'Ask Later'
        };
      }      
    )
  }

}

