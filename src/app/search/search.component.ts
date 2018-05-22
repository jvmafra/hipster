import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicationService } from '../services/publication.service';
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
  private selectedOrder;

  constructor(private publicationService: PublicationService,
              private router: Router,
              private userService: UserService,
              private route: ActivatedRoute) {
    this.listGenres = this.publicationService.getListGenres();
    this.initGenreSelectedProperty();
    this.filteredGenres = [];
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

    this.search();
  };

  public getClass(genre) {
    return this.userService.getColor(genre);
  }

  public classifyBy(orderByParam) {
    if ([1,2,3,4].indexOf(orderByParam) !== -1) {
      this.selectedOrder = orderByParam;
      this.search();
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

       this.search();
    });
  }

  public clearFilter() {
    this.filteredGenres = [];
    this.listGenres.map(genre => genre.genreSelected = false);
    this.search();
  }

  public search() {
    let myParams = {};
    myParams["orderBy"] = this.selectedOrder;
    myParams["filterByGenres"] = this.filteredGenres;
    myParams["textSearch"] = this.queryText;

    this.publicationService.search(myParams).subscribe(
      data => {
        this.events = data;
        this.shownEvents = this.events;

        if (this.events.length == 0) { this.found = false; }

      }, err => {
        this.found = false;
        console.log(err)
      }
    );
  }

}
