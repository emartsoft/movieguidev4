import { Component } from '@angular/core';
import { NavController, ViewController, Platform } from 'ionic-angular';

import { SocialSharing, GoogleAnalytics } from 'ionic-native';
/*
  Generated class for the Share page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-share',
  templateUrl: 'share.html'
})
export class Share {
  
  //appImgUrl: string = 'assets/img/movieguide.png';
  appImgUrl: string = 'https://firebasestorage.googleapis.com/v0/b/admob-app-id-7402584564.appspot.com/o/movieguide.png?alt=media&token=245659ec-43b9-4a06-bbc2-4e98a1dd8bd3';
  appStoreUrl: string = 'https://play.google.com/store/apps/details?id=com.martsoft.movieguidev2';

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public platform: Platform) { }

  close() {
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("Reviews Page");
    });
  }

  twitterShare() {
    SocialSharing.shareViaTwitter("Check this awesome Movie-TV Guide App", null, this.appStoreUrl)
      .then(() => {
        //alert("Thank you for sharing.");
      },
      () => {
        alert("Sharing failed")
      })
  }

  facebookShare() {
    SocialSharing.shareViaFacebook("Check out this awesome Movie-TV Guide App", null, this.appStoreUrl)
      .then(() => {
        // alert("Success");
      },
      () => {
        alert("Sharing failed")
      })
  }

  whatsappShare() {
    SocialSharing.shareViaWhatsApp("Check out this awesome Movie-TV Guide App", null, this.appStoreUrl)
      .then(() => {
        // alert("Success");
      },
      () => {
        alert("Sharing failed")
      })
  }

  // instagramShare() {
  //   SocialSharing.shareViaInstagram("Check out this awesome Movie-TV Guide App " + this.appStoreUrl,  this.appImgUrl)
  //     .then(() => {
  //       // alert("Success");
  //     },
  //     () => {
  //       alert("Sharing failed")
  //     })
  // }

  googleplusShare() {
    SocialSharing.shareVia("com.google.android.apps.plus", "Movie-TV Guide App", "Check out this awesome Movie-TV Guide App", null, this.appStoreUrl)
      .then(() => {
        // alert("Success");
      },
      () => {
        alert("Sharing failed")
      })
  }

  otherShare() {
    SocialSharing.share("Awesome Movie-TV Guide App", "Movie-TV Guide App", this.appImgUrl, this.appStoreUrl)
      .then(() => {
        // alert("Success");
      },
      () => {
        alert("Sharing failed")
      })

  }

}
