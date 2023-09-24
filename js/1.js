export async function load() {
    document.getElementById("1").style.background = "#2c1e1e";
    document.getElementById("2").style.background = "none";
    document.getElementById("3").style.background = "none";
    document.getElementById("4").style.background = "none";
    document.getElementById("5").style.background = "none";
    document.getElementById('getUserById').addEventListener('click', () => fetchUserById(document.getElementById("userId").value));
    document.getElementById('getAllUsers').addEventListener('click', () => fetchAllUsers());

    async function fetchUserById(userId) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

            if (!response.ok) {
                throw new Error("FAIL: " + response.status);
            }

            const user = await response.json();
            document.getElementById("tbody").innerHTML = `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.address.street},${user.address.suite},${user.address.city}</td>
            <td>${user.phone}</td>
            <td>${user.website}</td>
        </tr>`;
        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    }

    async function fetchAllUsers() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');

            if (!response.ok) {
                throw new Error("FAIL: " + response.status);
            }

            const data = await response.json();
            document.getElementById("tbody").innerHTML = data.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.address.street},${user.address.suite},${user.address.city}</td>
            <td>${user.phone}</td>
            <td>${user.website}</td>
        </tr>`).join("");
        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    }
}
