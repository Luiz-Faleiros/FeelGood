// app/page.tsx
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-gray-100 " style={{ minHeight: 'calc(100vh - 72px)' }}>
        
      </div>
    </div>
  );
};

export default Home;
