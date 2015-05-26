Meteor.publish("activities", function () {
	return Activities.find({ userId: this.userId }); // TODO: Only puslish user docs
});

Meteor.publish("singleActivity", function (activityId) {
	check(activityId, String);
	return Activities.find(activityId);
});