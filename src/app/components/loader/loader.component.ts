import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  shouldShowLoader$: Observable<boolean>;

  ngOnInit(): void {
    this.shouldShowLoader$ = new Observable<boolean>(subscriber => {
      setTimeout(() => {
        subscriber.next(true);
      }, 500);
    }).pipe(startWith(false));
  }
}
