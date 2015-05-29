Session.setDefault("idle");
//var timerState = new ReactiveVar();

Template.activityPage.helpers({
	progress: function () {
		return (this.current / 1000 / 60).toString() + " Minutes";
	},
	percent: function () {
		if (this.goal !== 0) {
			var currentHours = (this.current / 1000 / 60 / 60);
			return ((currentHours / this.goal) * 100).toString() + "%";
		} else
			return "None";
	},
	startStopButtonText: function () {
		return isTimerActive() ? "Stop" : "Start";
	},
	percentActive: function () {
		return isTimerActive() ? "indeterminate" : "determinate";
	}
});

Template.activityPage.events({
	"click #timer-start-stop-button": function (e) {
		e.preventDefault();

		// TODO: timer module. Will have to create local collection to store timed value and when stop is clicked press it to the server
		// Or have data type's start and stop time on the server and make it calculate the difference there
		
		var timerState = Session.get("timer-state");

		if (timerState === "idle" || timerState === undefined) {
			Session.set("start-time", new Date());
			Session.set("timer-state", "inprogress");
		} else {
			Session.set("stop-time", new Date());
			Session.set("timer-state", "idle");

			activity = {
				_id: this._id,
				start: Session.get("start-time"),
				stop: Session.get("stop-time")
			}

			Meteor.call("activityUpdate", activity, function (error, result) {
				if (error)
					alert(error);//"There was an error updating the records. Please try again later.");

				console.log("Timer recorded successfully.");
			});
		}
	},
	"click #delete-activity-button": function (e) {
		e.preventDefault();

		if (confirm("Delete this activity?")) {
			Activities.remove(this._id);
			window.history.back();
		}
	}
});

isTimerActive = function () {
	var timerState = Session.get("timer-state");
	return !(timerState === "idle" || timerState === undefined);
}
/*

1. Start pressed store start on the client?
2. Stop... Call update method

States:
idle
inprogress
idle

*/