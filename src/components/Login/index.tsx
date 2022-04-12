import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, StyleSheet, View } from 'react-native';
import * as yup from 'yup';
import { Button } from '../../components/Button';
import { ControlledInput } from '../../components/ControlledInput';
import { AuthContext } from '../../contexts/auth';


type FormData = {
    email: string
    password: string
}

const schema = yup.object({
    email: yup.string()
        .email("Email inválido!")
        .required("Campo obrigatorio!"),
    password: yup.string()
        .required("Informe sua senha!")
        .min(6, "A senha deve ter pelo menos 6 caracteres!")
        .max(20, "A senha deve ter no maximo 12 caracteres!")
})

export function Login() {
    const { verifyLogin, modalVisible } = useContext(AuthContext)
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    })


    function handleLogin(data: FormData) {
        verifyLogin(data.email, data.password)
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.form}>
                        <ControlledInput
                            name='email'
                            control={control}
                            icon="email"
                            placeholder="Insira seu e-mail."
                            keyboardType="email-address"
                            autoCapitalize='none'
                            error={errors.email}
                        />

                        <ControlledInput
                            name='password'
                            control={control}
                            icon="lock"
                            placeholder="Insira sua senha."
                            secureTextEntry
                            error={errors.password}
                        />
                    </View>

                    <Button
                        title='Entrar'
                        onPress={handleSubmit(handleLogin)}
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    modalView: {
        width: '90%',
        padding: 20,
        elevation: 5,
        borderRadius: 20,
        shadowRadius: 20,
        textAlign: 'center',
        shadowColor: '#000',
        alignItems: 'center',
        shadowOpacity: 0.25,
        backgroundColor: '#F2F3F5',
        justifyContent: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
        }
    },

    form: {
        width: '100%'
    }
});