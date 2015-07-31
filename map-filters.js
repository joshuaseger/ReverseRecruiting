function UpdateColleges() {
    $("#collegeOutput").empty();
    colleges = colleges.sort(sortByWinPercentage);
    var map = $('#map').vectorMap('get', 'mapObject');
    map.removeAllMarkers();
    if($('#sortSchools').val() == 'Win Percent (high to low)'){
      colleges = colleges.sort(sortByWinPercentage);
      populateShortList(map);
  }
  if($('#sortSchools').val() == 'Win Percent (low to high)'){
      colleges = colleges.sort(sortByWinPercentage).reverse();
      populateShortList(map);
  }
  if($('#sortSchools').val() == 'In-State Tuition (high to low)'){
      colleges = colleges.sort(sortByInStateTuition);
      populateShortList(map);
  }
  if($('#sortSchools').val() == 'In-State Tuition (low to high)'){
      colleges = colleges.sort(sortByInStateTuition).reverse();
      populateShortList(map);
  }
  if($('#sortSchools').val() == 'Out-of-State Tuition (high to low)'){
      colleges = colleges.sort(sortByOutOfStateTuition);
      populateShortList(map);
  }
  if($('#sortSchools').val() == 'Out-of-State Tuition (low to high)'){
      colleges = colleges.sort(sortByOutOfStateTuition).reverse();
      populateShortList(map);
  }
  if($('#sortSchools').val() == 'Rpi Ranking (high to low)'){
      colleges = colleges.sort(sortByRpiRanking);
        for (i=0; i < colleges.length; i++){
      		var collegeName = "#" + colleges[i].ranking + " " + colleges[i].schoolName;
      		collegeName = collegeName.split("(")[0];
          	$("#collegeOutput").append("<tr><td data-index="+i+">"+collegeName+"</td></tr>");
          	map.addMarker(i, {latLng: [colleges[i].latitude,colleges[i].longitude], name: collegeName});
      }
  }
  if($('#sortSchools').val() == 'Rpi Ranking (low to high)'){
      colleges = colleges.sort(sortByRpiRanking).reverse();
       for (i=0; i < colleges.length; i++){
      		var collegeName = "#" + colleges[i].ranking + " " + colleges[i].schoolName;
      		collegeName = collegeName.split("(")[0];
          	$("#collegeOutput").append("<tr><td data-index="+i+">"+collegeName+"</td></tr>");
          	map.addMarker(i, {latLng: [colleges[i].latitude,colleges[i].longitude], name: collegeName});
      }
  }
      $("td").click(function(e){
       var index = $(this).data('index');
       var college = colleges[index];
       $("td").removeClass('active');
       $(this).addClass('active');
       var schoolName = college.schoolName.split("(")[0];
       var instaQuery = schoolName.replace(/\s/g, '').replace('.', '') + 'Soccer';
       $("#instagramPanel").removeClass("hide");
       $('#instafeed').empty();
       var feed = new Instafeed({
               get: "tagged",
               tagName: instaQuery,
               limit: 10,
               clientId: "5a029a80a3174286850a72c285d5eed3",
               template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /></a>',
               error: function() {
                $("#instagramPanel").addClass("hide");
            }
        });
           feed.run()
           $('#trophy').empty();
           $('#instaLabel').text("#" + instaQuery);
           $('#instaLink').attr("href","https://instagram.com/explore/tags/"+instaQuery);
           $('#schoolName').text(schoolName);
           $('#conference').text(college.conference);
           $('#overallRecord').text(college.overallRecord);
           $('#winPercent').text(college.winPercent);
           var overallRecord = college.overallRecord.split("-");
           $('#wins').text(overallRecord[0]);
           $('#losses').text(overallRecord[1]);
           $('#ties').text(overallRecord[2]);
           var conferenceRecord = college.conferenceRecord.split("-");
           $('#winsConference').text(conferenceRecord[0]);
           $('#lossesConference').text(conferenceRecord[1]);
           $('#tiesConference').text(conferenceRecord[2]);
           $('#state').text(college.state);
           $('#city').text(college.city);
           $('#headCoach').text(college.headCoach);
           $('#coachPhone').text(college.coachPhone);
           $('#nickname').text(college.nickname);

           if(parseFloat(college.rpiRanking.split(':')[1]) == 1){
           	$('#trophy').append('<img id="trophy" src="images/trophy.png" width="55" height="60"/>')
           }
		   $('#confRanking').text(college.rpiRanking.split(':')[1]);
           $('#goalsFor').text(college.goalsFor);
           $('#goalsAgainst').text(college.goalsAgainst);
           $('#description').text(college.description);
           $('#schoolUrl').text(college.schoolUrl);
           $('#schoolUrlLink').attr("href", "http://"+college.schoolUrl);
           $('#schoolSize').text(college.schoolSize);
           $('#undergradPopulation').text(college.undergradPopulation);
           $('#inStateTuition').text(college.inStateTuition);
           $('#outOfStateTuition').text(college.outOfStateTuition);
           $('#address').text(college.address);
           $('#facultyRatio').text(college.facultyRatio);
           $('#acceptanceLevel').text(college.acceptanceLevel);
           $('#acceptanceRate').text(college.acceptanceRate + "%");
           $('#rpiRanking').text(college.ranking);
           $('#allSchoolInfo').removeClass('hide');
           $('html, body').animate({
            scrollTop: $("#allSchoolInfo").offset().top
        }, 700);
           var rosterDist = compileRosterData(college.rosterDistribution);
           updateRosterDistChart(rosterDist);
       });
}

