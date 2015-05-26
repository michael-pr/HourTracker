Template.header.onRendered(function () {
	$(".button-collapse").sideNav({
		menuWidth: 300, // Default: 240
		edege: "left",
		closeOnClick: true
	});
});

Template.header.helpers({
	navTitle: function () {
		switch (Router.current().route.getName()) {
			case "activityList": return "Activities";
			case "login": return "Log In";
			case "register": return "Register";
			case "activitySubmit": return "Create";
			case "activityPage": return this.title;
			default: return "Hour Tracker";
		}
	},
	onActivityList: function () {
		return Router.current().route.getName() === "activityList";
	},
	buttonCollapseActive: function () {
		return isBackPage() ? "hide-display" : "show-display";
	},
	backButtonActive: function () {
		return isBackPage() ? "show-display" : "hide-display";
	},
	activeRouteClass: function () {
		var args = Array.prototype.slice.call(arguments, 0);
		args.pop();

		var active = _.any(args, function (name) {
			return Router.current() && Router.current().route.getName() === name;
		});

		return active && "active";
	}
});

Template.header.events({
	"click #logout-button": function (e) {
		e.preventDefault();

		Meteor.logout(function (error) {
			if (error) {
				alert("We could not log you out at the moment. Please try again later.");
			} else {
				Router.go("login");
			}
		});
	},
	"click .nav-back-button": function (e) {
		e.preventDefault();
		window.history.back();
	}
});

isBackPage = function () {
	switch (Router.current().route.getName()) {
		case "activitySubmit": return true;
		case "activityPage": return true;
		default: return false;
	}
}