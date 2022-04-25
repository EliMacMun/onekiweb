import Link from "next/link"
import Image from "next/image"

export default function Nav() {
    return (
        <header className="global_nav-bar-container">
            <nav id="global_nav-bar" className="global_nav-bar">
                <h1 onClick="redirect('/')" className="global_nav-bar_bot-name">Oneki Bot</h1>
                <ul id="nav_bar-list" className="global_nav-bar_list">
                    <li><Link href="/commands">Comandos</Link></li>
                    <li><Link href="#">Soporte</Link></li>
                </ul>
                <div className="global_nav_login">
                    <p onClick="redirect('/login')"> Iniciar sesión </p>
                    <Image src="/assets/User_Avatar.png" alt="user avatar" layout="fill" />
                    <div onClick="activeButton()" className="global_nav-mobile_open-menu">
                        <Image id="burguer" src="/assets/Burger.svg" alt="menu" layout="fill" />
                    </div>
                </div>
            </nav>
        </header>
    )
}