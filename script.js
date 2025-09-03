// Пример данных для поиска
const data = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
    "Kiwi",
    "Lemon",
    "Mango",
    "Nectarine",
    "Orange",
    "Papaya",
    "Quince",
    "Raspberry",
    "Strawberry",
    "Tangerine",
    "Ugli fruit",
    "Vanilla",
    "Watermelon",
    "Xigua",
    "Yellow watermelon",
    "Zucchini"
];

const searchInput = document.getElementById('searchInput');
const suggestions = document.getElementById('suggestions');

// Функция для фильтрации данных
function filterData(query) {
    return data.filter(item => item.toLowerCase().includes(query.toLowerCase()));
}

// Функция для отображения подсказок
function showSuggestions(filteredData) {
    suggestions.innerHTML = '';
    if (filteredData.length > 0) {
        filteredData.forEach(item => {
            const div = document.createElement('div');
            div.textContent = item;
            div.addEventListener('click', () => {
                searchInput.value = item;
                suggestions.innerHTML = '';
            });
            suggestions.appendChild(div);
        });
    }
}

// Обработчик ввода в поле поиска
searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    if (query.length > 0) {
        const filteredData = filterData(query);
        showSuggestions(filteredData);
    } else {
        suggestions.innerHTML = '';
    }
});

// Обработчик отправки формы
document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert(`You searched for: ${searchInput.value}`);
});
