document.getElementById('calculate-btn').addEventListener('click', calculateAge);

function calculateAge() {
    // Limpiar resultados y mensajes de validación
    document.getElementById('years').innerText = '--';
    document.getElementById('months').innerText = '--';
    document.getElementById('days').innerText = '--';
    document.getElementById('warning-message').innerText = '';
    document.getElementById('day-validation').innerText = '';
    document.getElementById('month-validation').innerText = '';
    document.getElementById('year-validation').innerText = '';

    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    const dayValidation = document.getElementById('day-validation');
    const monthValidation = document.getElementById('month-validation');
    const yearValidation = document.getElementById('year-validation');
    const warningMessage = document.getElementById('warning-message');

    // Reset validation messages
    dayValidation.innerText = '';
    monthValidation.innerText = '';
    yearValidation.innerText = '';
    warningMessage.innerText = '';

    if (!isValidInput(day, month, year)) {
        return;
    }

    const currentDate = new Date();
    const inputDate = new Date(year, month - 1, day);

    if (inputDate > currentDate) {
        warningMessage.innerText = 'Please enter a date in the past.';
        return;
    }

    const ageInMilliseconds = currentDate - inputDate;
    const ageInSeconds = ageInMilliseconds / 1000;
    const ageInMinutes = ageInSeconds / 60;
    const ageInHours = ageInMinutes / 60;
    const ageInDays = ageInHours / 24;

    const years = Math.floor(ageInDays / 365);
    const months = Math.floor((ageInDays % 365) / 30);
    const days = Math.floor(ageInDays % 30);

    document.getElementById('years').innerText = years;
    document.getElementById('months').innerText = months;
    document.getElementById('days').innerText = days;
}

function isValidInput(day, month, year) {
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

    let isValid = true;

    if (isNaN(day) || day < 1 || day > lastDayOfMonth) {
        document.getElementById('day-validation').innerText = 'Enter a valid day.';
        isValid = false;
    }

    if (isNaN(month) || month < 1 || month > 12) {
        document.getElementById('month-validation').innerText = 'Enter a valid month.';
        isValid = false;
    }

    if (isNaN(year) || year < 1900 || year > 2100) {
        document.getElementById('year-validation').innerText = 'Enter a valid year.';
        isValid = false;
    } else if (month === 2 && day > 29 && !isLeapYear) {
        document.getElementById('day-validation').innerText = 'Enter a valid day for February.';
        isValid = false;
    }

    return isValid;
}
