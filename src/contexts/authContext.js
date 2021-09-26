import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { authApiConfig, login } from '../services/authAxios'

const authContextData = {
    signed: Boolean,
    user: String | null,
    loading: Boolean,
    signIn: (async () => { }),
    signOut: (async () => { })
}

const AuthContexts = createContext(authContextData);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(String | null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            try {
                const storagedUser = await AsyncStorage.getItem("@Auth:user"); //RN
                const storagedToken = await AsyncStorage.getItem("@Auth:token"); //RN

                if (storagedUser && storagedToken) {
                    authApiConfig.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
                    setUser(storagedUser);
                }
                setLoading(false);

            } catch (error) {
                console.log(error)
            }
        }
        loadStorageData();
    }, []);

    async function signIn(paramEmail, paramPassword) {
        try {
            setLoading(true);

            const { message, token } = await login(paramEmail, paramPassword);

            authApiConfig.defaults.headers['Authorization'] = `Bearer ${token}`;

            setUser(message);
            await AsyncStorage.multiSet([["@Auth:user", message], ["@Auth:token", token]]); //RN

            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    async function signOut() {
        try {
            await AsyncStorage.clear(); //RN
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContexts.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
            {children}
        </AuthContexts.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContexts);

    return context;
}