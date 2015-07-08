// Run our chrome app script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', init);

function init() {
    document.getElementById("email_form").addEventListener("submit", function (e) {
        document.getElementById("status-icon").innerHTML = "<img src='img/ajax-loader.gif' />";
		
		var FirstName = document.getElementById("FirstName").value.replace(/[\s]+/, "");
        var LastName = document.getElementById("LastName").value.replace(/[\s]+/, "");
        var DomainName = document.getElementById("DomainName").value.replace(/[\s]+/, "");
        
        if (FirstName == "" || LastName == "" || DomainName == "") {
            alert("Fill all fields.");
            e.preventDefault();
            return;
        }
        
        var InvalidFirstNameMatch = FirstName.match(/[^A-Za-z]+/);
        if (InvalidFirstNameMatch != null) {
            alert("Invalid First Name.");
            e.preventDefault();
            return;
        }

        var InvalidLastNameMatch = LastName.match(/[^A-Za-z]+/);
        if (InvalidLastNameMatch != null) {
            alert("Invalid Last Name.");
            e.preventDefault();
            return;
        }
        
        var InvalidDomainNameMatch = DomainName.match(/[^A-Za-z\.]+/);
        if (InvalidDomainNameMatch != null) {
            alert("Invalid Domain Name.");
            e.preventDefault();
            return;
        }
        
        var email = FirstName + "." + LastName + "@" + DomainName;
		
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        
        xmlhttp.open("GET", "http://validateemail.apphb.com/api/EmailStatus?email="+email, true);
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
						document.getElementById("status-icon").innerHTML = "<img src='img/red-crossmark.png' />";
					}
                }
            }
        }
		
        e.preventDefault();
    });
}