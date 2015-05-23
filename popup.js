
var COLORS = [
	'#FF0000',
	'#FF4000',
	'#FF8000',
	'#FFBF00',
	'#FFFF00',
	'#BFFF00',
	'#80FF00',
	'#40FF00',
	'#00FF00',
	'#00FF40',
	'#00FF80',
	'#00FFBF',
	'#00FFFF',
	'#00BFFF',
	'#0080FF',
	'#0040FF',
	'#0000FF',
	'#4000FF',
	'#8000FF',
	'#BF00FF',
	'#FF00FF',
	'#FF00BF',
	'#FF0080',
	'#FF0040',
	'#FFFFFF',
	'#848484',
	'#000000',
]


function updateOverlay() {
	//console.debug('updating');
	
	var column_color = COLORS[$('#column_color input').val()];
	var gutter_color = COLORS[$('#gutter_color input').val()];
	var column_opacity = $('#column_opacity input').val();
	var gutter_opacity = $('#gutter_opacity input').val();
	
	//console.debug('column: ' + column_color + ' ' + column_opacity + '%, gutter: ' + gutter_color + ' ' + gutter_opacity + '%');

	//$('#column_color .rainbow').css('opacity', $('#column_opacity input').val());
	//$('#gutter_color .rainbow').css('opacity', $('#gutter_opacity input').val());
	$('#column_opacity_label').text('Opacity: ' + Math.floor(column_opacity*100) + '%');
	$('#gutter_opacity_label').text('Opacity: ' + Math.floor(gutter_opacity*100) + '%');
	if (chrome.tabs) {
		chrome.tabs.executeScript(null, {code:"$('.grid_overlay__ .column').css({'background-color': '" + column_color + "', 'opacity': '" + column_opacity + "'})"});
		chrome.tabs.executeScript(null, {code:"$('.grid_overlay__ .gutter').css({'background-color': '" + gutter_color + "', 'opacity': '" + gutter_opacity + "'})"});
	}

}

function hideOverlay() {
	//console.debug('hiding');
	chrome.tabs.executeScript(null, {code:"toggleOverlays()"});	
	//window.close();
}
function showOverlay() {
	chrome.tabs.executeScript(null, {code:"showOverlay()"});	
}

$(document).ready(function() {
	// create the color line
	var rainbow = $('.rainbow');
	for (i=0; i<27; i++) {
		var color_cell = $('<div class="colorcell"></div>').css('background-color', COLORS[i])
		rainbow.append(color_cell);
	}
	
	updateOverlay();
	showOverlay();

});

/*document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('input[type=range]').addEventListener('change', updateOverlay);
	document.querySelector('input[type=button]').addEventListener('click', hideOverlay);
});*/

$(document).ready(function() {
	$('input[type=range]').bind('change', updateOverlay);
	$('input[type=button]').bind('click', hideOverlay);
});
