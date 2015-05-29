Template.activitySubmit.onRendered(function () {
	// TODO: Should be moved to the router level
	if (Session.get("submit-bypass") === true) {
		Session.set("submit-bypass", false);
		window.history.back();
	}

	$("#activity-goal").material_select();
});

Template.activitySubmit.events({
	"submit form": function (e) {
		e.preventDefault();

		var activty = {
			title: $(e.target).find("#activity-title").val(),
			goal: parseInt($(e.target).find("#activity-goal").val())
		};

		Meteor.call("activityInsert", activty, function (error, result) {
			if (error) {
				console.log(error);
				//alert("We could not insert the acticty at this moment. Please try again later.");
				return;
			}

			Session.set("submit-bypass", true);
			Router.go("activityPage", { _id: result._id });
		});
	}
});