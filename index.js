import { ApolloServer, gql } from "apollo-server";

const people = [
    {
        name: "John",
        phone: "604-2565478",
        street: "Frontend Street",
        city: "Mountain View",
        id: "3st3f4n14-123-987",
    },
    {
        name: "Felipe",
        phone: "604-5478256",
        street: "Fullstack Avenue",
        city: "Mountain View",
        id: "23-987-3st3f4n14-1",
    },
    {
        name: "Lola",
        street: "Testing Village Street",
        city: "Mountain View",
        id: "3f4n14-123st3-987",
    },
];

const typeDefinitions = gql`
    type Address {
        street: String!
        city: String!
    }

    type Person {
        name: String!
        phone: String
        address: Address!
        id: ID!
    }

    type Query {
        personCount: Int!
        allPeople: [Person]!
        findPerson(name: String!) : Person
    }
`;

const resolvers = {
    Query: {
        personCount: () => people.length,
        allPeople: () => people,
        findPerson: (root, args) => {
            const {name} = args;
            return people.find(person => person.name === name);

        }
    },
    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers,
});

server.listen().then(({url}) => {
    console.log(`listening on ${url}`);
});