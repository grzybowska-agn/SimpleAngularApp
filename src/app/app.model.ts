export interface PokemonListItemRaw {
  name: string;
  url: string;
}

export interface PokemonListItem {
  name: string;
  id: number;
}

export interface ImageSprite {
  front_default: string;
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonDetails {
  name: string;
  sprites: ImageSprite[];
  stats: PokemonStat[];
}
