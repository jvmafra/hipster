import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CreatePostModalComponent } from '../create-post-modal/create-post-modal.component'
import { ViewChild } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { UserService } from "../services/user.service";
import { AlertService } from "../services/alert.service";

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
  public ORDER_BY_MOST_RECENT = 1;
  public ORDER_BY_LESS_RECENT = 2;
  public ORDER_BY_MOST_POPULAR = 3;
  public ORDER_BY_LESS_POPULAR = 4;
  private skip;
  private selectedOrder;

  constructor(private publicationService: PublicationService,
              private userService: UserService,
              private alertService: AlertService) {
    this.listGenres = this.publicationService.getListGenres();
    this.initGenreSelectedProperty();
    this.filteredGenres = [];
    this.events = [];
    this.skip = 0;
    this.selectedOrder = this.ORDER_BY_MOST_RECENT;
  }

  ngOnInit() {
    this.alertService.showLoadIndication();
    this.search();
    this.alertService.hideLoadIndication();
  }

  private initGenreSelectedProperty() {
    for (let index in this.listGenres) {
      this.listGenres[index].genreSelected = false;
    }
  }

  public classifyBy(orderByParam) {

    if ([1,2,3,4].indexOf(orderByParam) !== -1) {
      this.selectedOrder = orderByParam;
      this.skip = 0;
      this.search();
    }
  }

  public search() {
    let params = {};

    params["orderBy"] = this.selectedOrder;
    params["filterByGenres"] = this.filteredGenres;
    params["textSearch"] = [];
    params["skip"] = this.skip;
    params["user"];

    this.publicationService.search(params).subscribe(
      data => {
        this.events = this.skip === 0 ? data : this.events.concat(data);
        this.skip = this.events.length;
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

  public onScroll() {
    this.search();
  }
  /**
   * Filter events according with selected genres.
   * Save the genres filtered index to future operations.
   *
   * @param genre     {Object} of selected label on view
   */
  public filterEvents (genre) {

    if (genre.genreSelected === false) {
      this.filteredGenres.push(genre.value);
      genre.genreSelected = true;
    } else {
      var index = this.filteredGenres.indexOf(genre.value);
      if (index > -1) { this.filteredGenres.splice(index, 1);}
      genre.genreSelected = false;
    }

    this.skip = 0;
    this.search();
  };

  /**
   * Clear the genre filter in TimeLine
   *
   */
  public clearFilter() {
    this.filteredGenres = [];
    this.listGenres.map(genre => genre.genreSelected = false);
    this.skip = 0;
    this.search();
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
