import { loadContent } from "./loadContent.js";

export function load() {
    const submitBtn = document.getElementById('submitBtn');

    submitBtn.addEventListener('click', function () {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const street = document.getElementById('street').value;
        const city = document.getElementById('city').value;
        const zip = document.getElementById('zip').value;


        const userData = {
            username: username,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            street: street,
            city: city,
            zip: zip
        };


        fetch('https://carsskoleprojekt.azurewebsites.net/api/members', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => {

                console.log('User created successfully:', data);
                document.getElementById("successMessage").innerText = "User added successfully";

            })
            .catch(error => {
                console.error('Error creating user:', error);

            });
    });

    document.getElementById("goBack").addEventListener('click', function () {
        loadContent(5);
    });
}
