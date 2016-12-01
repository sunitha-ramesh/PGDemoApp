<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<%@taglib uri="/struts-tags" prefix="s"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>AWS SAMPLE APP</title>

<link rel="stylesheet" href="styles/jquery.dataTables_themeroller.css">
<link rel="stylesheet" href="styles/jquery-ui-1.8.4.custom.css">
<script type="text/javascript" src="scripts/jquery-1.11.3.js"></script>
<script type="text/javascript"
	src="scripts/jquery-ui-1.10.3.custom.min.js"></script>


<script src="scripts/timedropper.js"></script>
<script src="scripts/jquery.form.js"></script>
<script src="scripts/toastr.min.js"></script>

</head>
<body style="background-color: #D8D8D8;">

	<form name="manualMCSForm" id="manualMCSForm"
		enctype="multipart/form-data">
		<table style="width: auto; height: auto" align="center">
			<tr>
				<th colspan="2" align="center">AWS SAMPLE APP</th>
			</tr>
			<tr>
			<td><s:textfield id="recordCnt" name="recordCnt" label="No. of Records"
						style="width:200px"></s:textfield> </td>
				<td><s:textfield id="name" name="name" label="Name"
						style="width:200px"></s:textfield> </td>
				<td><s:textfield id="address" name="address" label="Address"
						style="width:200px"></s:textfield> </td>
				<td><s:textfield id="city" name="city" label="City"
						style="width:200px"></s:textfield> </td>
				<td colspan="2" style="text-align: right"><input type="button"
					value="Save" onclick="saveRecords();" /></td>
			</tr>
		</table>
	</form>
</body>
<script>
		function saveRecords() {
		//manualMCSForm
		var url = "generateManualMCSAction";
		var requestParameters = $("#manualMCSForm").serialize();
		$.ajax({
			type : "POST",
			url : url,
			data : requestParameters,
			success : function(data) {

				alert(data);

			}
		});
	}
</script>
</html>