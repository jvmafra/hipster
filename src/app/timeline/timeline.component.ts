import {Component, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import { CreatePostModalComponent } from '../create-post-modal/create-post-modal.component'
import { ViewChild } from '@angular/core';
import { PublicationService } from '../services/publication.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimelineComponent implements OnInit {
  @ViewChild(CreatePostModalComponent)
  private createPost: CreatePostModalComponent;

  private events: any;
  private genres: any;

  private genreFilter: any;

  constructor(private publicationService: PublicationService) {
    this.genres = this.publicationService.getListGenres();
  }

  getGenreColor(genre) {
    const genresColors = this.publicationService.getGenreColorObjects();
    return genresColors[genre.name];
  }

  getFilters() {
    let pubService = this.publicationService;
    $('#genres_select')
      .dropdown({
        onChange: function (genreFilter) {
          pubService.getAllPublications().subscribe(
            data => {
              this.events = data;
              this.events = this.events.filter(d => d.genres.indexOf(genreFilter) !== -1);
              console.log(this.events);
              this.events.sort((a: any, b: any) => {
                let dateA = new Date(a.creationDate);
                let dateB = new Date(b.creationDate);

                return dateB.getTime() - dateA.getTime();
              });

            }, err => {
              console.log(err);
            }
        }
      });
  }

  ngOnInit() {
    $('#genres_select')
      .dropdown('get value').split(',');
    console.log(this.genreFilter);
    this.publicationService.getAllPublications().subscribe(
      data => {
        this.events = data;
        this.events.sort((a: any, b: any) => {
          let dateA = new Date(a.creationDate);
          let dateB = new Date(b.creationDate);

          return dateB.getTime() - dateA.getTime();
        });

      }, err => {
        console.log(err);
      }
    );
  }

}
