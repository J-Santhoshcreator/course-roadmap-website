// Login Form Validation and Handling
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    // Get form values
    const studentName = document.getElementById('studentName').value.trim();
    const year = document.getElementById('year').value.trim();
    const department = document.getElementById('department').value.trim();

    // Clear previous error messages
    clearErrors();

    // Validate all fields
    let isValid = true;

    // Validate Student Name
    if (studentName === '') {
        showError('nameError', 'Please enter your name');
        isValid = false;
    } else if (studentName.length < 3) {
        showError('nameError', 'Name must be at least 3 characters');
        isValid = false;
    }

    // Validate Year
    if (year === '') {
        showError('yearError', 'Please select your year');
        isValid = false;
    }

    // Validate Department
    if (department === '') {
        showError('departmentError', 'Please select your department');
        isValid = false;
    }

    // If all validations pass, save data and redirect
    if (isValid) {
        // Create student object
        const studentData = {
            name: studentName,
            year: year,
            department: department,
            loginTime: new Date().toLocaleString()
        };

        // Save to localStorage
        localStorage.setItem('studentData', JSON.stringify(studentData));

        // Show success message
        alert(`Welcome ${studentName}! Redirecting to home page...`);

        // Redirect to home page
        window.location.href = 'home.html';
    }
});

/**
 * Show error message for a specific field
 * @param {string} elementId - ID of the error message element
 * @param {string} message - Error message to display
 */
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

/**
 * Clear all error messages
 */
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

// Add real-time validation as user types
document.getElementById('studentName').addEventListener('blur', function() {
    const name = this.value.trim();
    if (name === '') {
        showError('nameError', 'Name is required');
    } else if (name.length < 3) {
        showError('nameError', 'Name must be at least 3 characters');
    } else {
        document.getElementById('nameError').style.display = 'none';
    }
});

document.getElementById('year').addEventListener('change', function() {
    if (this.value === '') {
        showError('yearError', 'Please select your year');
    } else {
        document.getElementById('yearError').style.display = 'none';
    }
});

document.getElementById('department').addEventListener('change', function() {
    if (this.value === '') {
        showError('departmentError', 'Please select your department');
    } else {
        document.getElementById('departmentError').style.display = 'none';
    }
});
