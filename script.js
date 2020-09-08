// doc ready
$(function() {
  // start the app
  app.init();
});

const app = {};
app.JikanAPIBaseURL = 'https://api.jikan.moe/v3';

// ajax call to get anime data from Jikan API
app.getAnimes = function(query) {
  $.ajax({
    url: `${app.JikanAPIBaseURL}/search/anime`,
    method: 'GET',
    dataType: 'json',
    data: {
      q: query, 
      page: 1,    
      limit: 50, 
      order_by: 'title',
    }
  }).then(function(resultObj){
    $('.displayResults').empty();
    console.log('display API results: ', resultObj.results);    
    app.displayCards(resultObj.results);
  });
}

// ajax call to get TOP anime data
app.getTopAnimes = function() {
  $.ajax({
    url: `${app.JikanAPIBaseURL}/top/anime`,
    method: 'GET',
    dataType: 'json',
    data: {
      page: 1,
      limit: 50,
      subtype: 'bypopularity'  
    }
  }).then(function(resultObj){
    $('.displayResults').empty();
    console.log('display top Anime results: ', resultObj.top);   
    app.displayTopCards(resultObj.top);
  });
}

// display gif img and title
app.displayCards = function(data) {
  data.forEach(function(animeObj) {
    console.log(animeObj);
    
    if (animeObj.rated !== 'Rx' && animeObj.score > 0) {
      const animeHTML = `
        <div class="cardBox">
          <div class="imgBox">
            <a href="${animeObj.url}" target="_blank" title="Click for more details on ${animeObj.title}">
              <img src="${animeObj.image_url}" alt="${animeObj.title}">
            </a>
          </div>
          <div class="dataBox"
            <h3 id="cardTitle">${animeObj.title}</h3>
            <p class="cardData">${animeObj.type} | ${animeObj.rated}</p>
            <p class="cardData">Score: ${animeObj.score} / 10</p>
            <p class="cardData" id="cardSynopsis">${animeObj.synopsis}</p>     
          </div>
        </div>
      `
      $('.displayResults').append(animeHTML);    
    
    } else { return };
  });
}

// display gif img and title
app.displayTopCards = function(data) {
  data.forEach(function(animeObj) {
    console.log(animeObj);
    
    if (animeObj.rated !== 'Rx' && animeObj.score > 0) {
      const animeHTML = `
        <div class="cardBox">
          <div class="imgBox">
            <a href="${animeObj.url}" target="_blank" title="Click for more details on ${animeObj.title}">
              <img src="${animeObj.image_url}"  alt="${animeObj.title}">
            </a>
          </div>
          <div class="dataBox"
            <h3 id="cardTitle">${animeObj.title}</h3>
            <p class="cardData">Rank: ${animeObj.rank} / 50</p>
            <p class="cardData">${animeObj.type}</p>
            <p class="cardData">Score: ${animeObj.score} / 10</p>
          </div>
        </div>
      `
      $('.displayResults').append(animeHTML);    
    
    } else { return };
  });
}

// connect search input; take input and generate query from input; grab input on submit
$('form').on('submit', function(e) {
  e.preventDefault();

  const querySelection = $('input').val();
  console.log(querySelection);

  app.getAnimes(querySelection);
})

// connect button click to top anime list call
$('button').click(function(e) {
  e.preventDefault();
  app.getTopAnimes();
}) 

// init
app.init = () => {
  console.log('app initialized!')
};