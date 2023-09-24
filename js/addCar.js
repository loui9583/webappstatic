import { loadContent } from "./loadContent.js";

export function load() {
    const submitBtn = document.getElementById('submitBtn');

    submitBtn.addEventListener('click', function () {
        const brand = document.getElementById('brand').value;
        const model = document.getElementById('model').value;
        const pricePrDay = parseFloat(document.getElementById('pricePrDay').value);
        const bestDiscount = parseFloat(document.getElementById('bestDiscount').value);


        const carData = {
            brand: brand,
            model: model,
            pricePrDay: pricePrDay,
            bestDiscount: bestDiscount
        };


        fetch('https://carsskoleprojekt.azurewebsites.net/api/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carData)
        })
            .then(response => response.json())
            .then(data => {

                console.log('Car created successfully:', data);
                document.getElementById("successMessage").innerText="car added successfully"

            })
            .catch(error => {
                console.error('Error creating car:', error);

            });
    });

    document.getElementById("goBack").addEventListener('click', function () {
        loadContent(5);
    });
}
