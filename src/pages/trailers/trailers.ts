import { Component, Pipe } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { AdMob, GoogleAnalytics } from 'ionic-native';
/*
  Generated class for the TrailersPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Pipe({ name: 'safe' })
export class Safe {
  constructor(public sanitizer: DomSanitizer) { }

  public transform(url): SafeUrl {
    //bypassSecurityTrustResourceUrl
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  // public transform(value: string, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
  // 	switch (type) {
  // 		case 'html':
  // 			return this._sanitizer.bypassSecurityTrustHtml(value);
  // 		case 'style':
  // 			return this._sanitizer.bypassSecurityTrustStyle(value);
  // 		case 'script':
  // 			return this._sanitizer.bypassSecurityTrustScript(value);
  // 		case 'url':
  // 			return this._sanitizer.bypassSecurityTrustUrl(value);
  // 		case 'resourceUrl':
  // 			return this._sanitizer.bypassSecurityTrustResourceUrl(value);
  // 		default:
  // 			throw new Error(`Unable to bypass security for invalid type: ${type}`);
  // 	}
  // }
}

@Component({
  templateUrl: 'trailers.html',
})
export class TrailersPage {
  videos: any;
  trailers: any;
  url: string = 'https://www.youtube.com/embed/';

  public admobId: any;
  //youtubeBaseUrl: SafeUrl;

  constructor(public nav: NavController,
    public navParams: NavParams,
    public sanitize: DomSanitizer,
    public platform: Platform) {
    this.videos = this.navParams.data;

    this.trailer();

    console.log('trailers', this.videos);

    if (AdMob) AdMob.showInterstitial();

        this.platform.ready().then(() => {
      GoogleAnalytics.trackView("Movie Latest in Theatre Page");
    });
  }

  trailer() {
    for (let i = 0; i < this.videos.length; i++) {
      this.videos[i].youtubeBaseUrl = this.sanitize.bypassSecurityTrustResourceUrl(this.url + this.videos[i].key);
      console.log('trailers[i] url', this.videos[i].youtubeBaseUrl);
    }

  }

  ngOnDestroy() {
    this.admobId = { // for Android
      interstitial: 'ca-app-pub-9014784806518490/5568290969'
    };

    if (AdMob) AdMob.prepareInterstitial({
      adId: this.admobId.interstitial,
      autoShow: false
    });
  }
}
