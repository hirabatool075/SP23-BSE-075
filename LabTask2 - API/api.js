const apiUrl = "https://jsonplaceholder.typicode.com/users";

// Function to display all users
function fetchAllUsers() {
    $.ajax({
        url: apiUrl,
        method: "GET",
        dataType: "json",
        success: function (users) {
            let userData = $("#userData");
            userData.empty();
            userData.append(`<h4>All Users</h4>`);
            $.each(users, function (index, user) {
                userData.append(generateUserCard(user));
            });
        },
        error: function () {
            showError("Error fetching all users");
        }
    });
}

// Function to fetch a specific user by ID
function fetchUserById(userID) {
    $.ajax({
        url: `${apiUrl}/${userID}`,
        method: "GET",
        dataType: "json",
        success: function (user) {
            let userData = $("#userData");
            userData.empty();
            userData.append(`<h4>Specific User (ID: ${userID})</h4>`);
            userData.append(generateUserCard(user));
        },
        error: function () {
            showError(`Error fetching user with ID ${userID}`);
        }
    });
}

// Function to add a new user (POST)
function addUser() {
    $.ajax({
        url: apiUrl,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            name: 'John Doe',
            username: 'johndoe',
            email: 'john.doe@example.com'
        }),
        success: function (user) {
            let userData = $("#userData");
            userData.empty();
            userData.append(`<h4>New User Added</h4>`);
            userData.append(generateUserCard(user));
        },
        error: function () {
            showError("Error adding user");
        }
    });
}

// Function to update an existing user (PUT)
function updateUser() {
    $.ajax({
        url: `${apiUrl}/1`,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
            name: 'Jane Doe',
            username: 'janedoe',
            email: 'jane.doe@example.com'
        }),
        success: function (user) {
            let userData = $("#userData");
            userData.empty();
            userData.append(`<h4>User Updated (ID: 1)</h4>`);
            userData.append(generateUserCard(user));
        },
        error: function () {
            showError("Error updating user");
        }
    });
}

// Function to partially update a user (PATCH)
function patchUser() {
    $.ajax({
        url: `${apiUrl}/1`,
        method: "PATCH",
        contentType: "application/json",
        data: JSON.stringify({
            email: 'new.email@example.com'
        }),
        success: function (user) {
            let userData = $("#userData");
            userData.empty();
            userData.append(`<h4>User Patched (ID: 1)</h4>`);
            userData.append(generateUserCard(user));
        },
        error: function () {
            showError("Error patching user");
        }
    });
}

// Function to delete a user
function deleteUser() {
    $.ajax({
        url: `${apiUrl}/1`,
        method: "DELETE",
        success: function () {
            let userData = $("#userData");
            userData.empty();
            userData.append(`<div class="alert alert-danger">User with ID 1 has been deleted successfully.</div>`);
        },
        error: function () {
            showError("Error deleting user");
        }
    });
}

// Helper function to generate user card
function generateUserCard(user) {
    return `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${user.name}</h5>
                <p class="card-text"><strong>Username:</strong> ${user.username}</p>
                <p class="card-text"><strong>Email:</strong> ${user.email}</p>
                <p class="card-text"><strong>ID:</strong> ${user.id}</p>
            </div>
        </div>
    `;
}

// Helper function to show error messages
function showError(message) {
    $("#userData").empty().append(`<div class="alert alert-danger">${message}</div>`);
}

// Event listeners for buttons
$(function () {
    $('#showAllUsers').on('click', fetchAllUsers);
    $('#showSpecificUser').on('click', function () {
        fetchUserById(5); // Fetch user with ID 5 as an example
    });
    $('#addUser').on('click', addUser);
    $('#updateUser').on('click', updateUser);
    $('#patchUser').on('click', patchUser);
    $('#deleteUser').on('click', deleteUser);
});
