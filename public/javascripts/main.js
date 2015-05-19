/** @jsx React.DOM */

var CreateBox = React.createClass({
	handleCreateSubmit: function(link) {
		$.ajax({
			url: '/shorten',
			dataType: 'json',
			type: 'POST',
			data: link,
			success: function(data) {
				$("#msg").html("<br>Link created. Visit link at <a target='_blank' href='/" + data.shortname + "'>http://refer.my/" + data.shortname + "</a>");
			}.bind(this),
			error: function(xhr, status, err) {
				console.error('/shorten', status, err.toString());
			}.bind(this)
		});
	},
	render: function() {
		return (
			<div className="createBox">
				<h1>Refer</h1>
				<h2>I refer to great website with great contents</h2>
				<CreateForm onCreateSubmit={this.handleCreateSubmit}/>
			</div>
		);
	}
});

var CreateForm = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var long = React.findDOMNode(this.refs.long).value.trim();
		var short = React.findDOMNode(this.refs.short).value.trim();
		if (!long || !short) {
			return;
		}
		this.props.onCreateSubmit({long: long, short: short});
		React.findDOMNode(this.refs.long).value = '';
		React.findDOMNode(this.refs.short).value = '';
		return;
	},
	render: function() {
		return (
			<form className="createForm" onSubmit={this.handleSubmit}>
				<div className="form-inline">
					<p>
						URL:
						<input type="text" className="form-control" placeholder="http://www.example.com" ref="long"/>
					</p>
				</div>
				<div className="form-inline">
					<p>
						Shorten as: http://refer.my/
						<input type="text" className="form-control" placeholder="shortname" ref="short"/>
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
