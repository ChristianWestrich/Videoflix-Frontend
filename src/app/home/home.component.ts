import {Component, ElementRef, inject, signal, ViewChild} from "@angular/core";
import { HeaderComponent } from "../shared/header/header.component";
import { Subscription } from "rxjs";
import { MovieService } from "../services/movie.service";
import { MovieDetailComponent } from "../movie-detail/movie-detail.component";
import { RouterLink } from "@angular/router";
import {Movie} from "../interfaces/movie";


@Component({
  selector: "app-home",
  standalone: true,
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  imports: [HeaderComponent, MovieDetailComponent, RouterLink],
})
export class HomeComponent {

  movieService = inject(MovieService);
  categories = ["new", "documentary", "drama", "romance"]
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  allMovies!: Movie[]
  allMoviesSubscription!: Subscription

  constructor() {
    this.allMoviesSubscription = this.movieService.allMovies$.subscribe((data) => {
      this.allMovies = data
    })
  }

  filterMoviesByCategory(category: string) {
    return this.allMovies.filter(movie => movie.category.includes(category))
  }

  getThumbnailUrl(thumbnailPath: string): string {
    return this.movieService.getThumbnailUrl(thumbnailPath);
  }

  previewVideo(movieId: number) {
    this.videoPlayer.nativeElement.pause();
    this.movieService.selectedMovieIdSig$.set(movieId);
    let newMovie = this.allMovies.find(movie => movie.id === movieId)
    if(newMovie) {
    this.movieService.selectedMovieSig$.set(newMovie)
    }
    setTimeout(() => {
      this.videoPlayer.nativeElement.load();
      this.videoPlayer.nativeElement.play();
    }, 100);
  }

  ngOnDestroy() {
    this.allMoviesSubscription.unsubscribe()
  }
}
