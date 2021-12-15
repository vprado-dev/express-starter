import openapiCommentParser, { ParserOptions } from "openapi-comment-parser";
import appRoot from "app-root-path";

const options: ParserOptions = {
  cwd: appRoot.path,
  extension: [".js", ".cjs", ".mjs", ".ts", ".tsx", ".jsx", ".yaml", ".yml"],
  include: ["**"],
  exclude: [
    "docker-compose.yml",
    "coverage/**",
    "packages/*/test{,s}/**",
    "**/*.d.ts",
    "test{,s}/**",
    "test{,-*}.{js,cjs,mjs,ts,tsx,jsx,yaml,yml}",
    "**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx,yaml,yml}",
    "**/__tests__/**",
    "**/{ava,babel,nyc}.config.{js,cjs,mjs}",
    "**/jest.config.{js,cjs,mjs,ts}",
    "**/{karma,rollup,webpack}.config.js",
    "**/.{eslint,mocha}rc.{js,cjs}",
    "**/.{travis,yarnrc}.yml",
    "**/{docker-compose}.yml",
  ],
  excludeNodeModules: true,
  verbose: false,
  throwLevel: "off",
};

interface CreateConfigProps {
  apiName?: string;
  apiVersion?: string;
}

export const createConfig = ({ apiName, apiVersion }: CreateConfigProps) => {
  const spec = openapiCommentParser(options);

  const baseInfo = {
    openapi: "3.0.0",
    info: {
      title: apiName || process.env.npm_package_name,
      version: apiVersion || process.env.npm_package_version,
    },
    servers: [{ name: "localhost", url: `/` }],
  };

  return {
    ...spec,
    ...baseInfo,
  };
};
