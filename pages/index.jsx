import Image from 'next/image'
import Layout from '../layouts/Layout.jsx'

export default function Home() {
    return (
        <>
            <Layout>
                <div className="main-page_content-container">
                    <div className="bot-attrs">
                        <h1>Oneki Bot</h1>
                        <p>“Un bot multifuncional para tu servidor de discord”</p>
                        <div className="bot-profile-picture hidenimg">
                            <Image src="/assets/oneki.svg" alt="" width={321} height={321} />
                        </div>
                        {/* onClick="redirect('/invite')" */}
                        <button>Invitar</button>
                    </div>
                    <div className="bot-profile-picture">
                        <Image src="/assets/oneki.svg" alt="" width={472} height={472} />
                    </div>
                </div>
            </Layout>
            <style jsx>{`
                .main-page_content-container {
                    display: flex;
                    flex-direction: row;
                    padding: 70px 0;
                }

                .bot-attrs {
                    padding: 50px 0;
                }

                .bot-attrs h1 {
                    width: 623px;
                    font-size: 170px;
                    font-weight: 500;
                    line-height: 90%;
                    text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
                    margin: 0;
                }

                .bot-attrs p {
                    font-style: normal;
                    font-weight: normal;
                    font-size: 29px;
                    line-height: 35px;
                    color: rgba(255, 255, 255, 0.8);
                    text-shadow: 3px 3px 7px rgba(0, 0, 0, 0.25);
                }

                buttton {
                    padding: 20px 96px;
                    background: linear-gradient(93.58deg, #de14ff 0%, #ff2ed1 100%);
                    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
                    border-radius: 16px;
                    border: none;
                    font-family: 'Rubik', sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 36px;
                    color: #f3e8ff;
                    transition: background 0.3s, box-shadow 0.3s;
                }

                button:hover {
                    background: linear-gradient(93.74deg, #de14ff 50%, #ff2ed1 100%);
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
                }

                .bot-profile-picture {
                    border-radius: 50%;
                }
                .bot-profile-picture img {
                    margin-left: 20px;
                    width: 472px;
                    height: 472px;
                }

                .bot-attrs .hidenimg {
                    display: none;
                }

                @media screen and (max-width: 1260px) {
                    .bot-attrs h2 {
                        font-size: 151px;
                    }

                    .bot-attrs p {
                        font-size: 22px;
                    }

                    button {
                        padding: 15 76;
                    }

                    .bot-profile-picture img {
                        width: 371.95px;
                        height: 371.95px;
                    }
                }

                @media screen and (max-width: 1039px) {
                    .main-page_content-container {
                        align-items: center;
                    }

                    .bot-attrs h2 {
                        font-size: 125px;
                    }

                    .bot-attrs p {
                        font-size: 20px;
                    }

                    button {
                        padding: 12 56;
                        font-size: 26px;
                    }

                    .bot-profile-picture img {
                        width: 301.95px;
                        height: 301.95px;
                        margin: 0;
                    }
                }

                @media screen and (max-width: 925px) {
                    .main-page_content-container {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                    }

                    .bot-attrs {
                        text-align: center;
                    }

                    .bot-attrs h2 {
                        width: auto;
                        font-size: 90px;
                        padding: 0 30px;
                    }

                    .bot-attrs p {
                        padding: 0 30px;
                    }

                    .bot-attrs .hidenimg {
                        display: flex;
                        justify-content: center;
                    }

                    .bot-attrs .hidenimg img {
                        width: 321px;
                        height: 321px;
                        margin: 0;
                    }

                    .bot-profile-picture {
                        display: none;
                    }
                }
            `}</style>
        </>
    )
}
