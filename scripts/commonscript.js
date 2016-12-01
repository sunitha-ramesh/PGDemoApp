var alphaNumberic = /^[A-Za-z][A-Za-z0-9 ]*$/;
var numbersOnly = /^[0-9]+$/;
var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

String.prototype.trim = function() {
	a = this.replace(/^\s+/, '');
	return a.replace(/\s+$/, '');
};

function numCheck(chaExt) {
	if (!numbersOnly.test(chaExt.value)) {
		alert("Please enter number only to ext number");
	}
}
function doAction(url) {
	window.location = url;
	// $("#dynamicContainer").val("");
	// $("#dynamicContainer").load(url);
}

function doActionEdit(url) {
	window.location = url;
}

function doDelete(url) {

	// ShowCustomDialog(url);

	if (window.confirm('Are you sure want to delete this record')) {
		window.location = url;
	}
}

function onSubmitDelete(url) {
	if (window.confirm('Are you sure want to delete this record')) {
		var parameters = $('form').serialize();
		$.ajax({
			url : url,
			method : 'POST',
			data : parameters,
			success : function(result) {
				$("#dynamicContainer").html(result)
			}
		});
	}

}

function onSubmit(url) {
	var parameters = $('form').serialize();
	$.ajax({
		url : url,
		method : 'POST',
		data : parameters,
		success : function(result) {
			$("#dynamicContainer").html(result)
		}
	});
}

/*
 * function urlSet() { var a = document.createElement('a'); a.href =
 * 'logout.jsp'; a.target = '_top'; document.body.appendChild(a); a.click(); }
 * 
 * function sessionTimeout() { var wintimeout; function SetWinTimeout() {
 * 
 * wintimeout = window.setTimeout("urlSet();", (1000)); //after 10 mins i.e. 10 *
 * 60 * 1000 }
 * 
 * $('body').click(function() { window.clearTimeout(wintimeout); //when user
 * clicks remove timeout and reset it SetWinTimeout(); }); SetWinTimeout(); }
 */

function setAutoComplete(searchType, sourceID, codeID, mustMatch) {
	$("#" + sourceID)
			.autocomplete(
					{
						autoFocus : true,
						delay : 0,
						source : function(request, response) {
							$.ajax({
								url : "autoComplete",
								data : "req=" + request.term.replace("&", "#")
										+ "&spKey=" + searchType,
								type : "POST",
								success : function(data) {
									var list = new Array();
									list = data.split('^');
									response($.map(list, function(item) {
										return {
											label : item.split('~')[0],
											value : item.split('~')[1]
										}
									}))
								}
							});
						},
						select : function(event, ui) {

							if (ui.item.label != "") {
								document.getElementById(sourceID).value = (ui.item.label);
								document.getElementById(codeID).value = (ui.item.value);
								if (ui.item.value != ""
										&& searchType == 'sp_cardclassification_list') {
									getAggregatorMdrPercentage(sourceID);
								}
							}
							return false;
						},
						open : function(event, ui) {
							document.getElementById(codeID).value = ""
						},
						close : function(event, ui) {

							if (mustMatch == "Y")
								checkAndSetEmpty(sourceID, codeID);

						},
						focus : function(event, ui) {
							event.preventDefault();
						}
					});

}

function getAggregatorMdrPercentage(sourceID) {
	var lastChar = parseInt(sourceID.substr(sourceID.length - 1));
	var bankName = $("#mdrbankName" + lastChar).val();
	var api = $("#api" + lastChar).val();
	var channel = $("#paymentChannel" + lastChar).val();
	var method = $("#paymentMethod" + lastChar).val();
	var cardType = $("#cardType" + lastChar).val();
	var classification = $("#" + sourceID).val();
	var reqParams = "MdrBankName=" + bankName + "&api=" + api
			+ "&paymentChannel=" + channel + "&paymentMethod=" + method
			+ "&cardType=" + cardType + "&cardClassification=" + classification;

	$.ajax({
		url : "getAggregatorMdrPercentageAction",
		data : reqParams,
		type : "POST",
		success : function(data) {
			$("#aggregatormdrPercentage" + lastChar).val(data);
		}
	});

}

function setAutoCompleteForBranchName(searchType, sourceID, codeID, result1,
		result2, bankID, mustMatch) {

	var requestParameters = "";

	$("#" + sourceID)
			.autocomplete(
					{
						autoFocus : true,
						delay : 0,
						source : function(request, response) {

							requestParameters = "req="
									+ request.term.replace("&", "#")
									+ "&spKey=" + searchType + "&paramValue1="
									+ $("#" + bankID).val();

							$.ajax({
								url : "autoComplete",
								data : requestParameters,
								type : "POST",
								success : function(data) {
									var list = new Array();
									list = data.split('^');
									response($.map(list, function(item) {
										return {
											label : item.split('~')[0],
											value : item.split('~')[1],
											value1 : item.split('~')[2],
											value2 : item.split('~')[3]
										}
									}))
								}
							});
						},
						select : function(event, ui) {

							if (ui.item.label != "") {
								document.getElementById(sourceID).value = (ui.item.label);
								document.getElementById(codeID).value = (ui.item.value);
								document.getElementById(result1).value = (ui.item.value1);
								document.getElementById(result2).value = (ui.item.value2);

							}
							return false;
						},
						open : function(event, ui) {
							document.getElementById(codeID).value = ""
						},
						close : function(event, ui) {

							if (mustMatch == "Y")
								checkAndSetEmptyForBranchName(sourceID, codeID,
										result1, result2);

						},
						focus : function(event, ui) {
							event.preventDefault();
						}
					});

}

function checkAndSetEmpty(sourceID, codeID) {
	if (document.getElementById(codeID).value == "")
		document.getElementById(sourceID).value = "";
	if (document.getElementById(sourceID).value == "")
		document.getElementById(codeID).value = "";
}

function checkAndSetEmptyForBranchName(sourceID, codeID, result1, result2) {
	if (document.getElementById(codeID).value == "") {
		document.getElementById(sourceID).value = "";
		document.getElementById(result2).value = "";
		document.getElementById(result1).value = "";
	}

	if (document.getElementById(sourceID).value == "") {
		document.getElementById(sourceID).value = "";
		document.getElementById(result2).value = "";
		document.getElementById(result1).value = "";
	}

}


function currencyConvertFloat(x) {
	x = x.toString();
	var afterPoint = '';
	if (x.indexOf('.') > 0)
		afterPoint = x.substring(x.indexOf('.'), x.length);
	x = Math.floor(x);
	x = x.toString();
	var lastThree = x.substring(x.length - 3);
	var otherNumbers = x.substring(0, x.length - 3);
	if (otherNumbers != '')
		lastThree = ',' + lastThree;
	var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree
			+ afterPoint;
	return res;
}

function setAutoCompleteforpaymentChannel(searchType, sourceID, codeID,
		mustMatch) {
	$("#" + sourceID)
			.autocomplete(
					{
						autoFocus : true,
						delay : 0,
						source : function(request, response) {
							$.ajax({
								url : "autoComplete",
								data : "req=" + request.term.replace("&", "#")
										+ "&spKey=" + searchType,
								type : "POST",
								success : function(data) {
									var list = new Array();
									list = data.split('^');
									response($.map(list, function(item) {
										return {
											label : item.split('~')[0],
											value : item.split('~')[1]
										}
									}))
								}
							});
						},
						select : function(event, ui) {

							if (ui.item.label != "") {
								document.getElementById(sourceID).value = (ui.item.label);
								document.getElementById(codeID).value = (ui.item.value);

							}
							return false;
						},
						open : function(event, ui) {
							document.getElementById(codeID).value = ""
						},
						close : function(event, ui) {
							if (mustMatch == "Y")
								checkAndSetEmptyForBranchName(sourceID, codeID,
										result1, result2);
						},
						focus : function(event, ui) {
							event.preventDefault();
						}
					});

}

