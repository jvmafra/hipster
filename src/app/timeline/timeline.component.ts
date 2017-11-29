import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimelineComponent implements OnInit {

  private events: [any];

  constructor() { }

  ngOnInit() {
    this.events = [
      {
        id: 0,
        owner_username: "gab",
        url: "https://www.youtube.com/watch?v=mN1hJXzJyNU",
        title: "HONNE - SOMEONE THAT LOVES YOU | A COLORS SHOW",
        description: "We had the great pleasure to welcome HONNE in our studio! The UK electro-soul duo brought the wonderful Naomi along to perform their new single 'Someone That Loves You' (release date: 22.7.)!",
        creationDate: "28/11/2017",
        genres: ["Pop"],
        aproves: ["gab", "rafa", "gila", "mafra", "job", "guga"]
      },
      {
        id: 1,
        owner_username: "gab",
        url: "https://www.youtube.com/watch?v=ffzbacDuawI",
        title: "Tom Misch - Man Like You (Patrick Watson Cover) | A COLORS SHOW",
        description: "Ladies and Gentlemen... Tom Misch! (& Tobie Tripp on violin!)",
        creationDate: "28/11/2017",
        genres: ["Classic"],
        aproves: ["gab", "rafa", "gila"]
      }
    ]
  }

}
