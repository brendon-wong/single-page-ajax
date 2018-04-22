function hasNumber(myString) {
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
  // regex tests myString for \d, any digit 0–9
  return /\d/.test(myString);
}

function loadData() {
  
    // Dollar signs are merely used to indicate that an object is a jQuery object
    //var $wikiElem = $('#wikipedia-links');

    // clear out old data before new request
    $('#wikipedia-links').text("");
    //$nytElem.text("");
    
    // Google Streetview API

    // create Google Streetview request url from user inputted street and city,
    // then append an img tag with the request url to the HTML body
    var street = $("#street").val();
    var city = $("#city").val();
    // Adjust Streetview API request to use maximum available resolution
    var google_url = "http://maps.googleapis.com/maps/api/streetview?size=640x640&location=" + 
    street + ", " + city;
    $('body').append('<img class="bgimg" src="' + google_url + '">');
    
    // update greeting text
    var location;
    if (street && city) {
      location = street + ", " + city;
    }
    else if (street) {
      location = street;
    }
    else if (city) {
      location = city;
    }
    else {
      location = "unspecified"
    }
    $('#greeting').text("Current location: " + location)
    
    // Wikipedia/MediaWiki API, accessed with JSONP (JSON with Padding)
    // The server returns JSON data in the function call, which is sent tp client
    
    var wiki_search;
    if (street && city) {
      if (hasNumber(street)) {
        wiki_search = city;
      }
      else {
        wiki_search = city;
      }
    }
    else if (street) {
      wiki_search = street;
    }
    else if (city) {
      wiki_search = city;
    }
    
    // Error handling for Wikipedia
    var wikiRequestTimeout = setTimeout(function() {
      $('#wikipedia-header').text("Could Not Load Wikipedia Links");
    }, 8000);
    
    $.ajax({
      url: 'https:////en.wikipedia.org/w/api.php',
      data: {
        action: 'query',
        list: 'search',
        srsearch: wiki_search, //'Great Pyramid',
        format: 'json',
      },
      dataType: 'jsonp',
      success: function (data) {
        console.log(data);
        for (var i = 0; i < 5; i++) {
          var article = data.query.search[i];
          $('#wikipedia-links').append(
            '<ul id= "wikipedia-links"><a target="_blank" href="' + 
            "https://en.wikipedia.org/wiki/" + article.title + '">' + 
            article.title + '</a></ul>');
        }
        // Stop error handling
        clearTimeout(wikiRequestTimeout)
        $('#wikipedia-header').text("Relevant Wikipedia Links");
      }
    });
    return false;
};

$('#form-container').submit(loadData);

// NYTimes API (note: currently refreshed on every submit, but this isn't necessary)

// Construct URL with API Key
// Brendon's API Key: efbb8eea500b42d9ba1ef7e42eb548bc
var nyt_url = "https://api.nytimes.com/svc/topstories/v2/home.json";
nyt_url += '?' + $.param({
  'api-key': "efbb8eea500b42d9ba1ef7e42eb548bc"
});

$.getJSON(nyt_url, function(data) {
  $('#nytimes-header').text("Latest New York Times Articles");
  // Results is an array of article objects inside the response object "data"
  articles = data.results;
  // set i < articles.length to display all articles
  for (var i = 0; i < 5; i++) {
    var article = articles[i]
    $('#nytimes-articles').append(
      '<ul id= "article">' + '<a target="_blank" href="' + article.url + '">' + 
      article.title + '</a>' + '<p>' + article.abstract + '</p>' + '</ul>');
  };
}).error(function() {
  $('#nytimes-header').text("Could Not Load Latest New York Times Articles");
});
