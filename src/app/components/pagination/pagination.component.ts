import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() activePage: number;
  @Input() totalPages: number;
  @Output() changePage = new EventEmitter<number>();

  pages: number[];

  ngOnChanges() {
    this.getPages();
  }

  getPages() {
    this.pages = Array.from(
      { length: 3 },
      (val, i) => {
        if (this.activePage <= 3) {
          return i + 1;
        }
        if (this.activePage > this.totalPages - 3) {
          return i + this.totalPages - 2;
        }
        return this.activePage + i - 1;
      }
    );
  }

  onPageChange(page: number) {
    this.changePage.emit(page);
  }

}
