// Get references to the form and input elements
const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.querySelector('input[type="password"]');

// Function to validate the name input
function validateName() {
  const nameValue = nameInput.value.trim();
  if (nameValue.length < 3) {
    alert("Name should be at least 3 characters long.");
    return false;
  }
  return true;
}

// Function to validate the email input
function validateEmail() {
  const emailValue = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailValue)) {
    alert("Please enter a valid email address.");
    return false;
  }
  return true;
}

// Function to validate the password input
function validatePassword() {
  const passwordValue = passwordInput.value.trim();
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordPattern.test(passwordValue)) {
    alert(
      "Password should contain at least one capital letter and one number, and be at least 8 characters long."
    );
    return false;
  }
  return true;
}

// Function to handle form submission
function handleSubmit(event) {
  if (!validateName() || !validateEmail() || !validatePassword()) {
    event.preventDefault(); // Prevent form submission if validation fails
  }
}

// Add event listener for form submission
form.addEventListener("submit", handleSubmit);
