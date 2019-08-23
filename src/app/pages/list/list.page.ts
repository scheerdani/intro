import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Events} from '@ionic/angular';

import { ToDoItem, ToDoList} from '../../classes/item-class';
import { ListItemModalComponent } from './list-item-modal/list-item-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  modal: any;
  data: any;
  user: any;
  itemList: ToDoList;
  signedIn: boolean;

  constructor(public modalController: ModalController, events: Events) {
    //Listen to changes to the AuthState in order to change item list appropriately
    events.subscribe('data:AuthState', async (data) => {
      if (data.loggedIn) {
        this.getItems();
      } else {
        // this.itemList.items = []
      }
    })
   }

  async ngOnInit() {
    this.getItems();
    console.log('Initializing list')
  }

  async modify(item, i) {
    let props = {
      itemList: this.itemList,
       /*
        We pass in an item parameter only when the user clicks on an existing item
        and therefore populate an editItem value so that our modal knows this is an edit operation.
      */
     editItem: item || undefined
    };

    // Create the modal
    this.modal = await this.modalController.create({
      component: ListItemModalComponent,
      componentProps: props
    });
    // Listen for the modal to be closed...
    this.modal.onDidDismiss().then((result) => {
      if (result.data.newItem) {
        // ... and add a new item if modal passes back newItem
        console.log("Add operation");
        result.data.itemList.items.push(result.data.newItem);
      } else if (result.data.editItem) {
        // ... or splice the items array if the modal passes back editItem
        console.log("Edit operation");
        result.data.itemList.items[i] = result.data.editItem;
      }
      this.save(result.data.itemList);
    });
    return this.modal.present();
  }

  delete(i) {
    this.itemList.items.splice(i,1);    
    // this.save(this.itemList);
    console.log("deleted item " + i);
  }

  complete(i){
    this.itemList.items[i].status = 'complete';
    // this.save(this.itemList);
  }

  save(list){
    //Use AWS Amplify to save the list...
    console.log("updating list");
    this.itemList = list;
  }

  getItems(){
    this.itemList = {
      userId: 1,
      items: [
        new ToDoItem({
          id: '1',
          title: 'test item 1',
          description: 'my test item 1',
          status: 'complete'
        }),
        new ToDoItem({
          id: '2',
          title: 'test item 2',
          description: 'my test item 2',
          status: 'pending'
        })
      ]
    }
  }
}
