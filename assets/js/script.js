// Save data to localStorage
function saveToLocalStorage(name, age, gender, weight, dailyCaffeineArray) {
  const userData = {
    name: name,
    age: age,
    gender: gender,
    weight: weight,
    dailyCaffeine: dailyCaffeineArray,
  };
  localStorage.setItem("userData", JSON.stringify(userData));
}

// Load data from localStorage
function loadFromLocalStorage() {
  const data = localStorage.getItem("userData");
  if (data) {
    return JSON.parse(data);
  }
  return null;
}

// Function to calculate safe weekly caffeine intake
function calculateCaffeineIntake(
  name,
  age,
  gender,
  weight,
  dailyCaffeineArray
) {
  // If the person is under 12, stop everything and display the message
  if (age < 12) {
    alert(
      `${name}, it's not recommended for kids under 12 to consume caffeine.`
    );
    return; // Stop the function if age is under 12
  }

  let dailyLimit;
  let feedback;

  // Define safe daily caffeine limit based on age
  if (age >= 12 && age <= 17) {
    dailyLimit = 100; // Adolescents can safely consume up to 100 mg/day
    feedback = `Hello ${name}, recommended limits for adolescents (12-17 years) are no more than 100 mg of caffeine per day, which is about the amount in one 8-ounce cup of coffee.`;
  } else if (age >= 18) {
    dailyLimit = 400; // Adults can safely consume up to 400 mg/day
    feedback = `Hello ${name}, for adults, up to 200 mg/day is considered healthy according to the FDA, 300–400 mg/day is moderate, and 400+ mg/day is considered excessive.`;
  }

  // Optional: Adjust the limit based on gender
  if (gender === "female" && age > 18) {
    dailyLimit = dailyLimit * 0.9; // Reduce by 10% for adult females
  }

  // Calculate weekly limit
  const weeklyLimit = dailyLimit * 7;

  // Calculate the user's total caffeine consumption for the week
  const totalWeeklyCaffeine = dailyCaffeineArray.reduce(
    (acc, curr) => acc + curr,
    0
  );
  const averageDailyCaffeine = totalWeeklyCaffeine / 7;

  // Add to feedback based on the weekly caffeine intake
  if (totalWeeklyCaffeine > weeklyLimit) {
    feedback += ` You are consuming more than the recommended weekly limit! Your weekly caffeine intake is ${totalWeeklyCaffeine} mg, but it should be under ${weeklyLimit} mg.`;
  } else {
    feedback += ` You are within the safe weekly caffeine intake. Your weekly intake is ${totalWeeklyCaffeine} mg, and your limit is ${weeklyLimit} mg.`;
  }

  // Stop further weight-based calculations if the person is aged 12-17
  if (age >= 12 && age <= 17) {
    alert(feedback); // Output feedback for adolescents
    return; // Stop here for 12-17 year olds
  }

  // Additional feedback based on daily intake for weight (for adults only)
  const minSafeCaffeine = weight * 3; // 3 mg/kg is considered safe minimum
  const maxSafeCaffeine = weight * 6; // 6 mg/kg is considered the upper limit

  if (averageDailyCaffeine < minSafeCaffeine) {
    feedback += ` Based on your weight, you might be consuming less caffeine than recommended for optimal health. Consider increasing your intake to at least ${minSafeCaffeine.toFixed(
      2
    )} mg/day.`;
  } else if (averageDailyCaffeine > maxSafeCaffeine) {
    feedback += ` Be careful! Based on your weight, you're consuming more caffeine than recommended. Try to keep your daily intake under ${maxSafeCaffeine.toFixed(
      2
    )} mg/day.`;
  } else {
    feedback += ` Your daily caffeine intake is in the healthy range for your weight.`;
  }

  // Output the result
  alert(feedback);
}

// Function to gather input and calculate the result
function calculateCaffeine() {
  const name = prompt("What is your name?");
  const age = parseInt(document.getElementById("age").value);
  const gender = prompt("What is your gender? (male/female)");
  const weight = parseFloat(document.getElementById("weigh").value);

  // Get caffeine intake for each day
  const sun = parseFloat(document.getElementById("sunday").value) || 0;
  const mon = parseFloat(document.getElementById("monday").value) || 0;
  const tue = parseFloat(document.getElementById("tuesday").value) || 0;
  const wed = parseFloat(document.getElementById("wednesday").value) || 0;
  const thu = parseFloat(document.getElementById("thursday").value) || 0;
  const fri = parseFloat(document.getElementById("friday").value) || 0;
  const sat = parseFloat(document.getElementById("saturday").value) || 0;

  // Store the daily intakes in an array
  const dailyCaffeineArray = [sun, mon, tue, wed, thu, fri, sat];

  // Save data to localStorage
  saveToLocalStorage(name, age, gender, weight, dailyCaffeineArray);

  // Call the calculateCaffeineIntake function
  calculateCaffeineIntake(name, age, gender, weight, dailyCaffeineArray);
}

// Load previous data from localStorage and display it
window.addEventListener("load", function () {
  const userData = loadFromLocalStorage();
  if (userData) {
    alert(
      `Welcome back, ${userData.name}! Based on your previous data, let's review your caffeine intake.`
    );
    calculateCaffeineIntake(
      userData.name,
      userData.age,
      userData.gender,
      userData.weight,
      userData.dailyCaffeine
    );
  }
});

// Event listener for the "Calculate" button
document
  .getElementById("calculateButton")

  .addEventListener("click", calculateCaffeine);

