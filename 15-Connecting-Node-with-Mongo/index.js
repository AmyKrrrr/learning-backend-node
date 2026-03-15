const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 8000;

// Middleware - Plugin
app.use(express.urlencoded({extended: false}));

// Connection
mongoose
    .connect('mongodb://127.0.0.1:27017/amykrrrr-app-1')
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log('Mongo Error'));

// Schema
const userSchema = new mongoose.Schema({
    fisrtName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,// const { type } = require('os');
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
},
{timestamps: true}
)

const User = mongoose.model("user", userSchema);

// Routes
app.get('/users', async(req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.fisrtName} - ${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

app.get('/api/users', async (req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
})


app
    .route('/api/users/:id')
    .get(async(req, res) => {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({error: "user not found"});
        return res.json(user);
    })
    .patch(async(req, res) => {
        await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"});
        return res.json({status: "Success"});
    })
    .delete(async(req, res) => {
        await User.findByIdAndDelete(req.params.id);
        return res.json({status: "Success"});
    });


app.post("/api/users", async (req, res) => {
    const body = req.body; 
    if(!body ||!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg: "All fields are required..."});
    }   

    const result = await User.create({
        fisrtName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });
    
    // console.log('result', result);

    return res.status(201).json({msg: "success"});
    
});

app.listen(port, () => console.log(`Server started at ${port}`));