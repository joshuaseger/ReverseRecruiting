function createMap() {
	$('#map').vectorMap({
		map: 'us_lcc_en',
		backgroundColor: "#FFF",
		zoomOnScroll: false,
		regionsSelectable: true,
		regionStyle:
		{
			initial: {
				fill: '#818A8A'
			},
			selected: {
				fill: '#FF6600'
			}
		},
		onRegionSelected: function(e, code, isSelected, selectedRegions) {
				//alert('selected regions are: ' + selectedRegions.toString());
				filterByState();
			}
		});
}
function createSliders() {
	$( "#acceptance-slider" ).slider({
		range: true,
		min: 0,
		max: 100,
		values: [ 25, 75 ],
		slide: function( event, ui ) {
			$( "#acceptance-rate" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
		}
	});
	$( "#acceptance-rate" ).val( $( "#acceptance-slider" ).slider( "values", 0 ) +
		"% - " + $( "#acceptance-slider" ).slider( "values", 1 ) + "%" );
	$( "#wins-slider" ).slider({
		range: true,
		min: 0,
		max: 100,
		values: [ 25, 75 ],
		slide: function( event, ui ) {
			$( "#win-percent" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
		},
		stop: function(event, ui) {
			alert('kdfsjaldkfj');
		}
	});
	$( "#win-percent" ).val( $( "#wins-slider" ).slider( "values", 0 ) +
		"% - " + $( "#wins-slider" ).slider( "values", 1 ) + "%" );
}