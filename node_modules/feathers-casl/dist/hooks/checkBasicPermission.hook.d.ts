import type { HookContext } from "@feathersjs/feathers";
import type { CheckBasicPermissionHookOptions } from "../types";
export declare const HOOKNAME = "checkBasicPermission";
declare const _default: (_options?: Partial<CheckBasicPermissionHookOptions>) => (context: HookContext) => Promise<HookContext>;
export default _default;
