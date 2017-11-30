import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { ActivatedRoute } from '@angular/router';
import { FormValidationService } from "../services/form-validation.service";
import { HipsterTranslate } from "../services/hipster-translate.service";

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreatePostModalComponent implements OnInit {
  private publication: Object;
  private colors: any;
  //@TODO Study and improve this types
  private originalListGenres : any;
  private listGenres : any;
  private selectedGenre: String;
  private ownerUsername: String;
  private errorInfo: Array<Object>;
  private requestErrors: Array<String>;

  constructor(private publicationService: PublicationService,
              private route: ActivatedRoute,
              private formValidation: FormValidationService,
              private hipsterTranslate: HipsterTranslate) {
    this.publication = {};
    this.colors = this.publicationService.getGenreColorObjects();
    this.listGenres = this.publicationService.getListGenres();
    this.originalListGenres =  this.listGenres.slice();
    this.selectedGenre = "genre";
    this.initSemanticValidationFormInfo()

  }

  ngOnInit() {
    this.requestErrors = [];
    $('.ui.dropdown')
      .dropdown()
    ;
  }

  public createPostModal(event) {
    this.publication = {genres : [], ownerUsername: ''};
    this.ownerUsername = '';
    this.publication["ownerUsername"] = window.localStorage.username;
    this.requestErrors = [];
    this.listGenres =  this.originalListGenres.slice();

    $('#genres_select')
      .dropdown('clear');

    $('#create-post').modal({
      onDeny    : function() { return true;}
    })
    .modal('setting', 'closable', false)
    .modal('show');


    event.stopPropagation();
  }

  private createPost() {
    this.initSemanticValidationForm();

    let genres = $('#genres_select')
      .dropdown('get value').split(",");

    this.publication["genres"] = genres;

    if (this.isFormValid() ) {
      this.publicationService.savePublication(this.publication).subscribe(
        data => {
          $('#create-post').modal('hide')
          window.location.href = "/"
        }, err => {
          let errors = err.error.split(';');
          errors.splice(errors.length - 1, 1);
          this.hipsterTranslate.translateErrorsPublication(errors);
          this.requestErrors = errors;
        }
      );
    }

    return false;
  }

  private getClass(genre) {
    return this.colors[genre.name];
  }

  private isFormValid() {
    return $('#post-form').form('is valid');
  }

  private initSemanticValidationFormInfo() {
    this.errorInfo = [{"input": "url", errors: ['empty'], prompt : ["ERRORS.PUBLICATION.URL"]}]

  }

  private initSemanticValidationForm() {
    let data = this.formValidation.getFormValidationVariables(this.errorInfo);
    $('#post-form').form(data);
  }

}