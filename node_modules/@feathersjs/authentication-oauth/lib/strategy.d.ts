import { AuthenticationRequest, AuthenticationBaseStrategy, AuthenticationResult } from '@feathersjs/authentication';
import { Params } from '@feathersjs/feathers';
export interface OAuthProfile {
    id?: string | number;
    [key: string]: any;
}
export declare class OAuthStrategy extends AuthenticationBaseStrategy {
    get configuration(): any;
    get entityId(): string;
    getEntityQuery(profile: OAuthProfile, _params: Params): Promise<{
        [x: string]: any;
    }>;
    getEntityData(profile: OAuthProfile, _existingEntity: any, _params: Params): Promise<{
        [x: string]: any;
    }>;
    getProfile(data: AuthenticationRequest, _params: Params): Promise<any>;
    getCurrentEntity(params: Params): Promise<any>;
    getRedirect(data: AuthenticationResult | Error, params?: Params): Promise<string | null>;
    findEntity(profile: OAuthProfile, params: Params): Promise<any>;
    createEntity(profile: OAuthProfile, params: Params): Promise<any>;
    updateEntity(entity: any, profile: OAuthProfile, params: Params): Promise<any[]>;
    getEntity(result: any, params: Params): Promise<any>;
    authenticate(authentication: AuthenticationRequest, originalParams: Params): Promise<{
        [x: string]: any;
        authentication: {
            strategy: string;
        };
    }>;
}
