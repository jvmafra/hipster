import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CreatePostModalComponent } from '../create-post-modal/create-post-modal.component'
import { ViewChild } from '@angular/core';
import { PublicationService } from '../services/publication.service';

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

  constructor(private publicationService: PublicationService) { }

  ngOnInit() {
    this.publicationService.getAllPublications().subscribe(
      data => {
        this.events = data;
      }, err => {
        console.log(err)
      }
    );
  }

}
