import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Recipe } from '../recipe'
import { RecipeService } from '../recipe.service'

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.recipeService.getRecipe(id)
      .subscribe(recipe => this.recipe = recipe);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void { 
    this.recipeService.updateRecipe(this.recipe)
      .subscribe(() => this.goBack());
  }
}
