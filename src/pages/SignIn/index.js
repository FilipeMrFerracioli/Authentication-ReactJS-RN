import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { useAuth } from '../../contexts/authContext';

export default function SignIn() {

    const { signed, signIn } = useAuth();
    //console.log("Testando: ", signed)
    const handleSignIn = async () => {
        try {
            // formulario
            await signIn('mrffilipe@outlook.com', '123456');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Button title="Sign In" onPress={handleSignIn} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});