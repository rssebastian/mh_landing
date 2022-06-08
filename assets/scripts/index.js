const firstName = document.getElementById('firstName');
const zipCode = document.getElementById('zipCode');
const nextButtons = Array.from(document.querySelectorAll('.submit'));
const backArrow = document.getElementById('backArrow');
const questionPages = Array.from(document.querySelectorAll('.question-page'));
const forms = Array.from(document.querySelectorAll('form'));

for (let i = 1; i < questionPages.length; i++) {
  questionPages[i].style.display = 'none';
}

const userData = [];
let currentPage = 0;
let validFn,
  validZip = false;

firstName.addEventListener('keyup', (e) => {
  if (e.target.value.length > 0) {
    e.target.classList.remove('is-danger');
    e.target.classList.add('is-success');
    validFn = true;
    if (validZip) {
      nextButtons[currentPage].disabled = false;
    }
  } else {
    e.target.classList.remove('is-success');
    e.target.classList.add('is-danger');
    validFn = false;
    nextButtons[currentPage].disabled = true;
  }
});

zipCode.addEventListener('keyup', (e) => {
  validZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(e.target.value);
  if (validZip) {
    e.target.classList.remove('is-danger');
    e.target.classList.add('is-success');
    if (validFn) {
      nextButtons[currentPage].disabled = false;
    }
  } else {
    e.target.classList.remove('is-success');
    e.target.classList.add('is-danger');
    nextButtons[currentPage].disabled = true;
  }
});

forms.forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    switch (currentPage) {
      case 0:
        userData.push({
          firstName: firstName.value,
          zipCode: zipCode.value,
        });
        break;
      case 1:
        const symptoms = [];
        Array.from(form.elements).forEach((symptom) => {
          if (symptom.checked) {
            symptoms.push(symptom.name);
          }
        });
        userData[1] = { symptoms: [...symptoms] };
        break;
    }
    clearPage();
    currentPage++;
    renderPage();
    renderArrow();
    console.log(userData);
  });
});

backArrow.addEventListener('click', () => {
  clearPage();
  currentPage--;
  renderPage();
  renderArrow();
});

const renderArrow = () => {
  if (currentPage === 0) {
    backArrow.style.display = 'none';
  } else {
    backArrow.style.display = 'block';
  }
};

const renderPage = () => {
  if (currentPage === questionPages.length - 1) {
    const userInfo = document.getElementById('userInfo');
    userData.forEach((data) => {
      Object.keys(data).forEach((key) => {
        const div = document.createElement('div');
        div.innerText = `${key}: ${data[key]}`;
        userInfo.appendChild(div);
      });
    });
  }
  questionPages[currentPage].style.display = 'block';
};

const clearPage = () => {
  questionPages[currentPage].style.display = 'none';
};
