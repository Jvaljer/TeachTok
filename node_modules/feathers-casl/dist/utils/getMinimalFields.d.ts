import type { AnyAbility } from "@casl/ability";
import type { GetMinimalFieldsOptions } from "../types";
declare const getMinimalFields: (ability: AnyAbility, action: string, subject: Record<string, unknown>, options: GetMinimalFieldsOptions) => string[];
export default getMinimalFields;
