import { Component, Input } from '@angular/core';
import { PokemonListItem } from '../../app.model';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.scss'],
})
export class PokemonListItemComponent {
  @Input() item: PokemonListItem;
}
