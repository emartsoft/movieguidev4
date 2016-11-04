import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { InAppBrowser, GoogleAnalytics } from 'ionic-native';
/*
  Generated class for the Reviews page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html'
})
export class Reviews {
  reviews: any;
  url: string = '';
  title: string = '';

  constructor(public nav: NavController,
    public navParams: NavParams,
    public platform: Platform) {
    console.log('reviews data', this.navParams.data);
    this.reviews = [];
    this.reviews = this.navParams.data.reviews;
    this.title = this.navParams.data.title;
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("Reviews Page");
    });
  }

  readMore() {
    new InAppBrowser(this.url, '_blank', 'location=yes');
  }

}
