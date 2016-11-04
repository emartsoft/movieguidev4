import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { MovieLatestInTheatrePage } from '../movie-latest-in-theatre/movie-latest-in-theatre';
import { TvShowsAiringTodayPage } from '../tv-shows-airing-today/tv-shows-airing-today';
import { MovieService } from '../../providers/movie-service/movie-service';
import { TvShowService } from '../../providers/tv-show-service/tv-show-service';
import { MovieDetailsPage } from '../movie-details/movie-details';
import { TvDetailsPage } from '../tv-details/tv-details';

import { AdMob, GoogleAnalytics } from 'ionic-native';

@Component({
  templateUrl: 'home-page.html'
})
export class HomePage {

  public latestMoviesFound = [];
  public tvAiringTodayFound = [];
  public baseImageUrl: string = 'http://image.tmdb.org/t/p/w300';
  public movieRows = [];
  public tvRows = [];

  isLoading = true;
  pageNoTV: number = 1;
  pageNoMovie: number = 1;
  totalPagesTV: number = 1;
  totalPagesMovie: number = 1;

  tabPageOne: any;
  tabPageTwo: any;

  admobId: any;

  isAndroid: boolean = false;
  media: string = "tv";

  constructor(public nav: NavController,
    public movieService: MovieService,
    public tvShowService: TvShowService,
    public platform: Platform) {

    this.isAndroid = platform.is('android');

    this.tabPageOne = TvShowsAiringTodayPage;
    this.tabPageTwo = MovieLatestInTheatrePage;

    this.platform.ready().then(() => {


      this.loadTVAiringToday();
      this.loadLatestMovie();
      //var admobid = {};
      // select the right Ad Id according to platform
      if (/(android)/i.test(navigator.userAgent)) {
        this.admobId = { // for Android
          banner: 'ca-app-pub-9014784806518490/3273436161',
          interstitial: 'ca-app-pub-9014784806518490/5568290969'
        };
      } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        this.admobId = { // for iOS
          banner: 'ca-app-pub-6869992474017983/4806197152',
          interstitial: 'ca-app-pub-6869992474017983/7563979554'
        };
      }

      console.log('i was here 1');
      setTimeout(() => {
        console.log('i was here 2');
        if (GoogleAnalytics) {
          console.log('i am here 4');
          console.log('analytics', GoogleAnalytics);
          GoogleAnalytics.trackView("Home Page")
            .then((_success) => {
              console.log('tracking home page:', _success)
            }).catch((_error) => {
              console.log('failed tracking homepage:', _error)
            });
        }
        else {
          console.log('analytics not up');
        }
      }, 3000);

      console.log('i was here 3');
      if (AdMob) AdMob.createBanner({
        adId: this.admobId.banner,
        isTesting: false,
        autoShow: true
      });


      if (AdMob) AdMob.prepareInterstitial({
        adId: this.admobId.interstitial,
        isTesting: false,
        autoShow: false
      });
      //isTesting:true,//comment this out before publishing the app
      //this.showBanner('bottom');
      // if (AdMob) AdMob.createBanner({
      //   adId: this.admobId.banner,
      //   isTesting: true,
      //   position: AdMob.AD_POSITION.BOTTOM_CENTER,
      //   autoShow: true
      // });
    });
  }

  doRefresh(refresher) {
    console.log('Refreshing!', refresher);
    this.loadTVAiringToday();
    this.loadLatestMovie();
    setTimeout(() => {
      console.log('Pull to refresh complete!', refresher);
      refresher.complete();
    })
  }

  doStarting() {
    console.log('Pull started!');
  }

  doPulling(amt) {
    console.log('You have pulled', amt);
  }

  createBanner() {
    this.platform.ready().then(() => {
      if (AdMob) {
        AdMob.createBanner({
          adId: this.admobId.banner,
          autoShow: false
        });
      }
    });
  }

  showInterstitial() {
    this.platform.ready().then(() => {
      if (AdMob) {
        AdMob.prepareInterstitial({
          adId: this.admobId.interstitial,
          autoShow: true
        });
      }
    });
  }

  loadLatestMovie() {
    this.movieService.getLatestMovies(this.pageNoMovie).then(_body => {
      this.latestMoviesFound = _body.results;
      this.isLoading = false;
      this.totalPagesMovie = _body.total_pages;
      this.movieRows = Array.from(Array(Math.ceil(this.latestMoviesFound.length / 3)).keys());
    });
  }

  loadTVAiringToday() {
    this.tvShowService.getTVAiringToday(this.pageNoTV).then(_body => {
      this.tvAiringTodayFound = _body.results;
      this.totalPagesTV = _body.total_pages;
      this.tvRows = Array.from(Array(Math.ceil(this.tvAiringTodayFound.length / 3)).keys());
    });
  }


  goToMovieDetail(movie) {
    this.nav.push(MovieDetailsPage, {
      movie: movie,
      isTV: '0'
    });
  }

  goToTVDetail(tv) {
    this.nav.push(TvDetailsPage, {
      tv: tv,
      isTV: '1'
    });
  }

  nextPageTV() {
    if (this.pageNoTV <= this.totalPagesTV) {
      this.pageNoTV++;
      this.tvAiringTodayFound = null;
      this.tvShowService.getTVAiringToday(this.pageNoTV).then(_body => {
        console.log(_body);
        this.totalPagesTV = _body.total_pages;
        this.tvAiringTodayFound = _body.results;
        this.tvRows = Array.from(Array(Math.ceil(this.tvAiringTodayFound.length / 3)).keys());
        //this.cachedMoviesFound = this.tvAiringTodayFound;
      });
    }
  }

  previousPageTV() {
    if (this.pageNoTV > 1) {
      this.pageNoTV--;
      this.tvAiringTodayFound = null;
      this.tvShowService.getTVAiringToday(this.pageNoTV).then(_body => {
        console.log(_body);
        this.totalPagesTV = _body.total_pages;
        this.tvAiringTodayFound = _body.results;
        this.tvRows = Array.from(Array(Math.ceil(this.tvAiringTodayFound.length / 3)).keys());
        //this.cachedMoviesFound = this.tvAiringTodayFound;
      });
    }
  }

  nextPageMovie() {
    if (this.pageNoMovie <= this.totalPagesMovie) {
      this.pageNoMovie++;
      this.latestMoviesFound = null;
      this.movieService.getLatestMovies(this.pageNoMovie).then(_body => {
        console.log(_body);
        this.totalPagesMovie = _body.total_pages;
        this.latestMoviesFound = _body.results;
        this.movieRows = Array.from(Array(Math.ceil(this.latestMoviesFound.length / 3)).keys());
        //this.cachedMoviesFound = this.latestMoviesFound;
      });
    }
  }

  previousPageMovie() {
    if (this.pageNoMovie > 1) {
      this.pageNoMovie--;
      this.latestMoviesFound = null;
      this.movieService.getLatestMovies(this.pageNoMovie).then(_body => {
        console.log(_body);
        this.totalPagesMovie = _body.total_pages;
        this.latestMoviesFound = _body.results;
        this.movieRows = Array.from(Array(Math.ceil(this.latestMoviesFound.length / 3)).keys());
        //this.cachedMoviesFound = this.latestMoviesFound;
      });
    }
  }

  home() {
    this.pageNoMovie = 1;
    this.pageNoTV = 1;

    this.loadTVAiringToday();
    this.loadLatestMovie();
  }
}
