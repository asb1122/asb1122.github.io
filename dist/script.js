'use strict';

var newsBar = document.getElementById('news-bar');
var newsContainer = document.getElementById('news-wrapp');
var API_KEY = "cff4aa421fae4c30a27c064004dcedad";

function getNewsSources() {
  fetch("https://newsapi.org/v2/sources?apiKey=" + API_KEY).then(function (response) {
    response.json().then(function (data) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          source = _step.value;
          var sourcesLink = document.createElement('div');
          var sourceId = source.id;
          sourcesLink.setAttribute('id', sourceId);
          sourcesLink.setAttribute('tabindex', '0');
          sourcesLink.textContent = source.name;

          sourcesLink.onclick = function (e) {
            getNewsItems(sourceId);
          };

          newsBar.appendChild(sourcesLink);
        };

        for (var _iterator = data.sources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var source;

          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
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
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = data.articles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var news = _step2.value;
          var newsItem = document.createElement("div");
          var newsTitle = document.createElement("h3");
          var author = document.createElement("p");
          var newsContant = document.createElement("div");
          var goToButton = document.createElement("a");
          var urlLink = news.url;
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
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    });
  }).catch(function (err) {
    console.log("Error occured : " + err);
    alert("Please reoload page");
  });
}

function clearOldNews() {
  var newsList = document.getElementsByClassName("news-item");

  for (var i = newsList.length - 1; 0 <= i; i--) {
    if (newsList[i] && newsList[i].parentElement) {
      newsList[i].parentElement.removeChild(newsList[i]);
    }
  }
}

getNewsSources();