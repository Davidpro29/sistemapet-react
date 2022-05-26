import { createContext, ReactNode, useState, useEffect } from "react";
import {api} from '../services/apiClient';
import {destroyCookie, setCookie, parseCookies} from 'nookies';
import Router from 'next/router';

import {toast} from 'react-toastify';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: signInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: signUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type signInProps = {
    email: string;
    password: string;
}

type signUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    }catch{
        console.log('Erro ao deslogar')
    }
}

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    useEffect(() => {
        // tentar pgar aigo no cookie
        const {'@nextauth': token} = parseCookies();

        if(token){
            api.get('/me').then(response => {
                const {id, name, email} = response.data;
                setUser({
                    id, name, email
                })
            })
            .catch(() =>{
                // caso der erro ele desloga o usuário
                signOut();
            })
        }
    }, [])

    async function signIn({email, password}: signInProps){
        try{
            const response = await api.post('/session', {
                email,
                password
            })

            // console.log(response.data)

            const {id, name, token} = response.data;
            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path:"/"
            })

            setUser({
                id, name, email
            })

            // Passar para próximas requisições o seu token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('Prontinho! Seja bem vindo(a)!')
            // redirecionar para o dashboard
            Router.push('/dashboard')

        }catch(err){
            toast.error('Opa! deu erro ao acessar')
            console.log('Erro ao acessar', err)
        }
    }

    async function signUp({name, email, password}: signUpProps){
        try{
            const response = await api.post('/users', {
                name, email, password
            })

            toast.success('Sua conta foi criada!')
            Router.push('/')

        }catch(err){
            toast.error('Erro ao cadastrar')
            console.log('Erro ao cadastrar')
        }
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}