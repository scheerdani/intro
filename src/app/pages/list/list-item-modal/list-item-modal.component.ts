import { ModalController } from '@ionic/angular';
import { ToDoList, ToDoItem } from './../../../classes/item-class';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item-modal',
  templateUrl: './list-item-modal.component.html',
  styleUrls: ['./list-item-modal.component.scss'],
})
export class ListItemModalComponent implements OnInit {
  itemList: ToDoList;
  editItem: ToDoItem;
  user: string;
  item: ToDoItem;
  
  constructor(public modalController: ModalController) { }

  ngOnInit() {
    /*
      If you pass in an 'editItem' property, then you create a copy to store changes to the existing item
      so that the original is not modified unless the user saves.
    */
   this.item = this.editItem ? Object.assign({}, this.editItem) : new ToDoItem({});
   console.log('Modal created');
  }

  save() {
    this.modalController.dismiss({
      itemList: this.itemList,
      /*
        You pass back either a newItem or editItem value depending on whether an edit operation is taking place
        so that the list module can decide whether to insert into the items array or splice into it.
      */
     newItem: !this.editItem? this.item: null,
     editItem: this.editItem? this.item: null
    });
    console.log("Modal want to save");
  }

  cancel(){
    this.modalController.dismiss({itemList: this.itemList});
    console.log("Modal was cancelled");
  }
}
