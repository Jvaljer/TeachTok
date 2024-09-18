import type { Query } from "@feathersjs/feathers";
declare const simplifyQuery: (query: Query, replaceAnd?: boolean, replaceOr?: boolean) => Query;
export default simplifyQuery;
