import { Component, OnInit, Output, ViewEncapsulation, EventEmitter} from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { ActivatedRoute } from '@angular/router';
import { FormValidationService } from "../services/form-validation.service";
import { HipsterTranslate } from "../services/hipster-translate.service";
import { UserService } from "../services/user.service";
import { AlertService } from "../services/alert.service";
import { LoadIndicationComponent } from "../load-indication/load-indication.component";

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-create-post-home',
  templateUrl: './create-post-home.component.html',
  styleUrls: ['./create-post-home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreatePostHomeComponent implements OnInit {

  @Output() getAllPublications = new EventEmitter<string>();
  public publication;
  public colors: Object;
  public originalListGenres : Array<Object>;
  public listGenres : Array<Object>;
  public years : Array<number>;
  public selectedGenre: string;
  public ownerUsername: string;
  public errorInfo: Array<Object>;
  public requestErrors: Array<string>;

  constructor(private publicationService: PublicationService,
              private route: ActivatedRoute,
              private formValidation: FormValidationService,
              private hipsterTranslate: HipsterTranslate,
              private userService: UserService,
              private alertService: AlertService) {

    this.publication = {};
    this.colors = this.publicationService.getGenreColorObjects();
    this.listGenres = this.publicationService.getListGenres();
    this.originalListGenres =  this.listGenres.slice();
    this.selectedGenre = "genre";
    this.initSemanticValidationFormInfo()
    this.years = this.userService.getBirthdayYearsArray('1905');
  }

  ngOnInit() {
    this.alertService.hideLoadIndication();
    this.requestErrors = [];
    $('#genres_select').dropdown();
    $('#year_select').dropdown();
    $('#post_fade').transition('fade down');
  }

  public createPostModal(event) {
    this.publication = {genres : [], ownerUsername: ''};
    this.ownerUsername = '';
    this.publication["ownerUsername"] = window.localStorage.username;
    this.requestErrors = [];
    this.listGenres =  this.originalListGenres.slice();

    $('#genres_select').dropdown('clear');
    $('#year_select').dropdown('clear');

    $('#create-post').modal({
      onDeny    : function() { return true;}
    })
    .modal('setting', 'closable', false)
    .modal('show');

    event.stopPropagation();
  }

  public createPost() {
    this.initSemanticValidationForm();

    let genres = $('#genres_select').dropdown('get value').split(",");

    this.publication["genres"] = genres;

    let year = $('#year_select').dropdown('get value');
    this.publication["year"] = +year;

    if (this.isFormValid()) {
      this.alertService.showLoadIndication();
      this.publicationService.savePublication(this.publication).subscribe(
        data => {
          $('#create-post').modal('hide')
          this.alertService.hideLoadIndication();
          this.getAllPublications.emit();
        }, err => {
          this.alertService.hideLoadIndication();
          let errors = err.error.split(';');
          errors.splice(errors.length - 1, 1);
          this.hipsterTranslate.translateErrorsPublication(errors);
          this.requestErrors = errors;
        }
      );
    }

    return false;
  }

  private hideForm() {
    $('#post_fade').transition('fade down');
    this.publication.url = undefined;
  }

  private animateForm() {
    let status = $('#post_fade')[0].className.split(" ")[1]
    if (this.publication.url && status === "hidden") {
      $('#post_fade').transition('fade down');
    }
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
