export interface AuthConfig {
    issuer: string;
    clientId: string;
}

export class OktaAuthConfig {
    constructor(public config: AuthConfig) { }
}