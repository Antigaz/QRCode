import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QrCodeProvider } from '../../providers/qr-code/qr-code';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Base64 } from '@ionic-native/base64';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [QrCodeProvider]
})
export class HomePage {

  qrData = null;
  createdCode = null;
  scannedCode = null;
  arrayCreatedCode = [];
  instantDate: String = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
  element: HTMLImageElement;

  constructor(public navCtrl: NavController, public qrCodeProvider: QrCodeProvider, private storage: Storage, private socialSharing: SocialSharing, private base64: Base64) {

  }

  createCode() {
    this.createdCode = this.qrData;
    console.log(this.createCode);
    this.saveCreatedCode(this.qrData);
  }

  saveCreatedCode(qrData) {
    // this.arrayCreatedCode.push(this.qrData);
    // console.log(this.arrayCreatedCode);

    this.storage.get('Historique').then((val) => {

      if (val !== null) {
        this.arrayCreatedCode = val;
      }
      else {
        this.arrayCreatedCode = [];
      }
      this.arrayCreatedCode.push([qrData, this.instantDate]);
      console.log(this.arrayCreatedCode);
      this.storage.set('Historique', this.arrayCreatedCode);
    })
  }

  getImage() {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    const imageData = canvas.toDataURL("image/jpeg").toString();
    return imageData;
  }

  shareQrCode(imageData) {
    this.socialSharing.share(this.qrData, "", this.getImage());
  }

  encode() {
    let filePath: string = 'data:image/jpeg;base64';
    this.base64.encodeFile(filePath).then((base64File: string) => {
      console.log(base64File);
    }, (err) => {
      console.log(err);
    });
  }

}
