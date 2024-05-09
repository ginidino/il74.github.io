document.addEventListener('DOMContentLoaded', function () {
    const signInButton = document.getElementById('signInButton');
    const signUpButton = document.getElementById('signUpButton');
    const signUpLink = document.getElementById('signUpLink');
    const signInLink = document.getElementById('signInLink');
    const signInContainer = document.getElementById('signInContainer');
    const signUpContainer = document.getElementById('signUpContainer');
    const emailInput = document.getElementById('email'); 
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordError = document.getElementById('password-error');
    const passwordRequirements = document.getElementById('password-requirements');

    let registeredUsers = [];

    signInButton.addEventListener('click', function (event) {
        event.preventDefault();
        const email = emailInput.value.trim(); 
        const password = passwordInput.value.trim();
        if (LoginValidation(email, password)) {
            window.location.href = 'index.html';
        } else {
            alert('Email and password not found. Please check your credentials.');
        }
    });

    signUpButton.addEventListener('click', function (event) {
        event.preventDefault();
        const validation = SignupValidation();
        if (validation === true) {
            const email = emailInput.value.trim(); 
            const password = passwordInput.value.trim();
            const confirmPassword = confirmPasswordInput.value.trim();
            if (password !== confirmPassword) {
                passwordError.textContent = "Passwords do not match";
                passwordError.style.display = 'block';
                return; 
            }
            
            const newUser = {
                email: email,
                password: password
            };
            registeredUsers.push(newUser);
            signInContainer.style.display = 'block';
            signUpContainer.style.display = 'none';
        } else {
            passwordError.textContent = validation;
            passwordError.style.display = 'block';
        }
    });

    signUpLink.addEventListener('click', function (event) {
        event.preventDefault();
        signInContainer.style.display = 'none';
        signUpContainer.style.display = 'block';
    });

    signInLink.addEventListener('click', function (event) {
        event.preventDefault();
        signInContainer.style.display = 'block';
        signUpContainer.style.display = 'none';
    });

    confirmPasswordInput.addEventListener('keyup', function () {
        if (passwordInput.value !== confirmPasswordInput.value) {
            passwordError.textContent = "Passwords do not match";
            passwordError.style.display = 'block';
        } else {
            passwordError.style.display = 'none';
        }
    });

    function SignupValidation() {
        const email = emailInput.value.trim(); 
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const isEmailValid = isValidEmail(email); 
        const isLengthValid = password.length >= 8 && password.length <= 12;
        const startsWithLetter = /^[a-zA-Z_]+$/.test(password.charAt(0));
        const containsLowercase = /[a-z]/.test(password);
        const containsUppercase = /[A-Z]/.test(password);
        const containsOnlyValidCharacters = /^\w+$/.test(password);
        const passwordsMatch = password === confirmPassword;

        if (!isEmailValid) {
            alert("Invalid email format");
            return "Invalid email format";
        }

        if (!isLengthValid) {
            alert("Password must be between 8 and 12 characters long.");
            return "Password must be between 8 and 12 characters long.";
        }

        if (!startsWithLetter) {
            alert("Password must start with a letter.");
            return "Password must start with a letter.";
        }

        if (!containsLowercase) {
            alert("Password must contain at least one lowercase letter.");
            return "Password must contain at least one lowercase letter.";
        }

        if (!containsUppercase) {
            alert("Password must contain at least one uppercase letter.");
            return "Password must contain at least one uppercase letter.";
        }

        if (!containsOnlyValidCharacters) {
            alert("Password must contain only alphabetic characters, digits, or underscore.");
            return "Password must contain only alphabetic characters, digits, or underscore.";
        }

        if (!passwordsMatch) {
            alert("Passwords do not match");
            return "Passwords do not match";
        }

        return true;
    }

    function LoginValidation(email, password) {
        return registeredUsers.some(user => user.email === email && user.password === password);
    }

    passwordInput.addEventListener('focus', function () {
        passwordRequirements.style.display = 'block';
    });

    passwordInput.addEventListener('blur', function () {
        passwordRequirements.style.display = 'none';
    });

    function isValidEmail(email) {
        const parts = email.split("@");
        if (parts.length !== 2) {
            alert("Email should contain exactly one '@'");
            return false;
        }
    
        const localPart = parts[0];
        const domainPart = parts[1];
    
        if (!isValidLocalPart(localPart)) {
            alert("Local part is invalid: " + getLocalPartErrorMessage(localPart));
            return false;
        }
    
        if (!isValidDomainPart(domainPart)) {
            alert("Domain part is invalid: " + getDomainPartErrorMessage(domainPart));
            return false;
        }
    
        return true;
    }
    
    function isValidLocalPart(localPart) {
        if (localPart.length === 0) {
            alert("Local part is empty");
            return false;
        }
    
        const localParts = localPart.split(".");
        if (localParts.length > 2) {
            alert("Local part should have at most two components");
            return false;
        }
    
        for (const part of localParts) {
            for (const c of part) {
                if (!(/[a-zA-Z0-9_]/).test(c)) {
                    alert("Local part contains invalid character: " + c);
                    return false;
                }
            }
        }
    
        return true;
    }
    
    function isValidDomainPart(domainPart) {
        if (domainPart.length === 0) {
            alert("Domain part is empty");
            return false;
        }
    
        const domainParts = domainPart.split(".");
        if (domainParts.length < 2 || domainParts.length > 3) {
            alert("Domain part should have two or three components");
            return false;
        }
    
        for (const part of domainParts) {
            for (const c of part) {
                if (!(/[a-z]/).test(c)) {
                    alert("Domain part contains invalid character: " + c);
                    return false;
                }
            }
        }
    
        const topLevelDomain = domainParts[domainParts.length - 1];
        const validTopLevelDomains = ["net", "com", "uk", "de", "jp", "ro"];
        if (!validTopLevelDomains.includes(topLevelDomain)) {
            alert("Invalid top-level domain: " + topLevelDomain);
            return false;
        }
    
        return true;
    }
    
    function getLocalPartErrorMessage(localPart) {
        if (localPart.length === 0) {
            return "Local part is empty";
        }
        if (localPart.split(".").length > 2) {
            return "Local part should have at most two components";
        }
        for (const c of localPart) {
            if (!(/[a-zA-Z0-9_]/).test(c)) {
                return "Local part contains invalid character: " + c;
            }
        }
        return "";
    }
    
    function getDomainPartErrorMessage(domainPart) {
        if (domainPart.length === 0) {
            return "Domain part is empty";
        }
        const domainParts = domainPart.split(".");
        if (domainParts.length < 2 || domainParts.length > 3) {
            return "Domain part should have two or three components";
        }
        for (const c of domainPart) {
            if (!(/[a-z]/).test(c)) {
                return "Domain part contains invalid character: " + c;
            }
        }
        const topLevelDomain = domainParts[domainParts.length - 1];
        const validTopLevelDomains = ["net", "com", "uk", "de", "jp", "ro"];
        if (!validTopLevelDomains.includes(topLevelDomain)) {
            return "Invalid top-level domain: " + topLevelDomain;
        }
        return "";
    }    
});