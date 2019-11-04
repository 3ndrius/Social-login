import React from 'react';

export default React.createContext({
    isSignIn: false,
    login: () => {},
    logout: () => {}
})