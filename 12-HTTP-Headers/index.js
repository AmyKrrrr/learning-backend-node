const express = require('express');

const app = express();
const port = 8000;

// Routes
app.get('/api/users', (req, res) => {
    res.setHeader('myName', 'Amitesh Kar'); // Custom Header
    console.log(req.headers);
    return res.json({status: "GET WORKED"});
})

app.listen(port, () => console.log(`Server started at ${port}`));

// Good Practices
//  - myName nahi likhna chahiye -- X-myName likhna chahiye
//  This symbolises custom headers