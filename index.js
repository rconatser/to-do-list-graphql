import { ApolloServer } from 'apollo-server';
import { createContext } from './src/context.js';
import { schema } from './src/schema.js';

const PORT = process.env.PORT || 4000;

new ApolloServer({
    schema,
    context: createContext()
}).listen({
    port: PORT
}, () => {
    console.log(`GraphQL running on http://localhost:${PORT}`);
});