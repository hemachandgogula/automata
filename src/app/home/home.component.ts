import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  note: any;
  changetitle: boolean;
  changetext: boolean;
  count = 1;
  searchvalue: any;
  editValue: any;
  openbar: boolean;
  items: any[];
  constructor() {
  }
  ngOnInit() {
    // Initialization of fields
    this.searchvalue = '';
    this.editValue = '';
    this.items = [];
    let myItem = JSON.parse(localStorage.getItem('notes'));
    if (myItem) {
      this.count = myItem.length > 0 ? myItem.length : 1;
      this.items = myItem;
    } else {
      for (let i = 0; i < this.count; i++) {
        this.addItem(i);
      }
    }
    this.note = this.items[0];
    this.openNav();
  }
  /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
  openNav() {
    console.log(window.innerWidth);
    document.getElementById("mySidebar").style.width = `${(window.innerWidth) * 0.3}px`;
    document.getElementById("main").style.marginLeft = `${(window.innerWidth) * 0.3}px`;
    this.openbar = true;
  }
  // change the side bar on window resize
  onResize() {
    if ((window.innerWidth) <= 450) {
      this.closeNav();
    } else {
      this.openNav();
    }
  }

  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  closeNav() {
    this.openbar = false;
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  // add a note on click
  addItem(i) {
    this.items.push({
      id: i, text: 'No additional text', title: 'New Note'
    });
  }

  //select a note
  selecteditem(e, label?) {
    if(label) {
      if(label == 'text'){
        this.searchvalue = '';
        this.changetitle = false;
        this.changetext = true;
        this.editValue = e.text === 'No additional text' ? '' : e.text;
        this.note = e;
        document.getElementById("editValue").focus();
      } else{
        this.changetitle = true;
        this.changetext = false;
        this.editValue = e.title === 'New Note' ? '' : e.title;
        this.note = e;
        document.getElementById("editValue").focus();
      }
    } else {
      this.editValue = e.title === 'New Note' ? '' : e.title;
      this.changetitle = true;
      this.changetext = false;
      this.note = e;
      document.getElementById("editValue").focus();
    }

  }
  changed(e) {
    
      if (this.note !== undefined) {
        if(this.changetitle){
          this.note.title = e.target.value;
        } else {
          this.note.text = e.target.value;
        }
      }
      localStorage.setItem('notes', JSON.stringify(this.items));
  }

  // search for the word in the notes
  search() {
    let i = 0, j;
    this.editValue = '';
    let searchList = [];
    let nonSearchList = [];
    for (i = 0; i < this.items.length; i++) {
      if (this.items[i].text.includes(this.searchvalue) || this.items[i].title.includes(this.searchvalue)) {
        searchList.push(this.items[i]);
      }
      else {
        nonSearchList.push(this.items[i]);
      }
    }
    if (searchList.length) {
      for (i = 0; i < searchList.length; i++) {
        searchList[i].id = i;
      }
    }
    if (nonSearchList.length) {
      for (i = searchList.length, j = 0; j < nonSearchList.length; j++) {
        nonSearchList[j].id = i++;
        searchList.push(nonSearchList[j]);
      }
    }
    this.items = searchList;
    localStorage.setItem('notes', JSON.stringify(this.items));
    this.note = this.items[0];
  }

  add() {
    this.addItem(this.count);
    this.note = this.items[this.count];
    this.selecteditem(this.note);
    this.count++;
    localStorage.setItem('notes', JSON.stringify(this.items));
  }
  delete() {
    let i;
    let newitems = [];
    for (i = 0; i < this.items.length; i++) {
      if (this.items[i].id === this.note.id) {
        break;
      }
    }
    this.items.splice(i, 1);
    for (i = 0; i < this.items.length; i++) {
      this.items[i].id = i;
      newitems.push(this.items[i]);
    }
    this.items = newitems;
    if (this.items.length === 0) {
      this.items = [];
      this.addItem(0);
    }
    console.log(this.items);
    this.note = this.items[0];
    this.selecteditem(this.note);
    localStorage.setItem('notes', JSON.stringify(this.items));
    this.count = this.items.length;
  }
}
