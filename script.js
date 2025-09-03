// Данные для поиска (марки и модели машин)
const carData = {
    "Toyota": ["Corolla", "Camry", "RAV4", "Prius", "Highlander"],
    "Honda": ["Civic", "Accord", "CR-V", "Pilot", "Odyssey"],
    "Ford": ["F-150", "Mustang", "Explorer", "Escape", "Focus"],
    "BMW": ["3 Series", "5 Series", "X5", "X3", "7 Series"],
    "Mercedes": ["C-Class", "E-Class", "S-Class", "GLC", "GLE"],
    "Audi": ["A4", "A6", "Q5", "Q7", "TT"],
    "Tesla": ["Model S", "Model 3", "Model X", "Model Y", "Cybertruck"],
    "Volkswagen": ["Golf", "Passat", "Tiguan", "Jetta", "Atlas"]
};

const translations = {
    en: {
        home: "Home",
        search: "Search",
        about: "About Us",
        contact: "Contact",
        welcome: "Welcome to Our Company",
        companyDescription: "📌 Brief Company Description",
        companyText: "A company from Daugavpils (Latvia) specializing in the supply of original spare parts for trucks and cars worldwide. We offer a wide range of oils and modern diagnostic equipment. Working directly with official representatives, dealers, and manufacturers, we guarantee authenticity, quality, and reliability of every part.",
        advantages: "💡 Key Advantages",
        advantage1: "100% original – cooperation only with manufacturers and official dealers.",
        advantage2: "Favorable conditions – flexible payment and delivery options, competitive prices.",
        advantage3: "Modern technologies – we use digital tools and AI to speed up processes.",
        advantage4: "Speed and reliability – fast delivery without losing factory quality.",
        brandPlaceholder: "Enter car brand",
        modelPlaceholder: "Enter car model",
        countryLabel: "Country:",
        nameLabel: "Name:",
        emailLabel: "Email:",
        phoneLabel: "Phone:",
        submitButton: "Submit",
        contactTitle: "Contact Information"
    },
    de: {
        home: "Startseite",
        search: "Suche",
        about: "Über uns",
        contact: "Kontakt",
        welcome: "Willkommen bei unserer Firma",
        companyDescription: "📌 Kurzbeschreibung des Unternehmens",
        companyText: "Ein Unternehmen aus Daugavpils (Lettland), das sich auf die Lieferung von Originalteilen für Lkw und Pkw weltweit spezialisiert hat. Wir bieten eine breite Palette von Ölen und moderner Diagnoseausrüstung an. Durch die direkte Zusammenarbeit mit offiziellen Vertretern, Händlern und Herstellern garantieren wir die Echtheit, Qualität и Zuverlässigkeit jedes Teils.",
        advantages: "💡 Wichtige Vorteile",
        advantage1: "100 % original – Zusammenarbeit nur mit Herstellern und offiziellen Händlern.",
        advantage2: "Günstige Bedingungen – flexible Zahlungs- und Lieferoptionen, wettbewerbsfähige Preise.",
        advantage3: "Moderne Technologien – wir nutzen digitale Tools und KI, um Prozesse zu beschleunigen.",
        advantage4: "Geschwindigkeit und Zuverlässigkeit – schnelle Lieferung ohne Qualitätsverlust.",
        brandPlaceholder: "Automarke eingeben",
        modelPlaceholder: "Automodell eingeben",
        countryLabel: "Land:",
        nameLabel: "Name:",
        emailLabel: "E-Mail:",
        phoneLabel: "Telefon:",
        submitButton: "Einreichen",
        contactTitle: "Kontaktinformationen"
    },
    ru: {
        home: "Главная",
        search: "Поиск",
        about: "О нас",
        contact: "Контакты",
        welcome: "Добро пожаловать в нашу компанию",
        companyDescription: "📌 Краткое описание компании",
        companyText: "Компания из Даугавпилса (Латвия), специализирующаяся на поставке оригинальных запчастей для грузовых и легковых автомобилей по всему миру. Мы предлагаем широкий ассортимент масел и современное диагностическое оборудование. Работая напрямую с официальными представителями, дилерами и заводами, гарантируем клиентам подлинность, качество и надежность каждой детали.",
        advantages: "💡 Ключевые преимущества",
        advantage1: "100% оригинал – сотрудничество только с заводами и официальными дилерами.",
        advantage2: "Выгодные условия – гибкие варианты оплаты и доставки, конкурентные цены.",
        advantage3: "Современные технологии – используем цифровые инструменты и ИИ для ускорения процессов.",
        advantage4: "Скорость и надежность – быстрая доставка без потери заводского качества.",
        brandPlaceholder: "Введите марку автомобиля",
        modelPlaceholder: "Введите модель автомобиля",
        countryLabel: "Страна:",
        nameLabel: "Имя:",
        emailLabel: "Email:",
        phoneLabel: "Телефон:",
        submitButton: "Отправить",
        contactTitle: "Контактная информация"
    }
};

