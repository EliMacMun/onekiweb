export default function Footer() {
    return (
        <footer className="footer">
            <div className="content">
                <div className="title">
                    <h1>Oneki Bot</h1>
                </div>
                <div className="links">
                    <p className="license">2022 All rights reserved Oneki Team ©</p>
                    <p onClick="redirect('/discord')" className="contact">Contact us</p>
                </div>
            </div>
        </footer>
    )
}