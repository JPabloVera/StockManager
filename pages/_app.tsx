import type { AppProps /*, AppContext */ } from 'next/app'
import Head from 'next/head'
import Nav from '../components/nav/nav'
import { Provider } from 'react-redux'
import {store} from '../store/saleSlice'
import firebase from 'firebase'



function MyApp({ Component, pageProps }: AppProps) {
    return (
      <Provider store={store}>
        <Head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
          integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
          crossOrigin="anonymous"
        />
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" 
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" 
        crossOrigin="anonymous"></script>
      
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" 
        integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" 
        crossOrigin="anonymous"></script>
      
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" 
        integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" 
        crossOrigin="anonymous"></script>
        <script src="https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js"></script>

        <script src="https://www.gstatic.com/firebasejs/8.1.2/firebase-analytics.js"></script>

      </Head>
      <Nav></Nav>
      <Component {...pageProps}/>
    </Provider>)
}


export default MyApp