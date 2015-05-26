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
			case "activityList": return "Hour Tracker";
			default: return "Hour Tracker";
		}
	}
});

Template.header.events({
	"click #logout-button": function (e) {
		//$(".button-collapse").sideNav("hide");
		e.preventDefault();

		Meteor.logout(function (error) {
			if (error) {
				alert("We could not log you out at the moment. Please try again later.");
			} else {
				Router.go("login");
			}
		});
	}
});