
function loadData() {

    // Dollar signs are merely used to indicate that an object is a jQuery object
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // create Google Streetview request url from user inputted street and city,
    // then append an img tag with the request url to the HTML body
    var street = $("#street").val();
    var city = $("#city").val();
    var google_request_url = "http://maps.googleapis.com/maps/api/streetview?size=12000x600&location=" + street + ", " + city;
    $body.append('<img class="bgimg" src="' + google_request_url + '">');
    
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
    $greeting.text("Current location: " + location)

    return false;
};

$('#form-container').submit(loadData);
