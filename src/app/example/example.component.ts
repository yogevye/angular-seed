import {Component, OnInit} from '@angular/core';
import {DialogConfig} from '../dialog/dialog-config';
import {DialogRef} from '../dialog/dialog-ref';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {
  public text: string;
  public i = 0;

  constructor(public config: DialogConfig, public dialogRef: DialogRef) {
  }

  ngOnInit() {
    setInterval(() => {
      this.text = this.i.toString();
      this.i++;
    }, 1000);
  }

  onClose() {
    this.dialogRef.close();
  }
}
