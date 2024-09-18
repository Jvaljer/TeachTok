import type { HookContext } from "@feathersjs/feathers";
export declare const getContextPath: (context: Pick<HookContext, "path">) => string;
export declare const getModelName: (context: Pick<HookContext, "service">) => string;
