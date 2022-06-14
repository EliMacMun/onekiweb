import Link from 'next/link'

export default function Footer() {
    return (
        <>
            <footer>
                <div className="content">
                    <div className="title">
                        <Link href="/">Oneki Bot</Link>
                    </div>
                    <div className="links">
                        <p className="license">2022 All rights reserved Oneki Team ©</p>
                        {/* onClick="redirect('/discord')" */}
                        <p className="contact">Contact us</p>
                    </div>
                </div>
            </footer>
            <style jsx>{`
                footer {
                    display: flex;
                    margin-top: 69px;
                    width: 100%;
                    height: 335px;
                    justify-content: center;
                    background-image: url('../assets/footer-bg.svg');
                    background-size: cover;
                    background-position: center bottom;
                    background-repeat: no-repeat;
                }

                footer .content {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 100%;
                }

                footer .content .title a {
                    font-weight: 500;
                    font-size: 64px;
                    margin-top: 97px;
                    text-align: center;
                }

                footer .content .links {
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                }

                footer .content .links p {
                    padding: 0 20px;
                }

                footer .content .links .contact {
                    text-decoration: underline;
                    cursor: pointer;
                }

                @media screen and (max-width: 322px) {
                    footer {
                        background-size: cover;
                        height: max-content;
                    }

                    footer .content .title h1 {
                        font-size: 3.5rem;
                        margin-bottom: 0;
                    }

                    footer .content .links {
                        flex-direction: column;
                        text-align: center;
                    }
                }
            `}</style>
        </>
    )
}
