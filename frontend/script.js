const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.get('/', (req, res) => {
  // Send an HTML response with inline CSS styles
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Monolithic Architecture Application</title>
        <style>
            body {
                background-color: lightblue;
                font-family: Arial, sans-serif;
                text-align: center;
                margin: 0;
                padding: 20px;
            }
            h1 {
                font-size: 32px;
            }
            p {
                font-size: 28px; 
                color: red;
            }
            form {
                margin-top: 20px;
            }
            input {
                padding: 10px;
                margin: 5px;
                width: 200px;
            }
            button {
                padding: 10px;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <h1>Monolithic Architecture Application</h1>
        <p>Welcome! This is my assignment which I completed.</p>
        
        <h2>Register User</h2>
        <form id="registrationForm">
            <input type="text" id="name" placeholder="Name" required />
            <input type="email" id="email" placeholder="Email" required />
            <button type="submit">Register</button>
        </form>

        <script>
            document.getElementById('registrationForm').addEventListener('submit', function(event) {
                event.preventDefault(); // Prevent the default form submission
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;

                fetch('http://localhost:8080/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email }) // Send data as JSON
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('User registered:', data);
                    alert('Registration successful!'); // Notify user on success
                })
                .catch(error => {
                    console.error('Error during registration:', error);
                    alert('Registration failed!');
                });
            });
        </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Frontend is running on http://localhost:${PORT}`);
});
