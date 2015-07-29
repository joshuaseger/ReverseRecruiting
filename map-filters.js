var filtered;
//get values of filters
var map = $('#map').vectorMap('get', 'mapObject');
var regions = map.getSelectedRegions();

function filterByState() {
    if (regions.length > 0) {
        for (i=0; i < data.length; i++) {
            for (j=0; i < regions.length; j++) {
                if(data[i].state = regions[j].getRegionName()) {
                    filtered.push(data[i]);
                }
            }
        }
    }
    if (filtered.length != 0) {
        colleges = filtered;
    } else {
        colleges = data;
    }
}
// recalculate filtered


