'use strict';

const newsBar = document.getElementById('news-bar');
const newsContainer = document.getElementById('news-wrapp');
const API_KEY = "cff4aa421fae4c30a27c064004dcedad";

function getNewsSources() {
  fetch("https://newsapi.org/v2/sources?apiKey=" + API_KEY).then(function (response) {
    response.json().then(function (data) {
      for (let source of data.sources) {
        let sourcesLink = document.createElement('div');
        let sourceId = source.id;
        sourcesLink.setAttribute('id', sourceId);
        sourcesLink.setAttribute('tabindex', '0');
        sourcesLink.textContent = source.name;

        sourcesLink.onclick = function (e) {
          getNewsItems(sourceId);
        };

        newsBar.appendChild(sourcesLink);
      }
    });
  }).catch(function (err) {
    console.log("Error occured : " + err);
    alert("Please reoload page");
  });
}

function getNewsItems(sourceId) {
  fetch("https://newsapi.org/v2/top-headlines?sources=" + sourceId + "&apiKey=" + API_KEY).then(function (response) {
    response.json().then(function (data) {
      clearOldNews();

      for (let news of data.articles) {
        let newsItem = document.createElement("div");
        let newsTitle = document.createElement("h3");
        let author = document.createElement("p");
        let newsContant = document.createElement("div");
        let goToButton = document.createElement("a");
        let urlLink = news.url;
        newsItem.setAttribute('id', 'news-item');
        newsItem.classList.add('news-item');
        author.classList.add('news-author');
        newsContant.classList.add('news-content');
        goToButton.setAttribute('href', urlLink);
        goToButton.setAttribute('target', 'blank');
        goToButton.classList.add('to-news-button');
        newsTitle.textContent = news.title;
        newsContant.textContent = news.description;
        newsItem.style.backgroundImage = "url(" + news.urlToImage + ")";
        author.textContent = news.author;
        goToButton.textContent = "Read more...";
        newsItem.appendChild(newsTitle);
        newsItem.appendChild(author);
        newsItem.appendChild(newsContant);
        newsContant.appendChild(goToButton);
        newsContainer.appendChild(newsItem);
      }
    });
  }).catch(function (err) {
    console.log("Error occured : " + err);
    alert("Please reoload page");
  });
}

function clearOldNews() {
  const newsList = document.getElementsByClassName("news-item");

  for (let i = newsList.length - 1; 0 <= i; i--) {
    if (newsList[i] && newsList[i].parentElement) {
      newsList[i].parentElement.removeChild(newsList[i]);
    }
  }
}

getNewsSources();