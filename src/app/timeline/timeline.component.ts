import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CreatePostModalComponent } from '../create-post-modal/create-post-modal.component'
import { ViewChild } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { UserService } from "../services/user.service"

declare var jquery:any;
declare var $ :any;

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
  public selectedLabel: any;
  public filteredGenres : Array<String>;
  private NO_FILTERED_GENRES = 0;

  constructor(private publicationService: PublicationService,
              private userService: UserService) {
    this.listGenres = this.publicationService.getListGenres();
    this.initGenreSelectedProperty();
    this.filteredGenres = []
  }

  ngOnInit() {
    this.getAllPublications();
  }

  private initGenreSelectedProperty() {
    for (let index in this.listGenres) {
      this.listGenres[index].genreSelected = false;
    }
  }

  private classifyBy(index) {
    if (index === 1) {
      this.shownEvents.sort(function(post1, post2) {
        console.log(post1);
          var date1 = new Date(post1.creationDate).getTime();
          var date2 = new Date(post2.creationDate).getTime();
          return date2 - date1;
      });
    } else if (index == 2) {
      this.shownEvents.sort(function(post1, post2) {
          var count1 = post1.likes.length;
          var count2 = post2.likes.length;
          return count2 - count1;
      });
    } else {
      this.shownEvents.sort(function(post1, post2) {
          var count1 = post1.likes.length;
          var count2 = post2.likes.length;
          return count1 - count2;
      });
    }
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

  // @TODO: In future this should be done in backend

  /**
   * Filter events according with selected genres.
   * Save the genres filtered index to future operations.
   *
   * @param genre     {Object} of selected label on view
   */
  public filterEvents (genre) {

    if (genre.genreSelected === false) {
      this.filteredGenres.push(genre.value);
    } else {
      var index = this.filteredGenres.indexOf(genre.value);
      if (index > -1) { this.filteredGenres.splice(index, 1);}
    }

    let filteredEvents = this.auxFilterEvents();
    genre.genreSelected = genre.genreSelected == false ? true : false;
    //When user unselect all labels
    this.shownEvents = this.filteredGenres.length === this.NO_FILTERED_GENRES ? this.events : filteredEvents;
  };


  private auxFilterEvents() {
    let filteredEvents = [];

    filteredEvents = this.events.filter((event) => {
      const result = event.genres.filter(eventGenre => this.filteredGenres.includes(eventGenre));
      return result.length > 0;
    });

    return filteredEvents;
  }

  /**
   * Clear the genre filter in TimeLine
   *
   */
  public clearFilter() {
    this.shownEvents = this.events;
    this.listGenres.map(genre => genre.genreSelected = false);
    this.filteredGenres = [];
  }

  // @TODO: In future this should be done using Angular's OnPush
  /**
   * Verifies whether label is selected or not.
   *
   * @param genre   {Object} of selected label on view
   * @return {string | string} which will be used as class of the label to
   *         mark as selected
   */
  public isSelected (genre) {
    if (!genre && this.filteredGenres.length === this.NO_FILTERED_GENRES) {
      return "blue";
    } else if (!genre) {
      return "";
    }

    return genre.genreSelected === true ? "blue" : "";
  };
}
