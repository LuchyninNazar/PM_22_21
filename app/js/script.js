function animateProgressBar(selector, targetWidth, duration) {
    const element = document.querySelector(selector);

    // Встановлюємо цільову ширину для конкретного прогрес-бару
    element.style.setProperty('--progress-width', `${targetWidth}%`);

    // Додаємо тривалість анімації для зеленої смужки
    const greenBar = element.querySelector('::after');
    if (greenBar) {
        greenBar.style.animationDuration = `${duration}s`;
    }

    // Для кожного квадрата, додаємо окрему анімацію
    const square = element.querySelector('.Mini-square');
    if (square) {
        square.style.animationDuration = `${duration}s`;
    }
}

// Запуск анімації для кожного прогрес-бару
document.addEventListener('DOMContentLoaded', () => {
    animateProgressBar('.Adobe-Photoshop', 15, 3); // 75% для Photoshop
    animateProgressBar('.Adobe-Illustrator', 16, 3); // 65% для Illustrator
    animateProgressBar('.Microsoft-Word', 13, 3); // 90% для Word
    animateProgressBar('.Microsoft-Powerpoint', 20, 3); // 80% для PowerPoint
});

// --------------------------------------------------------------------------------------- //

document.addEventListener('DOMContentLoaded', () => {
    // Додаємо клас "hidden" до всіх елементів, які мають анімацію
    const animatedElements = document.querySelectorAll('.Job-Experience, .Education, .References, .Skills, .Hobbies, .About-Me, .Languages');

    animatedElements.forEach(el => {
        el.classList.add('hidden');
    });

    const onScroll = () => {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Перевіряємо, чи елемент у межах вікна
            if (rect.top < windowHeight - 100) {
                el.classList.add('visible');
                el.classList.remove('hidden');
            }
        });
    };

    // Викликаємо onScroll на прокручуванні
    window.addEventListener('scroll', onScroll);

    // Викликаємо один раз, щоб з'явилися елементи, які вже у видимій області
    onScroll();
});

// --------------------------------------------------------------- //

// Функція для анімації заповнення до певного відсотка
function animateToPercentage(selector, targetPercentage, duration = 2000) {
    const element = document.querySelector(selector);
    let currentPercentage = 0; // Початковий відсоток
    const stepTime = 10; // Частота оновлення (в мілісекундах)
    const step = (targetPercentage / duration) * stepTime; // Збільшення за крок

    function updateGradient() {
        currentPercentage = Math.min(currentPercentage + step, targetPercentage); // Збільшуємо відсоток
        element.style.setProperty(
            '--dynamic-gradient',
            `conic-gradient(#26a69a 0% ${currentPercentage}%, #e0e0e0 ${currentPercentage}% 100%)`
        );

        if (currentPercentage < targetPercentage) {
            setTimeout(updateGradient, stepTime); // Наступний кадр
        }
    }

    updateGradient(); // Запускаємо анімацію
}

// Ініціалізуємо анімацію для кожної діаграми
document.addEventListener('DOMContentLoaded', () => {
    animateToPercentage('.English-Diagram', 93); // English: 93%
    animateToPercentage('.German-Diagram', 60);  // German: 60%
    animateToPercentage('.Spanish-Diagram', 50); // Spanish: 50%
});

// ---------------------------------------------------- //

// Функція для обчислення позиції точки на колі
function calculateDotPosition(radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180); // Віднімаємо 90°, щоб початок був зверху
    const x = radius * Math.cos(angleInRadians);
    const y = radius * Math.sin(angleInRadians);
    return { x, y };
}

// Функція для анімації діаграми і руху кінцевої точки
function animateDiagram(selector, targetPercentage, duration = 2000) {
    const diagram = document.querySelector(selector);
    const endDot = diagram.querySelector('.end-dot');
    let currentPercentage = 0; // Початковий відсоток
    const stepTime = 10; // Частота оновлення (в мілісекундах)
    const step = (targetPercentage / duration) * stepTime; // Збільшення за крок
    const radius = diagram.offsetWidth / 2.1; // Радіус кола (половина ширини діаграми)

    function updateDiagram() {
        currentPercentage = Math.min(currentPercentage + step, targetPercentage); // Збільшуємо відсоток
        const angle = (currentPercentage / 100) * 360; // Кут для поточного відсотка

        // Оновлюємо градієнт
        diagram.style.setProperty(
            '--dynamic-gradient',
            `conic-gradient(#26a69a 0% ${currentPercentage}%, #e0e0e0 ${currentPercentage}% 100%)`
        );

        // Оновлюємо положення кінцевої точки
        const { x, y } = calculateDotPosition(radius, angle);
        endDot.style.transform = `translate(${x}px, ${y}px)`; // Переміщуємо точку

        if (currentPercentage < targetPercentage) {
            setTimeout(updateDiagram, stepTime); // Наступний кадр
        }
    }

    updateDiagram(); // Запускаємо анімацію
}

