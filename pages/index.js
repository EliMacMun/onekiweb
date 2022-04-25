import Image from 'next/image'
import Layout from '../layouts/Layout'

export default function Home() {
    return (
        <Layout>
            <div className="main-page_content-container">
                <div className="bot-attrs">
                    <h2>Oneki Bot</h2>
                    <p>“Un bot multifuncional para tu servidor de discord”</p>
                    <div className="bot-profile-picture hidenimg">
                        <Image src="/assets/oneki.svg" alt="" layout='fill' />
                    </div>
                    <button onClick="redirect('/invite')" className="bot-attrs_invite-button">
                        Invitar
                    </button>
                </div>
                <div className="bot-profile-picture">
                    <Image src="/assets/oneki.svg" alt="" layout='fill' />
                </div>
            </div>
        </Layout>
    )
}
