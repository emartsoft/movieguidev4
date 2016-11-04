import { Component } from '@angular/core';
import { NavController, Platform, PopoverController } from 'ionic-angular';
import { AppRate, AppVersion, GoogleAnalytics, InAppBrowser, SocialSharing } from 'ionic-native';
import { Share } from '../share/share';

@Component({
  templateUrl: 'about-page.html'
})
export class AboutPage {
  card: any;
  appName: any;
  versionNo: any;

  appRate: any = AppRate;
  appImgUrl: string = 'https://firebasestorage.googleapis.com/v0/b/admob-app-id-7402584564.appspot.com/o/movieguide.png?alt=media&token=245659ec-43b9-4a06-bbc2-4e98a1dd8bd3';
  appStoreUrl: string = 'https://play.google.com/store/apps/details?id=com.martsoft.movieguidev2';

  constructor(public navController: NavController,
    public platform: Platform,
    public popoverCtrl: PopoverController) {
    // this.card = [];
    // this.card.title = 'Movies';
    // this.card.image = 'assets/img/bg.jpg';

    setTimeout(() => {
      this.appName = AppVersion.getAppName();
      AppVersion.getPackageName();
      AppVersion.getVersionCode();
      AppVersion.getVersionNumber().then(data => this.versionNo = data);
    }, 1000);

    this.platform.ready().then(() => {
      setTimeout(() => {
        //console.log('initializing tracking about page');
        GoogleAnalytics.trackView("About Page").then((_success) => {
         // console.log('tracking about page:', _success)
        }).catch((_error) => {
          //console.log('failed tracking about page:', _error)
        });
      }, 3000);
    });
  }

  rateApp() {
    this.appRate.preferences.storeAppURL = {
      android: 'market://details?id=com.martsoft.movieguidev2'
    };
    this.appRate.preferences.promptAgainForEachNewVersion = true;
    this.appRate.promptForRating();
  }


  readMore() {
    new InAppBrowser('http://www.martsoft.co.ke/#myapps', '_blank', 'location=yes');
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(Share);
    popover.present({ ev: event });
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
