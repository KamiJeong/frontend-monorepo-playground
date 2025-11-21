const path = require('path');

const nodeExternals = require('webpack-node-externals');

module.exports = (options, webpack) => {
  return {
    ...options,
    entry: options.entry,
    externals: [
      nodeExternals({
        modulesDir: path.resolve(__dirname, '../../node_modules'),
        allowlist: [/^@playground\//], // 워크스페이스 패키지는 번들에 포함
      }),
    ],
    resolve: {
      ...options.resolve,
      extensions: ['.ts', '.js', '.json'],
      alias: {
        '@playground/db': path.resolve(__dirname, '../../packages/db'),
        '@playground/models': path.resolve(__dirname, '../../packages/models'),
        '@playground/env': path.resolve(__dirname, '../../packages/env'),
      },
      modules: [
        path.resolve(__dirname, '../../node_modules'),
        path.resolve(__dirname, 'node_modules'),
        'node_modules',
      ],
      mainFields: ['main', 'module'],
      mainFiles: ['index'],
    },
    module: {
      ...options.module,
      rules: [
        ...options.module.rules,
        {
          test: /\.ts$/,
          include: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, '../../packages/db'),
            path.resolve(__dirname, '../../packages/models'),
            path.resolve(__dirname, '../../packages/env'),
          ],
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        },
      ],
    },
  };
};
