import Head from 'next/Head';
import Image from 'next/image';
import styles from '../../styles/home.module.scss';
import logoImg from '../../public/logo.png';

import {Input} from '../components/ui/input/index';
import {Button} from '../components/ui/Button';
 
export default function Home() {
  return (
    <>
      <Head>
        <title>Sistema pet - faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Gatinho na foto" /> 
       
        <div className={styles.login}>
          <form>
            <Input 
            placeholder="Digite seu email"
            type="text"
            />

            <Input 
            placeholder="Digite sua senha"
            type="password"
            />

            <Button
              type="submit"
              loading={false}
            >
              Acessar
            </Button>
          </form>
          <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
        </div>
      </div> 
    </>
  )
}
