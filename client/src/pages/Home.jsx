import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>FaceType</h1>

        <p style={styles.subtitle}>
          Real-Time Facial Expression Based Typing System
        </p>

        <Link to="/typing">
          <button
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.transform = "translateY(-3px)")}
            onMouseLeave={(e) => (e.target.style.transform = "translateY(0px)")}
          >
            Start Typing
          </button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
  },
  card: {
    background: "rgba(255, 255, 255, 0.1)",
    padding: "50px 70px",
    borderRadius: "15px",
    textAlign: "center",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
    color: "white"
  },
  title: {
    fontSize: "48px",
    marginBottom: "10px"
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "30px",
    opacity: 0.9
  },
  button: {
    padding: "12px 30px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    color: "#2a5298",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease"
  }
};

export default Home;
