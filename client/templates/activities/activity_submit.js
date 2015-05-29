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

		var title = $(e.target).find("#activity-title").val()
		if (title.length === 0) {
			throwError("You must have a title.");
			$("activity-title").focus();
			return;
		}

		var activty = {
			title: title,
			goal: parseInt($(e.target).find("#activity-goal").val())
		};

		Meteor.call("activityInsert", activty, function (error, result) {
			if (error) {
				throwError(error.reason);
				return;
			}

			Session.set("submit-bypass", true);
			Router.go("activityPage", { _id: result._id });
		});
	}
});