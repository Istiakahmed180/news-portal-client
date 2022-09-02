// all news category link:https://openapi.programming-hero.com/api/news/categories

// news category data load 
const newsCategortData = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await response.json();
    return data.data.news_category;
}

const displayNewsCategory = async () => {
    const categoryData = await newsCategortData();

    const categoriesConteiner = document.getElementById("category-container");
    categoryData.forEach(element => {
        const li = document.createElement("li");
        li.innerHTML = `
            <a onclick="allCategoryId('${element.category_id}')">${element.category_name}</a>
        `;
        categoriesConteiner.appendChild(li);
    });

}
displayNewsCategory()

const allCategoryId = async (category_id) => {

    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryId(data.data))
}

const displayCategoryId = datas => {

    console.log(datas)
    const categoryIdConteiner = document.getElementById("category-id-container");
    categoryIdConteiner.textContent = ``;
    for (const id of datas) {

        const { image_url, title, details } = id
        const div = document.createElement("div");
        div.innerHTML = `
            <figure class="px-10 pt-10">
                <img  src="${image_url}" alt="Shoes" class="rounded-xl w-full" />
            </figure>
            <div class="card-body items-center text-center">
                    <h2 class="card-title text-gray-800 font-bold">${title}</h2>
                    <p>${details.slice(0, 350) + "..."}</p>
                <div class="card-actions">
                    <button class="btn btn-primary">Details</button>
                </div>
            </div>
        `;
        categoryIdConteiner.appendChild(div)
    }
}


