import { useOutletContext } from 'react-router-dom';
import './EditProfile.css';

const EditProfile = () => {
      const ColorValue: any = useOutletContext();
  return (
      <div className="editProfile" style={{ background: ColorValue + '80' }}>
          <h1>Edit profile page</h1>
      </div>
  );
}

export default EditProfile