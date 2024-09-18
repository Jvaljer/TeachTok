import type { AnyAbility, Subject } from "@casl/ability";
import type { HasRestrictingFieldsOptions } from "../types";
declare const hasRestrictingFields: (ability: AnyAbility, action: string, subject: Subject, options?: HasRestrictingFieldsOptions) => boolean | string[];
export default hasRestrictingFields;
