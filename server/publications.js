Meteor.publish("activities", function () {
	return Activities.find(); // TODO: Only puslish user docs
});