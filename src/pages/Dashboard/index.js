import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { useAuth } from '../../contexts/authContext';

export default function SignIn() {
    const { signed, signOut } = useAuth();
    //console.log("Testando: ", signed)
    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Button title="Sign Out" onPress={handleSignOut} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});