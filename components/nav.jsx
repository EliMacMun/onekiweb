import Link from 'next/link'
import Image from 'next/image'

export default function Nav() {
    return (
        <>
            <header>
                <nav id="global_nav-bar">
                    <Link href="/" className="nav-bot-name">
                        Oneki Bot
                    </Link>
                    <ul id="nav_bar-list">
                        <li>
                            <Link href="/commands">Comandos</Link>
                        </li>
                        <li>
                            <Link href="#">Soporte</Link>
                        </li>
                    </ul>
                    <div className="global_nav_login">
                        <Link href="/login">Iniciar sesión</Link>
                        <Image src="/assets/User_Avatar.png" alt="user avatar" width={36} height={36} />
                        {/* onClick="activeButton()" */}
                        <div className="global_nav-mobile_open-menu">
                            <Image id="burguer" src="/assets/Burger.svg" alt="menu" layout="fill" />
                        </div>
                    </div>
                </nav>
            </header>
            <style jsx>{`
                body::-webkit-scrollbar {
                    width: 10px;
                }

                body::-webkit-scrollbar-thumb {
                    background-color: #c2c2c2;
                    border-radius: 15px;
                }

                header {
                    position: fixed;
                    top: 0;
                    border: 1px solid #e6e6e6;
                }

                nav {
                    background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
                    -webkit-backdrop-filter: blur(40px);
                    backdrop-filter: blur(40px);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-direction: row;
                    width: 100vw;
                    height: 60px;
                    top: 0;
                    color: #fff;
                }

                ul {
                    display: flex;
                    padding: 0;
                    margin: 0;
                    font-size: 18px;
                    order: 2;
                }

                li {
                    list-style: none;
                    padding: 0 1.3rem;
                }

                li a {
                    color: white;
                    opacity: 70%;
                    text-decoration: none;
                    transition: opacity 0.12s;
                }

                li a:hover {
                    opacity: 100%;
                    text-decoration: underline;
                }

                .nav-bot-name {
                    margin: 0 4rem;
                    font-size: 30px;
                    font-weight: normal;
                    order: 1;
                }

                .global_nav_login {
                    display: flex;
                    align-items: center;
                    width: max-content;
                    cursor: pointer;
                    order: 3;
                }

                .global_nav_login a {
                    margin: 0 4rem 0 8px;
                    font-size: 18px;
                    color: white;
                    order: 2;
                }

                .global_nav_login img {
                    width: 36px;
                    height: 36px;
                    order: 1;
                }

                .global_nav-mobile_open-menu {
                    display: none;
                    order: 3;
                    z-index: 21;
                }

                .global_nav-mobile_open-menu img {
                    width: 40px;
                    height: 40px;
                }

                @media screen and (max-width: 804px) {
                    nav {
                        height: max-content;
                        flex-wrap: wrap;
                        padding-top: 5px;
                    }

                    .nav-bot-name {
                        width: fit-content;
                        font-size: 25px;
                        margin: 0 2rem;
                        order: 1;
                    }

                    ul {
                        display: none;
                        flex-direction: column;
                        padding: 16px 0;
                        width: 100vw;
                        font-size: 1.3rem;
                        list-style: circle;
                        order: 4;
                    }

                    li:hover {
                        background-color: rgba(0, 0, 0, 0.171);
                    }

                    .mobileListActive {
                        display: block;
                    }

                    .global_nav_login {
                        justify-content: center;
                        width: fit-content;
                        font-size: 12px;
                        order: 2;
                    }

                    .global_nav_login a {
                        margin: 0 1rem 0 8px;
                    }

                    .global_nav-mobile_open-menu {
                        display: block;
                    }
                }

                @media screen and (max-width: 537px) {
                    .global_nav_login a {
                        display: none;
                    }
                }
            `}</style>
        </>
    )
}
