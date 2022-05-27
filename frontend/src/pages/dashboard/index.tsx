import {canSSRAuth} from '../../utils/canSSRAuth'
import Head from 'next/head';
import {Header} from '../../components/Header';

import {FiRefreshCw} from 'react-icons/fi';
import styles from './styles.module.scss';

export default function Dashboard(){
    return(
        <>
            <Head>
                <title>Painel - FePet</title>
            </Head>

            <div>
                <Header/>
                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h1>Ultimos serviços</h1>
                        <button>
                            <FiRefreshCw color="#fff" size={25} />
                        </button>
                    </div>

                    <article className={styles.listOrders}>
                        <section className={styles.orderItem}>
                            <button>
                                <div className={styles.tag}></div>
                                <span>Pedido 24</span>
                            </button>
                        </section>
                    </article>
                    
                </main>

            </div>
        </>
        
    )
}

export const getServerSideProps = canSSRAuth(async(ctx) => {
    return {
        props: {}
    }
})