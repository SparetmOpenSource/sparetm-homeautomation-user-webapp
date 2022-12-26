import ProfileConfigWrapper from "../Components/ProfileConfig/ProfileConfigWrapper/ProfileConfigWrapper";

const ProfileConfig = () => {
    const styles = {
        div: {
            width: '100%',
            height: '100%',
            borderRadius: '0.6rem',
        },
    };
    return (
        <div style={styles.div}>
            <ProfileConfigWrapper />
        </div>
    );
};

export default ProfileConfig;
