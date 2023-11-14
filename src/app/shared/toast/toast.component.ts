import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnChanges {

  @Input() raise!: boolean;
  @Input() message!: string;
  @Input() type!: string;


  ngOnChanges() {
    console.log(this.raise);
  }

}
