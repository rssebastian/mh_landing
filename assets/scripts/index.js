const quizStart = document.getElementById('quizStart');
const nextButtons = Array.from(document.querySelectorAll('.submit'));
const questionPages = Array.from(document.querySelectorAll('.question-page'));
const resourcesRead = document.getElementById('resourcesRead');
const progressBar = document.getElementsByClassName('progress-bar')[0];

console.log(questionPages.length);
console.log(questionPages);

for (let i = 1; i < questionPages.length; i++) {
  questionPages[i].style.display = 'none';
}

const userData = {};
let currentPage = 0;

quizStart.addEventListener('click', () => {
  questionPages[currentPage].style.display = 'none';
  questionPages[++currentPage].style.display = 'block';
  renderProgressBar();
});

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, function (e) {
    if (e.target.matches(selector)) callback(e);
  });
}

addGlobalEventListener('click', "input[type='radio']", function (e) {
  userData[e.target.form.name] = parseInt(e.target.value);
  document.body.style.cursor = 'wait';
  setTimeout(function () {
    if (
      (e.target.form.name === 'selfHarm' && e.target.value === '0') ||
      (e.target.form.name === 'selfHarmDetail' && e.target.value === '1') ||
      (e.target.form.name === 'treatment' && e.target.value === '0')
    ) {
      clearPage();
      currentPage += 2;
      renderPage();
      document.body.style.cursor = 'auto';
    } else {
      clearPage();
      currentPage++;
      renderPage();
      document.body.style.cursor = 'auto';
    }
  }, 300);
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
});

addGlobalEventListener('click', '#resourcesRead', function (e) {
  clearPage();
  currentPage += 2;
  renderPage();
});

addGlobalEventListener('click', '.backArrow', function (e) {
  if (
    e.target.parentElement.id === 'help' ||
    e.target.parentElement.id === 'summary' ||
    e.target.parentElement.id === 'tasks'
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
  renderProgressBar();
  questionPages[currentPage].style.display = 'block';
};

const clearPage = () => {
  questionPages[currentPage].style.display = 'none';
};

const renderProgressBar = () => {
  if (currentPage === 0) {
    progressBar.style.display = 'none';
  } else {
    progressBar.style.display = 'block';
    const width = Math.floor(((currentPage + 1) / questionPages.length) * 100);
    progressBar.style.setProperty('--width', width);
    progressBar.setAttribute('data-label', width + '%');
  }
};
