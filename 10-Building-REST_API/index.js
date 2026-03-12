const express = require('express');
let users = require('./MOCK_DATA.json');
const fs = require('fs');

const app = express();
const port = 8000;

// Middleware - Plugin
app.use(express.urlencoded({extended: false}));


// Routes
app.get('/api/users', (req, res) => {
    return res.json(users);
})

app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

// app.get( '/api/users/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id);
//     return res.json(user);
// })

// appsho.post('/api/users', (req, res) => {
//     res.json({status: "pending"});
// });

// appsho.patch('/api/users/:id', (req, res) => { 
//     res.json({status: "pending"});
// });

// appsho.delete('/api/users/:id', (req, res) => {
//     res.json({status: "pending"});
// });

app
    .route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .patch((req, res) => {
        const id = Number(req.params.id);
        const body = req.body;
        
        const userIndex = users.findIndex((user) => user.id === id);
        
        if (userIndex === -1) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        const updatedUser = { ...users[userIndex], ...body };
        users[userIndex] = updatedUser;

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
            return res.json({ status: "success", id: id });
        });
    })
    .delete((req, res) => {
        const id = Number(req.params.id);

        const remUsers = users.filter((user) => user.id !== id);
        if(remUsers.length === users.length) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        users = remUsers;

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(remUsers), (err) => {
            return res.json({status: "success", id: id});
        })
    });


app.post("/api/users", (req, res) => {
    const body = req.body; 
    users.push({...body, id: users.length+1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({status: "success", id: users.length});
    })
});

app.listen(port, () => console.log(`Server started at ${port}`));