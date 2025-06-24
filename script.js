document.querySelector('.calculate-btn').addEventListener('click', function () {
    const day = document.getElementById('day').value.trim();
    const month = document.getElementById('month').value.trim();
    const year = document.getElementById('year').value.trim();

    const resultSpans = document.querySelectorAll('.result-section .value');

    // Reset results
    resultSpans.forEach(span => span.textContent = '--');

    // Input validation check
    if (!day || !month || !year) {
        alert("Please fill in all fields.");
        return;
    }

    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (isNaN(d) || isNaN(m) || isNaN(y)) {
        alert("Please enter valid numbers.");
        return;
    }

    if (d < 1 || d > 31 || m < 1 || m > 12 || y > new Date().getFullYear()) {
        alert("Invalid date range.");
        return;
    }

    const birthDate = new Date(y, m - 1, d);
    if (
        birthDate.getFullYear() !== y ||
        birthDate.getMonth() !== (m - 1) ||
        birthDate.getDate() !== d
    ) {
        alert("Invalid date.");
        return;
    }


    const today = new Date();
    let ageY = today.getFullYear() - birthDate.getFullYear();
    let ageM = today.getMonth() - birthDate.getMonth();
    let ageD = today.getDate() - birthDate.getDate();

    if (ageD < 0) {
        ageM--;
        ageD += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // lấy số ngày của tháng trước
    }

    if (ageM < 0) {
        ageY--;
        ageM += 12;
    }

    // Animate the results
    animateNumber(resultSpans[0], ageY);
    animateNumber(resultSpans[1], ageM);
    animateNumber(resultSpans[2], ageD);
});

function animateNumber(element, finalValue) {
    let current = 0;
    const increment = Math.max(1, Math.floor(finalValue / 30));
    element.classList.add("active"); // Add class when data is available
    const interval = setInterval(() => {
        current += increment;
        if (current >= finalValue) {
            current = finalValue;
            clearInterval(interval);
        }
        element.textContent = current;
    }, 20);
}
