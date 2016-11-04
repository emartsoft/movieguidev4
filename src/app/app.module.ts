import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MovieGuide } from './app.component';

import { HomePage } from '../pages/home-page/home-page';
import { MovieListPage } from '../pages/movie-list/movie-list';
import { TvListPage } from '../pages/tv-list/tv-list';
import { MovieGenresPage } from '../pages/movie-genres/movie-genres';
import { PeoplePage } from '../pages/people/people';
import { AboutPage } from '../pages/about-page/about-page';
import { PopularTvShowsPage } from "../pages/popular-tv-shows/popular-tv-shows";
import { PopularMoviesPage } from "../pages/popular-movies/popular-movies";
import { UpcomingTvPage } from "../pages/upcoming-tv/upcoming-tv";
import { ContactPage } from "../pages/contact-page/contact-page";
import { DiscoverPage } from "../pages/discover/discover";
import { CastDetailPage } from '../pages/cast-detail/cast-detail';
import { BackdropsPage } from '../pages/backdrops/backdrops';
import { TrailersPage } from '../pages/trailers/trailers';
import { CastMoviesPage } from '../pages/cast-movies/cast-movies';
import { CastPagePage } from '../pages/cast-page/cast-page';
import { ImagePopoverPage } from '../pages/image-popover/image-popover';
import { MovieDetailsPage } from "../pages/movie-details/movie-details";
import { MovieGenreListPage } from "../pages/movie-genre-list/movie-genre-list";
import { TvShowEpisodeViewPage } from "../pages/tv-show-episode-view/tv-show-episode-view";
import { MovieLatestInTheatrePage } from "../pages/movie-latest-in-theatre/movie-latest-in-theatre";
import { TvDetailsPage } from "../pages/tv-details/tv-details";
import { SimilarMoviesPage } from '../pages/similar-movies/similar-movies';
import { TvShowSeasonViewPage } from '../pages/tv-show-season-view/tv-show-season-view';
import { TvShowSeasonsPage } from '../pages/tv-show-seasons/tv-show-seasons';
import { TvShowSimilarsPage } from '../pages/tv-show-similars/tv-show-similars';
import { TvShowsAiringTodayPage } from '../pages/tv-shows-airing-today/tv-shows-airing-today';
import { Reviews } from '../pages/reviews/reviews';
import { Share } from '../pages/share/share';

import { MovieService } from '../providers/movie-service/movie-service';
import { TvShowService } from '../providers/tv-show-service/tv-show-service';
import { GenreService } from '../providers/genre-service/genre-service';
import { DiscoverService } from '../providers/discover-service/discover-service';
import { PeopleService } from '../providers/people-service/people-service';
import { RateService } from '../providers/rate-service/rate-service';
import { SearchService } from '../providers/search-service/search-service';
import { ConnectivityService } from '../providers/connectivity-service';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '82b8a89a'
  },
  'push': {
    'sender_id': '450023574965',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [
    MovieGuide,
    HomePage,
    MovieListPage,
    TvListPage,
    MovieGenresPage,
    PeoplePage,
    AboutPage,
    PopularTvShowsPage,
    PopularMoviesPage,
    UpcomingTvPage,
    ContactPage,
    DiscoverPage,
    CastDetailPage,
    BackdropsPage,
    TrailersPage,
    CastMoviesPage,
    CastPagePage,
    ImagePopoverPage,
    MovieDetailsPage,
    MovieGenreListPage,
    TvShowEpisodeViewPage,
    MovieLatestInTheatrePage,
    TvDetailsPage,
    SimilarMoviesPage,
    TvShowSeasonViewPage,
    TvShowSeasonsPage,
    TvShowSimilarsPage,
    TvShowsAiringTodayPage,
    Reviews,
    Share
  ],
  imports: [
    IonicModule.forRoot(MovieGuide, 
    { 
      tabbarPlacement: 'bottom', 
      prodMode: true,
      pageTransition: 'ios'
    }),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MovieGuide,
    HomePage,
    MovieListPage,
    TvListPage,
    MovieGenresPage,
    PeoplePage,
    AboutPage,
    PopularTvShowsPage,
    PopularMoviesPage,
    UpcomingTvPage,
    ContactPage,
    DiscoverPage,
    CastDetailPage,
    BackdropsPage,
    TrailersPage,
    CastMoviesPage,
    CastPagePage,
    ImagePopoverPage,
    MovieDetailsPage,
    MovieGenreListPage,
    TvShowEpisodeViewPage,
    MovieLatestInTheatrePage,
    TvDetailsPage,
    SimilarMoviesPage,
    TvShowSeasonViewPage,
    TvShowSeasonsPage,
    TvShowSimilarsPage,
    TvShowsAiringTodayPage,
    Reviews,
    Share
  ],
  providers: [
    DiscoverService,
    GenreService,
    MovieService,
    PeopleService,
    RateService,
    SearchService,
    TvShowService,
    ConnectivityService
  ]
})
export class AppModule { }

