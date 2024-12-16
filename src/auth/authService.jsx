// src/auth/authService.js
import { PublicClientApplication, InteractionRequiredAuthError } from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: "4ef02c64-0b3d-42b0-bf72-c2a509e000e8", // Replace with your Azure AD app client ID
        authority: "https://login.microsoftonline.com/dbd7887d-30fb-4706-8f4b-3cee2404e731", // Replace with your tenant ID
        redirectUri: window.location.origin,
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

const loginRequest = {
    scopes: ["User.Read"] // Add more scopes as needed
};

export class AuthService {
    constructor() {
        this.msalInstance = new PublicClientApplication(msalConfig);
    }

    async login() {
        try {
            const response = await this.msalInstance.loginPopup(loginRequest);
            return response.account;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    }

    async logout() {
        try {
            await this.msalInstance.logoutPopup();
        } catch (error) {
            console.error("Logout failed:", error);
            throw error;
        }
    }

    async getToken() {
        try {
            const account = this.msalInstance.getAllAccounts()[0];
            if (!account) {
                throw new Error("No active account!");
            }

            const response = await this.msalInstance.acquireTokenSilent({
                ...loginRequest,
                account: account
            });
            return response.accessToken;
        } catch (error) {
            if (error instanceof InteractionRequiredAuthError) {
                return this.msalInstance.acquireTokenPopup(loginRequest);
            }
            throw error;
        }
    }

    isAuthenticated() {
        return this.msalInstance.getAllAccounts().length > 0;
    }
}

export const authService = new AuthService();