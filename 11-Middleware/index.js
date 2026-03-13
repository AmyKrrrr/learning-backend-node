const express = require('express');
let users = require('./MOCK_DATA.json');
const fs = require('fs');

const app = express();
const port = 8000;

// Middleware - Plugin
app.use(express.urlencoded({extended: false}));
// Ye middleware kya karta hai?
// Information ko leta hai aur object me convert karta hai. Iske paas request ka access hai to req.body ke andar vo information daal ke de deta hai.
// Jab bhi kuchh post req karte hain, form data ko parse karke aage forward kar deta hai.


// Khud ke middleware
app.use((req, res, next) => {
    console.log('Hello from middleware 1');
    req.myUserName = "amykrrrr"; 
    // created a new variable in req object accesible by all upcoming middlewares and routes.
    // return res.json({msg: "Hello From Middleware-1"});
    next();
})
// next = next middleware in the chain ka reference
// Abhi route ko point karra hai next
// Sabse pehle 9th line chalega, fir 13th line chalega, fir routes.

app.use((req, res, next) => {
    console.log('Hello from middleware 2', req.myUserName);
    // return res.json({msg: "Hello From Middleware-1"});
    next();
})

// Routes
app.get('/api/users', (req, res) => {
    console.log('I am in GET route', req.myUserName);
    
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