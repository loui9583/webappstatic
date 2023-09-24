export function load() {
    document.getElementById("1").style.background = "#2c1e1e"
    document.getElementById("2").style.background = "none"
    document.getElementById("3").style.background = "none"
    document.getElementById("4").style.background = "none"
    document.getElementById("5").style.background = "none"
    document.getElementById('getUserById').addEventListener('click', () => fetchUserById(document.getElementById("userId").value));
    document.getElementById('getAllUsers').addEventListener('click', () => fetchAllUsers());

    function fetchUserById(userId) {
        fetch('https://jsonplaceholder.typicode.com/users/' + userId)
            .then(res => {
                if (!res.ok) {
                    throw new Error("FAIL: " + res.status);
                } else {
                    return res.json();
                }
            })
            .then(user => {
                document.getElementById("tbody").innerHTML = `    
          <tr>
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.phone}</td>
              <td>${user.address.street},${user.address.suite},${user.address.city}</td>
              <td>${user.phone}</td>
              <td>${user.website}</td>
          </tr>`
            })
            .catch(error => console.log(`ERROR  ${error}`));
    }

    function fetchAllUsers() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                if (!res.ok) {
                    throw new Error("FAIL: " + res.status);
                } else {
                    return res.json();
                }
            })
            .then(data => {
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
            })
            .catch(error => console.log(`ERROR  ${error}`));
    }

}