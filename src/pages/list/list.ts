import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  historiqueCode = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

  }

  ionViewDidEnter() {
    this.storage.get('Historique').then((val) => {
      this.historiqueCode = val;
      console.log(this.historiqueCode);
    });
  }
  
  clearStorage() {
    this.storage.clear();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

}
