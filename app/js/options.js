function loadOpt() {
	var options = ["room_id", "auth_token", "hc_host"];
	var defaults = [0, "", ""];
	options.forEach(function(elm, i, arr) {
		if (localStorage[elm] === undefined) {
			localStorage[elm] = defaults[i];
		}
	});

	var tb_room_id = document.getElementById("tb_room_id");
    var tb_auth_token = document.getElementById("tb_auth_token");
    var tb_hc_host = document.getElementById("tb_hc_host");
	tb_room_id.value = localStorage[options[0]] === undefined ? 0 : localStorage[options[0]];
    tb_auth_token.value = localStorage[options[1]] === undefined ? "" : localStorage[options[1]];
    tb_hc_host.value = localStorage[options[2]] === undefined ? "" : localStorage[options[2]];
}

function saveOpt() {
	var tb_room_id = document.getElementById("tb_room_id");
    var tb_auth_token = document.getElementById("tb_auth_token");
    var tb_hc_host = document.getElementById("tb_hc_host");

	localStorage["room_id"] = tb_room_id.value;
    localStorage["auth_token"] = tb_auth_token.value;
    localStorage["hc_host"] = tb_hc_host.value;

	document.getElementById("saveButton").classList.add("success");
	setTimeout(function(){
		document.getElementById("saveButton").classList.remove("success");
		location.reload();
	}, 500);
}

function restoreOpt() {
	localStorage.removeItem("room_id");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("hc_host");
	location.reload();
}

document.addEventListener('DOMContentLoaded', loadOpt);
document.getElementById("saveButton").addEventListener("click", saveOpt);
document.getElementById("restoreButton").addEventListener("click", restoreOpt);
