const express = require('express')
const cors = require('cors')
const app = express();
const db = require('./config/db')
app.use(express.json());
app.use(cors());
const port = 3000;
const useRoutes = require('./routers/routers');
app.use('/uploads', express.static('uploads'))
app.use('/getTask', useRoutes)
app.use('/updateTask', useRoutes)
app.use('/addTasks', useRoutes)
app.use('/deleteTasks', useRoutes)

app.listen(port, () => {
    console.log(`server ${port} - porda ishga tushdi`)
})