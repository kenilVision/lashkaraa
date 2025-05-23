require('dotenv').config();
require('./config/dbConfig');

const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./api');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const port = process.env.PORT || 5050;
const path = require('path')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded());
app.use('/api', router);    


app.use('/categories', express.static(path.join(__dirname, 'public/categories')))
app.use('/product', express.static(path.join(__dirname)))

app.listen(port, () => {
    console.log('Server start', port);
});