function ShowCustomDialog(url) {

	ShowDialogBox('Warning', 'Do you want to delete the record?', 'Ok',
			'Cancel', 'GoToAssetList', null, url);
}

function ShowDialogBox(title, content, btn1text, btn2text, functionText,
		parameterList, url) {
	var btn1css;
	var btn2css;

	if (btn1text == '') {
		btn1css = "hidecss";
	} else {
		btn1css = "showcss";
	}

	if (btn2text == '') {
		btn2css = "hidecss";
	} else {
		btn2css = "showcss";
	}
	$("#lblMessage").html(content);

	$("#dialog").dialog({
		resizable : false,
		draggable : false,
		title : title,
		modal : true,
		width : '400px',
		height : 'auto',
		bgiframe : false,
		hide : {
			effect : 'scale',
			duration : 100
		},

		buttons : [ {
			text : btn1text,
			"class" : btn1css,
			click : function() {
				window.location = url;
				$("#dialog").dialog('close');

			}
		}, {
			text : btn2text,
			"class" : btn2css,
			click : function() {
				$("#dialog").dialog('close');
			}
		} ]
	});
}

function addMoreRowsholiday() {

	var errMsg = "";
	var rowCountHd = parseInt($("#rowCountHd").val());
	if ($("#holidayDelFlag" + rowCountHd).val() == "") {
		var previousholidayName = $("#holidayName" + rowCountHd).val();
		var previousHdEffFrom = $("#holidayEffectiveFrom" + rowCountHd).val();
	}

	if (previousholidayName == "") {
		$("#holidayName" + rowCountHd + "EmpErr").show();
		$("#holidayEffectiveFrom" + rowCountHd + "EmpErr").show();
		$("#holidayName" + rowCountHd + "EmpErr").html(
				"Holiday name is required");
		errMsg += "holidayName";
	}
	if (previousholidayName != "") {
		$("#holidayName" + rowCountHd + "EmpErr").show();
		$("#holidayEffectiveFrom" + rowCountHd + "EmpErr").show();
		$("#holidayName" + rowCountHd + "EmpErr").html("");
	}
	if (previousHdEffFrom == "") {
		$("#holidayName" + rowCountHd + "EmpErr").show();
		$("#holidayEffectiveFrom" + rowCountHd + "EmpErr").show();
		$("#holidayEffectiveFrom" + rowCountHd + "EmpErr").html(
				"Effective from is required");
		errMsg += "holidayEffectiveFrom";
	}
	if (previousHdEffFrom != "") {
		$("#holidayName" + rowCountHd + "EmpErr").show();
		$("#holidayEffectiveFrom" + rowCountHd + "EmpErr").show();
		$("#holidayEffectiveFrom" + rowCountHd + "EmpErr").html("");
	}

	if (errMsg != "") {
		return false;
	} else {
		$("#holidayName" + rowCountHd + "EmpErr").hide();
		$("#holidayName" + rowCountHd + "EmpErr").html("");
		$("#holidayEffectiveFrom" + rowCountHd + "EmpErr").hide();
		$("#holidayEffectiveFrom" + rowCountHd + "EmpErr").html("");
		rowCountHd = rowCountHd + 1;
		var recRow = ""
		recRow += "<tr  id='rowCount" + rowCountHd + "'>";
		recRow += "<td><input type='text' name='holidayName" 
				+ rowCountHd
				+ "' id='holidayName"
				+ rowCountHd
				+ "' onblur='checkHolidayDetails(this);' style='margin: 4px 10px 0 0px;'/>";
		recRow += "<td><input  type='text' name='holidayEffectiveFrom"
				+ rowCountHd
				+ "' id='holidayEffectiveFrom"
				+ rowCountHd
				+ "' maxlength='120' style='margin: 4px 10px 0 0px;' readonly='true'/>";
		recRow += "<input  type='hidden' name='holidayDelFlag" + rowCountHd
				+ "' id='holidayDelFlag" + rowCountHd + "' />";
		recRow += "</td>";
		recRow += "<td id='deleteHd" + rowCountHd
				+ "'><a href='javascript:void(0);' onclick='removeRow2("
				+ rowCountHd + ");'>Delete</a></td></tr>";
		recRow += "<tr  id='rowCountErr"
				+ rowCountHd
				+ "'><td id='holidayName"
				+ rowCountHd
				+ "EmpErr' style='text-align: left; width: 15%; display: none' class='loginerror'></td>";
		recRow += "<td id='holidayEffectiveFrom"
				+ rowCountHd
				+ "EmpErr'style='text-align: left; width: 15%; display: none'class='loginerror'></td>";
		recRow += "</tr>";
		jQuery('#addedRows2').append(recRow);
		$("#rowCountHd").val(rowCountHd);
		$("#holidayEffectiveFrom" + rowCountHd).datepicker({
			changeMonth : true,
			changeYear : true,
			dateFormat : 'dd/mm/yy'
		});

	}

}
function removeRow2(removeNum) {

	$("#holidayName" + removeNum).val("");
	$("#holidayEffectiveFrom" + removeNum).val("");
	$("#holidayDelFlag" + removeNum).val("DEL");
	$("#holidayName" + removeNum).attr("type", "hidden");
	$("#holidayEffectiveFrom" + removeNum).attr("type", "hidden");
	$("#deleteHd" + removeNum).hide();
	$("#rowCountErr" + removeNum).hide();
	// jQuery('#rowCount' + removeNum).hide();
}

