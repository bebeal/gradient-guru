import dynamic from 'next/dynamic';
import { cn } from '@/utils';
import { IconSetMap } from '../IconSet';

const bug = dynamic(() => import('@/public/icons/PokemonTypes/bug.svg'));
const dark = dynamic(() => import('@/public/icons/PokemonTypes/dark.svg'));
const dragon = dynamic(() => import('@/public/icons/PokemonTypes/dragon.svg'));
const electric = dynamic(() => import('@/public/icons/PokemonTypes/electric.svg'));
const fairy = dynamic(() => import('@/public/icons/PokemonTypes/fairy.svg'));
const fighting = dynamic(() => import('@/public/icons/PokemonTypes/fighting.svg'));
const fire = dynamic(() => import('@/public/icons/PokemonTypes/fire.svg'));
const flying = dynamic(() => import('@/public/icons/PokemonTypes/flying.svg'));
const ghost = dynamic(() => import('@/public/icons/PokemonTypes/ghost.svg'));
const grass = dynamic(() => import('@/public/icons/PokemonTypes/grass.svg'));
const ground = dynamic(() => import('@/public/icons/PokemonTypes/ground.svg'));
const ice = dynamic(() => import('@/public/icons/PokemonTypes/ice.svg'));
const normal = dynamic(() => import('@/public/icons/PokemonTypes/normal.svg'));
const poison = dynamic(() => import('@/public/icons/PokemonTypes/poison.svg'));
const psychic = dynamic(() => import('@/public/icons/PokemonTypes/psychic.svg'));
const rock = dynamic(() => import('@/public/icons/PokemonTypes/rock.svg'));
const steel = dynamic(() => import('@/public/icons/PokemonTypes/steel.svg'));
const water = dynamic(() => import('@/public/icons/PokemonTypes/water.svg'));

// for ordering/sorting
export const pokemonTypeOrder = ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];

export const PokemonTypesIconSet: IconSetMap = Object.fromEntries(
  Object.entries({
    bug,
    dark,
    dragon,
    electric,
    fairy,
    fighting,
    fire,
    flying,
    ghost,
    grass,
    ground,
    ice,
    normal,
    poison,
    psychic,
    rock,
    steel,
    water,
  }).map(([typeString, TypeIcon]: [string, any]) => {
    return [
      typeString,
      (props: any) => (
        <div className="flex h-full w-auto justify-center items-center">
          <div className={cn(`pkmn-type-${typeString} pkmn-type-icon flex items-center justify-center h-auto`, props?.className)}>
            <div className="transform scale-[0.7] flex items-center justify-center h-full">
              <TypeIcon width="100%" height="100%" {...props} fill="white" viewBox="0 0 512 512" />
            </div>
          </div>
        </div>
      ),
    ];
  }),
);

export const PokemonTypes = Object.keys(PokemonTypesIconSet);
export type PokemonTypeIcon = keyof typeof PokemonTypesIconSet;
