import {useContext} from 'react';
 
import styles from './styles.module.scss';
import Link from 'next/link';
import {FiLogOut} from 'react-icons/fi';
import Image from 'next/image';

import {AuthContext} from '../../contexts/AuthContext'
 

export function Header(){

    const {signOut} = useContext(AuthContext)
    
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <Image
                        src="/logo.png"
                        alt="Landscape picture"
                        width={100}
                        height={100}
                    />                
                </Link>
                <nav className={styles.menuNav}>
                    <Link href="/category">
                        <a>Categorias</a>
                    </Link>

                    <Link href="/product">
                        <a>Serviços</a>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color="#fff" size={24} />
                    </button>
                    
                </nav>
            </div>            
        </header>
    )
}