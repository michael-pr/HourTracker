if (Activities.find().count() === 0) {
	var now = new Date().getTime();

	var testId = Meteor.users.insert({
		profile: { device: "unknown" }
	});
	var test = Meteor.users.findOne(testId);

	for (i = 0; i < 10; i++) {
		Activities.insert({
			title: "Activity " + i,
			userId: test._id,
			submitted: new Date(now)
		});
	}
}