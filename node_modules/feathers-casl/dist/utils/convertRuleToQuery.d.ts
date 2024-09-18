import type { SubjectRawRule, MongoQuery, ClaimRawRule } from "@casl/ability";
import type { Query } from "@feathersjs/feathers";
import type { GetConditionalQueryOptions } from "../types";
import type { AnyObject } from "@casl/ability/dist/types/types";
declare const convertRuleToQuery: (rule: SubjectRawRule<any, any, MongoQuery<AnyObject>> | ClaimRawRule<any>, options?: GetConditionalQueryOptions) => Query;
export default convertRuleToQuery;
