import type { HookContext } from "@feathersjs/feathers";
import type { AuthorizeChannelCommonsOptions } from "../types";
declare const getAvailableFields: (context: HookContext, options?: Partial<Pick<AuthorizeChannelCommonsOptions, "availableFields">>) => undefined | string[];
export default getAvailableFields;
