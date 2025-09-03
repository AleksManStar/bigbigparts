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

// Функция для фильтрации данных
function filterData(query, data) {
    return data.filter(item => item.toLowerCase().includes(query.toLowerCase()));
}

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
        });
    } else {
        modelSuggestions.innerHTML = '';
    }
});

// Обработчик отправки формы
document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const brand = document.getElementById("brandInput").value;
    const model = document.getElementById("modelInput").value;
    if (brand && model) {
        alert(`You searched for: ${brand} ${model}`);
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
    } else {
        alert('Please select both a brand and a model.');
    }
});
