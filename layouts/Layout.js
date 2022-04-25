import Head from "next/head"
import Footer from "../components/footer"
import Nav from '../components/nav'
// import '../public/css/global-style.css'
// import '../public/css/main-page-style.css'

export default function Layout({ children }) {
    return (
        <div className="">
            <Head>
                <meta charset="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Oneki Discord Bot</title>
                <link rel="icon" href="/favicon.ico" />
                {/* Google fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                {/* <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" /> */}
            </Head>

            <Nav/>

            <main>{children}</main>
            
            <Footer/>
        </div>
    )
}
