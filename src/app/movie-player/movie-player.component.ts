import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import videojs from "video.js";
import { ActivatedRoute, Router } from "@angular/router";
import { Movie } from "../interfaces/movie";
import { MovieService } from "../services/movie.service";

@Component({
  selector: "app-movie-player",
  standalone: true,
  imports: [],
  templateUrl: "./movie-player.component.html",
  styleUrl: "./movie-player.component.scss",
})
export class MoviePlayerComponent {
  movieId: string | null = "";
  videoUrl480p: string = "";
  videoUrl720p: string = "";
  videoUrl1080p: string = "";
  @ViewChild("videoPlayerElement", { static: true })
  videoPlayerElement!: ElementRef;
  videoPlayer = videojs.players;

  currentMovie?: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get("id");
    this.currentMovie = this.movieService.movies.find(
      (movie) => movie.id.toString() === this.movieId,
    );
    this.videoPlayer = videojs(this.videoPlayerElement.nativeElement, {
      controls: true,
      autoplay: false,
      preload: "auto",
      sources: [{ src: this.currentMovie?.movieUrl, type: "video/mp4" }],
    });
  }

  ngOnDestroy(): void {
    if (this.videoPlayer) {
      this.videoPlayer.dispose();
    }
  }

  goBack() {
    this.router.navigateByUrl("home");
  }

  // switchResolution(event: Event): void {
  //   const target = event.target as HTMLSelectElement;
  //   const resolution = target?.value;
  //   const newSource = findResolution(resolution)
  //   this.player.src({ src: newSource, type: 'video/mp4' });
  //   this.player.load();
  //   this.player.play();
  // }
  //
  // findResolution(resolution: string): string {
  //   let resolutionUrl = '';
  //   switch (resolution) {
  //     case '480p':
  //       resolutionUrl = this.currentMovie?.movieUrl480p;
  //       break;
  //     case '720p':
  //       resolutionUrl = this.currentMovie?.movieUrl720p;
  //       break;
  //     case '1080p':
  //       resolutionUrl = this.currentMovie?.movieUrl1080p;
  //       break;
  //     default:
  //       resolutionUrl = this.currentMovie?.movieUrl480p;
  //       break;
  //   }
  //   return resolutionUrl;
  // }
}
