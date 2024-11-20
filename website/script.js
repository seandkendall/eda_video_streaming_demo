let selectedPlan = "";
let selectedPayment = "";

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('emailForm').addEventListener('submit', (e) => {
        e.preventDefault();
        showScreen2();
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
        redeemGiftCode();
    });
});

function showScreen2() {
    const email = document.getElementById('email').value;
    if (email) {
        document.getElementById('screen1').classList.add('hidden');
        document.getElementById('screen2').classList.remove('hidden');
        document.getElementById('emailDisplay').value = email;
    } else {
        alert('Please enter your email address.');
    }
}

function showScreen3() {
    const password = document.getElementById('password').value;
    if (password) {
        document.getElementById('screen2').classList.add('hidden');
        document.getElementById('screen3').classList.remove('hidden');
    } else {
        alert('Please enter a password.');
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
        document.getElementById('screen3').classList.add('hidden');
        document.getElementById('screen4').classList.remove('hidden');
    } else {
        alert('Please select a plan.');
    }
}

function showGiftCodeScreen() {
    document.getElementById('screen4').classList.add('hidden');
    document.getElementById('giftCodeScreen').classList.remove('hidden');
}

function redeemGiftCode() {
    const giftCode = document.getElementById('giftCode').value;
    if (giftCode) {
        selectedPayment = `Gift Code: ${giftCode}`;
        showScreen5();
    } else {
        alert('Please enter a gift code.');
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