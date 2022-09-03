// all news category link:https://openapi.programming-hero.com/api/news/categories

// news category data load 
const newsCategortData = async () => {
    try {
        const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
        const data = await response.json();
        return data.data.news_category;
    } catch (err) {
        // catches errors both in fetch and response.json
        alert(err);
    }
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

const spinner = document.getElementById("spinner-container")

const allCategoryId = category_id => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayCategoryId(data.data))
    } catch (err) {
        // catches errors both in fetch and response.json
        alert(err);
    }
    spinner.classList.remove("hidden")
}

const displayCategoryId = async datas => {
    const categoriesShow = document.getElementById("category-show")
    categoriesShow.textContent = ``;

    datas.sort((a, b) => (a.total_view < b.total_view) ? 1 : -1)

    if (datas.length) {
        const showDiv = document.createElement("div")
        showDiv.innerHTML = `
            <p>${datas.length} Items Found For Update News</p>
       `;
        categoriesShow.appendChild(showDiv)
    }

    const categoryIdConteiner = document.getElementById("category-id-container");
    categoryIdConteiner.textContent = ``;

    for (const id of datas) {

        spinner.classList.add("hidden")

        const { image_url, title, details, _id, total_view } = id

        const div = document.createElement("div");
        div.innerHTML = `
            <figure class="px-10 pt-10">
                <img  src="${image_url}" alt="Shoes" class="rounded-xl w-5/6" />
            </figure>
            <div class="card-body items-center text-center">
                    <h2 class="card-title text-gray-800 font-bold">${title}</h2>
                    <p>${details.slice(0, 350) + "..."}</p>
                    <div>
                            <div class="flex my-5">
                            <div><img class="rounded-full w-12" src="${id.author.img}" /></div>
                            <div>
                                <p class="text-black font-bold">${id.author.name ? id.author.name : "No Data Found"}</p>
                                <p>${id.author.published_date}</p>
                            </div>
                            </div>
                            <div>
                                <p class="font-bold text-black mt-5">View: ${total_view ? total_view : "No Data Found"}</p>
                            </div>
                        </div>
                        
                <div class="card-actions">
                <label onclick="newsDetails('${_id}')" for="my-modal-3" class="btn btn-primary modal-button">Details</label> 
                
                </div>
            </div>
        `;
        categoryIdConteiner.appendChild(div)
    }
}

// modal open url area 
const newsDetails = (news_id) => {
    try {
        fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
            .then(response => response.json())
            .then(data => displayModal(data.data))
    } catch (err) {
        // catches errors both in fetch and response.json
        alert(err);
    }
}

const modalBody = document.getElementById("modal-Container")
const displayModal = modal => {

    modal.forEach(element => {

        modalBody.innerHTML = `
            <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <p class="py-4">${element.details.slice(0, 450) + "..."}</p>
            <h2 class="text-black text-center font-bold my-5">Author Name: ${element.author.name}</h2>
            <img src="${element.image_url}"/>
            `;
    })

}
newsDetails()


