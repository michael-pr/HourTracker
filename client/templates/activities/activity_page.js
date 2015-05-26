Template.activityPage.events({
	"click button": function (e) {
		e.preventDefault();

		// TODO: timer module. Will have to create local collection to store timed value and when stop is clicked press it to the server
		// Or have data type's start and stop time on the server and make it calculate the difference there
		console.log($(e.target).find("button").val());
	}
});