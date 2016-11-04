import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { GoogleAnalytics } from 'ionic-native';
/*
  Generated class for the ImagePopoverPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'image-popover.html',
})
export class ImagePopoverPage {
  public images = [];
  public baseImageUrl: string = 'http://image.tmdb.org/t/p/w600';
  mySlideOptions = {
    initialSlide: 0,
    loop: true
  };
  constructor(public nav: NavController,
    public navParams: NavParams,
    public platform: Platform) {
    this.images = this.navParams.data.images;
    this.mySlideOptions.initialSlide = this.navParams.data.index;
    console.log('my popover images', this.images);
    console.log('my popover index', this.navParams.data.index);

    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("Image Popover Page");
    });
  }



}
