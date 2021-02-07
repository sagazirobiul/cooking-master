// Get Data form server
const submit = document.getElementById('submit');
submit.addEventListener('click', function () {
const inputValue = document.getElementById('inputValue').value;
const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
fetch(url)
    .then(res => res.json())
    .then(data => mealsData(data.meals));

})

// Get Meals Data
const mealsData = meal => {
    meal.forEach(eachMeal => {
        const mealsDiv = document.getElementById('mealsDiv')
        const div = document.createElement('div');
        div.className = 'mealPack'
        const mealInfo = `
        <div onclick="getDetail(${eachMeal.strMeal})">
            <img src="${eachMeal.strMealThumb}">
            <h2 class="mealName">${eachMeal.strMeal}</h2>
        </div>
        `
        div.innerHTML = mealInfo;
        mealsDiv.appendChild(div)
    });
}
