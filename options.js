
// Saves options to localStorage.
function save_options() {
	/*
	var select = document.getElementById("color");
	var color = select.children[select.selectedIndex].value;
	localStorage["favorite_color"] = color;
	*/
	
	localStorage["enable_popup"] = $('#enable_popup').is(':checked');
	//alert($('#enable_popup').is(':checked'));
	
	// Update status to let user know options were saved.
	var status = document.getElementById("status");
	status.innerHTML = "options saved";
	setTimeout(function() {
		status.innerHTML = "";
	}, 750);

	update_debug();
}

// Restores select box state to saved value from localStorage.
function restore_options() {
	var favorite = localStorage["favorite_color"];
	if (favorite) {
		var select = document.getElementById("color");
		for (var i = 0; i < select.children.length; i++) {
			var child = select.children[i];
			if (child.value == favorite) {
				child.selected = "true";
				break;
			}
		}
	}

	if (localStorage["enable_popup"] == 'true') {
		$('#enable_popup').attr('checked', 'on');
	}
	
	update_debug();
}

function update_debug() {/*
	for (var i = 0; i < localStorage.length; i++){
		$('#debug').append('<dt>' + localStorage.key(i) + '</dt><dd>' + localStorage.getItem(localStorage.key(i)) + '</dd>');
	}		
*/}

function updateTTX() {
	var ttx = Math.round((new Date(new Date().getFullYear(), 12-1, 25) - new Date()) / (1000 * 60 * 60 * 24) + 0.5);
	//document.querySelector('#ttx').innerHTML = ttx;
	$('#ttx').append(ttx);
}

$(document).ready(function() {
	restore_options(); 
	updateTTX();
});

document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('input[type=button]').addEventListener('click', save_options);
});

