import type { AnyAbility } from "@casl/ability";
import type { HookContext } from "@feathersjs/feathers";
import type { CheckBasicPermissionHookOptions, HookBaseOptions, ThrowUnlessCanOptions } from "../types";
export declare const makeDefaultBaseOptions: () => HookBaseOptions;
export declare const checkCreatePerItem: (context: HookContext, ability: AnyAbility, modelName: string, options: Partial<Pick<ThrowUnlessCanOptions, "actionOnForbidden" | "skipThrow">> & Partial<Pick<CheckBasicPermissionHookOptions, "checkCreateForData">>) => HookContext;
