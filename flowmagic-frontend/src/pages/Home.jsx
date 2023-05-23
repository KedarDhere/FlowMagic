import Header from "../components/Header"
import ButtonList from "../components/ButtonList"

function Home() {

    return (
        <>
            <Header />
            <section id="home-section-container">
                <h2>Registered Applications</h2>
                <div id="application-list">
                    <ButtonList />
                </div>
            </section>
        </>
    )
}

export default Home
