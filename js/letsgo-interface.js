var apiKey = "br263217536383875054898079171468";


function City(cityName, state, country, cityId) {
  this.cityName = name;
  this.state =state;
  this.country = country;
  this.cityId  = cityId;
}


var allOriginLocations;


var locationPhraseAll = function(cityName, state, country){
  var locationPhrase = cityName;
  if(state !== "" )
  {
    locationPhrase += ", " + state;
  }
  if(state !== "United States")
  {
    locationPhrase += ", " + country;
  }
};


var getLocation = function(responseName, city, id, selectId, id2){
  $.get('http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/US/USD/en-US?query=' + city + '&apiKey='+ apiKey, function(response) {
    var allLocations = "";
    if(response.Places.length === 0)
    {
      $(id).empty().prepend("<h3>Opps, looks like that place doesn't exist! Please try again.</h3>");
    } else {
      for(var i=0; i<response.Places.length;i++){
        var cityName = response.Places[i].PlaceName;
        var state = response.Places[i].RegionId;
        var country = response.Places[i].CountryName;
        var cityId = response.Places[i].PlaceId;

        var locationPhrase = cityName;
        if(state !== "" )
        {
          locationPhrase += ", " + state;
        }
        if(state !== "United States")
        {
          locationPhrase += ", " + country;
        }

        allLocations += "<option value='" + i + "'>" + locationPhrase + "</option>";

      }

        var allLocationDone = "<select class='form-control' id='" + selectId + "'>" + allLocations + "</select>";
      // var allLocationDone = "<h3>Which " + city + " did you mean?</h3><form><select class='form-control' id='" +selectId+ "'>" + allLocations + "</select></form><button type='submit' class='" + selectId + "'>submit</button>";
      $(id).empty().prepend(allLocationDone);
      $(id2).empty().prepend("Which " + city + " did you mean?");
    }
  });
};
$(document).ready(function() {
  var origin;
  var originId;
  var destinationId;



  $('#originLocCheck').submit(function(event) {
    event.preventDefault();
    origin = $('#originLoc').val();
    getLocation("allOriginLocations", origin, "#originQ", "originCities", "#originChoiceIntro");
    $(".originQ").show();
  });

  $('#destLocCheck').submit(function(event) {
    event.preventDefault();
    var city = $('#destLoc').val();
    getLocation(city, "#destQ");
  });

  $('.originCities').submit(function(event) {
    event.preventDefault();
    originNumber = $('#originCities').val();
    console.log(originNumber);
    $(".originQ").hide();
    console.log(allOriginLocations);
    var originPhrase = locationPhraseAll(allOriginLocations.Places[originNumber].PlaceName, allOriginLocations.Places[originNumber].Places[i].RegionId, allOriginLocations.Places[originNumber].CountryName);
    $("#originFinal").prepend("<h3>You are traveling from " + originPhrase);
  });

  $('.destCities').submit(function(event) {
    event.preventDefault();
    deId = $('#destCities').val();
    console.log(originId);
  });
});
