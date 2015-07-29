function UpdateColleges() {
	$("#collegeOutput").empty();
	for (i=0; i < colleges.length; i++){
		var name = colleges[i].schoolName;
		name = name.split("(")[0];
		$("#collegeOutput").append("<tr><td data-index"+i+">"+name+"</td></tr>");
    }
}

function verp(college) {
    alert(college.schoolName);
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
    UpdateColleges();
}

$("#collegeOutput tr td").click(function(){
	var index = $(this).data('index');
	var college = colleges[index];
	$('#schoolName').text(college.schoolName);
	$('#overallRecord').text(college.overallRecord);
	$('#winPercent').text(college.winPercent);
	$('#conferenceRecord').text(college.conferenceRecord);
	$('#state').text(college.state);
	$('#city').text(college.city);
	$('#headCoach').text(college.headCoach);
	$('#coachPhone').text(college.coachPhone);
	$('#nickname').text(college.nickname);
	$('#rpiRanking').text(college.rpiRanking);
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
})


