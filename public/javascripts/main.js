//main .js

$( function () {
	$('#btn-redirect').click( function () {
		//test
		//$('#welcome').hide();
		var long_url = $('#long').val();
		//alert(long_url);
		$.ajax( {
			type : "POST",
			data : {long_url : $('#long').val()},
			url : "/redirect",
			success : function (res) {
				alert("sucess ajax GET: " + res);
			},
			failure : function (err) {
				alert("failure ajax GET");
			}
		});
	});
});