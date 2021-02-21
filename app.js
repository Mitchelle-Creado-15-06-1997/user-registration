const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser');
const UserController = require('./controller/user.controller');
const Schema = require('./schema')
const app = express();

const port = 3000;

const { 
	errorHandlingMiddleware, 
    responseMiddleware
} = require('./middleware');

app.use(errorHandlingMiddleware);
app.use(responseMiddleware);
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Methods', '*');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.post('/registration', UserController.registration);
app.post('/login', UserController.login);
app.get('/modifySearch', UserController.modifySearch);

app.use(
    graphqlHTTP({
        schema: Schema.schema,
        graphiql: true
    })
);
app.listen(port, () => console.log(`Node Graphql API listening on port ${port}!`));