import { Component, NgZone } from '@angular/core';
import { NavController, ViewController, NavParams, Platform } from 'ionic-angular';
import { Toast } from 'ionic-native';
import { TvShowService } from '../../providers/tv-show-service/tv-show-service';
import { CastPagePage } from '../cast-page/cast-page';
import { BackdropsPage } from '../backdrops/backdrops';
import { TrailersPage } from '../trailers/trailers';
import { TvShowSimilarsPage } from '../tv-show-similars/tv-show-similars';
import { TvShowSeasonsPage } from '../tv-show-seasons/tv-show-seasons';
import { ImagePopoverPage } from '../image-popover/image-popover';
import { CastDetailPage } from '../cast-detail/cast-detail';

import { GoogleAnalytics, InAppBrowser } from 'ionic-native';
/*
  Generated class for the TvDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'tv-details.html'
})
export class TvDetailsPage {
  public externalID: any;
  public tvMaze: any;
  tv: any;
  isTV: '0';
  _zone: any;
  genres: string = '';
  productioncompanies: string = '';
  title: any;
  backdrops: any;
  casts: any;
  similar: any;
  videos: any;
  seasons: any;
  tvID: string = '';

  nextEpisodeName: string = '';
  nextEpisodeSeason: string = '';
  nextEpisodeNumber: string = '';
  nextEpisodeAirDate: Date;
  nextEpisodeSummary: string = '';

  public bgurl: string = '';

  public omdbTvShow: any;

  public tomatourl: string = '';
  public tomatoImage: string = '';
  public flixsterImage: string = '';

  metaScore: string = '';
  tomatoMeter: string = '';
  flixster: string = '';
  imdb: string = '';
  tvYear: string = '';
  public tvimdb_id: string = '';

  public shouldHide: boolean = false;
  public shouldHideNextEpisode: boolean = true;
  public shouldHideNetwork: boolean = false;
  public shouldHideWebChannel: boolean = false;
  public shouldHideSchedule: boolean = false;

  public networkName: string = '';
  public channelName: string = '';
  public countryCode: string = '';

  public airsOnDay: string = '';
  public airsAtTime: string = '';

  public castRows = [];

  screenWidth: number;

  metaScoreColor: string = '';

  public baseBigImageUrlBig: string = '';
  public baseImageUrl: string = 'http://image.tmdb.org/t/p/w300';
  public baseBigImageUrl: string = 'http://image.tmdb.org/t/p/w500';
  public baseBiggerImageUrl: string = 'http://image.tmdb.org/t/p/w1000';

  constructor(public nav: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public viewCtrl: ViewController,
    public tvShowService: TvShowService,
    _zone: NgZone) {
    this.isTV = this.navParams.data.isTV;
    this.tv = this.navParams.data.tv;
    this.fetchTVByID(this.tv.id);

    this.screenWidth = window.innerWidth;
    //console.log('screen height:', this.screenHeight);
    //this.screenHeight = 'Screen Height: ' + this.screenHeight;
    //this.showToast(this.screenWidth, 'bottom');

    if (this.screenWidth > 600)
      this.baseBigImageUrlBig = this.baseBiggerImageUrl;
    else
      this.baseBigImageUrlBig = this.baseBigImageUrl;

    console.log('nav params', this.navParams);
    console.log('my tv title:', this.tv.name);
    console.log('my tv id:', this.tv.id);
    this._zone = _zone;

    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("TV Details Page");
    });
  }

  fetchTVByID(tvID) {
    this.tvShowService.getTVByID(tvID).then(_body => {
      console.log('tv body', _body);
      this.tv = _body;
      // this.fetchOMDbMovie();

      this.bgurl = this.baseBigImageUrl + this.tv.backdrop_path;
      this.title = this.tv.name;
      this.tvID = this.tv.id;
      console.log('this show', this.tv);
      this.casts = this.tv.credits.cast;

      if (this.casts.length > 0)
        this.shouldHide = true;

      this.castRows = Array.from(Array(Math.ceil(1)).keys());

      this.backdrops = this.tv.images.backdrops;
      this.similar = this.tv.similar.results;
      this.videos = this.tv.videos.results;
      this.seasons = this.tv.seasons;
      console.log('seasons', this.seasons);

      for (let i = 0; i < this.tv.genres.length; i++) {
        if (this.genres == '')
          this.genres = this.tv.genres[i].name;
        else
          this.genres = this.genres + ', ' + this.tv.genres[i].name;
      }
      for (let i = 0; i < this.tv.production_companies.length; i++) {
        if (this.productioncompanies == '')
          this.productioncompanies = this.tv.production_companies[i].name;
        else
          this.productioncompanies = this.productioncompanies + ', ' + this.tv.production_companies[i].name;
      }

      this.fetchTvMaze();

      console.info('Finished receiving data, async operation complete');
      //this.showToast('Staff List Refreshed');
    });
  }

  fetchOMDbMovie() {
    console.log('external_ids', this.tv.external_ids);
    if (this.tv.external_ids != undefined || this.tv.external_ids.imdb_id != '') {
      this.tvShowService.getomdbIMDBIDFetch(this.tv.external_ids.imdb_id).then(_body1 => {
        this.omdbTvShow = _body1;
        console.log('omdbtvshow', this.omdbTvShow);
        if (this.omdbTvShow.Response == 'True') {
          this.tvYear = '(' + this.omdbTvShow.Year + ')';
        }
      });
    }
  }

  fetchTvMaze() {
    this.fetchSeasonExternalIDs(this.tvID);
  }

  fetchSeasonExternalIDs(tvID) {
    this.tvShowService.getExternalIDsFetch(tvID).then(_body => {
      this.externalID = _body;
     // console.log('external ids', this.externalID);
      //console.log('external ids imdb', this.externalID.imdb_id);
      this.tvimdb_id = this.externalID.imdb_id;

      if (this.tvimdb_id != null) {

        this.tvShowService.getTVMaze(this.tvimdb_id).then(_body => {
          //console.log('tvmaze self link', _body._links.self.href);
          //this.tvMaze = _body;
          var selflink = _body._links.self.href;
          this.tvShowService.getTVMazeSelf(selflink).then(_body => {
            //console.log('tvmaze self body', _body);
            this.tvMaze = _body;
            if (this.tvMaze == null)
              this.shouldHideNextEpisode = true;
            else {
              //console.log('days', this.tvMaze.schedule.days);
              //embedded neext episode
              if (this.tvMaze._embedded != null) {
                this.shouldHideNextEpisode = false;
               // console.log('episode name', this.tvMaze._embedded.nextepisode.name);
                this.nextEpisodeName = this.tvMaze._embedded.nextepisode.name;
                this.nextEpisodeSeason = this.tvMaze._embedded.nextepisode.season;
                this.nextEpisodeNumber = this.tvMaze._embedded.nextepisode.number;
                this.nextEpisodeAirDate = this.tvMaze._embedded.nextepisode.airdate;
                this.nextEpisodeSummary = this.tvMaze._embedded.nextepisode.summary;
              }

              //webchannel
              if (this.tvMaze.webChannel != null) {
                this.channelName = 'Streamed On:' + this.tvMaze.webChannel.name;
                this.countryCode = 'at (' + this.tvMaze.webChannel.country.code + ')';
              }
              else
                this.shouldHideWebChannel = true;

              //webchannel
              if (this.tvMaze.network != null) {
                this.networkName = 'Airs On:' + this.tvMaze.network.name;
                this.countryCode = '(' + this.tvMaze.network.country.code + ')';
              }
              else
                this.shouldHideNetwork = true;

              if (this.tvMaze.schedule != null) {
                this.airsOnDay = 'Scheduled: ' + this.tvMaze.schedule.days;
                this.airsAtTime = (this.tvMaze.schedule.time != "") ? 'at ' + this.tvMaze.schedule.time : "";
              }
              else
                this.shouldHideSchedule = true;
            }
          })
        })
      }
      else {
        this.shouldHideNextEpisode = true;
      }
    })
  }


  viewCastDetail(casts) {
    if (casts.length == 0)
      this.showToast('No Casts to Show', 'bottom');
    else {
      this.nav.push(CastPagePage, {
        casts: casts,
        title: this.title,
        type: 'TV Shows'
      });
    }
  }

  viewBackdrops(backdrops) {
    if (backdrops.length == 0)
      this.showToast('No Backdrops to Show', 'bottom');
    else
      this.nav.push(BackdropsPage, {
        backdrops: backdrops,
        movietitle: this.title,
      });
  }

  viewSimilar(similar) {
    if (similar.length == 0)
      this.showToast('No Similiar to TV Shows', 'bottom');
    else {
      this.nav.push(TvShowSimilarsPage, {
        similar: similar,
        title: this.title,
        tvID: this.tvID,
        type: 'TV Shows'
      });
    }
  }

  viewTrailers(videos) {
    if (videos.length == 0)
      this.showToast('No Trailers to Show', 'bottom');
    else
      this.nav.push(TrailersPage, videos);
  }

  viewSeasonDetail(seasons) {
    this.nav.push(TvShowSeasonsPage, {
      seasons: seasons,
      title: this.title,
      tvID: this.tvID
    });
  }

  showToast(message, position) {
    Toast.show(message, "short", position).subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  goToCastDetail(cast) {
    this.nav.push(CastDetailPage, {
      id: cast.id,
      movietitle: this.title
    });
  }

  openImage() {
    var index: string = '';
    this.nav.push(ImagePopoverPage, {
      images: this.tv.images.posters,
      index: index
    });
  }

  readMore() {
    new InAppBrowser('https://www.google.com/search?q=' + this.title, '_blank', 'location=yes');
  }

}
