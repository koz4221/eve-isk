import { Component } from '@angular/core';

import { SampleService } from './sample.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Eve ISK';

  constructor(
      public ss: SampleService
   ) {}
}
