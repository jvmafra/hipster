import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicationService } from '../services/publication.service';
import { SearchService } from '../services/search.service';
import { UserService } from "../services/user.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

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
  public found: boolean = true;
  public queryText: string;
  public oldQuery: string;
  private skip;
  private selectedOrder;

  constructor(private publicationService: PublicationService,
              private searchService: SearchService,
              private router: Router,
              private userService: UserService,
              private route: ActivatedRoute) {
    this.listGenres = this.publicationService.getListGenres();
    this.initGenreSelectedProperty();
    this.filteredGenres = [];
    this.skip = 0;
    this.events = [];
    this.shownEvents = [];
    this.selectedOrder = this.ORDER_BY_MOST_RECENT;
  }

  private initGenreSelectedProperty() {
    for (let index in this.listGenres) {
      this.listGenres[index].genreSelected = false;
    }
  }

  public filterEvents (genre) {

    if (genre.genreSelected === false) {
      this.filteredGenres.push(genre.value);
      genre.genreSelected = true;
    } else {
      var index = this.filteredGenres.indexOf(genre.value);
      if (index > -1) { this.filteredGenres.splice(index, 1);}
      genre.genreSelected = false;
    }

    if (this.filteredGenres.length > 0) {
      this.searchPublications(0);
    } else {
      this.events = [];
      this.shownEvents = []; 
      this.searchAll(0);
    }

  };

  public getClass(genre) {
    return this.userService.getColor(genre);
  }

  public classifyBy(orderByParam) {
    if ([1,2,3,4].indexOf(orderByParam) !== -1) {
      this.selectedOrder = orderByParam;
      this.searchPublications(0);
    }
  }

  public isSelected (genre) {
    if (!genre && this.filteredGenres.length === this.NO_FILTERED_GENRES) {
      return "blue";
    } else if (!genre) {
      return "";
    }

    return genre.genreSelected === true ? "blue" : "";
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
       let queryTextSearch = params["params"].q;
       this.queryText = queryTextSearch;

       if (this.queryText != this.oldQuery) {
         this.events = [];
         this.shownEvents = [];
       }

       this.found = true;
       this.searchAll(0);
    });
  }

  public clearFilter() {
    this.filteredGenres = [];
    this.listGenres.map(genre => genre.genreSelected = false);
    this.searchAll(0);
    this.skip = 0;
  }

  public searchAll(skip) {
    let myParams = {};

    this.oldQuery = this.queryText;
    myParams["textSearch"] = this.queryText;
    myParams["skip"] = skip;
    myParams["user"];

    this.searchService.search(myParams).subscribe(
      data => {

        this.events = this.skip === 0 ? data : this.events.concat(data);
        this.skip = this.events.length;
        this.shownEvents = this.events;

        if (this.events.length === 0) { this.found = false; }
        else { this.found = true; }

      }, err => {
        this.found = false;
        console.log(err)
      }
    );
  }

  public onScroll() {
    if (this.filteredGenres.length > 0) {
      this.searchPublications(this.skip);
    } else {
      this.searchAll(this.skip);
    }
  }

  public searchPublications(skip) {
    let myParams = {};
    myParams["orderBy"] = this.selectedOrder;
    myParams["filterByGenres"] = this.filteredGenres;
    myParams["textSearch"] = this.queryText;
    myParams["skip"] = skip;
    myParams["user"];

    this.publicationService.searchByText(myParams).subscribe(
      data => {
        this.events = this.skip === 0 ? data : this.events.concat(data);
        this.events = data;
        this.shownEvents = this.events;

        if (this.events.length == 0) { this.found = false; }
        else { this.found = true };

      }, err => {
        this.found = false;
        console.log(err)
      }
    );
  }

}
