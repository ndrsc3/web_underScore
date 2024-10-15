// Define passwords directly in the script
const passwords = ['underscore', 'secretcode', 'capyac'];

function setupPasswordInput() {
    console.log('Setting up password input');
    const passwordInput = document.getElementById('passwordInput');
    const inputWrapper = document.querySelector('.input-wrapper');
    
    if (!passwordInput || !inputWrapper) {
        console.error('Password input or wrapper not found');
        return;
    }
    
    inputWrapper.addEventListener('click', function(event) {
        passwordInput.focus();
        // Prevent the click event from propagating to avoid issues with other click handlers
        event.stopPropagation();
    });

    passwordInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            console.log('Enter key pressed');
            event.preventDefault();
            checkPassword();
        }
    });
}

function checkPassword() {
    console.log('Checking password');
    const passwordInput = document.getElementById('passwordInput');
    if (!passwordInput) {
        console.error('Password input element not found');
        return;
    }
    const password = passwordInput.value;
    console.log('Entered password:', password);
    
    if (passwords.includes(password)) {
        console.log('Password is correct');
        if (password === 'capyac') {
            window.location.href = 'https://www.capyac.com';
        } else {
            unlockContent();
        }
        // Password is correct, so we keep the text in the input
    } else {
        console.log('Password is incorrect');
        // Password is incorrect, so we clear the input and show error
        showIncorrectPasswordError(passwordInput);
    }
}

function showIncorrectPasswordError(inputElement) {
    inputElement.classList.add('incorrect', 'red-placeholder');
    inputElement.value = '';
    inputElement.placeholder = 'Nope!';
    
    // Remove the classes and reset placeholder after 1 second
    setTimeout(() => {
        inputElement.classList.remove('incorrect', 'red-placeholder');
        inputElement.placeholder = '__________';
    }, 1000);
}

function unlockContent() {
    console.log('Unlocking content');
    document.getElementById('celebrationOverlay').classList.remove('hidden');
}

// Add this function at the end of your script.js file
function setupLogoAnimation() {
  const logo = document.querySelector('.animated-logo');
  const comingSoon = document.querySelector('.coming-soon');

  // Set initial state
  logo.style.opacity = '0';

  // Use requestAnimationFrame to ensure the initial state is applied before animation starts
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      logo.style.opacity = '';
    });
  });

  logo.addEventListener('animationend', function() {
    comingSoon.classList.remove('hidden');
    comingSoon.classList.add('visible');
  });

  // Restart animation on page show (for when user navigates back to the page)
  window.addEventListener('pageshow', function(event) {
    logo.style.animation = 'none';
    logo.style.opacity = '0';
    comingSoon.classList.add('hidden');
    comingSoon.classList.remove('visible');
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        logo.style.animation = '';
        logo.style.opacity = '';
      });
    });
  });
}

// Modify your DOMContentLoaded event listener to include the new function
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded');
    setupPasswordInput();
    setupLogoAnimation();
});

document.getElementById('closeOverlay').addEventListener('click', function() {
    console.log('Closing overlay');
    document.getElementById('celebrationOverlay').classList.add('hidden');
});
