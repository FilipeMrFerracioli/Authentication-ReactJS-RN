import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { login } from '../services/authAxios'

const authContextData = {
    signed: Boolean,
    user: String | null,
    loading: Boolean,
    signIn: (async () => {}),
    signOut: (async () => {})
}

const AuthContexts = createContext(authContextData);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(String | null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            try {
                const storagedUser = await AsyncStorage.getItem("@Auth:user");
                const storagedToken = await AsyncStorage.getItem("@Auth:token");

                if (storagedUser && storagedToken) {
                    setUser(storagedUser);
                }
                setLoading(false);

            } catch (error) {
                console.log(error)
            }
        }
        loadStorageData();
    }, []);

    async function signIn() {
        try {
            setLoading(true);

            const { message, token } = await login();
            setUser(message);
            await AsyncStorage.multiSet([["@Auth:user", message], ["@Auth:token", token]]);

            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    async function signOut() {
        try {
            await AsyncStorage.clear();
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