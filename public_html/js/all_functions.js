/*
Function getCivil(id, pass) returns user object if the password is correct, null otherwise
can be used in login page to check if password is correct and to carry along the user ID and
permission level. Obviously, this is insanely easy to hack. Security = 0
*/
function getCivil(id, pass){
	if(pass == getPass(id)){ //getPass(id) hasn't been written because it involves accessing the db, which I don't know how to do
		var user = {permission:"Civil", id:id};
		return user;
	} else{
		return null;
	}
}

function checkPass(id, pass){
	$.getJSON("test.json", function(json) {
    console.log(json); // this will show the info it in firebug console
	});
}