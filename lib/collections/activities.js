Activities = new Mongo.Collection("activities");

Activities.allow({
	remove: function (userId, activity) { return ownsActivity(userId, activity); }
});

Activities.deny({
	update: function (userId, activity, fieldNames) {
		// Only fields that can be updated are start and stop
		return (_.without(fieldNames, "start", "stop").length > 0);
	}
})

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
			start: null,
			stop: null,
			userId: user._id,
			submitted: new Date()
		});

		var activtyId = Activities.insert(activty);

		return { _id: activtyId };
	},
	activityUpdate: function (activityAttr) {
		check(activityAttr, {
			_id: String,
			start: Date,
			stop: Date
		});

		var difference = getDifference(activityAttr.start, activityAttr.stop);

		var affected = Activities.update({
			_id: activityAttr._id 
		}, {
			$inc: { current: difference }
		});
	}
});

ownsActivity = function (userId, activity) {
	return activity && activity.userId === userId;
}

getDifference = function (start, stop) {
	return Math.abs(stop.getTime() - start.getTime());
}