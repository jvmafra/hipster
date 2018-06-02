import { Component, OnInit, Output, ViewEncapsulation, EventEmitter} from '@angular/core';
import { UserService } from '../../services/user.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-upload-photo-modal',
  templateUrl: './upload-photo-modal.component.html',
  styleUrls: ['./upload-photo-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UploadPhotoModalComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  imageSRC = "../assets/neutro.png";

  private userPhotoFile: File;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  public createModal(event, src, file) {
    $('#upload-photo-modal').modal({
      onDeny    : function() { return true;},
      onApprove : () => {this.uploadPhoto()}
    })
    .modal('show');
    this.imageSRC = src;
    this.userPhotoFile = file;
    event.stopPropagation();
  }

  private uploadPhoto() {
    this.userService.uploadPhoto(this.userPhotoFile).subscribe(
      data => {
       console.log("here");
      }, err => {
       console.log("wrong")
      });
  }

}
