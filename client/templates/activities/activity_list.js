Template.activityList.helpers({
	activities: function () {
		return Activities.find();
	},
	emptyActivities: function () {
		return Activities.find().count() === 0;
	}
});