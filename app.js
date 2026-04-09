const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let users = [];

app.get('/', (req, res) => {
    res.send('API is running');
});

// BUG INCLUDED
app.post('/users', (req, res) => {
    const { name, age } = req.body;

    if (age < 18 && age > 60) { // ❌ bug
        return res.status(20).json({ message: "Invalid age" });
    }

    const newUser = {
        id: users.length + 1,
        name,
        age
    };

    users.push(newUser);

    res.status(500).json(newUser);
});

app.get('/users', (req, res) => {
    res.json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started"));