function addMoreRows() {
	var errMsg = "";
	var rowCount = parseInt($("#rowCount").val());
	if ($("#bankDelFlag" + rowCount).val() == "") {

		var previousbankName = $("#bankName" + rowCount).val();
		var previousbranchName = $("#branchName" + rowCount).val();
		var previousbranchCode = $("#branchCode" + rowCount).val();
		var previousifscCode = $("#ifscCode" + rowCount).val();
		var previousmicrCode = $("#micrCode" + rowCount).val();
		var previousaccountName = $("#accountName" + rowCount).val();
		var previousaccountNo = $("#accountNo" + rowCount).val();
		var previoussettlementMode = $("#settlementMode" + rowCount).val();
		var previoussettlementPeriod = $("#settlementPeriod" + rowCount).val();
		var previousdefaultAccount = $("#defaultAccount" + rowCount).val();
	}

	if (previousbankName == "") {
		$("#bankName" + rowCount + "EmpErr").show();
		$("#bankName" + rowCount + "EmpErr").html("Bank name is required");
		$("#branchName" + rowCount + "EmpErr").show();
		$("#branchCode" + rowCount + "EmpErr").show();
		$("#ifscCode" + rowCount + "EmpErr").show();
		$("#micrCode" + rowCount + "EmpErr").show();
		$("#accountName" + rowCount + "EmpErr").show();
		$("#accountNo" + rowCount + "EmpErr").show();
		$("#settlementMode" + rowCount + "EmpErr").show();
		$("#settlementPeriod" + rowCount + "EmpErr").show();
		$("#defaultAccount" + rowCount + "EmpErr").show();
		errMsg += "bankName";
	}
	if (previousbankName != "") {
		$("#bankName" + rowCount + "EmpErr").show();
		$("#bankName" + rowCount + "EmpErr").html("");
		$("#branchName" + rowCount + "EmpErr").show();
		$("#branchCode" + rowCount + "EmpErr").show();
		$("#ifscCode" + rowCount + "EmpErr").show();
		$("#micrCode" + rowCount + "EmpErr").show();
		$("#accountName" + rowCount + "EmpErr").show();
		$("#accountNo" + rowCount + "EmpErr").show();
		$("#settlementMode" + rowCount + "EmpErr").show();
		$("#settlementPeriod" + rowCount + "EmpErr").show();
		$("#defaultAccount" + rowCount + "EmpErr").show();

	}
	if (previousbranchName == "") {
		$("#bankName" + rowCount + "EmpErr").show();
		$("#branchName" + rowCount + "EmpErr").show();
		$("#branchName" + rowCount + "EmpErr").html("Branch name is required");
		$("#branchCode" + rowCount + "EmpErr").show();
		$("#ifscCode" + rowCount + "EmpErr").show();
		$("#micrCode" + rowCount + "EmpErr").show();
		$("#accountName" + rowCount + "EmpErr").show();

		$("#accountNo" + rowCount + "EmpErr").show();
		$("#settlementMode" + rowCount + "EmpErr").show();
		$("#settlementPeriod" + rowCount + "EmpErr").show();
		$("#defaultAccount" + rowCount + "EmpErr").show();
		errMsg += "branchName";
	}
	if (previousbranchName != "") {
		$("#bankName" + rowCount + "EmpErr").show();
		$("#branchName" + rowCount + "EmpErr").show();
		$("#branchName" + rowCount + "EmpErr").html("");
		$("#branchCode" + rowCount + "EmpErr").show();
		$("#ifscCode" + rowCount + "EmpErr").show();
		$("#micrCode" + rowCount + "EmpErr").show();
		$("#accountName" + rowCount + "EmpErr").show();

		$("#accountNo" + rowCount + "EmpErr").show();
		$("#settlementMode" + rowCount + "EmpErr").show();
		$("#settlementPeriod" + rowCount + "EmpErr").show();
		$("#defaultAccount" + rowCount + "EmpErr").show();

	}
	if (previousbranchCode == "") {
		$("#bankName" + rowCount + "EmpErr").show();
		$("#branchName" + rowCount + "EmpErr").show();
		$("#branchCode" + rowCount + "EmpErr").show();
		$("#branchCode" + rowCount + "EmpErr").html("Branch code is required");
		$("#ifscCode" + rowCount + "EmpErr").show();
		$("#micrCode" + rowCount + "EmpErr").show();
		$("#accountName" + rowCount + "EmpErr").show();

		$("#accountNo" + rowCount + "EmpErr").show();
		$("#settlementMode" + rowCount + "EmpErr").show();
		$("#settlementPeriod" + rowCount + "EmpErr").show();
		$("#defaultAccount" + rowCount + "EmpErr").show();
		errMsg += "branchCode";
	}
	if (previousbranchCode != "") {
		$("#bankName" + rowCount + "EmpErr").show();
		$("#branchName" + rowCount + "EmpErr").show();
		$("#branchCode" + rowCount + "EmpErr").show();
		$("#branchCode" + rowCount + "EmpErr").html("");
		$("#ifscCode" + rowCount + "EmpErr").show();
		$("#micrCode" + rowCount + "EmpErr").show();
		$("#accountName" + rowCount + "EmpErr").show();

		$("#accountNo" + rowCount + "EmpErr").show();
		$("#settlementMode" + rowCount + "EmpErr").show();
		$("#settlementPeriod" + rowCount + "EmpErr").show();
		$("#defaultAccount" + rowCount + "EmpErr").show();

	}
	if (previousifscCode == "") {
		$("#bankName" + rowCount + "EmpErr").show();
		$("#branchName" + rowCount + "EmpErr").show();
		$("#branchCode" + rowCount + "EmpErr").show();
		$("#ifscCode" + rowCount + "EmpErr").show();
		$("#ifscCode" + rowCount + "EmpErr").html("ifsc code is required");
		$("#micrCode" + rowCount + "EmpErr").show();
		$("#accountName" + rowCount + "EmpErr").show();

		$("#accountNo" + rowCount + "EmpErr").show();
		$("#settlementMode" + rowCount + "EmpErr").show();
		$("#settlementPeriod" + rowCount + "EmpErr").show();
		$("#defaultAccount" + rowCount + "EmpErr").show();
		errMsg += "ifscCode";
	}
	if (previousifscCode != "") {
		$("#bankName" + rowCount + "EmpErr").show();
		$("#branchName" + rowCount + "EmpErr").show();
		$("#branchCode" + rowCount + "EmpErr").show();
		$("#ifscCode" + rowCount + "EmpErr").show();
		$("#ifscCode" + rowCount + "EmpErr").html("");
		$("#micrCode" + rowCount + "EmpErr").show();
		$("#accountName" + rowCount + "EmpErr").show();

		$("#accountNo" + rowCount + "EmpErr").show();
		$("#settlementMode" + rowCount + "EmpErr").show();
		$("#settlementPeriod" + rowCount + "EmpErr").show();
		$("#defaultAccount" + rowCount + "EmpErr").show();

	}
	if (previousmicrCode == "") {
		$("#bankName" + rowCount + "EmpErr").show();
		$("#branchName" + rowCount + "EmpErr").show();
		$("#branchCode" + rowCount + "EmpErr").show();
		$("#ifscCode" + rowCount + "EmpErr").show();
		$("#micrCode" + rowCount + "EmpErr").show();
		$("#micrCode" + rowCount + "EmpErr").html("micr code is required");
		$("#accountName" + rowCount + "EmpErr").show();
		$("#accountNo" + rowCount + "EmpErr").show();
		$("#settlementMode" + rowCount + "EmpErr").show();
		$("#settlementPeriod" + rowCount + "EmpErr").show();
		$("#defaultAccount" + rowCount + "EmpErr").show();
		errMsg += "micrCode";
	}
	if (previousmicrCode != "") {
		$("#bankName" + rowCount + "EmpErr").show();
		$("#branchName" + rowCount + "EmpErr").show();
		$("#branchCode" + rowCount + "EmpErr").show();
		$("#ifscCode" + rowCount + "EmpErr").show();
		$("#micrCode" + rowCount + "EmpErr").show();
		$("#micrCode" + rowCount + "EmpErr").html("");
		$("#accountName" + rowCount + "EmpErr").show();
		$("#accountNo" + rowCount + "EmpErr").show();
		$("#settlementMode" + rowCount + "EmpErr").show();
		$("#settlementPeriod" + rowCount + "EmpErr").show();
		$("#defaultAccount" + rowCount + "EmpErr").show();

	}
	if (previousaccountName == "") {
		$("#bankName" + rowCount + "EmpErr").show();
		$("#branchName" + rowCount + "EmpErr").show();
		$("#branchCode" + rowCount + "EmpErr").show();
		$("#ifscCode" + rowCount + "EmpErr").show();
		$("#micrCode" + rowCount + "EmpErr").show();
		$("#accountName" + rowCount + "EmpErr").show();
		$("#accountName" + rowCount + "EmpErr")
				.html("Account Name is required");
		$("#accountNo" + rowCount + "EmpErr").show();
		$("#settlementMode" + rowCount + "EmpErr").show();
		$("#settlementPeriod" + rowCount + "EmpErr").show();
		$("#defaultAccount" + rowCount + "EmpErr").show();
		errMsg += "accountName";
	}
	if (previousaccountName != "") {
		$("#bankName" + rowCount + "EmpErr").show();
		$("#branchName" + rowCount + "EmpErr").show();
		$("#branchCode" + rowCount + "EmpErr").show();
		$("#ifscCode" + rowCount + "EmpErr").show();
		$("#micrCode" + rowCount + "EmpErr").show();
		$("#accountName" + rowCount + "EmpErr").show();
		$("#accountName" + rowCount + "EmpErr").html("");
		$("#accountNo" + rowCount + "EmpErr").show();
		$("#settlementMode" + rowCount + "EmpErr").show();
		$("#settlementPeriod" + rowCount + "EmpErr").show();
		$("#defaultAccount" + rowCount + "EmpErr").show();

	}

	if (previousaccountNo == "") {
		$("#bankName" + rowCount + "EmpErr").show();
		$("#branchName" + rowCount + "EmpErr").show();
		$("#branchCode" + rowCount + "EmpErr").show();
		$("#ifscCode" + rowCount + "EmpErr").show();
		$("#micrCode" + rowCount + "EmpErr").show();
		$("#accountName" + rowCount + "EmpErr").show();
		$("#accountNo" + rowCount + "EmpErr").show();
		$("#accountNo" + rowCount + "EmpErr").html("Account No is required");
		$("#settlementMode" + rowCount + "EmpErr").show();
		$("#settlementPeriod" + rowCount + "EmpErr").show();
		$("#defaultAccount" + rowCount + "EmpErr").show();
		errMsg += "accountNo";
	}
	if (previousaccountNo != "") {
		$("#bankName" + rowCount + "EmpErr").show();
		$("#branchName" + rowCount + "EmpErr").show();
		$("#branchCode" + rowCount + "EmpErr").show();
		$("#ifscCode" + rowCount + "EmpErr").show();
		$("#micrCode" + rowCount + "EmpErr").show();
		$("#accountName" + rowCount + "EmpErr").show();
		$("#accountNo" + rowCount + "EmpErr").show();
		$("#accountNo" + rowCount + "EmpErr").html("");
		$("#settlementMode" + rowCount + "EmpErr").show();
		$("#settlementPeriod" + rowCount + "EmpErr").show();
		$("#defaultAccount" + rowCount + "EmpErr").show();

	}
	if (previoussettlementMode == "") {
		$("#bankName" + rowCount + "EmpErr").show();
		$("#branchName" + rowCount + "EmpErr").show();
		$("#branchCode" + rowCount + "EmpErr").show();
		$("#ifscCode" + rowCount + "EmpErr").show();
		$("#micrCode" + rowCount + "EmpErr").show();
		$("#accountName" + rowCount + "EmpErr").show();
		$("#accountNo" + rowCount + "EmpErr").show();
		$("#settlementMode" + rowCount + "EmpErr").show();
		$("#settlementMode" + rowCount + "EmpErr").html(
				"Settlement Mode is required");
		$("#settlementPeriod" + rowCount + "EmpErr").show();
		$("#defaultAccount" + rowCount + "EmpErr").show();
		errMsg += "settlementMode";
	}
	if (previoussettlementMode != "") {
		$("#bankName" + rowCount + "EmpErr").show();
		$("#branchName" + rowCount + "EmpErr").show();
		$("#branchCode" + rowCount + "EmpErr").show();
		$("#ifscCode" + rowCount + "EmpErr").show();
		$("#micrCode" + rowCount + "EmpErr").show();
		$("#accountName" + rowCount + "EmpErr").show();
		$("#accountNo" + rowCount + "EmpErr").show();
		$("#settlementMode" + rowCount + "EmpErr").show();
		$("#settlementMode" + rowCount + "EmpErr").html("");
		$("#settlementPeriod" + rowCount + "EmpErr").show();
		$("#defaultAccount" + rowCount + "EmpErr").show();

	}

	if (previoussettlementPeriod == "") {
		$("#bankName" + rowCount + "EmpErr").show();
		$("#branchName" + rowCount + "EmpErr").show();
		$("#branchCode" + rowCount + "EmpErr").show();
		$("#ifscCode" + rowCount + "EmpErr").show();
		$("#micrCode" + rowCount + "EmpErr").show();
		$("#accountName" + rowCount + "EmpErr").show();
		$("#accountNo" + rowCount + "EmpErr").show();
		$("#settlementMode" + rowCount + "EmpErr").show();
		$("#settlementPeriod" + rowCount + "EmpErr").show();
		$("#settlementPeriod" + rowCount + "EmpErr").html(
				"Settlement Period is required");
		$("#defaultAccount" + rowCount + "EmpErr").show();
		errMsg += "settlementPeriod";
	}
	if (previoussettlementPeriod != "") {
		$("#bankName" + rowCount + "EmpErr").show();
		$("#branchName" + rowCount + "EmpErr").show();
		$("#branchCode" + rowCount + "EmpErr").show();
		$("#ifscCode" + rowCount + "EmpErr").show();
		$("#micrCode" + rowCount + "EmpErr").show();
		$("#accountName" + rowCount + "EmpErr").show();
		$("#accountNo" + rowCount + "EmpErr").show();
		$("#settlementMode" + rowCount + "EmpErr").show();
		$("#settlementPeriod" + rowCount + "EmpErr").show();
		$("#settlementPeriod" + rowCount + "EmpErr").html("");
		$("#defaultAccount" + rowCount + "EmpErr").show();

	}

	if (previousdefaultAccount == "") {
		$("#bankName" + rowCount + "EmpErr").show();
		$("#branchName" + rowCount + "EmpErr").show();
		$("#branchCode" + rowCount + "EmpErr").show();
		$("#ifscCode" + rowCount + "EmpErr").show();
		$("#micrCode" + rowCount + "EmpErr").show();
		$("#accountName" + rowCount + "EmpErr").show();
		$("#accountNo" + rowCount + "EmpErr").show();
		$("#settlementMode" + rowCount + "EmpErr").show();
		$("#settlementPeriod" + rowCount + "EmpErr").show();
		$("#defaultAccount" + rowCount + "EmpErr").show();
		$("#defaultAccount" + rowCount + "EmpErr").html(
				"Default Account is required");
		errMsg += "defaultAccount";
	}

	if (errMsg != "") {
		return false;
	} else {
		$("#rowCountBankErr" + rowCount).hide();
		rowCount = rowCount + 1;
		var recRow = "";
		recRow += "<tr  id='rowCount" + rowCount + "'>";
		recRow += "<td><input type='text' name='bankName"
				+ rowCount
				+ "' id='bankName"
				+ rowCount
				+ "' onkeyup='setAutoComplete(&#39;sp_bankname_list&#39;,&#39;bankName"
				+ rowCount
				+ "&#39;,&#39;bankId"
				+ rowCount
				+ "&#39;,&#39;Y&#39;);' maxlength='120' style='margin: 4px 10px 0 0px;'/>";
		recRow += "<input type='hidden' name='bankId" + rowCount
				+ "' id='bankId" + rowCount
				+ "' maxlength='120' style='margin: 4px 10px 0 0px;'/></td>";
		recRow += "<td><input type='text' name='branchName"
				+ rowCount
				+ "' id='branchName"
				+ rowCount
				+ "' onkeyup='setAutoCompleteForBranchName(&#39;sp_branchname_list&#39;,&#39;branchName"
				+ rowCount
				+ "&#39;,&#39;branchCode"
				+ rowCount
				+ "&#39;,&#39;ifscCode"
				+ rowCount
				+ "&#39;,&#39;micrCode"
				+ rowCount
				+ "&#39;,&#39;bankId"
				+ rowCount
				+ "&#39;,&#39;Y&#39;);' maxlength='120' style='margin: 4px 10px 0 0px;'/>";

		recRow += "<td><input type='text' name='branchCode" + rowCount
				+ "' id='branchCode" + rowCount
				+ "' maxlength='120' style='margin: 4px 10px 0 0px;'/>";
		recRow += "<td><input type='text' name='ifscCode" + rowCount
				+ "' id='ifscCode" + rowCount
				+ "' maxlength='120' style='margin: 4px 10px 0 0px;'/>";
		recRow += "<td><input type='text' name='micrCode" + rowCount
				+ "' id='micrCode" + rowCount
				+ "' maxlength='120' style='margin: 4px 10px 0 0px;'/>";
		recRow += "<td><input type='text' name='accountName"
				+ rowCount + "' id='accountName" + rowCount
				+ "' maxlength='120' style='margin: 4px 10px 0 0px;'/>";
		recRow += "<td><input type='text' name='accountNo"
				+ rowCount
				+ "' id='accountNo"
				+ rowCount
				+ "' maxlength='120' onblur='checkBankDetails(this);' style='margin: 4px 10px 0 0px;'/>";
		/*
		 * recRow += "<td><input type='text' name='settlementMode" + rowCount + "'
		 * id='settlementMode" + rowCount + "' maxlength='120' style='margin:
		 * 4px 10px 0 0px;'/>";
		 */
		recRow += "<td><select name='settlementMode"
				+ rowCount
				+ "' id='settlementMode"
				+ rowCount
				+ "' maxlength='120' style='margin: 4px 10px 0 0px;'> <option value='NEFT'>NEFT</option> <option value='RTGS'>RTGS</option><option value='IMPS'>IMPS</option></select></td>";

		recRow += "<td><input type='text' name='settlementPeriod" + rowCount
				+ "' id='settlementPeriod" + rowCount
				+ "' maxlength='120' style='margin: 4px 10px 0 0px;'/>";
		recRow += "<td><input type='radio' name='defaultAccount"
				+ rowCount
				+ "' class='groupCheck"
				+ rowCount
				+ "' id='defaultAccount"
				+ rowCount
				+ "' maxlength='120' onclick='myAlert(this);' value='no' style='margin: 4px 10px 0 0px;'/>";
		recRow += "<td><input  type='hidden' name='bankDelFlag" + rowCount
				+ "' id='bankDelFlag" + rowCount + "' />";
		recRow += "<td id='deleteBk" + rowCount
				+ "'><a href='javascript:void(0);' onclick='removeRow1("
				+ rowCount + ");'>Delete</a></td></tr>";
		recRow += "<tr  id='rowCountBankErr"
				+ rowCount
				+ "'><td id='bankName"
				+ rowCount
				+ "EmpErr' style='text-align: left; width: 15%; display: none' class='loginerror'></td>";
		recRow += "<td id='branchName"
				+ rowCount
				+ "EmpErr'style='text-align: left; width: 15%; display: none'class='loginerror'></td>";
		recRow += "<td id='branchCode"
				+ rowCount
				+ "EmpErr'style='text-align: left; width: 15%; display: none'class='loginerror'></td>";
		recRow += "<td id='ifscCode"
				+ rowCount
				+ "EmpErr'style='text-align: left; width: 15%; display: none'class='loginerror'></td>";
		recRow += "<td id='micrCode"
				+ rowCount
				+ "EmpErr'style='text-align: left; width: 15%; display: none'class='loginerror'></td>";
		recRow += "<td id='accountName"
				+ rowCount
				+ "EmpErr'style='text-align: left; width: 15%; display: none'class='loginerror'></td>";
		recRow += "<td id='accountNo"
				+ rowCount
				+ "EmpErr'style='text-align: left; width: 15%; display: none'class='loginerror'></td>";
		recRow += "<td id='settlementMode"
				+ rowCount
				+ "EmpErr'style='text-align: left; width: 15%; display: none'class='loginerror'></td>";
		recRow += "<td id='settlementPeriod"
				+ rowCount
				+ "EmpErr'style='text-align: left; width: 15%; display: none'class='loginerror'></td>";
		recRow += "<td id='defaultAccount"
				+ rowCount
				+ "EmpErr'style='text-align: left; width: 15%; display: none'class='loginerror'></td>";
		recRow += "</tr>";

		jQuery('#addedRows').append(recRow);
		$("#rowCount").val(rowCount);
	}
}
function removeRow1(removeNum) {
	$("#bankName" + removeNum).val("");
	$("#branchName" + removeNum).val("");
	$("#branchCode" + removeNum).val("");
	$("#ifscCode" + removeNum).val("");
	$("#micrCode" + removeNum).val("");
	$("#accountName" + removeNum).val("");
	$("#accountNo" + removeNum).val("");
	$("#settlementMode" + removeNum).val("");
	$("#settlementPeriod" + removeNum).val("");
	$("#defaultAccount" + removeNum).val("");

	$("#bankName" + removeNum).attr("type", "hidden");
	$("#branchName" + removeNum).attr("type", "hidden");
	$("#branchCode" + removeNum).attr("type", "hidden");
	$("#ifscCode" + removeNum).attr("type", "hidden");
	$("#micrCode" + removeNum).attr("type", "hidden");
	$("#accountName" + removeNum).attr("type", "hidden");
	$("#accountNo" + removeNum).attr("type", "hidden");
	$("#settlementMode" + removeNum).attr("type", "hidden");
	$("#settlementPeriod" + removeNum).attr("type", "hidden");
	$("#defaultAccount" + removeNum).attr("type", "hidden");

	$("#deleteBk" + removeNum).hide();
	$("#bankDelFlag" + removeNum).val("DEL");
	$("#rowCountBankErr" + removeNum).hide();
	// jQuery('#rowCount' + removeNum).hide();
}

