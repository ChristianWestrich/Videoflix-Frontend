import { Component, Input } from "@angular/core";
import { MoviePlayerComponent } from "../movie-player/movie-player.component";
import { ActivatedRoute, Router } from "@angular/router";
import { MovieService } from "../services/movie.service";

@Component({
  selector: "app-movie-detail",
  standalone: true,
  imports: [MoviePlayerComponent],
  templateUrl: "./movie-detail.component.html",
  styleUrl: "./movie-detail.component.scss",
})
export class MovieDetailComponent {
  movie: any;
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id")!;
    this.movieService.loadSingleMovie(id).subscribe(
      (data) => {
        this.movie = data;
      },
      (error) => (this.error = true)
    );
  }

  getVideoUrl(videoPath: string): string {
    return `http://localhost:8000/media/${videoPath}`;
  }

  goBack(): void {
    this.router.navigate(["/home"]);
  }
}
