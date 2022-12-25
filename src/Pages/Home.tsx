import Advertisment from '../Components/Home/Advertisment/Advertisment';
import Authentication from '../Components/Home/Authentication/Authentication';

const Home = () => {
    const styles = {
        div: {
            height: '100%',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '2.5fr 1fr',
            gridAutoRows: '100%',
            gridGap: '10px',
        },
        section: {
            borderRadius: '0.6rem',
        },
    };
    return (
        <div style={styles.div}>
            <section style={styles.section}>
                <Advertisment />
            </section>
            <section style={styles.section}>
                <Authentication />
            </section>
        </div>
    );
};

export default Home;
