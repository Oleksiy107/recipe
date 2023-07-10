class Recipe {
  constructor(name, ingredients, description, cookingTime) {
    this.name = name;
    this.ingredients = ingredients;
    this.description = description;
    this.cookingTime = cookingTime;
  }

  isValid() {
    return (
      this.name && this.ingredients.length > 0 && this.cookingTime > 0
    );
  }
}

class RecipeBook {
  recipes = [];

  addRecipe(recipe) {
    if (recipe.isValid()) {
      this.recipes.push(recipe);
      alert(`Recipe "${recipe.name}" added to the recipe book.`);
    } else {
      alert(`Invalid recipe "${recipe.name}". Recipe not added.`);
    }
  }

  findRecipesByTime(time) {
    const foundRecipes = this.recipes.filter(
      (recipe) => recipe.cookingTime <= time
    );
    return foundRecipes;
  }

  findRecipesByIngredients(ingredients) {
    const foundRecipes = this.recipes.filter((recipe) => {
      return ingredients.every((ingredient) =>
        recipe.ingredients.includes(ingredient)
      );
    });
    return foundRecipes;
  }
}


const recipeBook = new RecipeBook();


function addRecipeByUser() {
  const name = prompt("Enter recipe name:");
  const ingredientsInput = prompt(
    "Enter ingredients (separated by commas):"
  );
  const ingredients = ingredientsInput.split(",").map((item) => item.trim());
  const description = prompt("Enter recipe description:");
  const cookingTime = parseInt(
    prompt("Enter cooking time (in minutes):")
  );

  const recipe = new Recipe(name, ingredients, description, cookingTime);
  recipeBook.addRecipe(recipe);
}

function findRecipesByTime() {
  const time = parseInt(prompt("Enter maximum cooking time (in minutes):"));
  const recipesByTime = recipeBook.findRecipesByTime(time);

  let message = `Recipes with cooking time <= ${time} minutes:\n`;
  recipesByTime.forEach((recipe) => {
    message += `${recipe.name}\n`;
  });

  alert(message);
}


function findRecipesByIngredients() {
  const ingredientsInput = prompt(
    "Enter ingredients to search (separated by commas):"
  );
  const ingredients = ingredientsInput.split(",").map((item) => item.trim());
  const recipesByIngredients = recipeBook.findRecipesByIngredients(
    ingredients
  );

  let message = `Recipes with ingredients: ${ingredients.join(", ")}\n`;
  recipesByIngredients.forEach((recipe) => {
    message += `${recipe.name}\n`;
  });

  alert(message);
}


let isRunning = true;
while (isRunning) {
  const userInput = prompt(
    "Enter the option number:\n1. Add a recipe\n2. Find recipes by cooking time\n3. Find recipes by ingredients\n4. Exit"
  );

  switch (userInput) {
    case "1":
      addRecipeByUser();
      break;
    case "2":
      findRecipesByTime();
      break;
    case "3":
      findRecipesByIngredients();
      break;
    case "4":
      isRunning = false;
      break;
    default:
      alert("Invalid option. Please try again.");
  }
}
