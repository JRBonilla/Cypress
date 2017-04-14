function authenticate(){
	var data = JSON.parse(users);
	var uname = document.forms["login"]["uname"].value;
	var psw = document.forms["login"]["psw"].value;

	for (var i in data) {
		if (uname == data[i].email && psw == data[i].password) {
			return true;
		}
	}
	alert("Invalid username or password.");
	return false;
}
