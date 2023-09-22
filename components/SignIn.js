"use client"
import React, { useContext, useState } from "react";

import { authContext } from "@/lib/store/auth-context";
import { FcGoogle } from "react-icons/fc";
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from "@/lib/firebase";
import { toast } from "react-toastify";

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

    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    if (loading || loadingRegister) {
        return (
            <div className="spinner-container flex justify-center items-center h-screen">
                <div className="loading-spinner">
                </div>
            </div>
        )
    }
    if (user || userRegister) {
        return (
            <div>
                <p>Registered User: {user.user.email}</p>
            </div>
        );
    }

    return (

        <main className="container max-w-2xl px6 mx-auto">

            <div className="flex flex-col overflow-hidden shadow-md shadow-slate-500 bg-slate-800 rounded-3xl 10">
                <div className="">
                    <h1 className="mb-6 text-5xl font-bold text-center pt-5">Seja Bem Vindo</h1>
                    <img className="object-cover w-full h-full" src="https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                </div>

                <h3 className="text-2xl text-center mt-3">Entre para Continuar</h3>

                {showLogin && (
                    <div className="Login flex flex-col gap-4 justify-between px-4 py-4">
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
                        <button className='btn btn-primary w-28' onClick={() => toast.error(error?.code) && signInWithEmailAndPassword(email, password)}>
                            Entrar
                        </button>
                        <button onClick={() => { setShowRegister(true), setShowLogin(false) }} className="text-lime-400 flex justify-end">Não Possui uma Conta? Crie Agora</button>
                    </div>
                )}

                {showRegister && (
                    <div className="Register flex flex-col gap-4 justify-between px-4 py-4">
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
                        <button className='btn btn-primary w-28' onClick={() => toast.error(errorRegister?.code) && createUserWithEmailAndPassword(emailRegister, passwordRegister)}>
                            Registrar
                        </button>

                        <button onClick={() => { setShowLogin(true), setShowRegister(false) }} className="text-lime-400 flex justify-end">Possui uma Conta? Entre com ela</button>

                    </div>
                )}

                <div className="Google-Login px-4 pb-4">

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
