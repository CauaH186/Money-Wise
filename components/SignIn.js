import React, { useContext, useState } from "react";

import { authContext } from "@/lib/store/auth-context";
import { FcGoogle } from "react-icons/fc";
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from "@/lib/firebase";

function SignIn() {


    const { googleLoginHandler } = useContext(authContext)

    const [emailRegister, setEmailRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [
        createUserWithEmailAndPassword,
        userRegister,
        loadingRegister,
        errorRegister,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);



    return (
        <main className="container max-w-2xl px6 mx-auto">

            <div className="flex flex-col overflow-hidden shadow-md shadow-slate-500 bg-slate-800 rounded-3xl">
                <div className="">
                    <h1 className="mb-6 text-6xl font-bold text-center pt-5">Seja Bem Vindo</h1>
                    <img className="object-cover w-full h-full" src="https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                </div>

                <h3 className="text-2xl text-center mt-3">Entre para Continuar</h3>




                <form>

                    <div className="Login flex justify-between px-4 py-4">
                        <input
                            placeholder="Digite seu Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            placeholder="Digite sua Senha"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className='btn btn-primary w-28' onClick={() => signInWithEmailAndPassword(email, password)}>
                            Entrar
                        </button>
                    </div>
                </form>


                <form>

                    <div className="Register flex justify-between px-4 py-4">
                        <input

                            placeholder="Digite seu Email"
                            type="email"
                            value={emailRegister}
                            onChange={(e) => setEmailRegister(e.target.value)}
                            required
                        />
                        <input
                            placeholder="Digite sua Senha"
                            type="password"
                            value={passwordRegister}
                            onChange={(e) => setPasswordRegister(e.target.value)}
                            required
                        />
                        <button className='btn btn-primary w-28' onClick={() => createUserWithEmailAndPassword(emailRegister, passwordRegister)}>
                            Registrar
                        </button>
                    </div>
                </form>


                <div className="Google-Login px-4 py-4">

                    <button onClick={googleLoginHandler}
                        className="flex items-center gap-2 p-3 mx-auto mt-5 font-medium text-white align-middle bg-gray-700 rounded-lg">
                        <FcGoogle className="text-3xl" /> Entrar com o Google
                    </button>
                </div>
            </div>

        </main>
    )
}

export default SignIn

/*
import react, { useContext, useState } from "react";
import { auth } from "@/lib/firebase";
import { authContext } from "@/lib/store/auth-context";
import { useAuthState, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'


import { FcGoogle } from "react-icons/fc";

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    if (error) {
        if (error.code == 'auth/invalid-email') {
            return (
                    <p>O email não é válido</p>
            );
        } if (error.code == 'auth/weak-password')
        return (
            <div>
                <p>A senha deve ter no minim</p>
            </div>
        );
    }
    if (loading) {
        return <p>Loading...</p>;
    }
    if (user) {
        return (
            <div>
                <p>Registered User: {user.user.email}</p>
            </div>
        );
    }
    return (
        <div className="App">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => createUserWithEmailAndPassword(email, password)}>
                Register
            </button>
        </div>
    );
};

export default SignIn;


*/