import type { HookContext } from "@feathersjs/feathers";
import type { AuthorizeHookOptions } from "../../types";
export declare const HOOKNAME = "authorize";
declare const _default: (_options?: Partial<AuthorizeHookOptions>) => (context: HookContext) => Promise<HookContext>;
export default _default;
