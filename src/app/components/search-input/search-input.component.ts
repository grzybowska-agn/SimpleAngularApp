import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  userInput = '';
  placeholder = 'type a number';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  goToPokemon(): void {
    this.router.navigateByUrl(`/pokemon/${this.userInput}`)
      .then(() => this.userInput = '');
  }
}
