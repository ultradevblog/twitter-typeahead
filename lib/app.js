

$(document).ready(function(){

	// constants
	var url='http://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=f22e6ce68f5e5002e71c20bcba477e7d'
	var minTriggerlength=3;
	var hightlight=true;
	var maxresults=7
	//var badgeclass='<span class="badge badge-warning">'
	//var badgeclass='<span class="badge badge-info">'
	// brown
	//var badgeclass='<span class="badge badge-default">'
	//blue
	//var badgeclass='<span class="badge badge-primary">'
	//green
	var badgeclass='<span class="badge badge-success">'
	//red
	//var badgeclass='<span class="badge badge-danger">'
	// Instantiate the Bloodhound suggestion engine
	var tag;
var movies = new Bloodhound({
  datumTokenizer: function(datum) {
    return Bloodhound.tokenizers.whitespace(datum.value);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    wildcard: '%QUERY',
    url: url,
    transform: function(response) {
      // Map the remote source JSON array to a JavaScript object array
      return $.map(response.results, function(movie) {
        return {
			// change accordingly
          value: {title:movie.original_title,popularity:movie.popularity }
			// value :{ movie.original_title }
			//value: movie.original_title+';'+movie.popularity
        };
      });
    }
  }
});
//added 
// Instantiate the Typeahead UI
//var tag=gettag('value');
$('.typeahead').typeahead({
  minLength: minTriggerlength,
  highlight: hightlight
}, {
	// build the json object in transform and use the value which you want to display here
  display: function (value){
	  var tag=JSON.stringify(value);
	  var obj= JSON.parse(tag);
	  var actualvalue=JSON.stringify(obj);
	  var displaytag=JSON.parse(actualvalue);
	 // alert(displaytag.value.title)
	  return displaytag.value.title;
  },
  name: 'data',
  source: movies,
  limit:maxresults,

   templates: {
   empty: [
                '<div class="empty-message"><strong>',
                  'Result not found',
                '</strong></div>'
              ].join(''),
	pending	: function (value) {
	return  '<div><font size=3><strong>Loading..</strong></font></div><br><br>' ;
    },
	header:
	function (value) {
	return '<div align="left" class="block"><font size=2.5><table style="width:100%"><tr><td><strong>&nbsp;Movie</strong></td><td align="right"><strong>Popularity&nbsp;</strong></td> </tr></table><hr>'
    },
	footer:
	function (value) {
	return '<hr><div align="right" class="block"><font size=1.5><table style="width:100%"><tr><td>&nbsp;</td><td align="right">powered by ultradev&nbsp;</td> </tr></table>'
    }
	,
    suggestion: function (value) {
	return  '<div align="left" class="block"><font size=2.5><table style="width:100%"><tr><td>'+value.value.title+'</td><td align="right">'+badgeclass+value.value.popularity+'</span></td> </tr></table>';
    }


}

});

});

function getOnlyTag (value)
{
	alert (value);
}
