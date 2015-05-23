
// show icon when one of the root css classes are found
if ($('.container_12,.container_16,.container_24').is('*')) {
	//console.debug('Loading 960gs extension...');
	chrome.extension.sendMessage({'type': 'init'}, function(response) {});
	initOverlays();
}

function initOverlays() {
	$('.container_12').each(function(i, val) { initOverlay(i, val, 12); });
	$('.container_16').each(function(i, val) { initOverlay(i, val, 16); });
	$('.container_24').each(function(i, val) { initOverlay(i, val, 24); });
}

function initOverlay(index, container, cn_size) {
	//alert(container);
	//alert($(container));

	// create the overlay
	var grid_overlay = $('<div class="grid_overlay__" style="display:none;"></div>');
	// add columns and gutters (they will be semi-transparent) 
	for (i=0; i<cn_size; i++) {
		grid_overlay.append('<div class="gutter"></div>');
		grid_overlay.append('<div class="column"></div>');
		grid_overlay.append('<div class="gutter"></div>');
	}
	// set height
	grid_overlay.height($(container).height());
	//console.debug($(container).height());
	//// set background image
	//grid_overlay.css('background-image', 'url(' + chrome.extension.getURL(image) + ')');
	$(container).prepend(grid_overlay);

}

function toggleOverlays() {
	$('.grid_overlay__').toggle(500);
	//$('.grid_overlay__').parent().each(function(i, val) { console.debug($(val).height()); });
	//$('.container_12, .container_16, .container_24').each(function(i, val) { console.debug($(val).height()); });
	
	//chrome.extension.sendRequest({'type': 'set_popup'}, function(response) {});
}
function showOverlay() {
	$('.grid_overlay__').show(500);
}


//chrome.extension.onRequest.addListener(function(data, sender, callback) {
chrome.extension.onMessage.addListener(function(data, sender, callback) {
	if(data['type'] === 'toggle') {
		toggleOverlays();
// 	} else if(data['type'] === 'update_overlay') {
// 		$('.grid_overlay__ .column').css('background-color', data['column_color']);
// 		$('.grid_overlay__ .gutter').css('background-color', data['column_opacity input']);
// 		$('.grid_overlay__ .column').css('opacity', data['gutter_color input']);
// 		$('.grid_overlay__ .gutter').css('opacity', data['gutter_opacity input']);
	
	} else if(data['type'] === 'init') {
		initOverlays();
	}
});
