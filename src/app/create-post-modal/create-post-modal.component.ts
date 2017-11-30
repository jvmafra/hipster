import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreatePostModalComponent implements OnInit {
  private genres : Array<String>
  private publication: Object;
  private colors: any;
  //@TODO Study and improve this types
  private originalListGenres : any;
  private listGenres : any;
  private selectedGenre: String;

  constructor() {
    this.genres = []
    this.publication = {};
    this.colors = {
      'Pop': 'red',
      'Rock': 'orange',
      'Funk': 'yellow',
      'Rap': 'olive',
      'Reggae': 'green',
      'Classic': 'teal',
      'b': 'blue',
      'c': 'violet',
      'd': 'purple',
      'e': 'pink',
      'f': 'brown',
      'g': 'grey',
      'h': 'black'
    };
    this.listGenres = [ {name: "Pop", value:"Pop"},
                        {name: "Rock", value:"Rock"},
                        {name: "Funk", value:"Funk"},
                        {name: "Rap", value:"Rap"},
                        {name: "Reggae", value:"Reggae"},
                        {name: "Classic", value:"Classic"}]
    this.originalListGenres =  this.listGenres.slice();
    this.selectedGenre = "genre";
  }

  ngOnInit() {
  }

  public createPostModal(event) {
    $('#create-post').modal({
      onDeny    : function() { return true;},
      onApprove : () => { this.createPost() }
    })
    .modal('setting', 'closable', false)
    .modal('show');

    event.stopPropagation();
  }

  private createPost() {

  }

  private getClass(genre) {
    return this.colors[genre];
  }

  private addGenre(selectedGenre : String) {
    let index : any;

    for (index in this.listGenres) {
      if (this.listGenres[index].value === selectedGenre) {
        this.genres.push(selectedGenre);
        this.listGenres.splice(index, 1);
        this.selectedGenre = "genre";
        return;
      }
    }
  }

  private removeGenre(selectedGenre : String) {
    let index : any;

    for (index in this.originalListGenres) {
      if (this.originalListGenres[index].value === selectedGenre) {
        this.listGenres.push(this.originalListGenres[index]);
        this.genres.splice(index, 1);
        return;
      }
    }
  }

  private savePublication() {
      
  }

}
