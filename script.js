document.getElementById('checkoutForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    let isValid = true;

    // Validate Name
    const nameField = document.getElementById('name');
    if (nameField.value.trim() === '') {
        showError(nameField, 'Please enter your name.');
        isValid = false;
    } else {
        hideError(nameField);
    }

    // Validate Email
    const emailField = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
    if (!emailPattern.test(emailField.value)) {
        showError(emailField, 'Please enter a valid email address.');
        isValid = false;
    } else {
        hideError(emailField);
    }

    // Validate Address
    const addressField = document.getElementById('address');
    if (addressField.value.trim() === '') {
        showError(addressField, 'Please enter your address.');
        isValid = false;
    } else {
        hideError(addressField);
    }

    // Validate City
    const cityField = document.getElementById('city');
    if (cityField.value.trim() === '') {
        showError(cityField, 'Please enter your city.');
        isValid = false;
    } else {
        hideError(cityField);
    }

    // If all fields are valid, submit the form
    if (isValid) {
        alert('Form submitted successfully!');
        this.reset(); // Optional: Reset form after successful submission
    }
});

function showError(input, message) {
    const feedback = input.nextElementSibling;
    feedback.textContent = message;
    feedback.style.display = 'block';
    input.classList.add('is-invalid');
}

function hideError(input) {
    const feedback = input.nextElementSibling;
    feedback.style.display = 'none';
    input.classList.remove('is-invalid');
}
