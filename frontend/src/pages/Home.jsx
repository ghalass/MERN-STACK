import { useAuth } from "../context/Auth";

const Home = () => {
  const auth = useAuth();

  return (
    <div>
      <h1>Home</h1>
      <h3>Welcome {auth?.user ? auth.user.name : "in this application"}</h3>
    </div>
  );
};

export default Home;
