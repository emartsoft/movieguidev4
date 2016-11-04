import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen, GoogleAnalytics } from 'ionic-native'; //LocalNotifications

import { HomePage } from '../pages/home-page/home-page';
import { MovieListPage } from '../pages/movie-list/movie-list';
import { MovieGenresPage } from '../pages/movie-genres/movie-genres';
import { PeoplePage } from '../pages/people/people';
import { AboutPage } from '../pages/about-page/about-page';
import { PopularTvShowsPage } from "../pages/popular-tv-shows/popular-tv-shows";
import { PopularMoviesPage } from "../pages/popular-movies/popular-movies";
import { UpcomingTvPage } from "../pages/upcoming-tv/upcoming-tv";
import { DiscoverPage } from "../pages/discover/discover";

// import {
//   Push,
//   PushToken
// } from '@ionic/cloud-angular';

export interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}


@Component({
  templateUrl: 'app.template.html'
})
export class MovieGuide {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;//

  public admobId: any;

  pages: Array<{
    title: string,
    component: any,
    index?: number,
    icon: string,
  }>;

  appPages: PageObj[] = [
    { title: 'Home', component: HomePage, icon: 'home' },
    { title: 'Discover', component: DiscoverPage, index: 1, icon: 'filing' },
    { title: 'Latest Movies', component: MovieListPage, index: 2, icon: 'calendar' },
    { title: 'Popular Movies', component: PopularMoviesPage, index: 3, icon: 'star' },
    { title: 'Popular TV', component: PopularTvShowsPage, index: 4, icon: 'bookmarks' },
    { title: 'Upcoming TV', component: UpcomingTvPage, index: 5, icon: 'timer' },
    { title: 'Genres', component: MovieGenresPage, index: 6, icon: 'easel' },
    { title: 'People', component: PeoplePage, index: 7, icon: 'people' },
    { title: 'Info', component: AboutPage, index: 8, icon: 'information-circle' },
  ];

  constructor(public platform: Platform,
    public alertCtrl: AlertController) { //public push: Push
    this.initializeApp();
    this.rootPage = HomePage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.hideSplashScreen();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      //this.registerBackButtonListener();

      // google  analytics

      setTimeout(() => {
        //GoogleAnalytics.debugMode();
        GoogleAnalytics.startTrackerWithId("UA-85178595-1")
          .then((_success) => {
            console.log('success starting analytics:', _success)
          }).catch((_error) => {
            console.log('error starting analytics:', _error)
          });

        GoogleAnalytics.setAppVersion('1.1.0');
        GoogleAnalytics.enableUncaughtExceptionReporting(true)
          .then((_success) => {
            console.log('success analytics:', _success)
          }).catch((_error) => {
            console.log('error analytics:', _error)
          });
      }, 3000);

      // this.push.register().then((t: PushToken) => {
      //   return this.push.saveToken(t);
      // }).then((t: PushToken) => {
      //   console.log('Token saved:', t.token);
      // });

      // this.push.rx.notification()
      //   .subscribe((msg) => {
      //     alert(msg.title + ': ' + msg.text);
          
      //   });
      // LocalNotifications.schedule({
      //     id: 1,
      //     title: "Production Jour fixe",
      //     text: "Duration 1h",
      //     firstAt: monday_9_am,
      //     every: "day",
      //     sound: "file://sounds/reminder.mp3",
      //     icon: "http://icons.com/?cal_id=1",
      //     data: { meetingId:"123#fg8" }
      // });

      // document.addEventListener('backbutton', () => {
      //   let activeVC = this.nav.getActive();
      //   let page = activeVC.instance;
      //   if(page instanceof HomePage){
      //     this.confirmExitApp(this.nav);
      //     //this.showAlert('Exit App?', 'Really exit app?');
      //      console.log('Detected a back button press in home page');

      //    // return this.nav.pop();
      //   }

      // }, false);

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }

  hideSplashScreen() {
    if (Splashscreen) {
      setTimeout(() => {
        Splashscreen.hide();
      }, 100);
    }
  }

  confirmExitApp(nav) {
    let confirm = this.alertCtrl.create({
      title: 'Confirm Exit',
      message: 'Really exit app?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Exit',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });
    nav.present(confirm);
  }

  showAlert(title, msg) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            console.log('OK clicked');
            this.nav.push(HomePage);
          }
        }
      ]
    });
    alert.present();
  }

}
