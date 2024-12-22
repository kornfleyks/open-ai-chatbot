// src/auth/authService.jsx
import { PublicClientApplication, InteractionRequiredAuthError } from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: "4ef02c64-0b3d-42b0-bf72-c2a509e000e8",
        authority: "https://login.microsoftonline.com/dbd7887d-30fb-4706-8f4b-3cee2404e731",
        redirectUri: window.location.origin,
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

const loginRequest = {
    scopes: ["User.Read"]
};

export class AuthService {
    constructor() {
        this.msalInstance = new PublicClientApplication(msalConfig);
        this.apiBaseUrl = 'http://localhost:3001/api'; // Update with your API URL
    }

    async login() {
        try {
            const response = await this.msalInstance.loginPopup(loginRequest);
            //console.log(response);
            
            if (response.account) {
                // Check if user exists in database
                try {
                    const user = await this.checkAndCreateUser(response.account);
                    return { ...response.account, ...user };
                } catch (error) {
                    console.error("Database operation failed:", error);
                    // Still return the account even if database operation fails
                    return response.account;
                }
            }
            
            return response.account;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    }

    async checkAndCreateUser(msalAccount) {
        try {
            // Try to find user by userId
            const response = await fetch(`${this.apiBaseUrl}/users?userId=${msalAccount.localAccountId}`);
            const users = await response.json();
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            if (users.length === 0) {
                // User doesn't exist, create new user
                const newUser = {
                    userId: msalAccount.localAccountId,
                    full: msalAccount.name,
                    username: msalAccount.username || msalAccount.localAccountId,
                    settings: {
                        theme: 'light',
                        notifications: true
                    }
                };

                const createResponse = await fetch(`${this.apiBaseUrl}/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser)
                });

                if (!createResponse.ok) {
                    throw new Error('Failed to create user');
                }

                return await createResponse.json();
            } else {
                // User exists, return existing user
                return users[0];
            }
        } catch (error) {
            console.error('Error checking/creating user:', error);
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
                // fallback to interaction when silent call fails
                return this.msalInstance.acquireTokenPopup(loginRequest);
            }
            throw error;
        }
    }
}

export const authService = new AuthService();