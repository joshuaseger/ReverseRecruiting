function UpdateColleges() {
	$("#collegeOutput").empty();
	for (i=0; i < colleges.length; i++){
		var name = colleges[i].schoolName;
		name = name.split("(")[0];
		$("#collegeOutput").append("<tr><td data-index="+i+">"+name+"</td></tr>");
    }
    $("td").click(function(e){
	var index = $(this).data('index');
	var college = colleges[index];
	$("td").removeClass('active');
	$(this).addClass('active');
	$('#schoolName').text(college.schoolName);
	$('#conference').text(college.conference);
	$('#overallRecord').text(college.overallRecord);
	$('#winPercent').text(college.winPercent);
	$('#conferenceRecord').text(college.conferenceRecord);
	$('#state').text(college.state);
	$('#city').text(college.city);
	$('#headCoach').text(college.headCoach);
	$('#coachPhone').text(college.coachPhone);
	$('#nickname').text(college.nickname);
	$('#rpiRanking').text(college.rpiRanking.split(':')[1]);
	$('#rosterDistribution').text(college.rosterDistribution);
	$('#goalsFor').text(college.goalsFor);
	$('#goalsAgainst').text(college.goalsAgainst);
	$('#description').text(college.description);
	$('#schoolUrl').text(college.schoolUrl);
	$('#schoolSize').text(college.schoolSize);
	$('#undergradPopulation').text(college.undergradPopulation);
	$('#inStateTuition').text(college.inStateTuition);
	$('#outOfStateTuition').text(college.outOfStateTuition);
	$('#address').text(college.address);
	$('#facultyRatio').text(college.facultyRatio);
	$('#acceptanceLevel').text(college.acceptanceLevel);
	$('#acceptanceRate').text(college.acceptanceRate);
    $('#allSchoolInfo').removeClass('hide');
});
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
        colleges = filtered.sort(sortByWinPercentage);
    } else {  
        colleges = data.sort(sortByWinPercentage);
    }
    UpdateColleges();
}

function sortByWinPercentage(a, b)
{
  if (a.winPercent < b.winPercent)
    return 1;
  if (a.winPercent > b.winPercent)
    return -1;
  return 0;
}