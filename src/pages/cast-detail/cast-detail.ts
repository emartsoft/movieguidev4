import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { Toast, InAppBrowser } from 'ionic-native';
import { PeopleService } from '../../providers/people-service/people-service';
import { ImagePopoverPage } from '../image-popover/image-popover';
import { CastMoviesPage } from '../cast-movies/cast-movies';

import { GoogleAnalytics } from 'ionic-native';
/*
  Generated class for the CastDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'cast-detail.html'
})
export class CastDetailPage {
  cast: any;
  PersonID: string = '';
  otherImages: any;
  items: any;
  movietitle: string = '';
  imdburl: string = '';

  castMovies = [];
  castTvShows = [];

  castMoviesAsCrew = [];
  castTvShowsAsCrew = [];

  public baseImageUrl: string = 'http://image.tmdb.org/t/p/w300';
  mySlideOptions = {
    initialSlide: 0,
    loop: true
  };
  constructor(public nav: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public platform: Platform,
    public peopleService: PeopleService) {
    this.cast = this.navParams.data.id;
    this.fetchPersonByID(this.navParams.data.id);
    this.movietitle = this.navParams.data.movietitle;

    console.log('my cast is', this.navParams);

    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("Cast Details Page");
    });
  }

  fetchPersonByID(personID) {
    this.peopleService.getSearchPersonByID(personID).then(_body => {
      this.cast = _body;

      // console.log('found cast', this.cast);
      this.otherImages = this.cast.images.profiles;
      this.imdburl = 'http://www.imdb.com/name/' + this.cast.imdb_id;
      //console.log('my cast other images', this.otherImages);
      // console.info('Finished receiving data, async operation complete');
    });
  }

  openImage(index) {
    this.nav.push(ImagePopoverPage, {
      images: this.otherImages,
      index: index
    });
  }

  loadCastMoviesAndTVShowsAsCast() {
    console.log('cast credits:', this.cast.combined_credits.cast);
    for (let i = 0; i < this.cast.combined_credits.cast.length; i++) {
      if (this.cast.combined_credits.cast[i].media_type == "movie")
        this.castMovies.push(this.cast.combined_credits.cast[i]);
      else if (this.cast.combined_credits.cast[i].media_type == "tv")
        this.castTvShows.push(this.cast.combined_credits.cast[i]);
    }
    //console.log('cast movies:', this.castMovies);
    // console.log('cast tv:', this.castTvShows);

    if (this.castMovies.length == 0 && this.castTvShows.length == 0)
      this.presentToast('Nothing to Show');
    else {
      this.nav.push(CastMoviesPage, {
        castName: this.cast.name,
        castMovies: this.castMovies,
        castTvShows: this.castTvShows
      });
    }
  }

  loadCastMoviesAndTVShowsAsCrew() {
    console.log('cast crew credits:', this.cast.combined_credits.crew);
    for (let i = 0; i < this.cast.combined_credits.crew.length; i++) {
      if (this.cast.combined_credits.crew[i].media_type == "movie")
        this.castMoviesAsCrew.push(this.cast.combined_credits.crew[i]);
      else if (this.cast.combined_credits.crew[i].media_type == "tv")
        this.castTvShowsAsCrew.push(this.cast.combined_credits.crew[i]);
    }
    //console.log('cast crew movies:', this.castMoviesAsCrew);
    //console.log('cast crew tv:', this.castTvShowsAsCrew);

    if (this.castMoviesAsCrew.length == 0 && this.castTvShowsAsCrew.length == 0)
      this.presentToast('Nothing to Show');
    else {
      this.nav.push(CastMoviesPage, {
        castName: this.cast.name,
        castMovies: this.castMoviesAsCrew,
        castTvShows: this.castTvShowsAsCrew
      });
    }
  }

  showToast(message, position) {
    Toast.show(message, "short", position).subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  readMore(url) {
    console.log(url);
    if (url != 'http://www.imdb.com/name/null')
      new InAppBrowser(url, '_blank', 'location=yes');
    else
      this.presentToast('No More Info.');
  }

}
