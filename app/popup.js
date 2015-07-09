// Run our chrome app script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', init);

function init() {
    document.getElementById("email_form").addEventListener("submit", function (e) {
		var Email = document.getElementById("email").value;
        
        if (Email == "" || Email == null || typeof Email == "undefined") {
            alert("Fill all fields.");
            e.preventDefault();
            return;
        }
		
        var InvalidEmailMatch = Email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
        
		if (InvalidEmailMatch == null) {
            alert("Invalid email format.");
            e.preventDefault();
            return;
        }
		
		document.getElementById("status-icon").innerHTML = "<img src='img/ajax-loader.gif' />";
        
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        
        xmlhttp.open("GET", "http://validateemail.apphb.com/api/EmailStatus?email="+Email, true);
        xmlhttp.setRequestHeader("Accept", "application/json;charset=UTF-8");
		xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xmlhttp.send();
		
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText) { // the onreadystatechange executes multiple times, so this check is required
                    var response = JSON.parse(xmlhttp.responseText);
					//document.getElementById("json").innerText = xmlhttp.responseText;
					document.getElementById("email-address").innerText = response.address;
					if(response.status == "valid" || response.status == "Accept All") {
						document.getElementById("status-icon").innerHTML = "<img src='img/green-checkmark.png' />";
					} else if(response.status == "invalid") {
						document.getElementById("status-icon").innerHTML = "<img src='img/red-crossmark.png' />";
					} else if(response.status == "unknown") {
						document.getElementById("status-icon").innerHTML = "<img src='img/grey-box.png' />";
					}
                }
            }
        }
		
        e.preventDefault();
    });
}