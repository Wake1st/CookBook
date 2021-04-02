import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipeService.getRecipes()
    .subscribe(recipes => this.recipes = recipes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.recipeService.addRecipe({ name } as Recipe)
      .subscribe(recipe => {
        this.recipes.push(recipe);
      });
  }

  delete(recipe: Recipe): void {
    this.recipes = this.recipes.filter(r => r !== recipe);
    this.recipeService.deleteRecipe(recipe.id).subscribe();
  }

}
