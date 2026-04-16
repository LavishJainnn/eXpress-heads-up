import { useEffect, useState } from "react";

export default function Countdown({ onFinish }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      setTimeout(onFinish, 500);
      return;
    }

    const t = setTimeout(() => {
      setCount(c => c - 1);
    }, 800);

    return () => clearTimeout(t);
  }, [count]);

  return (
    <div style={styles.container}>
      <h1 style={styles.number}>
        {count === 0 ? "GO!" : count}
      </h1>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "black",
    color: "#00ffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  number: {
    fontSize: "80px",
    fontWeight: "bold",
    textShadow: "0 0 20px #00ffff, 0 0 40px #00ffff"
  }
};