/** @jsx React.DOM */

var CreateBox = React.createClass({
	render: function() {
		return (
			<div className="createBox">
				<h1>Refer</h1>
				<h2>I refer to great website with great contents</h2>
				<CreateForm />
			</div>
		);
	}
});

var CreateForm = React.createClass({
	render: function() {
		return (
			<form className="createForm">
				<div className="form-inline">
					<p>
						Insert url to shorten:
						<input type="text" className="form-control" placeholder="Insert long url"/>
					</p>
				</div>
				<div className="form-inline">
					<p>
						Shorten as: refer.my/
						<input type="text" className="form-control" placeholder="Your short name" />
					</p>
				</div>
				<input type="submit" className="btn btn-default" value="Shorten" />
			</form>
		)
	}
});

React.render(
	<CreateBox />,
	document.getElementById('app')
);

//
// $( function () {
// 	$('#btn-redirect').click( function () {
// 		//test
// 		//$('#welcome').hide();
// 		var long_url = $('#long').val();
// 		//alert(long_url);
// 		$.ajax( {
// 			type : "POST",
// 			data : {long_url : $('#long').val()},
// 			url : "/redirect",
// 			success : function (res) {
// 				alert("sucess ajax GET: " + res);
// 			},
// 			failure : function (err) {
// 				alert("failure ajax GET");
// 			}
// 		});
// 	});
// });
