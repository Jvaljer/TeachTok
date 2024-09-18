import { Application } from '@feathersjs/feathers';
import { OauthSetupSettings } from './utils';
declare module 'express-session' {
    interface SessionData {
        redirect: string;
        accessToken: string;
        query: {
            [key: string]: any;
        };
        grant: {
            [key: string]: any;
        };
    }
}
declare const _default: (options: OauthSetupSettings) => (feathersApp: Application) => void;
export default _default;
