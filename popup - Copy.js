
        var Account = {
            FirstName: "sohail",
            LastName: "khan",
            DomainName: "yahoo.com"
        };
        alert(JSON.stringify(Account));
        xmlhttp.open("GET", "http://localhost:42031/api/EmailStatus", true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.setRequestHeader("Accept", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify(Account));
		
        xmlhttp.onreadystatechange = function () {
            alert(xmlhttp.status);
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText) { // the onreadystatechange executes multiple times, so this check is required
                    alert(xmlhttp.responseText);
                }
            }
        }