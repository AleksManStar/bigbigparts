// Данные для поиска (марки машин)
const carBrands = [
    "Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Mercedes", "Audi", "Volkswagen", "Tesla", "Nissan",
    "Hyundai", "Kia", "Subaru", "Mazda", "Lexus", "Jeep", "Porsche", "Volvo", "Fiat", "Renault"
];

// Языковые данные
const translations = {
    en: {
        home: "Home",
        search: "Search",
        about: "About Us",
        contact: "Contact",
        welcome: "Welcome to the Home Page!",
        example: "This is an example text that can be changed.",
        searchButton: "Search",
        aboutText: "We are a team of professionals creating awesome websites.",
        contactText: "Reach out to us via email:"
    },
    de: {
        home: "Startseite",
        search: "Suche",
        about: "Über uns",
        contact: "Kontakt",
        welcome: "Willkommen auf der Startseite!",
        example: "Dies ist ein Beispieltext, der geändert werden kann.",
        searchButton: "Suchen",
        aboutText: "Wir sind ein Team von Profis, die großartige Websites erstellen.",
        contactText: "Kontaktieren Sie uns per E-Mail:"
    },
    ru: {
        home: "Главная",
        search: "Поиск",
        about: "О нас",
        contact: "Контакты",
        welcome: "Добро пожаловать на главную страницу!",
        example: "Это пример текста, который можно изменить.",
        searchButton: "Поиск",
        aboutText: "Мы — команда профессионалов, создающих крутые веб-сайты.",
        contactText: "Свяжитесь с нами по email:"
    }
};

// Функция для смены языка
function changeLanguage(lang) {
    document.querySelectorAll("[data-lang]").forEach(element => {
        const key = element.getAttribute("data-lang");
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Обработчик кнопок выбора языка
document.querySelectorAll(".flag-button").forEach(button => {
    button.addEventListener("click", () => {
        const lang = button.getAttribute("data-lang");
        changeLanguage(lang);
    });
});

// Функция для фильтрации данных
function filterData(query) {
    return carBrands.filter(brand => brand.toLowerCase().includes(query.toLowerCase()));
}

// Функция для отображения подсказок
function showSuggestions(filteredData) {
    const suggestions = document.getElementById("suggestions");
    suggestions.innerHTML = '';
    if (filteredData.length > 0) {
        filteredData.forEach(item => {
            const div = document.createElement("div");
            div.textContent = item;
            div.addEventListener("click", () => {
                document.getElementById("searchInput").value = item;
                suggestions.innerHTML = '';
            });
            suggestions.appendChild(div);
        });
    }
}

// Обработчик ввода в поле поиска
document.getElementById("searchInput").addEventListener("input", (e) => {
    const query = e.target.value;
    if (query.length > 0) {
        const filteredData = filterData(query);
        showSuggestions(filteredData);
    } else {
        document.getElementById("suggestions").innerHTML = '';
    }
});

// Обработчик отправки формы
document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const carBrand = document.getElementById("searchInput").value;
    alert(`You searched for: ${carBrand}`);
    // Отправка данных формы через Formspree
    fetch(e.target.action, {
        method: 'POST',
        body: new FormData(e.target),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('Thank you! Your search has been submitted.');
        } else {
            alert('Oops! Something went wrong.');
        }
    }).catch(error => {
        alert('Oops! Something went wrong.');
    });
});
