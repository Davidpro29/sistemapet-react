import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import {parseCookies} from 'nookies';

//página que só serão acessadas por visitantes
export function canSSRGuest<P> (fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);

        if(cookies['@nextauth.token']){
            return{
                redirect:{
                    destination: '/dashboard',
                    permanent: false,
                }
            }            
        }  

        return await fn(ctx);
      
    }
}