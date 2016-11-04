import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { ConnectivityService } from '../../providers/connectivity-service';

/*
  Generated class for the TvShowService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TvShowService {
  data: any = null;
  public apiKey: string = '7e06a4fd0118214660a718df4a73c51c';
  public baseUrl: string = 'http://api.themoviedb.org/3/';
  public omdbUrl: string = 'http://www.omdbapi.com/';
  public tvMazeBaseUrl: string = 'http://api.tvmaze.com/';

  constructor(public http: Http,
    private connectivityService: ConnectivityService,
    public toastCtrl: ToastController, ) { }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  //TV Airing Today: http://api.themoviedb.org/3/tv/airing_today
  loadTVAiringToday(pageNo) {
    this.data = null;
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      if (this.connectivityService.isOffline()) {
        this.presentToast('No Internet Connection!');
      }
      else {
        var url = this.baseUrl + 'tv/airing_today?api_key=' + this.apiKey + '&page=' + pageNo;
        this.http.get(url)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      }
    });
  }

  getTVAiringToday(pageNo) {
    return this.loadTVAiringToday(pageNo);
  }

  //TV shows By ID: http://api.themoviedb.org/3/tv/id
  loadTVByID(tvID) {
    this.data = null;
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      if (this.connectivityService.isOffline()) {
        this.presentToast('No Internet Connection!');
      }
      else {
        var url = this.baseUrl + 'tv/' + tvID + '?api_key=' + this.apiKey + '&append_to_response=credits,similar,videos,reviews,lists,images,external_ids,content_ratings';
        this.http.get(url)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      }
    });
  }

  getTVByID(tvID) {
    return this.loadTVByID(tvID);
  }

  //Search for TV Shows by title: http://api.themoviedb.org/3/search/tv
  searchTVShowsByTitle(tvShowName) {
    if (!this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      if (this.connectivityService.isOffline()) {
        this.presentToast('No Internet Connection!');
      }
      else {
        var url = this.baseUrl + 'search/tv?api_key=' + this.apiKey + '&query=' + tvShowName;
        console.log('tv search title url', url);
        this.http.get(url)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      }
    });
  }

  getSearchTVShowsByTitle(tvShowName) {
    return this.searchTVShowsByTitle(tvShowName);
  }

  //Get the primary information about a TV season by its season number: http://api.themoviedb.org/3/tv/id/season/season_number
  searchTVSeason(tvID, seasonNumber) {
    this.data = null;
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      if (this.connectivityService.isOffline()) {
        this.presentToast('No Internet Connection!');
      }
      else {
        var url = this.baseUrl + 'tv/' + tvID + '/season/' + seasonNumber + '?api_key=' + this.apiKey + '&append_to_response=credits,images,videos';
        console.log('tv season url', url);
        this.http.get(url)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            console.log('season data', this.data);
            resolve(this.data);
          });
      }
    });
  }

  getSearchTVSeason(tvID, seasonNumber) {
    return this.searchTVSeason(tvID, seasonNumber);
  }

  //Get the primary information about a TV episode by combination of a season and episode number.: http://api.themoviedb.org/3/tv/id/season/season_number/episode/episode_number
  searchTVEpisode(tvID, seasonNumber, episodeNumber) {
    this.data = null;
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      if (this.connectivityService.isOffline()) {
        this.presentToast('No Internet Connection!');
      }
      else {
        var url = this.baseUrl + 'tv/' + tvID + '/season/' + seasonNumber + '/episode/' + episodeNumber + '?api_key=' + this.apiKey;
        console.log('tv episode url', url);
        this.http.get(url)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            console.log('episode data', this.data);
            resolve(this.data);
          });
      }
    });
  }

  getSearchTVEpisode(tvID, seasonNumber, episodeNumber) {
    return this.searchTVEpisode(tvID, seasonNumber, episodeNumber);
  }

  //Get the list of popular TV shows. This list refreshes every day: http://api.themoviedb.org/3/tv/popular
  loadPopularTVShows(pageNo) {
    this.data = null;
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      if (this.connectivityService.isOffline()) {
        this.presentToast('No Internet Connection!');
      }
      else {
        var url = this.baseUrl + 'tv/popular?api_key=' + this.apiKey + '&page=' + pageNo;
        this.http.get(url)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      }
    });
  }

  getPopularTVShows(pageNo) {
    return this.loadPopularTVShows(pageNo);
  }

  //Get the list of TV shows that are currently on the air. This query looks for any TV show that has an episode 
  //with an air date in the next 7 days. 
  //http://api.themoviedb.org/3/tv/on_the_air
  loadUpcomingTVShows(pageNo) {
    this.data = null;
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      if (this.connectivityService.isOffline()) {
        this.presentToast('No Internet Connection!');
      }
      else {
        var url = this.baseUrl + 'tv/on_the_air?api_key=' + this.apiKey + '&page=' + pageNo;
        console.log('upcoming tv url', url);
        this.http.get(url)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      }
    });
  }

  getUpcomingTVShows(pageNo) {
    return this.loadUpcomingTVShows(pageNo);
  }

  //Get the similar TV shows for a specific tv id.
  //http://api.themoviedb.org/3/tv/id/similar
  loadSimilarTVShows(tvID, pageNo) {
    this.data = null;
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      if (this.connectivityService.isOffline()) {
        this.presentToast('No Internet Connection!');
      }
      else {
        var url = this.baseUrl + 'tv/' + tvID + '/similar?api_key=' + this.apiKey + '&page=' + pageNo;
        console.log('similar tv url', url);
        this.http.get(url)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      }
    });
  }

  getSimilarTVShows(tvID, pageNo) {
    return this.loadSimilarTVShows(tvID, pageNo);
  }

  //OMDb API: http://www.omdbapi.com/? - http://www.omdbapi.com/?t=looper&tomatoes=true
  omdbFetch(tvShowName) {
    if (!this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      if (this.connectivityService.isOffline()) {
        this.presentToast('No Internet Connection!');
      }
      else {
        var url = this.omdbUrl + '?t=' + tvShowName + '&tomatoes=true';
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

  getOMDB(tvShowName) {
    return this.omdbFetch(tvShowName);
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

  //External IDs: https://api.themoviedb.org/3/tv/{tv_id}/external_ids?api_key=<<api_key>>&language=en-US
  externalIDsFetch(tvID) {
    this.data = null;
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      if (this.connectivityService.isOffline()) {
        this.presentToast('No Internet Connection!');
      }
      else {
        var url = this.baseUrl + 'tv/' + tvID + '/external_ids?api_key=' + this.apiKey + '&language=en-US';
        console.log('external tv url: ', url);
        this.http.get(url)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      }
    });
  }
  /**External IDs: https://api.themoviedb.org/3/tv/{tv_id}/external_ids?api_key=<<api_key>>&language=en-US
   *Uses: this.externalIDsFetch(tvID) */
  getExternalIDsFetch(tvID) {
    return this.externalIDsFetch(tvID);
  }

  /**TVMaze Show Lookup: http://api.tvmaze.com/lookup/shows?imdb=tt0944947 */
  tvMaze(IMDB_ID) {
    this.data = null;
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      if (this.connectivityService.isOffline()) {
        this.presentToast('No Internet Connection!');
      }
      else {
        var url = this.tvMazeBaseUrl + 'lookup/shows?imdb=' + IMDB_ID;
        console.log('tvmaze tv url: ', url);
        this.http.get(url)
          .map(res => {
            // If request fails, throw an Error that will be caught
            if (res.status < 200 || res.status >= 300) {
              throw new Error('This request has failed ' + res.status);
            }
            // If everything went fine, return the response
            else {
              return res.json();
            }
          })
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
            console.log('tvmaze data', this.data);

          });
      }
    });
  }

  /**TVMaze Show Lookup: e.g. http://api.tvmaze.com/lookup/shows?imdb=tt0944947 
   *Uses: this.tvMaze(IMDB_ID)
  */
  getTVMaze(IMDB_ID) {
    return this.tvMaze(IMDB_ID);
  }

  /** TVMaze Self Link: http://api.tvmaze.com/shows/ */
  tvMazeSelf(tvMazeSelfLinkURL) {
    this.data = null;
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      if (this.connectivityService.isOffline()) {
        this.presentToast('No Internet Connection!');
      }
      else {
        var url = tvMazeSelfLinkURL + '?embed=nextepisode';
        console.log('tvmaze self link url: ', url);
        this.http.get(url)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
            console.log('tvmaze data', this.data);

          })

      }
    });
  }

  /** TVMaze Self Link: http://api.tvmaze.com/shows/ */
  getTVMazeSelf(tvMazeSelfLinkURL) {
    return this.tvMazeSelf(tvMazeSelfLinkURL);
  }
}