function populateShortList(map){
	for (i=0; i < colleges.length; i++){
		var collegeName = colleges[i].schoolName;
		collegeName = collegeName.split("(")[0];
			try {
			if(colleges[i].rosterDistribution != undefined){
				
				if(colleges[i].rosterDistribution.join().match(/SR/g).length !== null){
					if(colleges[i].rosterDistribution.join().match(/SR/g).length > 10){
						$("#collegeOutput").append("<tr><td class=\"success\" data-index="+i+">"+collegeName+"</td></tr>");
					}else{
						$("#collegeOutput").append("<tr><td data-index="+i+">"+collegeName+"</td></tr>");
					}
				} 
				} 
			}
			catch (err) {
					console.log(collegeName + " roster: " + colleges[i].rosterDistribution);
				}
			
			map.addMarker(i, {latLng: [colleges[i].latitude,colleges[i].longitude], name: collegeName});
		}
	}

function goToTop() {
    $('html, body').animate({
            scrollTop: $(".container").offset().top
        }, 700);
}

function compileRosterData(rosterData) {
    var data = rosterData;
    var newData = [["Freshmen", 0],["Sophomores", 0],["Juniors", 0],["Seniors", 0]];
    for (var i = 0; i < data.length; i++) {
        switch(data[i]) {
            case "FR": newData[0][1]++; break;
            case "SO": newData[1][1]++; break;
            case "JR": newData[2][1]++; break;
            case "SR": newData[3][1]++; break;
        }
    }
    for (var j = 0; j < newData.length; j++) {
        if (newData[j][1] == 0) {
           newData.splice(j, 1);
           j--;
       }
   }
   return newData;
}

function updateRosterDistChart(compiledData) {
    var charts = Highcharts.charts;
    charts[0].series[0].update({
        data: compiledData}, true
        );
    charts[0].redraw();
}

function filterByState() {
    colleges = [];
    var filtered = [];
    var map = $('#map').vectorMap('get', 'mapObject');
    var regions = map.getSelectedRegions();
    if (regions.length > 0) {
        for (i=0; i < data.length; i++) {
            for (j=0; j < regions.length; j++) {
                if(data[i].state == map.getRegionName(regions[j])) {
                    filtered.push(data[i]);
                }
            }
        }
    }
    if (filtered.length >= 0 && regions.length >= 1) {
        colleges = filtered;
    } else {  
        colleges = data;
    }
    filterByFacets();
    UpdateColleges();
}

