import type { HookContext } from "@feathersjs/feathers";
declare const getModelName: (modelName: string | ((context: HookContext) => string), context: HookContext) => string;
export default getModelName;
