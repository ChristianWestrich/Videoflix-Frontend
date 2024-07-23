import { Component, ElementRef, inject, ViewChild } from "@angular/core";
import { HeaderComponent } from "../shared/header/header.component";
import { MovieService } from "../services/movie.service";
import { RouterLink } from "@angular/router";
import { Movie } from "../interfaces/movie";
import { Subscription } from "rxjs";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-home",
  standalone: true,
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  imports: [HeaderComponent, RouterLink, AsyncPipe],
})
export class HomeComponent {
  @ViewChild("videoPlayer") videoPlayer!: ElementRef;

  movieService = inject(MovieService);

  constructor() {}

  getThumbnailUrl(thumbnailPath: string): string {
    return this.movieService.getThumbnailUrl(thumbnailPath);
  }

  previewVideo(movieId: number) {
    this.videoPlayer.nativeElement.pause();
    this.movieService.selectedMovieIdSig$.set(movieId);
    let newMovie = this.movieService.allMovies.find(
      (movie) => movie.id === movieId,
    );
    if (newMovie) {
      this.movieService.selectedMovieSig$.set(newMovie);
    }
    setTimeout(() => {
      this.videoPlayer.nativeElement.load();
      this.videoPlayer.nativeElement.play();
    }, 100);
  }


}
