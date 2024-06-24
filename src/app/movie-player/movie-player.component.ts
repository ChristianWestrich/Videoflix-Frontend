import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-movie-player',
  standalone: true,
  imports: [],
  templateUrl: './movie-player.component.html',
  styleUrl: './movie-player.component.scss'
})
export class MoviePlayerComponent {
  @Input() movieId: string = 'videoPlayer';
  @Input() videoUrl480p: string = '';
  @Input() videoUrl720p: string = '';
  @ViewChild('videoPlayerElement', { static: true }) videoPlayerElement!: ElementRef;
  player = videojs.players;

  ngOnInit(): void {
    this.player = videojs(this.videoPlayerElement.nativeElement, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      sources: [{ src: this.videoUrl480p, type: 'video/mp4' }]
    });
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }

  switchResolution(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const resolution = target?.value;
    const newSource = resolution === '720p' ? this.videoUrl720p : this.videoUrl480p;
    this.player.src({ src: newSource, type: 'video/mp4' });
    this.player.load();
    this.player.play();
  }
}

