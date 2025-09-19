document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const mobileInput = document.getElementById('mobile');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function(event) {
        // Prevents the form from submitting in the traditional way (page reload)
        event.preventDefault();

        // Clear previous error messages
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';

        // Get the values from the input fields
        const username = usernameInput.value.trim(); // .trim() removes leading/trailing whitespace
        const mobile = mobileInput.value.trim();
        const password = passwordInput.value; // Password usually not trimmed for security reasons

        // --- Client-Side Validation ---

        if (username === '' || mobile === '' || password === '') {
            displayError('Please fill in all fields.');
            return;
        }

        // Basic username validation (e.g., alphanumeric, min 3 chars)
        const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
        if (!usernameRegex.test(username)) {
            displayError('Username must be alphanumeric and at least 3 characters long.');
            return;
        }

        // Mobile number validation (e.g., exactly 10 digits)
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(mobile)) {
            displayError('Mobile number must be exactly 10 digits.');
            return;
        }

        // Password validation (e.g., min 8 characters, includes numbers and letters)
        // This is a more robust client-side check. Server-side should be even stronger.
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            displayError('Password must be at least 8 characters long and include at least one letter and one number.');
            return;
        }

        // --- End Client-Side Validation ---

        // This is where you would send the data to your server securely
        // For this example, we'll just log it to the console
        console.log('Login attempt with the following details:');
        console.log('Username:', username);
        console.log('Mobile Number:', mobile);
        console.log('Password: [HIDDEN FOR SECURITY]'); // NEVER log real passwords

        // In a real application, you'd make an API call here, e.g., using fetch()
        // IMPORTANT: Passwords should be hashed on the server-side, and communication should be over HTTPS.
        /*
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, mobile, password }) // Send password to be hashed server-side
        })
        .then(response => {
            if (!response.ok) { // Check for HTTP error status codes
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Login successful!');
                // Redirect to a dashboard or home page
                window.location.href = '/dashboard';
            } else {
                displayError('Login failed: ' + (data.message || 'Invalid credentials.'));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayError('An error occurred. Please try again.');
        });
        */

        // For demonstration purposes without a backend:
        alert('Client-side validation passed. In a real app, data would now be sent to the server for authentication.');
    });

    function displayError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
});