import type { HookContext } from "@feathersjs/feathers";
import type { CheckBasicPermissionUtilsOptions } from "../types";
export declare const HOOKNAME = "checkBasicPermission";
declare const _default: (context: HookContext, _options?: Partial<CheckBasicPermissionUtilsOptions>) => Promise<HookContext>;
export default _default;
