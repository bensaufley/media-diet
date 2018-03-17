declare module "*.graphql" {
  import { ITypedef } from "graphql-tools/dist/Interfaces";
  const value: ITypedef;
  export = value;
}
