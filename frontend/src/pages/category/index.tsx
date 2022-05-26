import {useState} from 'react';
import styles from './style.module.scss';
import Head from 'next/head';
import {Header} from '../../components/Header';


export default function Category(){


    return(
        <>
            <Head>
                <title>Nova Categoria - FePet</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <h1>Cadastrar categoria</h1>

                    <form className={styles.form}>
                        <input
                        type="text"
                        placeholder="Escolha sua categoria"
                        className={styles.input}
                        
                        />
                        <button className={styles.buttonAdd} type='submit'>
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    )
}