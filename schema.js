
exports.schema = {
    query : `query {
        result (
            
            limit: 5,
            order_by: [
                {first_name: desc},
                {last_name: desc},
                {employee_id: desc},
                {email: desc},
                {org_name: desc},
            ]
        ) {
            first_name
            last_name
        }
      }`
}

// const { buildSchema } = require("graphql");

// // Construct a schema, using GraphQL schema language
// const schema = buildSchema(`
//     type Event {
//         id: ID!
//         first_name: String!
//         last_name: String
//         employee_id: String
//         email: String
//         org_name: String
//     }

   
//     type Query {
//         events: [Event!]!
//         event(id: Int!): Event!
//     }

//     type Mutation {
//       editEvent(id: Int!, first_name: String!, last_name: String!, employee_id: String!, email: String!, org_name: String!): Event!
//     }
// `);

// module.exports = schema;

// // where: {first_name: {_eq: "${firstName}"}, last_name: {_eq: "${lastName}"}, employee_id: {_eq: "${uniqueId}"}},