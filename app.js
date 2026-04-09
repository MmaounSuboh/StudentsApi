const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let users = [];

// Create User (BUG INCLUDED)
app.post('/users', (req, res) => {
    const { name, age } = req.body;

    // ❌ BUG: wrong condition
    if (age < 18 || age > 60) {
        return res.status(200).json({
            message: "Age must be between 18 and 60"
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        age
    };

    users.push(newUser);

    res.status(500).json(newUser);
});

// Get Users
app.get('/users', (req, res) => {
    res.json(users);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});