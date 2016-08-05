var apiKey = "br263217536383875054898079171468";

var allOriginLocations = [];
var allDestLocations = [];
var origin;
var destination;


var showDoneButton = function(){
  if(origin !== undefined && destination !== undefined)
  {
    $(".locDone").show();
  }
};
var getLocation = function(city, id, selectId, id2, which){
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
        var allCityInfo= [];
        allCityInfo.push(cityName, state, country, cityId);
        var locationPhrase = cityName;
        if(state !== "" )
        {
          locationPhrase += ", " + state;
        }
        if(state !== "United States")
        {
          locationPhrase += ", " + country;
        }
        allCityInfo.push(locationPhrase);
        allLocations += "<option value='" + i + "'>" + locationPhrase + "</option>";
        if(which == "origin"){
        allOriginLocations.push(allCityInfo);
      } else {
        {
          allDestLocations.push(allCityInfo);
        }
      }

      }

        var allLocationDone = "<select class='form-control' id='" + selectId + "'>" + allLocations + "</select>";
      // var allLocationDone = "<h3>Which " + city + " did you mean?</h3><form><select class='form-control' id='" +selectId+ "'>" + allLocations + "</select></form><button type='submit' class='" + selectId + "'>submit</button>";
      $(id).empty().prepend(allLocationDone);
      $(id2).empty().prepend("Which " + city + " did you mean?");
    }
  });
};
$(document).ready(function() {



  $('#originLocCheck').submit(function(event) {
    event.preventDefault();
    var city = $('#originLoc').val();
    getLocation(city, "#originQ", "originCities", "#originChoiceIntro", "origin");
    $(".originQ").show();
    $("#originFinal").hide();
    $(".locDone").hide();
    console.log(origin);
  });

  $('#destLocCheck').submit(function(event) {
    event.preventDefault();
    var city = $('#destLoc').val();
    getLocation(city, "#destQ", "destCities", "#destChoiceIntro", "dest");
    $(".destQ").show();
    $("#destFinal").hide();
    $(".locDone").hide();
    console.log(destination);
  });

  $('.originCities').submit(function(event) {
    event.preventDefault();
    originNumber = $('#originCities').val();
    origin = allOriginLocations[originNumber][3];
    console.log(origin);
    showDoneButton();
    $(".originQ").hide();
    $("#originFinal").empty().prepend("<h3>You are traveling from " + allOriginLocations[originNumber][4]);
    $("#originFinal").show();
  });

  $('.destCities').submit(function(event) {
    event.preventDefault();
    destNumber = $('#destCities').val();
    destination = allDestLocations[destNumber][3];
    console.log(destination);
    showDoneButton();
    $(".destQ").hide();
    $("#destFinal").empty().prepend("<h3>You are traveling from " + allDestLocations[destNumber][4]);
    $("#destFinal").show();
  });
  $('#locDone').click(function() {
    $.get('http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/US/USD/en-US/' + origin + '/' + destination + '/anytime/anytime?apiKey='+ apiKey, function(response) {
      console.log(response);
    });
  });
});
