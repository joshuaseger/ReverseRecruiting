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
	console.log(data.length);
	colleges = [];
	console.log(data.length);
	var filtered = [];
    var map = $('#map').vectorMap('get', 'mapObject');
    var regions = map.getSelectedRegions();
    console.log(regions.length);
    
    console.log(data.length);
    if (regions.length > 0) {
    	console.log(data.length);
        for (i=0; i < data.length; i++) {
        	console.log("hi");
            for (j=0; j < regions.length; j++) {

                console.log("data state: " + data[i].state + " | map state: " + map.getRegionName(regions[j]));
                if(data[i].state == map.getRegionName(regions[j])) {
                	console.log("PUSHING " + data[i].schoolName + " into filtered array ---------------------");
                    filtered.push(data[i]);
                }
            }
        }
    }
    if (filtered.length > 0) {
        colleges = filtered;
    } else {
        colleges = data;
    }
    UpdateColleges();
}
// recalculate filtered


