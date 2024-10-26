// app/page.tsx
import Navbar from "../components/Navbar";
import UserProfile from "../components/UsersInformation";

const Profile: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-gray-100 " style={{ minHeight: 'calc(100vh - 72px)' }}>
            <UserProfile/>
      </div>
    </div>
  );
};

export default Profile;
