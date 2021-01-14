const express = require('express');
const dotenv = require('dotenv');

// import router
const userRouter = require('./routes/user_route')

// init express
const app = express();

dotenv.config();

app.use(express.json());

app.use('/api/v1/', userRouter);

app.all('*', (req, res, next) => {
	res.sendStatus(500);
});

const port = Number(process.env.PORT || 8000);
app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})