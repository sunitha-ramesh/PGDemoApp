function isZeroOnly(id) {
	if (id.value != "" && id.value == "0") {
		return false;
	}
	return true;
}

function NotAllowUnwantedCharaters(id) {
	var regexp = /[^`'"~]+$/;
	if (!regexp.test(id.value)) {
		// id.value = id.value.replace(/[^A-Za-z\d\s]+$/,"");
		id.value = '';
		return false;
	}
	return true;
}
/*
 * this.panNoValidation = function() { var pan_no =
 * $("#pan_no_vend_info").val().toUpperCase(); var regex1 =
 * /^[A-Z]{5}\d{4}[A-Z]{1}$/; // this is the pattern of // regular expersion if
 * (regex1.test(pan_no) == false) { return false; } }
 */
function isRequired(id) {
	var val = id.value;
	val = val.replace(/\s/g, '');
	if (val == "") {
		id.value = val;
		return false;
	}
	return true;
}
// function validateEmail(obj) {
//
// var id = obj.value;
//	
//	
// if(obj.value !="")
// {
// var email=obj.value;
// var reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
// if (!reg.test(id)) {
//
// $("#" + id + "EmptyErr").html("");
// $("#" + id + "Err").html("Invalid Email");
// return false;
// }
//		
// }
//	
//	
// $("#"+id+"Err").html("");
// return true;
// }

function validateEmail(obj) {
	var id = obj.id;
	if (obj.value != "") {
		var pan_no = obj.value;
		var regex1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (!regex1.test(pan_no)) {
			$("#" + id + "EmpErrH").show();
			$("#" + id + "EmpErr").show();
			$("#" + id + "EmpErr").html("Invalid Email");
			$("#phoneNoEmpErrH").show();
			$("#phoneNoEmpErr").show();
			$("#postalCodeEmpErrH").show();
			$("#postalCodeEmpErr").show();
			return false;
		}
	}
	$("#" + id + "Err").html("");
	//Checking for merchant mater
	if (id == "emailId") {
		merchantEmailExists();
	}
	return true;
}

function validatePhone(obj) {
	var id = obj.id;

	if (obj.value != "") {
		var ph_no = obj.value;

		var regex1 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

		// var regex1 = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

		if (!regex1.test(ph_no)) {

			$("#" + id + "EmpErrH").show();
			$("#" + id + "EmpErr").show();
			$("#" + id + "EmpErr").html("Wrong Phone Number Format");

			$("#postalCodeEmpErrH").show();
			$("#postalCodeEmpErr").show();
			$("#emailIdEmpErrH").show();
			$("#emailIdEmpErr").show();
			return false;
		}
	}
	$("#" + id + "Err").html("");
	return true;

}
function validateMobNo(obj) {

	var id = obj.id;

	if (obj.value != "") {
		var ph_no = obj.value;

		var regex1 = /^(\+91-|\+91|0)?\d{10}$/;

		if (!regex1.test(ph_no)) {

			$("#" + id + "EmpErrH").show();
			$("#" + id + "EmpErr").show();
			$("#" + id + "EmpErr").html("Invalid Mobile Number");
			$("#businessCommercementDateEmpErrH").show();
			$("#businessCommercementDateEmpErr").show();
			$("#faxNoEmpErrH").show();
			$("#faxNoEmpErr").show();

			return false;
		}
	}
	$("#" + id + "Err").html("");
	//Checking for merchant mater
	if (id == "mobileNo") {
		mobileAlreadyExists();
	}
	return true;

}

function isNumeric(id) {

	var reg = /[^0-9\.]/g;
	if (reg.test(id.value)) {
		id.value = "";
		return false;
	}
	return true;
}

function isAlphaNumericDot(id) {
	var value = id.value;
	if (value.substring(0, 1) != '.') {
		var reg = /[^0-9A-Za-z\.]/g;
		if (reg.test(id.value)) {
			id.value = "";
			return false;
		}
		return true;
	}
	id.value = "";
	return false;
}

function isNumericOnly(obj) {

	var id = obj.id;
	var reg = /[^0-9]/g;
	if (reg.test(obj.value)) {
		obj.value = "";
		$("#" + id + "EmptyErr").html("");
		$("#" + id + "Err").html("Only numbers allowed");
		return false;
	}
	$("#" + id + "Err").html("");
	return true;
}
function isAmount(id) {
	var value = id.value;
	if (value.substring(0, 1) != '0') {
		var regexp = /^\d+\.?$|^\d+(\.\d{1,2})?$/;
		if (!regexp.test(id.value)) {
			id.value = '';
			return false;
		}
		return true;
	}
	id.value = "";
	return false;
}

function isDecimal(id) {
	var value = id.value;
	if (value.substring(0, 1) != '0') {
		var regexp = /^\d+\.?$|^\d+(\.\d{1,3})?$/;
		if (!regexp.test(id.value)) {
			id.value = '';
			return false;
		}
		return true;
	}
	id.value = "";
	return false;
}

function isAlphaOnly(id) {
	var reg = /[^A-Za-z]/g;
	if (reg.test(id.value)) {
		id.value = "";
		return false;
	}
	return true;
}

function isStyleModel(id) {
	var reg = /[^A-Za-z0-9-/()]/g;
	if (reg.test(id.value)) {
		id.value = "";
		return false;
	}
	return true;
}

function isAlphaNumericStartingWithOne(id) {
	var value = id.value;
	if (value.substring(0, 1) != '0') {
		var reg = /[^0-9A-Za-z]/g;
		if (reg.test(id.value)) {
			id.value = "";
			return false;
		}
		return true;
	}
	id.value = "";
	return false;
}

function isNumericStartingWithOne(id) {
	var value = id.value;
	if (value.substring(0, 1) != '0') {
		var reg = /[^0-9]/g;
		if (reg.test(id.value)) {
			id.value = "";
			return false;
		}
		return true;
	}
	id.value = "";
	return false;
}
function isComboSelected(id) {
	if (id.value == "" || id.value == "Select" || id.value == "0")
		return false;
	return true;
}
function isContainerNo(id) {
	if (/ /g.test(id.value))
		id.value = id.value.replace(/ /g, '');

	if (id.value.length < 11)
		return false;
	return true;
}
function isAlphaNumericOnly(id) {

	var rexp = /^[0-9a-zA-Z]+$/;

	if (!rexp.test(id.value)) {
		id.value = "";
		return false;
	}
	return true;
}

function panNoValidation(obj) {

	var id = obj.id;
	if (obj.value != "") {
		var pan_no = obj.value;
		var regex1 = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
		if (!regex1.test(pan_no)) {
			$("#" + id + "EmpErrH").show();
			$("#" + id + "EmpErr").html("Invalid Pan No");
			return false;
		} else {
			$("#" + id + "EmpErr").html("");
			return true;
		}
	}
	$("#" + id + "EmpErr").html("");
	return true;

}

function tanNoValidation(obj) {
	var id = obj.id;

	if (obj.value != "") {
		var tan_no = obj.value;
		var regex1 = /^[A-Z]{4}\d{5}[A-Z]{1}$/;
		if (!regex1.test(tan_no)) {
			$("#" + id + "EmpErrH").show();
			$("#" + id + "EmpErr").html("Invalid Tan No");
			return false;
		} else {
			$("#" + id + "EmpErr").html("");
			return true;
		}
	}
	$("#" + id + "EmpErr").html("");
	return true;

}

function tinvatNoValidation(obj) {
	var id = obj.id;
	if (obj.value != "") {
		var tan_no = obj.value;
		var regex1 = /^(0|[1-9][0-9]*)$/;
		if (!regex1.test(tan_no)) {
			$("#" + id + "EmpErrH").show();
			$("#" + id + "EmpErr").html("Numbers Only Allowed");
			return false;
		} else {
			$("#" + id + "EmpErr").html("");
			return true;
		}
	}
	$("#" + id + "EmpErr").html("");
	return true;

}

function NumbersOnly(obj) {

	var id = obj.id;

	if (obj.value != "") {
		var tan_no = obj.value;
		var regex1 = /^(0|[1-9][0-9]*)$/;
		if (!regex1.test(tan_no)) {
			$("#" + id + "EmpErrH").show();
			$("#" + id + "EmpErr").show();
			$("#" + id + "EmpErr").html("Numbers Only Allowed");
			return false;
		} else {
			$("#" + id + "EmpErr").html("");
			return true;
		}
	}
	$("#" + id + "EmpErr").html("");
	return true;
}


function minmaxValueNum(obj, val) {
	var id = obj.id;
	if (obj.value != "") {
		var tin_no = obj.value;
		if (tin_no.length >= val) {
			var a = val - 1;

			// $("#" + id + "Errr")
			// .html( id+"No should not Exceed" +a+"didgits");
			$("#" + id + "EmpErrH").show();
			$("#" + id + "EmpErr").show();
			$("#" + id + "EmpErr").html("Should not Exceed" + a + "digits");
			return false;
		} else {
			$("#" + id + "EmpErr").html("");
			return true;
		}
	}
	$("#" + id + "EmpErr").html("");
}

function minmaxValueChar(obj, val) {

	var id = obj.id;

	if (obj.value != "") {

		var tin_no = obj.value;
		if (tin_no.length >= val) {
			var a = val - 1;

			// $("#" + id + "Errr")
			// .html( id+"No should not Exceed" +a+"didgits");
			$("#" + id + "Errr")
					.html(" Should not Exceed " + a + " charecters");
			return false;
		}
	}
	$("#" + id + "Errr").html("");
}

function serviceTax(obj) {

	var id = obj.id;
	if (obj.value != "") {
		var tax_no = obj.value;
		var regex1 = /^[0-9a-z]+$/;
		if (!regex1.test(tax_no)) {
			$("#" + id + "EmpErrH").show();
			$("#" + id + "EmpErr").html("Alpha Numeric Only Allowed");
			return false;
		} else {
			$("#" + id + "EmpErr").html("");
			return true;
		}
	}
	$("#" + id + "EmpErr").html("");
	return true;

}

function bankNameeee(obj) {

	var id = obj.id;
	if (obj.value != "") {
		var bname = obj.value;
		var regex = /^[a-zA-Z. ]*$/;
		if (!regex.test(bname)) {

			$("#" + id + "EmptyErr").html("");
			$("#" + id + "Err").html("Charecters Only Allowed");
			return false;
		}
	}
	$("#" + id + "Err").html("");
	return true;

}

function isNumericAndHyphenOnly(id) {
	var rexp = /^[0-9-]+$/;
	if (!rexp.test(id.value)) {
		id.value = "";
		return false;

	}
	return true;
}
function isDate(id) {
	var currVal = id.value;
	if (currVal == '')
		return false;

	var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/; // Declare
	// Regex
	var dtArray = currVal.match(rxDatePattern); // is format OK?
	if (dtArray == null)
		return false;

	// Checks for dd/mm/yyyy format.
	dtDay = dtArray[1];
	dtMonth = dtArray[3];
	dtYear = dtArray[5];

	if (dtDay < 1 || dtDay > 31)
		return false;
	else if (dtMonth < 1 || dtMonth > 12)
		return false;
	else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11)
			&& dtDay == 31)
		return false;
	else if (dtMonth == 2) {
		var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
		if (dtDay > 29 || (dtDay == 29 && !isleap))
			return false;
	}
	return true;
}
function isTime(id) {
	var currVal = id.value;
	if (currVal == '')
		return false;

	var rxTimePattern = /^(\d{1,2})(\/|:)(\d{1,2})$/; // Declare Regex
	var timeArray = currVal.match(rxTimePattern); // is format OK?
	if (timeArray == null)
		return false;

	// Checks for hh:mm format.
	timehour = timeArray[1];
	timeMin = timeArray[3];

	if (timehour < 1 || timehour > 23)
		return false;
	else if (timeMin < 1 || timeMin > 59)
		return false;
	return true;
}
function isPastDate(id) {
	if (isDate(id)) {
		var currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);
		var givenDate = id.value.split("/");
		givenDate = new Date(givenDate[2], givenDate[1] - 1, givenDate[0]);
		if (givenDate > currentDate) {
			return false;
		}
		return true;
	}
	return false;
}
function isFutureDate(id) {
	if (isDate(id)) {
		var currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);
		var givenDate = id.value.split("/");
		givenDate = new Date(givenDate[2], givenDate[1] - 1, givenDate[0]);
		if (givenDate < currentDate) {
			return false;
		}
		return true;
	}
	return false;
}

function isDateTime(id) {
	var currVal = id.value;
	if (currVal == '')
		return false;
	var dtArray = currVal.split(" ");
	var date = dtArray[0].split("/");
	var time = dtArray[1].split(":");

	// Checks for dd/mm/yyyy format.
	dtDay = date[0];
	dtMonth = date[1];
	dtYear = date[2];
	dtHour = time[0];
	dtMin = time[1];
	if (dtDay < 1 || dtDay > 31)
		return false;
	else if (dtMonth < 1 || dtMonth > 12)
		return false;
	else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11)
			&& dtDay == 31)
		return false;
	else if (dtMonth == 2) {
		var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
		if (dtDay > 29 || (dtDay == 29 && !isleap))
			return false;
	} else if (dtHour > 23 || dtMin > 59) {
		return false;
	}
	return true;
}
function isPastDateTime(id) {
	if (isDateTime(id)) {
		var currentDateTime = new Date();
		var givenDateTime = id.value.split(" ");
		var givenDate = givenDateTime[0].split("/");
		var givenTime = givenDateTime[1].split(":");
		givenDateTime = new Date(givenDate[2], givenDate[1] - 1, givenDate[0],
				givenTime[0], givenTime[1]);
		if (givenDateTime > currentDateTime) {
			return false;
		}
		return true;
	}
	return false;
}
function isFutureDateTime(id) {
	if (isDateTime(id)) {
		var currentDateTime = new Date();
		var givenDateTime = id.value.split(" ");
		var givenDate = givenDateTime[0].split("/");
		var givenTime = givenDateTime[1].split(":");
		givenDateTime = new Date(givenDate[2], givenDate[1] - 1, givenDate[0],
				givenTime[0], givenTime[1]);
		if (givenDateTime < currentDateTime) {
			return false;
		}
		return true;
	}
	return false;
}
function loadXMLDoc(dname) {
	if (window.XMLHttpRequest) {
		xhttp = new XMLHttpRequest();
	} else {
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET", dname, false);
	xhttp.send();
	return xhttp.responseXML;
}
function CheckContainerNo(id) {
	var ContainerNo = id.value;
	var checkDigit = ContainerNo.substring(10, 11)
	var total = getAlphapetTotal(ContainerNo) + getNumericTotal(ContainerNo);
	var divBy11 = Math.floor(total / 11);
	var mulBy11 = divBy11 * 11;
	var minus = total - mulBy11;
	if (minus == 10) {
		minus = 0;
	}
	if (minus == checkDigit)
		return true;
	else
		return false;
}
function mobileNumberValidation(id) {
	var val = id.value;
	var reg = /[^0-9]/g;
	if (reg.test(id.value) || val.length < 10) {
		id.value = "";
		return false;
	}
	return true;
}
function getNumericTotal(contNumeric) {
	var i = 4;
	var sum = 0;
	while (i < 10) {
		var sa = contNumeric.charAt(i);
		var a = sa * Math.pow(2, i);
		sum += a;
		i++;
	}
	return sum;
}
function getAlphapetTotal(contAlpha) {
	var names = {
		"A" : "10",
		"B" : "12",
		"C" : "13",
		"D" : "14",
		"E" : "15",
		"F" : "16",
		"G" : "17",
		"H" : "18",
		"I" : "19",
		"J" : "20",
		"K" : "21",
		"L" : "23",
		"M" : "24",
		"N" : "25",
		"O" : "26",
		"P" : "27",
		"Q" : "28",
		"R" : "29",
		"S" : "30",
		"T" : "31",
		"U" : "32",
		"V" : "34",
		"W" : "35",
		"X" : "36",
		"Y" : "37",
		"Z" : "38"
	}

	var i = 0;
	var sum = 0;
	while (i < 4) {
		var sa = contAlpha.charAt(i);
		var a = names[sa] * Math.pow(2, i);

		sum += a;
		i++;
	}
	return sum;
}
/* Private Function ENDS */

