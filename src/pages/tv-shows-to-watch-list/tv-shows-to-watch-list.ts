import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the TVShowsToWatchList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tv-shows-to-watch-list',
  templateUrl: 'tv-shows-to-watch-list.html'
})
export class TVShowsToWatchList {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello TVShowsToWatchList Page');
  }

}
