function createMap() {
	$('#map').vectorMap({
		map: 'us_lcc_en',
		backgroundColor: "#FFF",
		zoomOnScroll: false,
		regionsSelectable: true,
		markerStyle: {
			initial: {
				fill: '#232A31'
			}
		},
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
		values: [ 0, 100 ],
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
		values: [ 0, 100 ],
		slide: function( event, ui ) {
			$( "#win-percent" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
		},
	});
	$( "#win-percent" ).val( $( "#wins-slider" ).slider( "values", 0 ) +
		"% - " + $( "#wins-slider" ).slider( "values", 1 ) + "%" );

	$( "#undergrad-pop" ).slider({
		range: true,
		min: 500,
		max: 45000,
		values: [ 500, 45000 ],
		slide: function( event, ui ) {
			$( "#undergrad-population" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ]);
		},
	});
	$( "#undergrad-population" ).val( $( "#undergrad-pop" ).slider( "values", 0 ) +
		" - " + $( "#undergrad-pop" ).slider( "values", 1 ));
}

function createPieChart() {
	$('#rosterDistribution').highcharts({
		chart: {
			backgroundColor: null,
			type: 'pie'
		},
		credits: {
			enabled: false
		},
		colors: ['#5cb85c', '#f0ad4e', '#337ab7', '#4A4A4A'],
		tooltip: {
			enabled: false
		},
		plotOptions: {
			pie: {
				shadow: false,
				center: ['50%, 50%'],
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.y}',
					distance:-50,
					color: 'white'
				}
			}
		},
		title: {
			text: 'Roster Distribution'
		},
		series: [{
			name: "Roster Distribution"
		}]
	});
}