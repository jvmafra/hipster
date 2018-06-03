import { Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import { UserService } from '../../services/user.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-upload-photo-modal',
  templateUrl: './upload-photo-modal.component.html',
  styleUrls: ['./upload-photo-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UploadPhotoModalComponent {
  
  @Input() imgSrc: string;
  @Output() imgSrcChange : EventEmitter<string>; 

  private userPhotoFile: File;
  private src: string;
  
  constructor(private userService: UserService) {
    this.src = "../assets/neutro.png";
    this.imgSrcChange = new EventEmitter<string>();
  }

  public createModal(event, src, file) {
    $('#upload-photo-modal').modal({
      onDeny    : function() { return true;},
      onApprove : () => {this.uploadPhoto()}
    })
    .modal('show');
    this.src = src;
    this.userPhotoFile = file;
    event.stopPropagation();
  }

  private uploadPhoto() {
    this.userService.uploadPhoto(this.userPhotoFile).subscribe(
      data => {
       this.imgSrc = data.toString();
       this.imgSrcChange.emit(this.imgSrc);
      }, err => {
       console.log(err)
      });
  }

}
