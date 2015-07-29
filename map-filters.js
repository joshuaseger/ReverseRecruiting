function UpdateColleges() {
	$("#collegeOutput").empty();
	$("#collegeOutput").append("<th>Schools</th>");
	for (i=0; i < colleges.length; i++){
		var name = colleges[i].schoolName;
		name = name.split("(")[0];
		$("#collegeOutput").append("<tr><td>"+name+"</td></tr>");
    }
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
// recalculate filtered


