var
	config = require('../../config/config.js'),
	ifluxClient = require('iflux-node-client');

function notifyEvent(event) {
	var client = new ifluxClient.Client(config.iflux.url, 'smartCity/citizenEngagement');

	client.notifyEvent(event);
}

module.exports = {
	notifyAction: function(action, issue) {
		notifyEvent(
			new ifluxClient.Event(
				'actionEvent', {
					type: action.actionType,
					reason: action.reason,
					user: action.user,
					issueId: issue.id,
					issue: issue.description,
					date: new Date()
				}
			)
		);
	},

	notifyIssue: function(issue, user) {
		notifyEvent(
			new ifluxClient.Event(
				'issueCreated', {
					issueId: issue.id,
					creator: user.firstname + ' ' + user.lastname,
					description: issue.description,
					where: '(lat: ' + issue.lat + ', lng: ' + issue.lng + ')',
					date: new Date()
				}
			)
		);
	}
}