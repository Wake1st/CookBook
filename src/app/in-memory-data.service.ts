import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const recipes = [
      { id: 1, name: 'Tacos' },
      { id: 2, name: 'Plant-burger' },
      { id: 3, name: 'Scrabbled Eggs' }
    ];
    return {recipes};
  }

  genId(recipes: Recipe[]): number {
    return recipes.length > 0 ? Math.max(...recipes.map(recipe => recipe.id)) + 1 : 11;
  }
}