function addMoreRows1() {

	var errMsg = "";
	var rowCountMdr = parseInt($("#rowCountMdr").val());
	if ($("#MdrDelFlag" + rowCountMdr).val() == "") {
		var previousmdrbankName = $("#mdrbankName" + rowCountMdr).val();
		var previousapi = $("#api" + rowCountMdr).val();
		var previouspaymentChannel = $("#paymentChannel" + rowCountMdr).val();
		var previouspaymentMethod = $("#paymentMethod" + rowCountMdr).val();
		var previouscardType = $("#cardType" + rowCountMdr).val();
		var previouscardClassification = $("#cardClassification" + rowCountMdr)
				.val();
		var previousmdrPercentage = $("#mdrPercentage" + rowCountMdr).val();
		var previouseffectiveFrom = $("#effectiveFrom" + rowCountMdr).val();
		var previoustaxApplicable = $("#taxApplicable" + rowCountMdr).val();
	}
	if (previousmdrbankName == "") {

		$("#mdrbankName" + rowCountMdr + "EmpErr").show();
		$("#mdrbankName" + rowCountMdr + "EmpErr").html(
				"MDR bankName is required");
		$("#api" + rowCountMdr + "EmpErr").show();
		$("#paymentChannel" + rowCountMdr + "EmpErr").show();
		$("#paymentMethod" + rowCountMdr + "EmpErr").show();
		$("#cardType" + rowCountMdr + "EmpErr").show();
		$("#cardClassification" + rowCountMdr + "EmpErr").show();
		$("#mdrPercentage" + rowCountMdr + "EmpErr").show();
		$("#effectiveFrom" + rowCountMdr + "EmpErr").show();
		$("#taxApplicable" + rowCountMdr + "EmpErr").show();
		errMsg += "mdrbankName";

	}
	if (previousmdrbankName != "") {
		$("#mdrbankName" + rowCountMdr + "EmpErr").html("");
		$("#mdrbankName" + rowCountMdr + "EmpErr").show();
		$("#api" + rowCountMdr + "EmpErr").show();
		$("#paymentChannel" + rowCountMdr + "EmpErr").show();
		$("#paymentMethod" + rowCountMdr + "EmpErr").show();
		$("#cardType" + rowCountMdr + "EmpErr").show();
		$("#cardClassification" + rowCountMdr + "EmpErr").show();
		$("#mdrPercentage" + rowCountMdr + "EmpErr").show();
		$("#effectiveFrom" + rowCountMdr + "EmpErr").show();
		$("#taxApplicable" + rowCountMdr + "EmpErr").show();
	}

	if (previousapi == "") {
		$("#mdrbankName" + rowCountMdr + "EmpErr").show();
		$("#api" + rowCountMdr + "EmpErr").show();
		$("#api" + rowCountMdr + "EmpErr").html("Api is required");
		$("#paymentChannel" + rowCountMdr + "EmpErr").show();
		$("#paymentMethod" + rowCountMdr + "EmpErr").show();
		$("#cardType" + rowCountMdr + "EmpErr").show();
		$("#mdrPercentage" + rowCountMdr + "EmpErr").show();
		$("#cardClassification" + rowCountMdr + "EmpErr").show();
		$("#effectiveFrom" + rowCountMdr + "EmpErr").show();
		$("#taxApplicable" + rowCountMdr + "EmpErr").show();

		errMsg += "api";

	}
	if (previousapi != "") {
		$("#api" + rowCountMdr + "EmpErr").html("");
		$("#mdrbankName" + rowCountMdr + "EmpErr").show();
		$("#api" + rowCountMdr + "EmpErr").show();
		$("#paymentChannel" + rowCountMdr + "EmpErr").show();
		$("#paymentMethod" + rowCountMdr + "EmpErr").show();
		$("#cardType" + rowCountMdr + "EmpErr").show();
		$("#cardClassification" + rowCountMdr + "EmpErr").show();
		$("#mdrPercentage" + rowCountMdr + "EmpErr").show();
		$("#effectiveFrom" + rowCountMdr + "EmpErr").show();
		$("#taxApplicable" + rowCountMdr + "EmpErr").show();
	}

	if (previouspaymentChannel == "") {
		$("#mdrbankName" + rowCountMdr + "EmpErr").show();
		$("#api" + rowCountMdr + "EmpErr").show();
		$("#paymentChannel" + rowCountMdr + "EmpErr").show();
		$("#paymentChannel" + rowCountMdr + "EmpErr").html(
				"Payment Channel is required");
		$("#paymentMethod" + rowCountMdr + "EmpErr").show();
		$("#cardType" + rowCountMdr + "EmpErr").show();
		$("#cardClassification" + rowCountMdr + "EmpErr").show();
		$("#mdrPercentage" + rowCountMdr + "EmpErr").show();
		$("#effectiveFrom" + rowCountMdr + "EmpErr").show();
		$("#taxApplicable" + rowCountMdr + "EmpErr").show();
		errMsg += "paymentChannel";
	}
	if (previouspaymentChannel != "") {
		$("#paymentChannel" + rowCountMdr + "EmpErr").html("");
		$("#mdrbankName" + rowCountMdr + "EmpErr").show();
		$("#api" + rowCountMdr + "EmpErr").show();
		$("#paymentChannel" + rowCountMdr + "EmpErr").show();
		$("#cardClassification" + rowCountMdr + "EmpErr").show();
		$("#paymentMethod" + rowCountMdr + "EmpErr").show();
		$("#cardType" + rowCountMdr + "EmpErr").show();
		$("#mdrPercentage" + rowCountMdr + "EmpErr").show();
		$("#effectiveFrom" + rowCountMdr + "EmpErr").show();
		$("#taxApplicable" + rowCountMdr + "EmpErr").show();
	}

	if (previouspaymentMethod == "") {
		$("#mdrbankName" + rowCountMdr + "EmpErr").show();
		$("#api" + rowCountMdr + "EmpErr").show();
		$("#paymentChannel" + rowCountMdr + "EmpErr").show();
		$("#paymentMethod" + rowCountMdr + "EmpErr").show();
		$("#paymentMethod" + rowCountMdr + "EmpErr").html(
				"Payment Method is required");
		$("#cardType" + rowCountMdr + "EmpErr").show();
		$("#cardClassification" + rowCountMdr + "EmpErr").show();
		$("#mdrPercentage" + rowCountMdr + "EmpErr").show();
		$("#effectiveFrom" + rowCountMdr + "EmpErr").show();
		$("#taxApplicable" + rowCountMdr + "EmpErr").show();
		errMsg += "paymentMethod";
	}
	if (previouspaymentMethod != "") {
		$("#paymentMethod" + rowCountMdr + "EmpErr").html("");
		$("#mdrbankName" + rowCountMdr + "EmpErr").show();
		$("#api" + rowCountMdr + "EmpErr").show();
		$("#paymentChannel" + rowCountMdr + "EmpErr").show();
		$("#cardClassification" + rowCountMdr + "EmpErr").show();
		$("#paymentMethod" + rowCountMdr + "EmpErr").show();
		$("#cardType" + rowCountMdr + "EmpErr").show();
		$("#mdrPercentage" + rowCountMdr + "EmpErr").show();
		$("#effectiveFrom" + rowCountMdr + "EmpErr").show();
		$("#taxApplicable" + rowCountMdr + "EmpErr").show();
	}

	if (previouscardType == "") {

		errMsg += "cardType";
		$("#mdrbankName" + rowCountMdr + "EmpErr").show();
		$("#api" + rowCountMdr + "EmpErr").show();
		$("#paymentChannel" + rowCountMdr + "EmpErr").show();
		$("#paymentMethod" + rowCountMdr + "EmpErr").show();
		$("#cardType" + rowCountMdr + "EmpErr").show();
		$("#cardType" + rowCountMdr + "EmpErr").html("Card Type is required");
		$("#cardClassification" + rowCountMdr + "EmpErr").show();
		$("#mdrPercentage" + rowCountMdr + "EmpErr").show();
		$("#effectiveFrom" + rowCountMdr + "EmpErr").show();
		$("#taxApplicable" + rowCountMdr + "EmpErr").show();
	}
	if (previouscardType != "") {
		$("#cardType" + rowCountMdr + "EmpErr").html("");
		$("#mdrbankName" + rowCountMdr + "EmpErr").show();
		$("#api" + rowCountMdr + "EmpErr").show();
		$("#paymentChannel" + rowCountMdr + "EmpErr").show();
		$("#cardClassification" + rowCountMdr + "EmpErr").show();
		$("#paymentMethod" + rowCountMdr + "EmpErr").show();
		$("#cardType" + rowCountMdr + "EmpErr").show();
		$("#mdrPercentage" + rowCountMdr + "EmpErr").show();
		$("#effectiveFrom" + rowCountMdr + "EmpErr").show();
		$("#taxApplicable" + rowCountMdr + "EmpErr").show();
	}

	if (previouscardClassification == "") {

		$("#mdrbankName" + rowCountMdr + "EmpErr").show();
		$("#api" + rowCountMdr + "EmpErr").show();
		$("#paymentChannel" + rowCountMdr + "EmpErr").show();
		$("#paymentMethod" + rowCountMdr + "EmpErr").show();
		$("#cardType" + rowCountMdr + "EmpErr").show();
		$("#cardClassification" + rowCountMdr + "EmpErr").show();
		$("#cardClassification" + rowCountMdr + "EmpErr").html(
				"Card Classification is required");
		$("#mdrPercentage" + rowCountMdr + "EmpErr").show();
		$("#effectiveFrom" + rowCountMdr + "EmpErr").show();
		$("#taxApplicable" + rowCountMdr + "EmpErr").show();
		errMsg += "cardClassification";
	}

	if (previouscardClassification != "") {
		$("#cardClassification" + rowCountMdr + "EmpErr").html("");
		$("#mdrbankName" + rowCountMdr + "EmpErr").show();
		$("#api" + rowCountMdr + "EmpErr").show();
		$("#cardClassification" + rowCountMdr + "EmpErr").show();
		$("#paymentChannel" + rowCountMdr + "EmpErr").show();
		$("#paymentMethod" + rowCountMdr + "EmpErr").show();
		$("#cardType" + rowCountMdr + "EmpErr").show();
		$("#mdrPercentage" + rowCountMdr + "EmpErr").show();
		$("#effectiveFrom" + rowCountMdr + "EmpErr").show();
		$("#taxApplicable" + rowCountMdr + "EmpErr").show();
	}

	if (previousmdrPercentage == "") {
		$("#mdrbankName" + rowCountMdr + "EmpErr").show();
		$("#api" + rowCountMdr + "EmpErr").show();
		$("#paymentChannel" + rowCountMdr + "EmpErr").show();
		$("#paymentMethod" + rowCountMdr + "EmpErr").show();
		$("#cardType" + rowCountMdr + "EmpErr").show();
		$("#cardClassification" + rowCountMdr + "EmpErr").show();
		$("#mdrPercentage" + rowCountMdr + "EmpErr").show();
		$("#mdrPercentage" + rowCountMdr + "EmpErr").html(
				"MDR Percentage  is required");
		$("#effectiveFrom" + rowCountMdr + "EmpErr").show();
		$("#taxApplicable" + rowCountMdr + "EmpErr").show();
		errMsg += "mdrPercentage";
	}

	if (previousmdrPercentage != "") {
		$("#mdrPercentage" + rowCountMdr + "EmpErr").html("");
		$("#mdrbankName" + rowCountMdr + "EmpErr").show();
		$("#api" + rowCountMdr + "EmpErr").show();
		$("#paymentChannel" + rowCountMdr + "EmpErr").show();
		$("#paymentMethod" + rowCountMdr + "EmpErr").show();
		$("#cardType" + rowCountMdr + "EmpErr").show();
		$("#cardClassification" + rowCountMdr + "EmpErr").show();
		$("#mdrPercentage" + rowCountMdr + "EmpErr").show();
		$("#effectiveFrom" + rowCountMdr + "EmpErr").show();
		$("#taxApplicable" + rowCountMdr + "EmpErr").show();
	}
	if (previouseffectiveFrom == "") {

		$("#mdrbankName" + rowCountMdr + "EmpErr").show();
		$("#api" + rowCountMdr + "EmpErr").show();
		$("#paymentChannel" + rowCountMdr + "EmpErr").show();
		$("#paymentMethod" + rowCountMdr + "EmpErr").show();
		$("#cardType" + rowCountMdr + "EmpErr").show();
		$("#cardClassification" + rowCountMdr + "EmpErr").show();
		$("#mdrPercentage" + rowCountMdr + "EmpErr").show();
		$("#effectiveFrom" + rowCountMdr + "EmpErr").show();
		$("#effectiveFrom" + rowCountMdr + "EmpErr").html(
				"EffectiveFrom is required");
		$("#taxApplicable" + rowCountMdr + "EmpErr").show();
		errMsg += "effectiveFrom";
	}

	if (previouseffectiveFrom != "") {
		$("#effectiveFrom" + rowCountMdr + "EmpErr").html("");
		$("#mdrbankName" + rowCountMdr + "EmpErr").show();
		$("#api" + rowCountMdr + "EmpErr").show();
		$("#paymentChannel" + rowCountMdr + "EmpErr").show();
		$("#paymentMethod" + rowCountMdr + "EmpErr").show();
		$("#cardType" + rowCountMdr + "EmpErr").show();
		$("#cardClassification" + rowCountMdr + "EmpErr").show();
		$("#mdrPercentage" + rowCountMdr + "EmpErr").show();
		$("#effectiveFrom" + rowCountMdr + "EmpErr").show();
		$("#taxApplicable" + rowCountMdr + "EmpErr").show();
	}

	if (previoustaxApplicable == "") {

		$("#mdrbankName" + rowCountMdr + "EmpErr").show();
		$("#api" + rowCountMdr + "EmpErr").show();
		$("#paymentChannel" + rowCountMdr + "EmpErr").show();
		$("#paymentMethod" + rowCountMdr + "EmpErr").show();
		$("#cardType" + rowCountMdr + "EmpErr").show();
		$("#cardClassification" + rowCountMdr + "EmpErr").show();
		$("#mdrPercentage" + rowCountMdr + "EmpErr").show();
		$("#effectiveFrom" + rowCountMdr + "EmpErr").show();
		$("#taxApplicable" + rowCountMdr + "EmpErr").show();
		$("#taxApplicable" + rowCountMdr + "EmpErr").html(
				"Tax Applicable is required");
		errMsg += "taxApplicable";
	}

	if (errMsg != "") {
		return false;
	} else {
		var rowCountMdr = parseInt($("#rowCountMdr").val());
		$("#rowCountMdrErr" + rowCountMdr).hide();
		rowCountMdr = rowCountMdr + 1;
		var recRow = ""
		recRow += "<tr  id='rowCountMdr" + rowCountMdr + "'>";
		recRow += "<td><input type='text' name='mdrbankName"
				+ rowCountMdr
				+ "' id='mdrbankName"
				+ rowCountMdr
				+ "' onkeyup='setAutoComplete(&#39;sp_bankname_list&#39;,&#39;mdrbankName"
				+ rowCountMdr
				+ "&#39;,&#39;mdrbankId"
				+ rowCountMdr
				+ "&#39;,&#39;Y&#39;);' maxlength='120' style='margin: 4px 10px 0 0px;'/>";
		recRow += "<input type='hidden' name='mdrbankId" + rowCountMdr
				+ "' id='mdrbankId" + rowCountMdr
				+ "' maxlength='120' style='margin: 4px 10px 0 0px;'/></td>";

		recRow += "<td><input type='text' name='api"
				+ rowCountMdr
				+ "' id='api"
				+ rowCountMdr
				+ "' onkeyup='setAutoComplete(&#39;sp_apiname_list&#39;,&#39;api"
				+ rowCountMdr
				+ "&#39;,&#39;apiid"
				+ rowCountMdr
				+ "&#39;,&#39;Y&#39);' maxlength='120' style='margin: 4px 10px 0 0px;'/></td>";
		recRow += "<input type='hidden' name='apiid" + rowCountMdr
				+ "' id='apiid" + rowCountMdr
				+ "' maxlength='120' style='margin: 4px 10px 0 0px;'/></td>";
		recRow += "<td><input  type='text' name='paymentChannel"
				+ rowCountMdr
				+ "' id='paymentChannel"
				+ rowCountMdr
				+ "' onkeyup='setAutoComplete(&#39;sp_paymentchannel_list&#39;,&#39;paymentChannel"
				+ rowCountMdr
				+ "&#39;,&#39;paymentChannelid"
				+ rowCountMdr
				+ "&#39;,&#39;Y&#39);' maxlength='120' style='margin: 4px 10px 0 0px;'/></td>";
		recRow += "<input type='hidden' name='paymentChannelid" + rowCountMdr
				+ "' id='paymentChannelid" + rowCountMdr
				+ "' maxlength='120' style='margin: 4px 10px 0 0px;'/></td>";

		recRow += "<td><input  type='text' name='paymentMethod"
				+ rowCountMdr
				+ "' id='paymentMethod"
				+ rowCountMdr
				+ "'onkeyup='setAutoComplete(&#39;sp_paymentmethod_list&#39;,&#39;paymentMethod"
				+ rowCountMdr
				+ "&#39;,&#39;paymentMethodid"
				+ rowCountMdr
				+ "&#39;,&#39;Y&#39);' maxlength='120' style='margin: 4px 10px 0 0px;'/></td>";
		recRow += "<input type='hidden' name='paymentMethodid" + rowCountMdr
				+ "' id='paymentMethodid" + rowCountMdr
				+ "' maxlength='120' style='margin: 4px 10px 0 0px;'/></td>";
		recRow += "<td><input  type='text' name='cardType"
				+ rowCountMdr
				+ "' id='cardType"
				+ rowCountMdr
				+ "'onkeyup='setAutoComplete(&#39;sp_cardtype_list&#39;,&#39;cardType"
				+ rowCountMdr
				+ "&#39;,&#39;cardTypeid"
				+ rowCountMdr
				+ "&#39;,&#39;Y&#39);' maxlength='120' style='margin: 4px 10px 0 0px;'/></td>";
		recRow += "<input type='hidden' name='cardTypeid" + rowCountMdr
				+ "' id='cardTypeid" + rowCountMdr
				+ "' maxlength='120' style='margin: 4px 10px 0 0px;'/></td>";
		recRow += "<td><input  type='text' name='cardClassification"
				+ rowCountMdr
				+ "' id='cardClassification"
				+ rowCountMdr
				+ "'onkeyup='setAutoComplete(&#39;sp_cardclassification_list&#39;,&#39;cardClassification"
				+ rowCountMdr
				+ "&#39;,&#39;cardClassificationid"
				+ rowCountMdr
				+ "&#39;,&#39;Y&#39);' onblur='mdrDetails(this);' maxlength='120' style='margin: 4px 10px 0 0px;'/></td>";
		recRow += "<input type='hidden' name='cardClassificationid"
				+ rowCountMdr + "' id='cardClassificationid" + rowCountMdr
				+ "'  maxlength='120' style='margin: 4px 10px 0 0px;'/></td>";

		recRow += "<td><input type='text' name='aggregatormdrPercentage"
				+ rowCountMdr + "' id='aggregatormdrPercentage" + rowCountMdr
				+ "' maxlength='120' style='margin: 4px 10px 0 0px;'/></td>";
		recRow += "<td><input type='text' name='mdrPercentage"
				+ rowCountMdr
				+ "' id='mdrPercentage"
				+ rowCountMdr
				+ "'  onblur='mdrPercentageCheck(this);' maxlength='120' style='margin: 4px 10px 0 0px;'/></td>";
		recRow += "<td><input  type='text' name='effectiveFrom"
				+ rowCountMdr
				+ "' id='effectiveFrom"
				+ rowCountMdr
				+ "' maxlength='120' style='margin: 4px 10px 0 0px;' readonly='true'/></td>";
		recRow += "<td><select name='taxApplicable"
				+ rowCountMdr
				+ "' id='taxApplicable"
				+ rowCountMdr
				+ "' maxlength='120' style='margin: 4px 10px 0 0px;'> <option value='YES'>YES</option> <option value='NO'>NO</option></select></td>";
		/*
		 * recRow += "<td><input type='select' name='taxApplicable" +
		 * rowCountMdr + "' id='taxApplicable" + rowCountMdr + "'
		 * list='{'YES','NO'}' maxlength='120' style='margin: 4px 10px 0 0px;'/></td>";
		 */
		recRow += "<td><input  type='hidden' name='MdrDelFlag" + rowCountMdr
				+ "' id='MdrDelFlag" + rowCountMdr + "' />";
		recRow += "<td id='deletemdr" + rowCountMdr
				+ "'><a href='javascript:void(0);' onclick='removeRow("
				+ rowCountMdr + ");'>Delete</a></td></tr>";
		recRow += "<tr  id='rowCountMdrErr"
				+ rowCountMdr
				+ "'><td id='mdrbankName"
				+ rowCountMdr
				+ "EmpErr' style='text-align: left; width: 15%; display: none' class='loginerror'></td>";
		recRow += "<td id='api"
				+ rowCountMdr
				+ "EmpErr'style='text-align: left; width: 15%; display: none'class='loginerror'></td>";
		recRow += "<td id='paymentChannel"
				+ rowCountMdr
				+ "EmpErr'style='text-align: left; width: 15%; display: none'class='loginerror'></td>";
		recRow += "<td id='paymentMethod"
				+ rowCountMdr
				+ "EmpErr'style='text-align: left; width: 15%; display: none'class='loginerror'></td>";
		recRow += "<td id='cardType"
				+ rowCountMdr
				+ "EmpErr'style='text-align: left; width: 15%; display: none'class='loginerror'></td>";
		recRow += "<td id='cardClassification"
				+ rowCountMdr
				+ "EmpErr'style='text-align: left; width: 15%; display: none'class='loginerror'></td>";
		recRow += "<td></td>";
		recRow += "<td id='mdrPercentage"
				+ rowCountMdr
				+ "EmpErr'style='text-align: left; width: 15%; display: none'class='loginerror'></td>";
		recRow += "<td id='effectiveFrom"
				+ rowCountMdr
				+ "EmpErr'style='text-align: left; width: 15%; display: none'class='loginerror'></td>";
		recRow += "<td id='taxApplicable"
				+ rowCountMdr
				+ "EmpErr'style='text-align: left; width: 15%; display: none'class='loginerror'></td>";

		recRow += "</tr>";

		jQuery('#addedRows1').append(recRow);

		$("#rowCountMdr").val(rowCountMdr);
		$("#effectiveFrom" + rowCountMdr).datepicker({
			changeMonth : true,
			changeYear : true,
			dateFormat : 'dd/mm/yy',
			yearRange : '1900:9999'
		// $("#ui-datepicker-div").hide();
		});
		$("#effectiveTo" + rowCountMdr).datepicker({
			changeMonth : true,
			changeYear : true,
			dateFormat : 'dd/mm/yy',
			yearRange : '1900:9999'
		// $("#ui-datepicker-div").hide();
		});
	}
}
function removeRow(removeNum) {

	$("#mdrbankName" + removeNum).val("");
	$("#api" + removeNum).val("");
	$("#paymentChannel" + removeNum).val("");
	$("#paymentMethod" + removeNum).val("");
	$("#cardType" + removeNum).val("");
	$("#cardClassification" + removeNum).val("");
	$("#mdrPercentage" + removeNum).val("");
	$("#effectiveFrom" + removeNum).val("");
	$("#effectiveTo" + removeNum).val("");
	$('#taxApplicable' + removeNum).val();

	$("#mdrbankName" + removeNum).attr("type", "hidden");
	$("#api" + removeNum).attr("type", "hidden");
	$("#paymentChannel" + removeNum).attr("type", "hidden");
	$("#paymentMethod" + removeNum).attr("type", "hidden");
	$("#cardType" + removeNum).attr("type", "hidden");
	$("#cardClassification" + removeNum).attr("type", "hidden");
	$("#mdrPercentage" + removeNum).attr("type", "hidden");
	$("#effectiveFrom" + removeNum).attr("type", "hidden");
	$("#effectiveTo" + removeNum).attr("type", "hidden");
	$("#taxApplicable" + removeNum).attr("type", "hidden");
	$("#aggregatormdrPercentage" + removeNum).attr("type", "hidden");

	$("#deletemdr" + removeNum).hide();
	$("#MdrDelFlag" + removeNum).val("DEL");
	$("#rowCountMdrErr" + removeNum).hide();
}
