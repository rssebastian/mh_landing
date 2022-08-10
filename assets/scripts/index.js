const quizStart = document.getElementById('quizStart');
const nextButtons = Array.from(document.querySelectorAll('.submit'));
const questionPages = Array.from(document.querySelectorAll('.question-page'));
const resourcesRead = document.getElementById('resourcesRead');
const progressBar = document.getElementsByClassName('progress-bar')[0];
const heroText = document.getElementById('hero-text');
const main = document.getElementsByTagName('main')[0];
const lastPage = document.getElementById('lastPage');

for (let i = 1; i < questionPages.length; i++) {
  questionPages[i].style.display = 'none';
}

let currentPage = 0;
let timeLeft = 4;
let timeIncrement = timeLeft / questionPages.length;
timeIncrement = parseFloat(timeIncrement.toFixed(2));

quizStart.addEventListener('click', () => {
  questionPages[currentPage].style.display = 'none';
  questionPages[++currentPage].style.display = 'block';
  renderProgressBar();
  progressBar.scrollIntoView({ block: 'start', behavior: 'smooth' });
});

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, function (e) {
    if (e.target.matches(selector)) callback(e);
  });
}

addGlobalEventListener('click', "input[type='radio']", function (e) {
  document.body.style.cursor = 'wait';
  setTimeout(function () {
    if (
      (e.target.form.name === 'selfHarm' && e.target.value === '0') ||
      (e.target.form.name === 'selfHarmDetail' && e.target.value === '1') ||
      (e.target.form.name === 'treatment' && e.target.value === '0')
    ) {
      turnPage(2);
    } else {
      turnPage(1);
    }
  }, 300);
});

addGlobalEventListener('submit', 'form', function (e) {
  e.preventDefault();
  turnPage(1);
});

addGlobalEventListener('click', '#resourcesRead', function () {
  turnPage(2);
});

addGlobalEventListener('click', '.backArrow', function (e) {
  if (
    e.target.parentElement.parentElement.parentElement.id === 'help' ||
    e.target.parentElement.parentElement.parentElement.id === 'tasks'
  ) {
    turnPage(-2);
    resetForm();
  } else {
    turnPage(-1);
    resetForm();
  }
});

const turnPage = (page) => {
  questionPages[currentPage].style.display = 'none';
  currentPage += page;
  if (timeLeft - timeIncrement * page <= 4) timeLeft -= timeIncrement * page;
  renderPage();
  document.body.style.cursor = 'auto';
};

const renderPage = () => {
  if (currentPage === questionPages.length) {
    lastPageRender();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    renderProgressBar();
    questionPages[currentPage].style.display = 'block';
    progressBar.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
};

const renderProgressBar = () => {
  progressBar.style.display = 'block';
  const width = Math.floor(((currentPage + 1) / questionPages.length) * 100);
  progressBar.style.setProperty('--width', width);
  if (timeLeft > 1) {
    progressBar.setAttribute(
      'data-label',
      Math.floor(timeLeft) + ' MIN TO COMPLETE'
    );
  } else if (timeLeft > 0) {
    progressBar.setAttribute('data-label', '< 1 MIN TO COMPLETE');
  } else {
    progressBar.style.display = 'none';
  }
};

const lastPageRender = () => {
  heroText.innerText = 'Thank you for taking our quiz!';
  main.style.display = 'none';
  lastPage.style.display = 'block';
};

const resetForm = () => {
  if (questionPages[currentPage].getElementsByTagName('form').length > 0)
    questionPages[currentPage].getElementsByTagName('form')[0].reset();
};
