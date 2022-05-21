import {InputHTMLAttributes, TextareaHTMLAttributes} from 'react';
import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
interface TexaAreaProps extends TextareaHTMLAttributes<HTMLInputElement> {}

export function Input({...rest}: InputProps){
    return(
        <input className={styles.input}{...rest} />
    )
}

export function TextArea({...rest}){
    return(
        <textarea className={styles.input}{...rest}></textarea>
    )
}