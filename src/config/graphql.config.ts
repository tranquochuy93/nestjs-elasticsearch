import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

export const graphqlConfig = GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    // debug: false,
    playground: true,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql')
});
