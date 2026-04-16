import { useEffect, useState } from "react";

export default function Home({ startGame }) {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const i = setInterval(() => {
      setPulse(p => !p);
    }, 800);
    return () => clearInterval(i);
  }, []);

  return (
    <div style={styles.container}>

      {/* TITLE */}
      <h1 style={styles.title}>
        HIT or MISS
      </h1>

      {/* TAGLINE */}
      <p style={styles.tagline}>
        Guess. Shout. Win. 🔥
      </p>

      {/* PLAY BUTTON */}
      <button
        onClick={() => startGame()}
        style={{
          ...styles.playBtn,
          transform: pulse ? "scale(1)" : "scale(1.08)"
        }}
      >
        ▶ PLAY NOW
      </button>

      {/* FOOTER */}
      <p style={styles.footer}>
        Pass the phone. No mercy. 😈
      </p>

    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #000000, #0a0e27, #1a0033)",
    color: "#00ffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px"
  },

  title: {
    fontSize: "40px",
    fontWeight: "bold",
    textShadow: "0 0 20px #00ffff, 0 0 40px #00ffff",
    marginBottom: "10px"
  },

  tagline: {
    opacity: 0.7,
    marginBottom: "40px"
  },

  playBtn: {
    padding: "18px 40px",
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "20px",
    border: "none",
    background: "linear-gradient(135deg, #00ff88, #00ffff)",
    color: "#000",
    boxShadow: "0 0 20px #00ff88, 0 0 40px #00ffff",
    transition: "0.2s",
    marginBottom: "30px"
  },

  footer: {
    position: "absolute",
    bottom: "20px",
    opacity: 0.4,
    fontSize: "12px"
  }
};