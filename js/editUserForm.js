import { loadContent } from "./loadContent.js";

export function load(username) {
    function loadInputForm() {
        const getApiUrl = `https://carsskoleprojekt.azurewebsites.net/api/members/${username}`;

        const fetchUserData = async () => {
            try {
                const response = await fetch(getApiUrl);
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const userData = await response.json();
                createEditForm(userData);
            } catch (error) {
                console.error(error);
            }
        };

        const createEditForm = (userData) => {
            const formContainer = document.getElementById("userEditForm");

            for (const key in userData) {
                if (userData.hasOwnProperty(key)) {
                    if (key !== 'created' && key !== 'edited' &&  key !== 'reservations') {
                        const labelElement = document.createElement("label");
                        labelElement.setAttribute("for", key);
                        labelElement.textContent = key;

                        const inputElement = document.createElement("input");
                        inputElement.setAttribute("type", "text");
                        inputElement.setAttribute("id", key);
                        inputElement.setAttribute("name", key); // Set a name attribute for the input
                        inputElement.setAttribute("value", userData[key]);

                        if (key === 'username') {
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

        const saveEdit = async () => {
            try {
                const response = await fetch(`https://carsskoleprojekt.azurewebsites.net/api/members/${username}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        email: document.getElementById("email").value,
                        password: document.getElementById("password").value,
                        firstName: document.getElementById("firstName").value,
                        lastName: document.getElementById("lastName").value,
                        street: document.getElementById("street").value,
                        city: document.getElementById("city").value,
                        zip: document.getElementById("zip").value
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to update user data");
                }

                console.log("User data updated successfully!");
                document.getElementById("status").innerText = "User data updated successfully!";
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();

        document.getElementById("submitBtn").addEventListener('click', saveEdit);
        document.getElementById("goBack").addEventListener('click', () => loadContent(5));
    }

    document.getElementById("test").innerText = username;
    loadInputForm();
}
