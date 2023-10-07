// Get user input for start and end dates (in yyyy-mm-dd format)
var startDateInput = prompt("Enter the start date (yyyy-mm-dd):");
var endDateInput = prompt("Enter the end date (yyyy-mm-dd):");

// Convert user input strings to Date objects
var startDate = new Date(startDateInput);
var endDate = new Date(endDateInput);

// Check if the dates are valid
if (isNaN(startDate) || isNaN(endDate)) {
    console.log("Invalid date format. Please use yyyy-mm-dd.");
} else {
    // Calculate the time difference in milliseconds
    var timeDiff = endDate - startDate;

    // Calculate the number of days between the dates
    var daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    console.log("Start Date:", startDate.toDateString());
    console.log("End Date:", endDate.toDateString());
    console.log("Days Difference:", daysDiff, "days");
}
