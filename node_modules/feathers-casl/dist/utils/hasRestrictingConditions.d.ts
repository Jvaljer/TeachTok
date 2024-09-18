import type { AnyAbility, Abilities } from "@casl/ability";
import type { Rule } from "@casl/ability/dist/types/Rule";
declare const hasRestrictingConditions: (ability: AnyAbility, action: string, modelName: string) => Rule<Abilities, unknown>[] | false;
export default hasRestrictingConditions;
