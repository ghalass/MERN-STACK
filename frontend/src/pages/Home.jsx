import { useAuth } from "../context/Auth";

const Home = () => {
  const auth = useAuth();

  return (
    <div className="container-fluid">
      <div className="text-center">
        <h1>Page d'acceuil</h1>
        <h3>
          Welcome{" "}
          {auth?.user
            ? auth.user.name.replace(/^./, (c) => c.toUpperCase())
            : "in this application"}
        </h3>
      </div>
    </div>
  );
};

export default Home;
