import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: [
    './pagination/*.graphql',
    './user/*.graphql',
    './workspace/*.graphql',
    './workspace-member/*.graphql',
    './task/*.graphql',
    './task-comment/*.graphql',
  ],
  generates: {
    './graphql/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
        contextType: './context#GraphQLContext',
        scalars: {
          DateTime: 'string',
        },
      },
    },
    './graphql/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
};

export default config;