// Функция для фильтрации данных
function filterData(query, data) {
    return data.filter(item => item.toLowerCase().includes(query.toLowerCase()));
}

// Функция для смены языка
function changeLanguage(lang) {
    document.querySelectorAll("[data-lang]").forEach(element => {
        const key = element.getAttribute("data-lang");
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Обновляем плейсхолдеры и метки
    document.getElementById("brandInput").placeholder = translations[lang].brandPlaceholder;
    document.getElementById("modelInput").placeholder = translations[lang].modelPlaceholder;
    document.querySelector("label[for='country']").textContent = translations[lang].countryLabel;
    document.querySelector("label[for='name']").textContent = translations[lang].nameLabel;
    document.querySelector("label[for='email']").textContent = translations[lang].emailLabel;
    document.querySelector("label[for='phone']").textContent = translations[lang].phoneLabel;
    document.querySelector("#contactForm button[type='submit']").textContent = translations[lang].submitButton;
    document.querySelector("#modal h2").textContent = translations[lang].contactTitle;
}

// Обработчик кнопок выбора языка
document.querySelectorAll(".flag-button").forEach(button => {
    button.addEventListener("click", () => {
        const lang = button.getAttribute("data-lang");
        changeLanguage(lang);
    });
});

// Устанавливаем язык по умолчанию
changeLanguage("en");

// Функция для отображения подсказок
function showSuggestions(suggestionsElement, filteredData, callback) {
    suggestionsElement.innerHTML = '';
    if (filteredData.length > 0) {
        filteredData.forEach(item => {
            const div = document.createElement("div");
            div.textContent = item;
            div.addEventListener("click", () => {
                callback(item);
                suggestionsElement.innerHTML = '';
            });
            suggestionsElement.appendChild(div);
        });
    }
}

// Обработчик ввода в поле марки
document.getElementById("brandInput").addEventListener("input", (e) => {
    const query = e.target.value;
    const brandSuggestions = document.getElementById("brandSuggestions");
    if (query.length > 0) {
        const filteredBrands = filterData(query, Object.keys(carData));
        showSuggestions(brandSuggestions, filteredBrands, (selectedBrand) => {
            document.getElementById("brandInput").value = selectedBrand;
            document.getElementById("modelInput").disabled = false;
            document.getElementById("modelInput").placeholder = "Enter car model";
        });
    } else {
        brandSuggestions.innerHTML = '';
        document.getElementById("modelInput").disabled = true;
        document.getElementById("modelInput").placeholder = "Select a brand first";
    }
});

// Обработчик ввода в поле модели
document.getElementById("modelInput").addEventListener("input", (e) => {
    const query = e.target.value;
    const modelSuggestions = document.getElementById("modelSuggestions");
    const selectedBrand = document.getElementById("brandInput").value;
    if (query.length > 0 && selectedBrand && carData[selectedBrand]) {
        const filteredModels = filterData(query, carData[selectedBrand]);
        showSuggestions(modelSuggestions, filteredModels, (selectedModel) => {
            document.getElementById("modelInput").value = selectedModel;
            // Открываем модальное окно
            document.getElementById("modal").style.display = "block";
            // Заполняем скрытые поля
            document.getElementById("selectedBrand").value = selectedBrand;
            document.getElementById("selectedModel").value = selectedModel;
        });
    } else {
        modelSuggestions.innerHTML = '';
    }
});

// Закрытие модального окна
document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
});

// Обработчик отправки формы контактных данных
document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(e.target.action, {
        method: 'POST',
        body: new FormData(e.target),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('Thank you! Your information has been submitted.');
            document.getElementById("modal").style.display = "none";
        } else {
            alert('Oops! Something went wrong.');
        }
    }).catch(error => {
        alert('Oops! Something went wrong.');
    });
});
