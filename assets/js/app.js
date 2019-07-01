//  1. Initialize firebase
const firebaseConfig = {
    apiKey: "AIzaSyAhF-iXtreZIGTks4ffWWMie--3zOtPvCI",
    authDomain: "new-project-3e52c.firebaseapp.com",
    databaseURL: "https://new-project-3e52c.firebaseio.com",
    projectId: "new-project-3e52c",
    storageBucket: "new-project-3e52c.appspot.com",
    messagingSenderId: "179219004808",
    appId: "1:179219004808:web:beea4a969d2d644b"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

//Run Time  
setInterval(function(startTime) {
    $("#timer").html(moment().format('hh:mm a'))
  }, 1000);

// 2. Button for adding Train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  const trainName = $("#train-name-input").val().trim();
  const trainDest = $("#destination-input").val().trim();
  const trainFirst = moment($("#first-input").val().trim()).format("HH:mm");
  const trainFreq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding the train data
  const newTrain = {
    name: trainName,
    destination: trainDest,
    first: trainFirst,
    frequency: trainFreq
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(trainName.name);
  console.log(trainDest.destination);
  console.log(trainFirst.first);
  console.log(trainFirst.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  const trainName = childSnapshot.val().name;
  const trainDest = childSnapshot.val().destination;
  const trainFirst = childSnapshot.val().first;
  const trainFreq = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainFirst);
  console.log(trainFreq);

//   // Prettify the train start
//   let trainStartPretty = moment.unix(trainFirst).format("HH:mm");

//   // Calculate the months worked using hardcore math
//   // To calculate the months worked
//   let empMonths = moment().diff(moment(trainFirst, "X"), "months");
//   console.log(empMonths);

//   // Calculate the total billed rate
//   let empBilled = empMonths * empRate;
//   console.log(empBilled);

database.ref().on("child_added", function(childSnapshot) {
    let startTimeConverted = moment(childSnapshot.val().first, "hh:mm").subtract(1, "years");
    let timeDiff = moment().diff(moment(startTimeConverted), "minutes");
    let timeRemain = timeDiff % childSnapshot.val().frequency;
    let minToArrival = childSnapshot.val().frequency - timeRemain;
    let nextTrain = moment().add(minToArrival, "minutes");
    // var key = childSnapshot.key;

  // Create the new row
  let newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFreq),
    // $("<td>").text(trainFirst),
    $("<td>").text(nextTrain),
    $("<td>").text(minToArrival)
  );

  // Append the new row to the table
  $("#tableBody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
})
