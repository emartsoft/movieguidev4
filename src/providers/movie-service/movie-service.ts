import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { ConnectivityService } from '../../providers/connectivity-service';

/*
  Generated class for the MovieService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MovieService {
  data: any = null;
  public apiKey: string = '7e06a4fd0118214660a718df4a73c51c';
  public baseUrl: string = 'http://api.themoviedb.org/3/';
  public omdbUrl: string = 'http://www.omdbapi.com/';

  constructor(public http: Http,
    private connectivityService: ConnectivityService,
    public toastCtrl: ToastController) { }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  //Popular Movies: http://api.themoviedb.org/3/movie/popular
  loadPopularMovies(pageNo) {
    this.data = null;
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      if (this.connectivityService.isOffline()) {
        this.presentToast('No Internet Connection!');
      }
      else {
        var url = this.baseUrl + 'movie/popular?api_key=' + this.apiKey + '&page=' + pageNo;
        console.log('movie popular url', url);
        this.http.get(url)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      }
    });

  }

  getPopularMovies(pageNo) {
    return this.loadPopularMovies(pageNo);
  }

  //Now Playing: http://api.themoviedb.org/3/movie/now_playing
  loadLatestMovies(pageNo) {
    this.data = null;
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      if (this.connectivityService.isOffline()) {
        this.presentToast('No Internet Connection!');
      }
      else {
        var url = this.baseUrl + 'movie/now_playing?api_key=' + this.apiKey + '&page=' + pageNo;
        console.log('movie now_playing url', url);
        this.http.get(url)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      }
    });
  }

  getLatestMovies(pageNo) {
    return this.loadLatestMovies(pageNo);
  }

  //Movies By ID: http://api.themoviedb.org/3/movie/id
  loadMovieByID(movieID) {
    this.data = null;
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      if (this.connectivityService.isOffline()) {
        this.presentToast('No Internet Connection!');
      }
      else {
        var url = this.baseUrl + 'movie/' + movieID + '?api_key=' + this.apiKey + '&append_to_response=credits,similar,videos,reviews,images';
        console.log('movie by id url: ', url);
        this.http.get(url)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      }
    });
  }

  getMovieByID(movieID) {
    return this.loadMovieByID(movieID);
  }

  //Search for movies by title: http://api.themoviedb.org/3/search/movie
  searchMoviesByTitle(movieName) {
    if (!this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      if (this.connectivityService.isOffline()) {
        this.presentToast('No Internet Connection!');
      }
      else {
        var url = this.baseUrl + 'search/movie?api_key=' + this.apiKey + '&query=' + movieName;
        console.log('search movie title url: ', url);
        this.http.get(url)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      }
    });
  }

  getSearchMoviesByTitle(movieName) {
    return this.searchMoviesByTitle(movieName);
  }

  //Get the similar TV shows for a specific tv id.
  //http://api.themoviedb.org/3/tv/id/similar
  loadSimilarMovies(movieID, pageNo) {
    this.data = null;
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      if (this.connectivityService.isOffline()) {
        this.presentToast('No Internet Connection!');
      }
      else {
        var url = this.baseUrl + 'movie/' + movieID + '/similar?api_key=' + this.apiKey + '&page=' + pageNo;
        console.log('movie url', url);
        this.http.get(url)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      }
    });
  }

  getSimilarMovieShows(movieID, pageNo) {
    return this.loadSimilarMovies(movieID, pageNo);
  }

  //OMDb API: http://www.omdbapi.com/? - http://www.omdbapi.com/?t=looper&tomatoes=true
  omdbFetch(movieName) {
    if (!this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      if (this.connectivityService.isOffline()) {
        this.presentToast('No Internet Connection!');
      }
      else {
        var url = this.omdbUrl + '?t=' + movieName + '&tomatoes=true';
        console.log('omdbapi url: ', url);
        this.http.get(url)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      }
    });
  }

  getOMDB(movieName) {
    return this.omdbFetch(movieName);
  }

  //OMDb API: http://www.omdbapi.com/? - http://www.omdbapi.com/?i=tt0775440&tomatoes=true
  omdbIMDBIDFetch(IMDB_ID) {
    if (!this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      if (this.connectivityService.isOffline()) {
        this.presentToast('No Internet Connection!');
      }
      else {
        var url = this.omdbUrl + '?i=' + IMDB_ID + '&tomatoes=true';
        console.log('omdbapi url: ', url);
        this.http.get(url)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      }
    });
  }

  getomdbIMDBIDFetch(IMDB_ID) {
    return this.omdbIMDBIDFetch(IMDB_ID);
  }

}

