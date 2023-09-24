import {loadContent} from "./loadContent.js";

export function load(id) {
    function loadInputForm() {
        const getApiUrl = `https://carsskoleprojekt.azurewebsites.net/api/cars/id/${id}/includeAll`;

        const fetchCarData = async () => {
            try {
                const response = await fetch(getApiUrl); // Use the getApiUrl variable here
                if (!response.ok) {
                    throw new Error("Failed to fetch car data");
                }
                const carData = await response.json();
                createEditForm(carData);
            } catch (error) {
                console.error(error);
            }
        };


        const createEditForm = (carData) => {
            const formContainer = document.getElementById("carEditForm");

            for (const key in carData) {
                if (carData.hasOwnProperty(key)) {
                    if (key !== 'created' && key !== 'edited') {
                        const labelElement = document.createElement("label");
                        labelElement.setAttribute("for", key);
                        labelElement.textContent = key;

                        const inputElement = document.createElement("input");
                        inputElement.setAttribute("type", "text");
                        inputElement.setAttribute("id", key);
                        inputElement.setAttribute("name", key); // Set a name attribute for the input
                        inputElement.setAttribute("value", carData[key]);

                        if (key === 'id') {
                            inputElement.setAttribute("readonly", true);
                            inputElement.style.backgroundColor = "grey"; // Gray background color
                        }

                        formContainer.appendChild(labelElement);
                        formContainer.appendChild(document.createElement("br"));
                        formContainer.appendChild(inputElement);
                        formContainer.appendChild(document.createElement("br"));
                        formContainer.appendChild(document.createElement("br"));
                    }
                }
            }
        };




        // Function to submit the edited data
        const saveEdit = async () => {
            try {
                const response = await fetch(`https://carsskoleprojekt.azurewebsites.net/api/cars/id/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: id,
                        brand: document.getElementById("brand").value,
                        model: document.getElementById("model").value,
                        pricePrDay: document.getElementById("pricePrDay").value,
                        bestDiscount: document.getElementById("bestDiscount").value
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to update car data");
                }

                console.log("Car data updated successfully!");
                document.getElementById("status").innerText="Car data updated successfully!"
            } catch (error) {
                console.error(error);
            }
        };

        // Fetch and display car data
        fetchCarData();


        // Add event listeners
        document.getElementById("submitBtn").addEventListener('click', saveEdit);
        document.getElementById("goBack").addEventListener('click', () => loadContent(5));

    }
    document.getElementById("test").innerText=id;
    loadInputForm();
}
