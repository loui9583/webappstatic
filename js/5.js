import { loadEditForms } from "./loadEditForm.js";

export async function load() {
    const getByIdButton = document.getElementById("getById");

    function getInputId() {
        return document.getElementById("id").value;
    }

    async function deleteMember(username) {
        try {
            const response = await fetch(`https://carsskoleprojekt.azurewebsites.net/api/members/${username}`, {
                method: "DELETE"
            });

            if (response.ok) {
                console.log("Member deleted successfully");
                await fetchAllUsers();
            } else {
                throw new Error(`ERROR: Status: ${response.status}.`);
            }
        } catch (error) {
            console.error(`ERROR: ${error}`);
        }
    }

    async function fetchCarById(carId) {
        try {
            const response = await fetch(`https://carsskoleprojekt.azurewebsites.net/api/cars/id/${carId}/includeAll`);

            if (!response.ok) {
                throw new Error("FAIL: " + response.status);
            }

            const car = await response.json();
            document.getElementById("tbody").innerHTML = `
        <td>${car.id}</td>
        <td>${car.brand}</td>
        <td>${car.model}</td>
        <td>${car.pricePrDay}</td>
        <td>${car.bestDiscount}</td>
        <td><button style="margin-right: 10px;" onclick="" class="btn btn-primary edit-button">Edit</button>
        <button class="btn btn-danger">Delete</button>
        </td>`;
        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    }

    async function fetchMemberById(username) {
        try {
            const response = await fetch(`https://carsskoleprojekt.azurewebsites.net/api/members/${username}`);

            if (!response.ok) {
                throw new Error("FAIL: " + response.status);
            }

            const member = await response.json();
            document.getElementById("tbody").innerHTML = `
        <td>${member.username}</td>
        <td>${member.email}</td>
        <td>${member.firstName}</td>
        <td>${member.lastName}</td>
        <td>${member.street}</td>
        <td>${member.city}</td>
        <td>${member.zip}</td>
        <td><button style="margin-right: 10px;" class="btn btn-primary">Edit</button>
        <button class="btn btn-danger">Delete</button>
        </td>`;
        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    }

    async function fetchAllCars() {
        try {
            const response = await fetch('https://carsskoleprojekt.azurewebsites.net/api/cars/includeAll');

            if (!response.ok) {
                throw new Error("FAIL: " + response.status);
            }

            const data = await response.json();
            const tbody = document.getElementById("tbody");
            tbody.innerHTML = '';

            data.forEach(car => {
                const editButton = document.createElement("button");
                editButton.style.marginRight = "10px";
                editButton.classList.add("btn", "btn-primary");
                editButton.textContent = "Edit";
                editButton.addEventListener("click", () => {
                    loadEditForms('editCarForm', car.id);
                });

                const deleteButton = document.createElement("button");
                deleteButton.classList.add("btn", "btn-danger");
                deleteButton.textContent = "Delete";

                deleteButton.addEventListener("click", () => {
                    deleteCar(car.id);
                });

                const td = document.createElement("td");
                td.appendChild(editButton);
                td.appendChild(deleteButton);

                const tr = document.createElement("tr");
                tr.innerHTML = `
          <td>${car.id}</td>
          <td>${car.brand}</td>
          <td>${car.model}</td>
          <td>${car.pricePrDay}</td>
          <td>${car.bestDiscount}</td>`;
                tr.appendChild(td);

                tbody.appendChild(tr);
            });
        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    }

    async function fetchAllUsers() {
        try {
            const response = await fetch('https://carsskoleprojekt.azurewebsites.net/api/members/includeAll');

            if (!response.ok) {
                throw new Error("FAIL: " + response.status);
            }

            const data = await response.json();
            const tbody = document.getElementById("tbody");
            tbody.innerHTML = '';

            data.forEach(user => {
                const editButton = document.createElement("button");
                editButton.style.marginRight = "10px";
                editButton.classList.add("btn", "btn-primary");
                editButton.textContent = "Edit";
                editButton.addEventListener("click", () => {
                    loadEditForms('editUserForm', user.username);
                });

                const deleteButton = document.createElement("button");
                deleteButton.classList.add("btn", "btn-danger");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", () => {
                    deleteMember(user.username);
                });

                const td = document.createElement("td");
                td.appendChild(editButton);
                td.appendChild(deleteButton);

                const tr = document.createElement("tr");
                tr.innerHTML = `
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>${user.firstName}</td>
          <td>${user.lastName}</td>
          <td>${user.street}</td>
          <td>${user.city}</td>
          <td>${user.zip}</td>`;
                tr.appendChild(td);

                tbody.appendChild(tr);
            });
        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    }

    async function deleteCar(carId) {
        try {
            const response = await fetch(`https://carsskoleprojekt.azurewebsites.net/api/cars/${carId}`, { method: "DELETE" });

            if (response.ok) {
                console.log("Great Success");
                await fetchAllCars();
            } else {
                throw new Error(`ERROR: Status: ${response.status}.`);
            }
        } catch (error) {
            console.error(`ERROR: ${error}`);
        }
    }

    function loadMembers() {
        document.getElementById("thead").innerHTML = `
      <tr>
        <th>Username</th>
        <th>Email</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Street</th>
        <th>City</th>
        <th>Zip</th>
        <th>Actions</th>
      </tr>`;
        document.getElementById("id").placeholder = "Enter member Username";
    }

    function loadCars() {
        document.getElementById("thead").innerHTML = `
      <tr>
        <th>ID</th>
        <th>Brand</th>
        <th>Model</th>
        <th>PricePrDay</th>
        <th>BestDiscount</th>
        <th>Actions</th>
      </tr>`;
        document.getElementById("id").placeholder = "Enter Car ID";
    }

    document.getElementById('cars').addEventListener('click', () => {
        getByIdButton.onclick = () => fetchCarById(getInputId());
        document.getElementById("showing").innerText = "Showing Cars. (Cant delete car 1-7 because they are part of reservations..)";
        getByIdButton.innerText = "Find Car By Id";
        loadCars();
        fetchAllCars();
    });

    document.getElementById('members').addEventListener('click', () => {
        getByIdButton.innerText = "Find Member By Username";
        document.getElementById("showing").innerText = "Showing Members.(cant delete member 1-5 bcz they are part of reservatoins..)";
        getByIdButton.onclick = () => fetchMemberById(getInputId());
        loadMembers();
        fetchAllUsers();
    });

    loadCars();
    fetchAllCars();
    getByIdButton.onclick = () => fetchCarById(getInputId());
    document.getElementById("showing").innerText = "Showing Cars. (Cant delete car 1-7 because they are part of reservations..)";
    getByIdButton.innerText = "Find Car By Id";

    document.getElementById("addNewCar").addEventListener("click", () => {
        loadEditForms("addCar");
    });

    document.getElementById("addNewMember").addEventListener("click", () => {
        loadEditForms("addMember");
    });
}
