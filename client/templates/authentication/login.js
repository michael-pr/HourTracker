Template.login.onRendered(function () {
	if (Session.get("logging-out") === true) {
		Meteor.logout(function (error) {
			if (error) {
				alert("We could not log you out at the moment. Please try again later.");
			} else {
				Session.set("loggin-out", false);
			}
		});
	}
});

Template.login.events({
	"submit #login-form": function (e) {
		e.preventDefault();

		Meteor.loginWithPassword(
			{ email: $(e.target).find("#login-email").val() },
			$(e.target).find("#login-password").val(),
			function (error) {
				if (error) {
					$("#login-password").val("");
					$("#login-email").select();		
					throwError("The email or password you entered is incorrect. Please try again.");					
				} else {
					Router.go("activityList");
				}
			}
		);
	}
});