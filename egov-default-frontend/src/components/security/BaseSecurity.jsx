import React, { useContext } from 'react';
import KeycloakContext from 'keycloakContext';

const BaseSecurity = () => {
    const keycloak = useContext(KeycloakContext);

    const logout = () => {
        keycloak.logout();
    };

    const getUserName = () => {
        if (keycloak) {
            return keycloak.idTokenParsed.preferred_username;
        } else {
            return 'Guest';
        }
    };

    const getToken = () => {
        if (keycloak) {
            return keycloak.idToken;
        }
    };

    const getRoles = () => {
        if (keycloak) {
            return keycloak.tokenParsed.realm_access.roles.join(",");
        }
    };

    return (
    <div>
        <button onClick={logout}>Logout</button>
    </div>
    );
};

export default BaseSecurity;
