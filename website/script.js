let selectedPlan = "";
let selectedPayment = "";

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('emailForm').addEventListener('submit', (e) => {
        e.preventDefault();
        checkEmailAndProceed();
    });

    document.getElementById('passwordForm').addEventListener('submit', (e) => {
        e.preventDefault();
        showScreen3();
    });

    document.querySelectorAll('.plan').forEach((plan) => {
        plan.addEventListener('click', function() {
            selectPlan(this.dataset.index);
        });
    });

    document.getElementById('planNextButton').addEventListener('click', showScreen4);

    document.querySelectorAll('.payment-option').forEach((option) => {
        option.addEventListener('click', function() {
            if (this.dataset.payment === 'Gift Code') {
                showGiftCodeScreen();
            } else {
                selectPayment(this.dataset.payment);
            }
        });
    });

    document.getElementById('giftCodeForm').addEventListener('submit', (e) => {
        e.preventDefault();
        checkGiftCodeAndProceed();
    });

    document.getElementById('closeError').addEventListener('click', hideErrorBox);
});

function showErrorBox(message) {
    const errorBox = document.getElementById('errorBox');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorBox.classList.remove('hidden');
}

function hideErrorBox() {
    document.getElementById('errorBox').classList.add('hidden');
}

function checkEmailAndProceed() {
    const email = document.getElementById('email').value;
    if (email === 'seandall@amazon.com') {
        showErrorBox('You already have an account with this email address.');
    } else if (email) {
        hideErrorBox();
        showScreen2();
    } else {
        showErrorBox('Please enter your email address.');
    }
}

function showScreen2() {
    document.getElementById('screen1').classList.add('hidden');
    document.getElementById('screen2').classList.remove('hidden');
    document.getElementById('emailDisplay').value = document.getElementById('email').value;
}

function showScreen3() {
    const password = document.getElementById('password').value;
    if (password) {
        hideErrorBox();
        document.getElementById('screen2').classList.add('hidden');
        document.getElementById('screen3').classList.remove('hidden');
    } else {
        showErrorBox('Please enter a password.');
    }
}

function selectPlan(index) {
    const plans = document.getElementsByClassName('plan');
    for (let i = 0; i < plans.length; i++) {
        plans[i].classList.remove('selected');
    }
    plans[index].classList.add('selected');
    selectedPlan = plans[index].querySelector('h3').textContent;
}

function showScreen4() {
    if (selectedPlan) {
        hideErrorBox();
        document.getElementById('screen3').classList.add('hidden');
        document.getElementById('screen4').classList.remove('hidden');
    } else {
        showErrorBox('Please select a plan.');
    }
}

function showGiftCodeScreen() {
    document.getElementById('screen4').classList.add('hidden');
    document.getElementById('giftCodeScreen').classList.remove('hidden');
}

function checkGiftCodeAndProceed() {
    const giftCode = document.getElementById('giftCode').value;
    if (giftCode === 'CODE1') {
        showErrorBox('Invalid Gift Code');
    } else if (giftCode === 'CODE2') {
        showErrorBox('One Time Gift Code already Used');
    } else if (giftCode) {
        hideErrorBox();
        selectedPayment = `Gift Code: ${giftCode}`;
        showScreen5();
    } else {
        showErrorBox('Please enter a gift code.');
    }
}

function selectPayment(paymentType) {
    selectedPayment = paymentType;
    showScreen5();
}

function showScreen5() {
    document.getElementById('screen4').classList.add('hidden');
    document.getElementById('giftCodeScreen').classList.add('hidden');
    document.getElementById('screen5').classList.remove('hidden');
    document.getElementById('finalEmail').textContent = document.getElementById('email').value;
    document.getElementById('finalPlan').textContent = selectedPlan;
    document.getElementById('finalPayment').textContent = selectedPayment;
}