import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QrCodeProvider } from '../../providers/qr-code/qr-code';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { FileChooser } from '@ionic-native/file-chooser';

@Component({
  selector: 'page-reader',
  templateUrl: 'reader.html',
  providers: [QrCodeProvider]
})
export class ReaderPage {

  scannedCode = null;
  private decoded: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, private fileChooser: FileChooser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReaderPage');
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  scanFile() {
    this.fileChooser.open()
      .then(uri => {
        let canvas = document.createElement('canvas'),
          context = canvas.getContext('2d'),
          image = new Image();
        image.src = uri;
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        let data = context.getImageData(0, 0, canvas.width, canvas.height);
        console.log(typeof data);
      })
      .catch(e => console.log(e));

  }


  
  scanQR() {
    this.barcodeScanner.scan().then(data => this.decoded = data.text)
  }

  decodeFile() {
    this.scanFile();
  }

}
