// Get Data form server //
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
            <h2 class="mealName">${eachMeal.strMeal}</h2>
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
        .then(data => eachMealDetail(data))
}


// Get each meal ingredientList and others //
const eachMealDetail = eachMeal => {
    const mealDetailArea = document.getElementById('mealDetailArea');
    mealDetailArea.innerHTML = `
    <img src="${eachMeal.meals[0].strMealThumb}">
    <div class="ingredientList">
        <h2 class="mealName">${eachMeal.meals[0].strMeal}</h2>
        <ul>
            <li>${eachMeal.meals[0].strIngredient1}</li>
            <li>${eachMeal.meals[0].strIngredient2}</li>
            <li>${eachMeal.meals[0].strIngredient3}</li>
            <li>${eachMeal.meals[0].strIngredient4}</li>
            <li>${eachMeal.meals[0].strIngredient5}</li>
        </ul>
    </div>
    `
}


// Error Message //
const displayErrorMessage = () => {
    document.getElementById('errorMessage').innerText = "Sorry.!!! we don't have that meal :)";
}