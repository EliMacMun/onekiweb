import Head from 'next/head'
import Footer from '../components/footer.jsx'
import Nav from '../components/nav.jsx'
// import '../public/css/global-style.css'
// import '../public/css/main-page-style.css'

export default function Layout({ children }) {
    return (
        <>
            <div>
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

                <Nav />

                <main>{children}</main>

                <Footer />
            </div>
            <style jsx>{`
                div {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                    margin: 0;
                    font-family: 'Montserrat', sans-serif;
                    color: #fff;
                    overflow-x: hidden;
                }

                main {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    height: 749px;
                    background-image: url('../assets/Main-page-bg.svg');
                    background-position-x: center;
                    background-size: cover;
                    background-repeat: no-repeat;
                }
            `}</style>
        </>
    )
}
