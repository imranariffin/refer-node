/** @jsx React.DOM */

var data = [];

var CreateBox = React.createClass({
	handleCreateSubmit: function(link) {
		$.ajax({
			url: '/shorten',
			dataType: 'json',
			type: 'POST',
			data: link,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error('/shorten', status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {data: []};
	},
	render: function() {
		return (
			<div className="createBox">
				<h1>Refer</h1>
				<h2>I refer to great website with great contents</h2>
				<CreateForm onCreateSubmit={this.handleCreateSubmit}/>
				<CreateResult data={this.props.data} />
			</div>
		);
	}
});

var CreateResult = React.createClass({
	render: function() {
		return (
			<div className="createResult">
				<Result short={this.props.data.short}></Result>
			</div>
		);
	}
});

var Result = React.createClass({
		render: function() {
			return (
				<div className="result">
					<h3>{this.props.short}</h3>
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
						Insert url to shorten:
						<input type="text" className="form-control" placeholder="Insert long url" ref="long"/>
					</p>
				</div>
				<div className="form-inline">
					<p>
						Shorten as: refer.my/
						<input type="text" className="form-control" placeholder="Your short name" ref="short"/>
					</p>
				</div>
				<input type="submit" className="btn btn-default" value="Shorten" />
			</form>
		)
	}
});

React.render(
	<CreateBox data={data} />,
	document.getElementById('app')
);
