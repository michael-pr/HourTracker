Template.register.events({
	"submit #register-form": function (e) {
		e.preventDefault();

		Accounts.createUser({
			email: $(e.target).find("#register-email").val(),
			password: $(e.target).find("#register-password").val(),
			profile: {
				device: "unknown"
			}
		}, function (error) {
			if (error) {
				alert("There was an error creating your account. Please try again later.");
			} else {
				Router.go("activityList");
			}
		});
	}
});