document.getElementById('calculateButton').addEventListener('click', calculateCaffeineIntake);

function calculateCaffeineIntake() {
  // Get user inputs
  const age = document.getElementById('age').value;
  const weight = document.getElementById('weigh').value;
  const caffeineInputs = [
    document.getElementById('sunday').value,
    document.getElementById('monday').value,
    document.getElementById('tuesday').value,
    document.getElementById('wednesday').value,
    document.getElementById('thursday').value,
    document.getElementById('friday').value,
    document.getElementById('saturday').value
  ];

  // Validate age and weight inputs
  if (!age || !weight) {
    alert('Please fill out your age and weight.');
    return;
  }

  // Calculate total weekly caffeine intake
  let totalCaffeine = 0;
  caffeineInputs.forEach((caffeine) => {
    if (caffeine) {
      totalCaffeine += parseFloat(caffeine);
    }
  });

  // Calculate average daily caffeine intake
  const averageDailyCaffeine = totalCaffeine / 7;

  // Display the result
  alert(
    `You are ${age} years old, weigh ${weight} kilograms, and your average daily caffeine intake is ${averageDailyCaffeine.toFixed(2)} mg.`
  );
}
