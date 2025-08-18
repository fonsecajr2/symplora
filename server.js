const express = require('express');
const bodyParser = require('body-parser');

const employeeRoutes = require('./routes/employeeRoutes');
const leaveRoutes = require('./routes/leaveRoutes');

const app = express();
app.use(bodyParser.json());

app.use("/employees", employeeRoutes);
app.use("/leave", leaveRoutes);

app.listen(3000, () => { 
    console.log("app running on port 4000")
})