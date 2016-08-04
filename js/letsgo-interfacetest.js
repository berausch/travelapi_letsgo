var apiKey = "br263217536383875054898079171468";

var getLocation = function(city){

};

$(document).ready(function() {
  $('#originLocCheck').click(function() {
    var city = $('#originLoc').val();
    console.log(city);
    $.get('http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/US/USD/en-US?query=' + city + '&apiKey='+ apiKey, function(response) {
      var allLocations = "";
      for(var i=0; i<response.Places.length;i++){
        var cityName = response.Places[i].PlaceName;
        var state = response.Places[i].RegionId;
        var country = response.Places[i].CountryName;

        var locationPhrase = cityName;
        if(state !== "" )
        {
          locationPhrase += ", " + state;
        }
        if(state !== "United States")
        {
          locationPhrase += ", " + country;
        }
        allLocations += "<option value='" + response.Places[i].PlaceId + "'>" + locationPhrase + "</option>";
      }

      var allLocationDone = "<h3>Which " + city + " did you mean?</h3><form><select class='form-control' id='citySelect'>" + allLocations + "</select></form><button type='submit'>submit</button>";
      console.log(allLocationDone);
      $("#originQ").empty().prepend(allLocationDone);
    });

    });
  });
