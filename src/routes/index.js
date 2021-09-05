import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useAuth } from '../contexts/authContext';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes = () => {

    const { signed, loading } = useAuth();

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#999" />
            </View>
        );
    }

    return (
        signed
            ?
            <AppRoutes />
            :
            <AuthRoutes />
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Routes;