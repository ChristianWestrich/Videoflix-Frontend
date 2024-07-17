import { Component, inject } from "@angular/core";
import { HeaderComponent } from "../shared/header/header.component";
import { Subscription } from "rxjs";
import { MovieService } from "../services/movie.service";
import { MovieDetailComponent } from "../movie-detail/movie-detail.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-home",
  standalone: true,
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  imports: [HeaderComponent, MovieDetailComponent, RouterLink],
})
export class HomeComponent {
  subscribe!: Subscription;
  movieService = inject(MovieService);
  allMovies: any[] = [];

  constructor() {
    // this.movieService.loadAllMovies().subscribe((data) => {
    //     this.allMovies // data
    // })
    this.allMovies = this.movies
  }

  movies = [
    {
      title: "Der Herr der Ringe",
      movieUrl: "test",
      description: "Ein Fantasie-Film von J.R.Tolkien",
      id: "1",
      thumbnail: "test",
      releaseDate: new Date()
    },
    {
      title: "Der Herr der Ringe 2",
      movieUrl: "test",
      description: "Ein Fantasie-Film von J.R.Tolkien",
      id: "2",
      thumbnail: "test",
      releaseDate: new Date()
    },
    {
      title: "Der Herr der Ringe 3",
      movieUrl: "test",
      description: "Ein Fantasie-Film von J.R.Tolkien",
      id: "3",
      thumbnail: "test",
      releaseDate: new Date()
    },
    {
        title: "Der Herr der Ringe 3",
        movieUrl: "test",
        description: "Ein Fantasie-Film von J.R.Tolkien",
        id: "3",
        thumbnail: "test",
        releaseDate: new Date()
      },
  ];

  ngOnDestroy(): void {
    // this.subscribe.unsubscribe();
  }

  shortenDescription(description: string) {
    return description.length > 40 ? description.substring(0,30) + "..." : description
  }
  getThumbnailUrl(thumbnailPath: string): string {
    if (!thumbnailPath) {
      return 'http://via.placeholder.com/150'; 
    }
    return thumbnailPath; 
  }

}
