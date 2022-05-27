
import{useState, ChangeEvent, FormEvent} from 'react';
import Head from 'next/head';
import styles from './styles.module.scss';
import {Header} from '../../components/Header';
import Image from 'next/image';

import {setupAPIClient} from '../../services/api';

import {canSSRAuth} from '../../utils/canSSRAuth'

import {FiUpload} from 'react-icons/fi'
import {toast} from 'react-toastify';

type ItemProps ={
    id: string;
    name: string;
}

interface CategoryProps{
    categoryList: ItemProps[];
}

export default function Product({categoryList}: CategoryProps){

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [avatarUrl, setAvatarUrl] = useState('')
    const [imageAvatar, setImageAvatar] = useState(null)

    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0)

    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files){
            return;
        }

        const image = e.target.files[0];
        if(!image){
            return;
        }

        if(image.type === 'image/png' || image.type ==='image/jpeg'){
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    function handleChangeCategory(event){
        // console.log('Categoria selecionada', event.target.value)
        // console.log('Categoria selecionada', [event.target.value])
        setCategorySelected(event.target.value)
    }

    async function handleRegister(event: FormEvent){
        event.preventDefault();
        try{
            const data = new FormData();

            if(name === '' || price === '' || imageAvatar === null || description === ''){
                toast.error('Preencha todos os campos');
                return;
            }

            data.append('name', name)
            data.append('price', price)
            data.append('description', description)
            data.append('category_id', categories[categorySelected].id)
            data.append('file', imageAvatar)

            const apiClient = setupAPIClient();
            await apiClient.post('/product', data)

            toast.success('Cadastrado com sucesso!')

        }catch(err){
            console.log(err);
            toast.error('Opa, não foi possível cadastrar!')
        }

        setName('');
        setPrice('');
        setDescription('');
        setImageAvatar(null);
        setAvatarUrl('');

    }

    return (
        <>
            <Head>
                <title>Serviço - FePet</title>
            </Head>  
            <div>
                <Header />
                <main className ={styles.container}>
                    <h1>Selecione o serviço</h1>

                    <form className={styles.form} onSubmit={handleRegister}>

                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={25} color="#fff" />
                            </span>

                            <input type="file" accept="image/png, image/jpeg" onChange={handleFile}/>

                            {avatarUrl && (
                                <Image
                                className={styles.preview}
                                src={avatarUrl}
                                alt="foto do produto"
                                width={250}
                                height={250}
                            />
                            )}

                        </label>

                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {categories.map( (item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>

                        <input 
                        type="text"
                        placeholder='Numero id e nome do cliente'
                        className={styles.input}
                        value={name}
                        onChange={ (e) => setName(e.target.value)}
                        />    

                        <input 
                        type="text"
                        placeholder='Selecione o preço'
                        className={styles.input}
                        value={price}
                        onChange={ (e) => setPrice(e.target.value)}
                        />                                          

                        <textarea
                        placeholder="Cão ou gatinho? Nome, raça, porte, idade, sexo e observações sobre o pet"
                        className={styles.input}
                        value={description}
                        onChange={ (e) => setDescription(e.target.value)}
                        />                      

                        <button className={styles.buttonAdd}>
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
              
)}

export const getServerSideProps = canSSRAuth(async (ctx) =>{

    const apiClient = setupAPIClient(ctx);
    const response = await  apiClient.get('/category')
    
    return{props:{
        categoryList: response.data
    }}
})