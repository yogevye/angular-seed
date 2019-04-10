import {Component} from '@angular/core';
import {ExampleComponent} from './example/example.component';
import {DialogService} from './dialog/services/dialog.service';
import {DialogConfig} from './dialog/dialog-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-test';

  constructor(public dialog: DialogService) {
    this.dialog.open(ExampleComponent, new DialogConfig({message: 'Miri'}));
    this.dialog.open(ExampleComponent, new DialogConfig({message: 'Yogev'}));
  }
}
