const express = require('express');
const users = require('./MOCK_DATA.json');
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
        return res.json({status: "pending"});
    })
    .delete((req, res) => {
        const toDel = Number(req.params.id);

        fs.readFile('./MOCK_DATA.json', "utf-8", (err, data) => {
            const users = JSON.parse(data);

            const remainingUsers = users.filter(user => user.id !== toDel);

            fs.writeFile('./MOCK_DATA.json', JSON.stringify(remainingUsers, null, 2), (err) => {
                return res.json({
                    status: "Deleted Successfully",
                    id: toDel
                });
            });
        });
    });

app.post("/api/users", (req, res) => {
    const body = req.body; 
    users.push({...body, id: users.length+1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({status: "success", id: users.length});
    })
});

app.listen(port, () => console.log(`Server started at ${port}`));