function filterByFacets(){
    var conference = $('#conferenceDDL').val();
    var winPercent = [$('#wins-slider').slider('values', 0), $('#wins-slider').slider('values', 1)];
    var acceptance = [$('#acceptance-slider').slider('values', 0), $('#acceptance-slider').slider('values', 1)];
    var population = [$('#undergrad-pop').slider('values', 0), $('#undergrad-pop').slider('values', 1)];
    if(conference == 'All'){
       colleges = _.filter(colleges, function(college){
          if(college.undergradPopulation.length > 3){
              var collegePop = college.undergradPopulation.split(',');
              collegePop = collegePop[0] + collegePop[1];
          }
          else{
              var collegePop = college.undergradPopulation;
          }
          return winPercent[0] <= college.winPercent * 100 && 
          college.winPercent * 100 <= winPercent[1] && 
          acceptance[0] <= college.acceptanceRate && 
          college.acceptanceRate <= acceptance[1] &&
          population[0] <= collegePop && 
          collegePop <= population[1];
      });
   }
   else{
    colleges = _.filter(colleges, function(college){
       if(college.undergradPopulation.length > 3){
          var collegePop = college.undergradPopulation.split(',');
          collegePop = collegePop[0] + collegePop[1];
      }
      else{
          var collegePop = college.undergradPopulation;
      }
      return college.conference.trim() == conference.trim() && 
      winPercent[0] <= college.winPercent * 100 &&
      college.winPercent * 100 <= winPercent[1] &&
      acceptance[0] <= college.acceptanceRate &&
      college.acceptanceRate <= acceptance[1] &&
      population[0] <= collegePop &&
      collegePop <= population[1];
  });
}
}

function sortByWinPercentage(a, b)
{
    if (a.winPercent < b.winPercent)
        return 1;
    if (a.winPercent > b.winPercent)
        return -1;
    return 0;
}

function sortByRpiRanking(a, b)
{
	a = parseInt(a.ranking);
	b = parseInt(b.ranking);
    if (a < b)
        return -1;
    if (a > b)
        return 1;
    return 0;
}

function sortByInStateTuition(a, b)
{
    var a = a.inStateTuition.slice(1,a.inStateTuition.length);
    a = a.split(',');
    a =  a[0] + a[1];
    a = parseFloat(a);
    var b = b.inStateTuition.slice(1,b.inStateTuition.length);
    b = b.split(',');
    b =  b[0] + b[1];
    b = parseFloat(b);
    if (a < b)
        return 1;
    if (a > b)
        return -1;
    return 0;
}

function sortByOutOfStateTuition(a, b)
{
    var a = a.outOfStateTuition.slice(1,a.outOfStateTuition.length);
    a = a.split(',');
    a =  a[0] + a[1];
    a = parseFloat(a);
    var b = b.outOfStateTuition.slice(1,b.outOfStateTuition.length);
    b = b.split(',');
    b =  b[0] + b[1];
    b = parseFloat(b);
    if (a < b)
        return 1;
    if (a > b)
        return -1;
    return 0;
}

function resetDefault() {
    var map = $('#map').vectorMap('get', 'mapObject');
    map.clearSelectedRegions();
    $( "#acceptance-slider" ).slider( "values", 0, 0 );
    $( "#acceptance-slider" ).slider( "values", 1, 100 );
    $( "#acceptance-rate" ).val( $( "#acceptance-slider" ).slider( "values", 0 ) +
        "% - " + $( "#acceptance-slider" ).slider( "values", 1 ) + "%" );
    $( "#wins-slider" ).slider( "values", 0, 0 );
    $( "#wins-slider" ).slider( "values", 1, 100 );
    $( "#win-percent" ).val( $( "#wins-slider" ).slider( "values", 0 ) +
        "% - " + $( "#acceptance-slider" ).slider( "values", 1 ) + "%" );
    $( "#undergrad-pop" ).slider( "values", 0, 500 );
    $( "#undergrad-pop" ).slider( "values", 1, 45000 );
    $( "#undergrad-population" ).val( $( "#undergrad-pop" ).slider( "values", 0 ) +
        " - " + $( "#undergrad-pop" ).slider( "values", 1 ));
    $('select>option:eq(0)').prop('selected', true);
    filterByState();
}


