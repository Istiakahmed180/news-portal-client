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

const allCategoryId = category_id => {

    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryId(data.data))
}

const displayCategoryId = datas => {


    const categoryIdConteiner = document.getElementById("category-id-container");
    categoryIdConteiner.textContent = ``;
    for (const id of datas) {
        const { image_url, title, details, _id } = id
        const div = document.createElement("div");
        div.innerHTML = `
            <figure class="px-10 pt-10">
                <img  src="${image_url}" alt="Shoes" class="rounded-xl w-full" />
            </figure>
            <div class="card-body items-center text-center">
                    <h2 class="card-title text-gray-800 font-bold">${title}</h2>
                    <p>${details.slice(0, 350) + "..."}</p>
                    <div class="flex space-x-96">
                            <div class="flex">
                            <div><img class="rounded-full w-12" src="${id.author.img}" /></div>
                            <div>
                                <p class="text-black font-bold">${id.author.name ? id.author.name : "No Data Found"}</p>
                                <p>${id.author.published_date}</p>
                            </div>
                            </div>
                            <div>
                                <p class="font-bold text-black">Rating: ${id.rating.number}</p>
                            </div>
                        </div>
                        
                <div class="card-actions">
                <label onclick="newsDetails('${_id}')" for="my-modal-3" class="btn modal-button">open modal</label> 
                
                </div>
            </div>
        `;
        categoryIdConteiner.appendChild(div)
    }
}

// modal open url area 
const newsDetails = () => {
    fetch(`https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a`)
        .then(response => response.json())
        .then(data => displayModal(data.data[0]))
}

const displayModal=modal =>{
    console.log(modal)
}
newsDetails()


