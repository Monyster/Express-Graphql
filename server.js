const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/schema.js');

let port = 5454;
const app = express();


app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(port);
console.log('GraphQL API server running at localhost:' + port);