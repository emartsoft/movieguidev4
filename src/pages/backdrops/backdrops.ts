import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ImagePopoverPage } from '../image-popover/image-popover';

import { GoogleAnalytics } from 'ionic-native';

/*
  Generated class for the BackdropsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'backdrops.html'
})
export class BackdropsPage {
  backdrops: any;
  public castRows = [];
  public baseImageUrl: string = 'http://image.tmdb.org/t/p/w500';
  public bgurl: string = '';
  public title: string = '';

  constructor(public nav: NavController,
    public navParams: NavParams,
    public platform: Platform) {
    console.log('backdrops page', this.navParams.data);
    this.backdrops = this.navParams.data.backdrops;
    this.title = this.navParams.data.movietitle;

    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("Backdrops Page");
    });
  }

  openImage(index) {
    this.nav.push(ImagePopoverPage, {
      images: this.backdrops,
      index: index
    });
  }
}
