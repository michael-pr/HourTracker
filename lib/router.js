Router.configure({
	layoutTemplate: "layout",
	loadingTemplate: "loading",
	notFoundTemplate: "notFound",
	waitOn: function () {
		return [Meteor.subscribe("activities")];
	}
});

Router.route("/", { name: "activityList" });
Router.route("/submit", { name: "activitySubmit" });

Router.route("/login", { name: "login" });
Router.route("/register", { name: "register" });

var requireLogin = function () {
	if (!Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render("accessDenied");
		}
	} else {
		this.next();
	}
}

var requireLoginHome = function () {
	if (!Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			Router.go("login");
		}
	} else {
		this.next();
	}
}

Router.onBeforeAction(requireLoginHome, { only: "activityList" });
Router.onBeforeAction(requireLogin, { only: "activitySubmit" });