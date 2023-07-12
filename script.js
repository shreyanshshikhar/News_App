const API_KEY = "96d9c27d16b347b1ba26871e771243ad";
const url = "https://newsapi.org/v2/everything?q=";

/*//load india news at time of website loading
window.addEventListener("load", () => fetchNews("India"));

//fetch news from data server untill fetch wait for it then convert it into json format and than print data
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}
//data bind by making only the number of articles are coming at a time
function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplete = document.getElementById("template-news-card");
    //if not done so  whenever we bind data that much card get inserted as if already 100 card and we call api again so more 100 card will display below it which we dont want
    cardsContainer.innerHTML = " ";

    //looping to get each article

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        //to make clone of templete which will contain all //the div inside it also
        const cardClone = newsCardTemplete.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {

}*/
window.addEventListener("load", () => fetchNews("India"));



async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newsSource.innerHTML = `${article.source.name} · ${date}`;
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank")
    });
}
let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
