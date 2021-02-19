// Get Data from server //
const searchMeal = () => {
    const inputValue = document.getElementById('inputValue').value;
    if (inputValue === '') {
        alert('Please fill out the search box :)')
        document.getElementById('mealsDiv').style.display = "none";
    } else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
        fetch(url)
            .then(res => res.json())
            .then(data => mealsData(data.meals))
            .catch(error => displayErrorMessage())
    }
}


// Get Meals Data //
const mealsData = meal => {
    const mealsDiv = document.getElementById('mealsDiv')
    mealsDiv.innerHTML = '';
    document.getElementById('errorMessage').innerText = "";
    meal.forEach(eachMeal => {
        const div = document.createElement('div');
        div.className = 'mealPack'
        const mealInfo = `
        <div onclick="getDetail('${eachMeal.strMeal}')">
            <img src="${eachMeal.strMealThumb}">
            <h2 class="mealName my-3">${eachMeal.strMeal}</h2>
        </div>
        `
        div.innerHTML = mealInfo;
        mealsDiv.appendChild(div)
    });
}


//Get each meal data //
const getDetail = (mealName) => {
    document.getElementById("inputBox").style.display = "none";
    document.getElementById("mealsDiv").style.display = "none";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => eachMealDetail(data.meals[0]))
}


// Get each meal ingredientList and others //
const eachMealDetail = eachMeal => {
    const strIngredient = [];
    for (let i = 1; i <= 20 ; i++) {
        if(eachMeal[`strIngredient${i}`]){
            strIngredient.push(`${eachMeal[`strIngredient${i}`]}`);
        }
    }
    const mealDetailArea = document.getElementById('mealDetailArea');
    mealDetailArea.innerHTML = `
    <img src="${eachMeal.strMealThumb}">
    <div class="ingredientList">
        <h2 class="mealName my-3">${eachMeal.strMeal}</h2>
        <ul>
            ${strIngredient.map(ingredient =>`<li>${ingredient}</li>`).join(' ')}
        </ul>
    </div>
    `
}


// Error Message //
const displayErrorMessage = () => {
    document.getElementById('errorMessage').innerText = "Sorry.!!! we don't have that meal :)";
}
