document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const loginId = urlParams.get('loginId');

  if (loginId) {
    // Fetch patient details
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
          alert('Patient not found');
        } else {
          // Display patient details
          const patientDetails = document.getElementById('patient-details');
          patientDetails.innerHTML = `
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Surgery Name:</strong> ${data.surgery_name}</p>
            <p><strong>Surgery Time:</strong> ${new Date(data.surgery_time).toLocaleString()}</p>
            <p><strong>Current Phase:</strong> ${data.phase}</p>
          `;
        }
      })
      .catch(error => {
        alert('Error fetching patient details');
        console.error('Error:', error);
      });
  }
});