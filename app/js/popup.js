/*
 <license>
 Ticket To HipChat - a Google Chrome extension
 Copyright 2017 Sergiy Lilikovych.

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 as published by the Free Software Foundation; either version 2
 of the License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>
 </license>
 */

/*Google Analitycs*/
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-61572268-3']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script');
	ga.type = 'text/javascript';
	ga.async = true;
	ga.src = 'https://ssl.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);
})();


/*Main code*/
function onInfo(info) {
	document.getElementById("result").innerHTML = '<span>'+info+'</span>';
}

function onError(s) {
	document.getElementById("result").innerHTML = '<span class="error">'+s+'</span>';
}

var notifyConfig = localStorage["room_id"] == undefined || localStorage["room_id"] == 0;

chrome.tabs.query({
	'active' : true,
	'currentWindow' : true
}, function(tab) {
    if(notifyConfig){
        onError("Please, configure the extension first");
        return;
    }

    try {

        var ticketRegex = /([A-Za-z]{3}-[0-9]{3}-[0-9]{5})/g;
        if (!tab || tab.length <= 0) {
            return;
        }
        var tabTitle = tab[0].title;
        var ticketId = ticketRegex.exec(tabTitle);
        if (ticketId === null) {
            onError("Ticket ID not found");
            return;
        } else {
            qwest.post('https://hc.namecheap.net/v2/room/' + localStorage["room_id"] + '/message',
                {message: ticketId[0]},
                {
                    cache: true,
                    dataType: 'json',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage["auth_token"]
                    }
                }).then(function (xhr, response) {
                onInfo("OK");
            })
                .catch(function (e, xhr, response) {
                    onError(e);
                    return;
                });
        }
    }catch (e){
        onError(e);
    }
});