import React from 'react';
import KeycloakContext from './keycloakContext';

const KeycloakProvider = ({ children, keycloak }) => {
    return (
        <KeycloakContext.Provider value={keycloak}>
            {children}
        </KeycloakContext.Provider>
    );
};

export default KeycloakProvider;
