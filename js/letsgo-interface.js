var apiKey = "br263217536383875054898079171468";

$(document).ready(function() {
  $('#originLocCheck').click(function() {

    var originCity = $('#originLoc').val();
    console.log(originCity);
    $('#originLoc').val("");

    $.get('http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/US/USD/en-US?query=' + originCity + '&apiKey='+ apiKey, function(response) {
      for(var i=0; i<response.Places.length;i++){
        var cityName = response.Places[i].PlaceName;
        var state = response.Places[i].RegionId;
        var country = response.Places[i].CountryName;
        var locationPhrase = "Did you mean " + cityName;
        if(state != "" )
        {
          locationPhrase += ", " + state;
        }
        if(state != "United States")
        {
          locationPhrase += ", " + country;
        }
        console.log(locationPhrase);
        // $('.showOriginLoc').text("Did you mean " + originCity + ".");
      }


      });
  });
});
