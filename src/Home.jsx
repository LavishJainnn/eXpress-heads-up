import { useEffect, useState } from "react";

export default function Home({ startGame }) {
  const [pulse, setPulse] = useState(true);
  const [gyroSupported, setGyroSupported] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const i = setInterval(() => {
      setPulse(p => !p);
    }, 800);
    return () => clearInterval(i);
  }, []);

  // Check if gyroscope/motion is available
  useEffect(() => {
    if (window.DeviceMotionEvent) {
      setGyroSupported(true);
      // If no permission API, assume granted (Android)
      if (typeof DeviceMotionEvent.requestPermission !== "function") {
        setPermissionGranted(true);
      }
    } else {
      setGyroSupported(false);
    }
  }, []);

  const handleRequestPermission = async () => {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      try {
        const result = await DeviceMotionEvent.requestPermission();
        if (result === "granted") {
          setPermissionGranted(true);
        }
      } catch (e) {
        console.error("Permission denied", e);
      }
    }
  };

  const handleStartGame = () => {
    // Request fullscreen for better landscape experience
    try {
      const el = document.documentElement;
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      }
    } catch (e) {}

    startGame();
  };

  return (
    <div style={styles.container}>

      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* TITLE */}
      <h1 style={styles.title}>
        HIT or MISS
      </h1>

      {/* TAGLINE */}
      <p style={styles.tagline}>
        Guess. Shout. Win. 🔥
      </p>

      {/* GYROSCOPE INSTRUCTION */}
      <div style={styles.instructionBox}>
        <p style={styles.instructionTitle}>📱 How to Play</p>
        <div style={styles.instructionList}>
          <p>1. Hold phone on your <b>forehead</b> in <b>landscape</b> mode</p>
          <p>2. Your friends describe the word on screen</p>
          <p>3. <span style={{ color: "#00ff88" }}>Tilt DOWN ↓</span> = Correct ✓</p>
          <p>4. <span style={{ color: "#ff0033" }}>Tilt UP ↑</span> = Wrong ✗</p>
        </div>
      </div>

      {/* iOS PERMISSION BUTTON */}
      {gyroSupported && !permissionGranted && (
        <button
          onClick={handleRequestPermission}
          style={styles.permissionBtn}
        >
          🔓 Enable Motion Sensor
        </button>
      )}

      {/* GYRO STATUS */}
      {gyroSupported === false && (
        <p style={styles.noGyro}>
          ⚠️ Motion sensor not available. Use swipe or buttons instead.
        </p>
      )}

      {gyroSupported && permissionGranted && (
        <p style={styles.gyroReady}>
          ✅ Motion sensor ready!
        </p>
      )}

      {/* PLAY BUTTON */}
      <button
        onClick={handleStartGame}
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
    backgroundImage: `url(/stadium.jpg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#00ffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
    overflow: "auto"
  },

  title: {
    fontSize: "40px",
    fontWeight: "bold",
    textShadow: "0 0 20px #00ffff, 0 0 40px #00ffff",
    marginBottom: "6px"
  },

  tagline: {
    opacity: 0.7,
    marginBottom: "20px"
  },

  instructionBox: {
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    padding: "16px 20px",
    marginBottom: "16px",
    maxWidth: "340px",
    width: "90%",
    border: "1px solid rgba(0,255,255,0.2)"
  },

  instructionTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#00ffff"
  },

  instructionList: {
    textAlign: "left",
    fontSize: "13px",
    lineHeight: "1.8",
    color: "rgba(255,255,255,0.85)"
  },

  permissionBtn: {
    padding: "12px 28px",
    fontSize: "15px",
    fontWeight: "bold",
    borderRadius: "14px",
    border: "2px solid #ff8800",
    background: "rgba(255,136,0,0.15)",
    color: "#ff8800",
    marginBottom: "12px",
    cursor: "pointer",
    boxShadow: "0 0 15px rgba(255,136,0,0.3)"
  },

  noGyro: {
    color: "#ff8800",
    fontSize: "12px",
    marginBottom: "10px",
    background: "rgba(255,136,0,0.1)",
    padding: "8px 14px",
    borderRadius: "8px"
  },

  gyroReady: {
    color: "#00ff88",
    fontSize: "13px",
    marginBottom: "10px",
    background: "rgba(0,255,136,0.1)",
    padding: "8px 14px",
    borderRadius: "8px"
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
    marginBottom: "30px",
    cursor: "pointer"
  },

  footer: {
    position: "absolute",
    bottom: "20px",
    opacity: 0.4,
    fontSize: "12px"
  }
};