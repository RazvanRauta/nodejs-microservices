import { wrapper } from '../redux/store'
import App from 'next/app';


import 'bootstrap/dist/css/bootstrap.min.css'
import buildClient from '../api/build-client';
import { userActionTypes } from '../redux/user/action';

class MyApp extends App {
    static getInitialProps = async ({Component, ctx}) => {

        const { data } = await buildClient(ctx).get('/api/users/currentuser')

        if(data){

            const {currentUser} = data

        ctx.store.dispatch({type: userActionTypes.SET_USER, payload: currentUser});

        }else{

            ctx.store.dispatch({type: userActionTypes.REMOVE_USER});
        }

        return {
            pageProps: {
                // Call page-level getInitialProps
                ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
                // Some custom thing for all pages
                pathname: ctx.pathname,
            },
        };

    };

    render() {
        const {Component, pageProps} = this.props;

        return (
            <Component {...pageProps} />
        );
    }
}

export default wrapper.withRedux(MyApp);
