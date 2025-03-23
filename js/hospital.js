// Register Patient Form Submission
document.getElementById('register-patient-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const loginId = document.getElementById('login-id').value;
  const name = document.getElementById('name').value;
  const surgeryName = document.getElementById('surgery-name').value;
  const surgeryTime = document.getElementById('surgery-time').value;

  // Register Patient API Call
  fetch('http://localhost:3000/api/hospitals/register-patient', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ loginId, name, surgeryName, surgeryTime })
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message || 'Patient registered successfully');
    })
    .catch(error => {
      alert('Error registering patient');
      console.error('Error:', error);
    });
});

// Patient Login Form Submission
document.getElementById('patient-login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const loginId = document.getElementById('login-id').value;

  // Patient Login API Call
  fetch('http://localhost:3000/api/patients/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ loginId })
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Patient not found') {
        alert('Invalid Login ID');
      } else {
        // Redirect to patient dashboard with patient details
        window.location.href = `patient-dashboard.html?loginId=${loginId}`;
      }
    })
    .catch(error => {
      alert('Error logging in');
      console.error('Error:', error);
    });
});