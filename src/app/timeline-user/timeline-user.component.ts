import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { HipsterTranslate } from '../services/hipster-translate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline-user',
  templateUrl: './timeline-user.component.html',
  styleUrls: ['./timeline-user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimelineUserComponent implements OnInit {

  @Input() event;
  public birthDate: string;

  constructor(private router: Router) { }

  ngOnInit() {
    let date = new Date(this.event.birthDate);
    this.birthDate = date.toLocaleString().split(" ")[0];
  }

  public seeProfile() {
    this.router.navigateByUrl('/user/' + this.event.username);
  }

}