// Ініціалізуємо анімацію для кожної діаграми
document.addEventListener('DOMContentLoaded', () => {
    animateDiagram('.English-Diagram', 93); // English: 93%
    animateDiagram('.German-Diagram', 60);  // German: 60%
    animateDiagram('.Spanish-Diagram', 50); // Spanish: 50%
});

// --------------------------------------------- //

document.addEventListener('DOMContentLoaded', () => {
    const jobContainer = document.querySelector('.Job-Experience');
    const educationContainer = document.querySelector('.Education');

    // Функція для отримання даних
    function fetchData() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', './data.json', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    renderJobExperience(data.jobExperience);
                    renderEducation(data.education);
                } catch (err) {
                    console.error('Помилка обробки даних:', err);
                }
            } else {
                console.error('Помилка завантаження даних:', xhr.status);
            }
        };
        xhr.send();
    }

    // Рендеринг досвіду роботи
    function renderJobExperience(jobs) {
        jobs.forEach(job => {
            const jobBlock = document.createElement('div');
            jobBlock.classList.add('Job-Block');
            jobBlock.innerHTML = `
        <div class="Job-Title"><h2>${job.title}</h2></div>
        <div class="Job-Subtitle1">${job.company} <span class="city">${job.location}</span></div>
        <div class="Job-Subtitle2">
          <p>${job.description}</p>
        </div>
        <div class="Years-1"><div class="First-Date">${job.years}</div></div>
      `;
            jobContainer.appendChild(jobBlock);
        });
    }

    // Рендеринг освіти
    function renderEducation(educations) {
        educations.forEach(education => {
            const eduBlock = document.createElement('div');
            eduBlock.classList.add('Education-Block');
            eduBlock.innerHTML = `
        <div class="Education-Title"><h2>${education.title}</h2></div>
        <div class="Education-Subtitle1">${education.institution}</div>
        <div class="Education-Subtitle2">
          <p>${education.description}</p>
        </div>
        <div class="Years-2"><div class="First-Date">${education.years}</div></div>
      `;
            educationContainer.appendChild(eduBlock);
        });
    }

    fetchData(); // Виклик функції отримання даних
});

document.addEventListener('DOMContentLoaded', () => {
    const jobContainer = document.querySelector('.Job-Experience');
    const educationContainer = document.querySelector('.Education');

    // Функція для отримання даних з Fetch API
    async function fetchData() {
        try {
            const response = await fetch(`./data/data.json?t=${new Date().getTime()}`); // Унікальний параметр

            if (!response.ok) {
                throw new Error(`HTTP помилка! Статус: ${response.status}`);
            }

            const data = await response.json();
            renderJobExperience(data.jobExperience);
            renderEducation(data.education);
        } catch (error) {
            console.error('Помилка отримання або обробки даних:', error);
        }
    }

    // Рендеринг досвіду роботи
    function renderJobExperience(jobs) {
        jobs.forEach(job => {
            const jobBlock = document.createElement('div');
            jobBlock.classList.add('Job-Block');
            jobBlock.innerHTML = `
        <div class="Job-Title"><h2>${job.title}</h2></div>
        <div class="Job-Subtitle1">${job.company} <span class="city">${job.location}</span></div>
        <div class="Job-Subtitle2">
          <p>${job.description}</p>
        </div>
        <div class="Years-1"><div class="First-Date">${job.years}</div></div>
      `;
            jobContainer.appendChild(jobBlock);
        });
    }

    // Рендеринг освіти
    function renderEducation(educations) {
        educations.forEach(education => {
            const eduBlock = document.createElement('div');
            eduBlock.classList.add('Education-Block');
            eduBlock.innerHTML = `
        <div class="Education-Title"><h2>${education.title}</h2></div>
        <div class="Education-Subtitle1">${education.institution}</div>
        <div class="Education-Subtitle2">
          <p>${education.description}</p>
        </div>
        <div class="Years-2"><div class="First-Date">${education.years}</div></div>
      `;
            educationContainer.appendChild(eduBlock);
        });
    }

    fetchData(); // Виклик функції отримання даних
});
