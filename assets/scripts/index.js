const quizStart = document.getElementById('quizStart');
const nextButtons = Array.from(document.querySelectorAll('.submit'));
const questionPages = Array.from(document.querySelectorAll('.question-page'));
const resourcesRead = document.getElementById('resourcesRead');

for (let i = 1; i < questionPages.length; i++) {
  questionPages[i].style.display = 'none';
}

const userData = {};
let currentPage = 0;

console.log('🚀 ~ file: index.js ~ line 5 ~ questionPages', questionPages);

quizStart.addEventListener('click', () => {
  questionPages[currentPage].style.display = 'none';
  questionPages[++currentPage].style.display = 'block';
});

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, function (e) {
    if (e.target.matches(selector)) callback(e);
  });
}

addGlobalEventListener('click', "input[type='radio']", function (e) {
  userData[e.target.form.name] = parseInt(e.target.value);
  console.log('🚀 ~ file: index.js ~ line 36 ~ userData', userData);
  if (
    (e.target.form.name === 'selfHarm' && e.target.value === '0') ||
    (e.target.form.name === 'selfHarmDetail' && e.target.value === '1') ||
    (e.target.form.name === 'treatment' && e.target.value === '0')
  ) {
    clearPage();
    currentPage += 2;
    renderPage();
  } else {
    clearPage();
    currentPage++;
    renderPage();
  }
});

addGlobalEventListener('submit', 'form', function (e) {
  e.preventDefault();
  const elements = [];
  Array.from(e.target.elements).forEach((el) => {
    if (el.checked) elements.push(el.name);
  });
  userData[e.target.name] = [...elements];
  clearPage();
  currentPage++;
  renderPage();
  console.log(userData);
});

addGlobalEventListener('click', '#resourcesRead', function (e) {
  clearPage();
  currentPage += 2;
  renderPage();
});

addGlobalEventListener('click', '.backArrow', function (e) {
  if (
    e.target.parentElement.id === 'help' ||
    e.target.parentElement.id === 'summary'
  ) {
    clearPage();
    currentPage -= 2;
    renderPage();
  } else {
    clearPage();
    currentPage--;
    renderPage();
  }
});

const renderPage = () => {
  if (currentPage === questionPages.length - 1) {
    const userInfo = document.getElementById('userInfo');
    Object.keys(userData).forEach((key) => {
      userInfo.innerHTML += `<p>${key}: ${userData[key]}</p>`;
    });
  }
  questionPages[currentPage].style.display = 'block';
};

const clearPage = () => {
  questionPages[currentPage].style.display = 'none';
};
