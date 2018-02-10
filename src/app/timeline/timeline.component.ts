import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CreatePostModalComponent } from '../create-post-modal/create-post-modal.component'
import { ViewChild } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import {UserService} from "../services/user.service"

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimelineComponent implements OnInit {
  @ViewChild(CreatePostModalComponent)
  public createPost: CreatePostModalComponent;
  public listGenres : any;
  public events: any;
  public shownEvents: any;
  public filteredEvents: any;
  public selectedLabel: any;

  constructor(private publicationService: PublicationService,
              private userService: UserService) {
    this.listGenres = this.publicationService.getListGenres();
  }

  ngOnInit() {
    this.getAllPublications();
  }

  public getAllPublications() {
    this.publicationService.getAllPublications().subscribe(
      data => {
        this.events = data;
        this.selectedLabel = "todos";
        this.shownEvents = this.events;
      }, err => {
        console.log(err)
      }
    );
  }

  public getClass(genre) {
    return this.userService.getColor(genre);
  }

  /**
   * Filter events according with selected genres.
   * Save selected genre index to future operations.
   *
   * @param index     Index of selected label on view
   * @param genre     {Object} of selected label on view
   */
  public filterEvents = (index, genre) => {
    if (genre) {
      this.filteredEvents = this.events.filter((event) => {
        const result = event.genres.filter(eventGenre => eventGenre === genre.value );
        return result.length > 0;
      });
    }

    this.selectedLabel = index ;
    this.shownEvents = genre ? this.filteredEvents : this.events;
  };

  /**
   * Verifies whether label is selected or not.
   *
   * @param index         Label's indentifier
   * @return {string | string} which will be used as class of the label to
   *         mark as selected
   */
  public isSelected = (index) => {
    return this.selectedLabel === index ? "blue" : "";
  };
}
