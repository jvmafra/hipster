import { Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import { UserService } from '../../services/user.service';
import { Croppie } from 'croppie/croppie'; 
import { AlertService } from "../../services/alert.service";

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
  @Output() updateTimeline = new EventEmitter<string>();
  @Output() imgSrcChange : EventEmitter<string>; 

  private userPhotoFile: File;
  public src: string;
  private croppieResult;
  private fileName: string;
  croppie: any;

  constructor(private userService: UserService,
              private alertService: AlertService) {
    this.src = "../assets/neutro.png";
    this.imgSrcChange = new EventEmitter<string>();
  }

  public createModal(event) {
    $('#upload-photo-modal').modal({
      onDeny    : function() { return true;},
      onApprove : () => {this.uploadPhoto()}
    })
    .modal('show');

    if (!this.croppie) {
      this.startCroppie();
    }
    event.stopPropagation();
  }

  public onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.userPhotoFile = file;
        this.fileName = file.name;
        this.src = e.target["result"];
        this.croppie.bind({
          url: this.src,
          zoom: 0.5
        });
      };
    }


  }

  private startCroppie() {
    const cropElement = document.getElementById('photo');

    this.croppie = new Croppie(cropElement, {
      viewport: { width: 300, height: 300, type: 'square' },
      boundary: { width: 350, height: 350 },
    });

    this.croppie.bind({
      url: this.src
    });
  }



  private uploadPhoto() {
    this.croppie.result('blob').then((blob) => {
      this.uploadToApi(blob);
    });
  }

  private uploadToApi(blob) {
    this.alertService.showLoadIndication();
    this.userService.uploadPhoto(blob).subscribe(
      data => {
       this.imgSrc = data.toString();
       this.imgSrcChange.emit(this.imgSrc);
       this.userService.storePhotoUrl(this.imgSrc);
       this.alertService.hideLoadIndication();
       this.updateTimeline.emit();
      }, err => {
       console.log(err);
       this.alertService.hideLoadIndication();
    });
  }

}
