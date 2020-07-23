import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "src/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      "Tasty Schnitzel",
      "Tasty Schnitzel - just awesome",
      "https://assets.bonappetit.com/photos/57ae1afd53e63daf11a4e26f/2:1/w_880,c_limit/chicken-schnitzel.jpg?mbid=social_retweet",
      [new Ingredient("Meat", 1), new Ingredient("French Fries", 20)]
    ),
    new Recipe(
      "Big Fat Burguer",
      "Big Fat Burguer - tasty",
      "data:image/jpeg;base64,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",
      [new Ingredient("Meat", 1), new Ingredient("Buns", 2)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
