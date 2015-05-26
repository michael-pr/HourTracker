Activities = new Mongo.Collection("activities");

Meteor.methods({
	activityInsert: function (activityAttr) {
		check(this.userId, String);
		check(activityAttr, {
			title: String,
			goal: Number
		});

		// TODO: Validate form

		var user = Meteor.user();
		var activty = _.extend(activityAttr, {
			current: 0,
			userId: user._id,
			submitted: new Date()
		});

		var activtyId = Activities.insert(activty);

		return { _id: activtyId };
	}
});