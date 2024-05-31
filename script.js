document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const mealContainer = document.getElementById('meal');
    const loader = document.getElementById('loader');
    const notFound = document.getElementById('not-found');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.trim().charAt(0).toLowerCase();
        loader.classList.remove("d-none");
        notFound.classList.add("d-none");
        mealContainer.classList.add("d-none");

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchTerm}`)
            .then(res => res.json())
            .then(data => {
                loader.classList.add("d-none");
                mealContainer.classList.remove("d-none");
                if (data.meals) {
                    showAllData(data.meals);
                } else {
                    notFound.classList.remove("d-none");
                }
            })
            .catch(error => {
                notFound.classList.remove("d-none");
                loader.classList.add("d-none");
                mealContainer.classList.add("d-none");
                console.error('Error fetching data:', error);
            });
    });

    function showAllData(data) {
        mealContainer.innerHTML = "";
        data.forEach(singleData => {
            const div = document.createElement("div");
            div.classList.add("meal-item");
            div.innerHTML = `
                <div class="meal-img">
                    <img src="${singleData.strMealThumb}" alt="${singleData.strMeal}">
                </div>
                <div class="meal-name">
                    <h3>${singleData.strMeal}</h3>
                    <button class="recipe-btn" onclick="handleDetails(${singleData.idMeal})">Get Recipe</button>
                </div>
            `;
            mealContainer.appendChild(div);
        });
    }
});

function handleDetails(idMeal) {
    // Handle the recipe details display
    alert(`Display details for meal ID: ${idMeal}`);
}
