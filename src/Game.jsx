import { useState, useEffect, useRef, useCallback } from "react";
import useGyroscope from "./useGyroscope";

const DATA = {
  easy: [
    "Mumbai Indians","Chennai Super Kings","Royal Challengers Bengaluru","Kolkata Knight Riders",
    "Rajasthan Royals","Sunrisers Hyderabad","Delhi Capitals","Punjab Kings","Gujarat Titans",
    "Lucknow Super Giants","Ambani's","Shah Rukh Khan","Preity Zinta","Tata IPL",
    "Virat Kohli","MS Dhoni","Rohit Sharma","Hardik Pandya","Jasprit Bumrah","KL Rahul",
    "Rishabh Pant","Shubman Gill","Shreyas Iyer","Suryakumar Yadav","Ravindra Jadeja",
    "Yuzvendra Chahal","Mohammed Shami","Mohammed Siraj","Ishan Kishan","Sanju Samson",
    "Dinesh Karthik","Shikhar Dhawan","Bhuvneshwar Kumar","Ravichandran Ashwin",
    "Axar Patel","Kuldeep Yadav","Yuvraj Singh","Gautam Gambhir","Suresh Raina",
    "Harbhajan Singh","Babar Azam","Shahid Afridi","AB de Villiers",
    "David Warner","Chris Gayle","Andre Russell","Sunil Narine","Jos Buttler",
    "Glenn Maxwell","Mitchell Starc","Pat Cummins","Kieron Pollard","Shane Watson",
    "Lasith Malinga","Dwayne Bravo","Wicket","Boundary","Umpire","Toss","Pitch Report",
    "Wide","No ball","Maiden Over","LBW","Run out","Powerplay","Death overs",
    "Chase","Back to pavilion","Super Over","Partnership","Run rate","Strike rate",
    "Stumped","Direct Hit","Bouncer","Yorker","Swing","Spin bowler","Fast bowler",
    "Straight drive","Cover drive","Pull shot","Helicopter shot","Flick","Hat trick",
    "Century","Golden duck","Fan chants","IPL finals","Comeback","Inside edge",
    "Timing","Wankhede Stadium","Eden Gardens","Narendra Modi Stadium",
    "Navjot Singh Sidhu","Ravi Shastri","Harsha Bhogle","Sunil Gavaskar",
    "Duniya Hila Denge Hum","Ae Sala Cup Namde","Whistle Podu","Third umpire",
    "Cheergirls","Spidercam","Toss time","Man of the match","Foam Fingers",
    "Points Table","Fantasy cricket","Innings break","Front foot defence",
    "Back foot defence","Caught and bowled","The MCG","Gabba","30 yard circle",
    "Floodlights","Drinks break","Fifer","Flat pitch","BCCI","Limited overs format",
    "Play and miss","Thigh pad","Spiked shoes","Sight screen","Sledging","Batter","Fielder",
    "Captain","Coach","Single","Byes","Leg bye","Over","Series","Trophy","Catch","Throw",
    "Stumps", "Wicketkeeper","Offside","Legside","Gully","Slip","Point","Deep","Short",
    "Ground","Spectators","Sponsor","Logo","Jersey","Cap","Guard",
    "Crease","Boundary rope","Run up","Follow through","Appeal","Seam","Spin",
    "Off spin","Leg spin","Full toss","Dot ball","Free hit","Review","Slog",
    "Duck","Fours","Sixes","Qualifier","Eliminator","Knockout","Group stage",
    "League","Shield","Cup","World Cup","Test match","ODI","T20",
    "Day night","Pink ball","Red ball","White ball","Dukes ball","Kookaburra",
    "SG ball","Skipper"],

  medium: [
    "Orange Cap","Purple Cap","Player of the tournament","Scoop Shot","Ramp Shot",
    "Switch Hit","Sweep Shot","Reverse Sweep","Strike Rotation","Running between wickets",
    "Field restrictions","Economy","Change of pace","Field placements","Appealing",
    "Fielding efforts","Misfielding","Dew","Collapse","Mauka Mauka","Tilak Varma",
    "Rinku Singh","Shivam Dube","Ruturaj Gaikwad","Rajat Patidar","Arshdeep Singh",
    "Yashasvi Jaiswal","Varun Chakravarthy","Yusuf Pathan","Irfan Pathan",
    "Parthiv Patel","Aiden Markram","Kagiso Rabada","Quinton de Kock","Steve Smith",
    "Kane Williamson","Trent Boult","Rashid Khan","Shoaib Akhtar","Jos Buttler",
    "Josh Hazlewood","Mohammad Rizwan","Sai Sudharsan","Phil Salt","Square Leg",
    "Long off","Fine leg","Mid off","Mid on","Handling the ball","Reflex Catch",
    "Slower Ball","Knuckle Ball","Inswinging Yorker","Outswinger","Good Length",
    "Short Ball","Googly","Carrom Ball","Strategic Timeout","Diamond Duck",
    "Kavya Maran","Birla's","Match referee","Most fours","Most sixes",
    "Super striker","Halla bol","Aava de","Roar macha","Korbo lorbo jeetbo re",
    "Orange army","Cramp for room","Retired out","Obstructing the field",
    "No man's land","Road to playoffs","Wriddhiman Saha","Faf du Plessis",
    "Ben Stokes","Lockie Ferguson","Shimron Hetmyer","Adam Zampa","Sam Curran",
    "Liam Livingstone","Mitchell Marsh","Shardul Thakur","Deepak Chahar",
    "Washington Sundar","Ravi Bishnoi","Mujeeb Ur Rahman","Tabraiz Shamsi",
    "Heinrich Klaasen","David Miller","Andre Tye","Jason Roy","Jonny Bairstow",
    "Shai Hope","Avesh Khan","Umran Malik","Vijay Shankar","Mayank Agarwal","Zaheer Khan",
    "Cheteshwar Pujara","Ajinkya Rahane","Mohammad Hafeez","Shoaib Malik",
    "Mohammad Amir","Jason Holder","Kemar Roach","Nathan Lyon","Ollie Robinson",
    "Dawid Malan","Dewald Brevis","Silly mid off","Silly mid on","Deep square leg",
    "Long leg","Cow corner","Long stop","Blockhole","Crease line","Follow on",
    "Declaration","Reverse flick","Moeen Ali","Sam Billings","Mark Wood",
    "Shaheen Afridi","Shadab Khan","Haris Rauf","Devon Conway","Daryl Mitchell",
    "Mitchell Santner","Tim Southee","Substitute","Non striker","Overthrow",
    "Cover","Third man","Gaps","Full length","Short pitched","Corridor",
    "On drive","Square drive","Leg glance","Paddle sweep","Fine sweep",
    "Slog sweep","Off cutter"
  ],

  hard: [
    "Alex Hales","T Natarajan","Jitesh Sharma","Dhruv Jurel","Azmatullah Omarzai",
    "Tim David","Harshit Rana","Shivil Kaushik","Kesrick Williams","Alzarri Joseph",
    "Brendon McCullum","Ross Taylor","Parth Jindal","Ricky Ponting",
    "Mahela Jayawardene","Stephen Fleming","Andy Flower","Ashish Nehra",
    "Ian Bishop","Timed Out","El Clasico MI vs CSK","PBKS vs RR",
    "RCB vs CSK","Silly Point","Deep Midwicket","Leg Slip","Fly Slip",
    "Doosra","Flipper","Leg Cutter","Beamer","Toe Crusher","Wide Yorkers",
    "The Ashes","Border Gavaskar Trophy","Kohli vs Anderson","Rohit vs Starc",
    "Root vs Bumrah","Dhoni vs Malinga","Overcast Conditions",
    "Jadeja Sword Celebration","Double Hattrick","Injury Scare",
    "Relay Catches","Duckworth Lewis Stern","Wagon Wheel",
    "Pitch Deterioration","Boundary Count Rule","Mystery Spinner",
    "Nightwatchman","Nighthawk","Sticky Wicket","UltraEdge","Hotspot",
    "Snickometer","Baggy Green","Ben Duckett","Tom Kohler Cadmore",
    "Harry Brook","Mendis","Wanindu Hasaranga","Finn Allen",
    "Glenn Phillips","Rassie van der Dussen","Riyan Parag",
    "David Willey","Ajaz Patel","Mayank Markande","Sarfaraz Khan",
    "Shamar Joseph","Ramnaresh Sarwan","Chanderpaul","Curtly Ambrose",
    "Courtney Walsh","Ian Botham","Geoff Boycott","Trans Tasman",
    "Seam movement","Conventional swing","Scuffing","Shine","Rough up",
    "Leg break","Off break","Flicker ball","Reverse googly","Shooter",
    "Half volley","Bail off","Reverse parry","Batsman end",
    "Bowler end","Dead ball","Bounced out","Tweak","Run up time"
  ]
};

export default function Game({ goHome }) {

  /* ================= STATE ================= */
  const [time, setTime] = useState(60);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [correctList, setCorrectList] = useState([]);
  const [skipList, setSkipList] = useState([]); 
  const [easyAttempts, setEasyAttempts] = useState(0);
  const [current, setCurrent] = useState({ w: "Loading...", t: "easy" });
  const [usedWords, setUsedWords] = useState([]);

  // Gyroscope feedback state
  const [gyroFeedback, setGyroFeedback] = useState(null); // "correct" | "wrong" | null
  const feedbackTimeoutRef = useRef(null);

  const [category, setCategory] = useState({
    easy: true,
    medium: true,
    hard: true
  });

  const startX = useRef(0);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (time <= 0) return;
    const t = setInterval(() => setTime(t => t - 1), 1000);
    return () => clearInterval(t);
  }, [time]);

  /* ================= WORD ================= */
  const getWord = () => {
    let pool = [];
    if (category.easy) {
      pool = [...pool, ...DATA.easy.map(w => ({ w, t: "easy" }))];
    }
    if (category.medium) {
      pool = [...pool, ...DATA.medium.map(w => ({ w, t: "medium" }))];
    }
    if (category.hard) {
      pool = [...pool, ...DATA.hard.map(w => ({ w, t: "hard" }))];
    }
    const filtered = pool.filter(item => !usedWords.includes(item.w));
    if (filtered.length === 0) {
      return { w: "No cards left", t: "easy" };
    }
    return filtered[Math.floor(Math.random() * filtered.length)];
  };

  const nextCard = () => {
    const word = getWord();
    setCurrent(word);
  };

  useEffect(() => {
    nextCard();
  }, []);

  /* ================= GAME HANDLER ================= */
  const handle = useCallback((type) => {
    if (!current || !current.w || current.w === "No cards left") return;

    if (current.t === "easy") {
      setEasyAttempts(e => e + 1);
    }

    if (type === "correct") {
      setCorrectList(prev => [...prev, current.w]);
      setUsedWords(prev => [...prev, current.w]);
      if (current.t === "easy") setScore(s => s + 1);
      if (current.t === "medium") setScore(s => s + 2);
      if (current.t === "hard") setScore(s => s + 3);
    } else {
      setSkipList(prev => [...prev, current.w]);
    }

    nextCard();
  }, [current, category, usedWords]);

  /* ================= GYROSCOPE HANDLERS ================= */
  const handleGyroCorrect = useCallback(() => {
    if (time <= 0) return;
    
    // Show feedback
    setGyroFeedback("correct");
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    feedbackTimeoutRef.current = setTimeout(() => setGyroFeedback(null), 800);
    
    handle("correct");
  }, [handle, time]);

  const handleGyroSkip = useCallback(() => {
    if (time <= 0) return;
    
    // Show feedback
    setGyroFeedback("wrong");
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    feedbackTimeoutRef.current = setTimeout(() => setGyroFeedback(null), 800);
    
    handle("skip");
  }, [handle, time]);

  /* ================= GYROSCOPE HOOK ================= */
  const { requestPermission } = useGyroscope({
    onCorrect: handleGyroCorrect,
    onSkip: handleGyroSkip,
    enabled: time > 0
  });

  /* ================= AUTO LOCK ================= */
  useEffect(() => {
    if (easyAttempts >= 5 && category.easy) {
      setCategory(prev => ({ ...prev, easy: false }));
    }
  }, [easyAttempts]);

  /* ================= LOCK SCREEN TO LANDSCAPE ================= */
  useEffect(() => {
    // Try to lock to landscape on supported browsers
    const lockScreen = async () => {
      try {
        if (screen.orientation && screen.orientation.lock) {
          await screen.orientation.lock("landscape");
        }
      } catch (e) {
        // Silently fail - not all browsers support this
        console.log("Screen orientation lock not supported");
      }
    };
    lockScreen();

    // Keep screen awake using Wake Lock API
    let wakeLock = null;
    const requestWakeLock = async () => {
      try {
        if ("wakeLock" in navigator) {
          wakeLock = await navigator.wakeLock.request("screen");
        }
      } catch (e) {
        console.log("Wake lock not supported");
      }
    };
    requestWakeLock();

    return () => {
      if (wakeLock) {
        wakeLock.release();
      }
      try {
        if (screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock();
        }
      } catch (e) {}
    };
  }, []);

  /* ================= SWIPE ================= */
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX.current - endX > 80) {
      handle("skip");
    }
    if (endX - startX.current > 80) {
      handle("correct");
    }
  };

  /* ================= COLORS ================= */
  const getColor = () => {
    if (current.t === "easy") return "#00ff88";
    if (current.t === "medium") return "#ff8800";
    if (current.t === "hard") return "#ff0033";
    return "white";
  };

  /* ================= FEEDBACK OVERLAY ================= */
  const renderFeedbackOverlay = () => {
    if (!gyroFeedback) return null;

    const isCorrect = gyroFeedback === "correct";

    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
        background: isCorrect
          ? "rgba(0, 255, 136, 0.25)"
          : "rgba(255, 0, 51, 0.25)",
        animation: "feedbackFade 0.8s ease-out forwards"
      }}>
        <div style={{
          fontSize: "72px",
          fontWeight: "900",
          color: isCorrect ? "#00ff88" : "#ff0033",
          textShadow: isCorrect
            ? "0 0 40px #00ff88, 0 0 80px #00ff88"
            : "0 0 40px #ff0033, 0 0 80px #ff0033",
          animation: "feedbackPop 0.5s ease-out"
        }}>
          {isCorrect ? "✓ CORRECT" : "✗ WRONG"}
        </div>
      </div>
    );
  };

  /* ================= GAME OVER ================= */
  if (time <= 0) {
    return (
      <div style={styles.endContainer}>
        <h1 style={styles.endTitle}>Game Over</h1>
        <h2 style={styles.score}>🏆 {score}</h2>

        {/* CORRECT */}
        <div style={styles.listBox}>
          <h3 style={{ color: "#00ff88" }}>✔ Correct: </h3>
          <div style={styles.list}>
            {correctList.map((item, i) => (
              <span key={i} style={styles.correctItem}>{item}</span>
            ))}
          </div>
        </div>

        {/* SKIPPED */}
        <div style={styles.listBox}>
          <h3 style={{ color: "#ff4444" }}>✖ Skipped: </h3>
          <div style={styles.list}>
            {skipList.map((item, i) => (
              <span key={i} style={styles.skipItem}>{item}</span>
            ))}
          </div>
        </div>

        {/* BUTTON */}
        <button onClick={goHome} style={styles.playAgain}>
          Play Again
        </button>
      </div>
    );
  }

  if (!current || !current.w) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "50%" }}>
        Loading...
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div style={styles.container}>

      {/* CSS Animations */}
      <style>{`
        @keyframes feedbackFade {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes feedbackPop {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px currentColor; }
          50% { box-shadow: 0 0 40px currentColor, 0 0 60px currentColor; }
        }
        @keyframes arrowBounceUp {
          0%, 100% { transform: translateY(0) rotate(180deg); }
          50% { transform: translateY(-12px) rotate(180deg); }
        }
        @keyframes arrowBounceDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(12px); }
        }
      `}</style>

      {/* GYROSCOPE FEEDBACK OVERLAY */}
      {renderFeedbackOverlay()}

      {/* TOP BAR */}
      <div style={styles.top}>
        <div style={styles.topItem}>⏱ {time}</div>
        <div style={styles.topItem}>🏆 {score}</div>
      </div>

      {/* GYROSCOPE HINTS - shown on sides in landscape */}
      <div style={styles.gyroHintContainer}>
        {/* LEFT - Tilt UP = Wrong */}
        <div style={styles.gyroHintLeft}>
          <div style={{
            fontSize: "28px",
            animation: "arrowBounceUp 1.2s ease-in-out infinite",
            transform: "rotate(180deg)"
          }}>
            ▼
          </div>
          <span style={{ fontSize: "11px", opacity: 0.7, marginTop: "4px" }}>TILT UP</span>
          <span style={{ fontSize: "10px", color: "#ff0033", fontWeight: "bold" }}>WRONG</span>
        </div>

        {/* CARD */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            ...styles.card,
            border: `3px solid ${getColor()}`,
            boxShadow: `0 0 20px ${getColor()}`,
            color: getColor(),
            animation: "pulseGlow 2s ease-in-out infinite"
          }}
        >
          {current?.w || "Loading..."}
        </div>

        {/* RIGHT - Tilt DOWN = Correct */}
        <div style={styles.gyroHintRight}>
          <div style={{
            fontSize: "28px",
            animation: "arrowBounceDown 1.2s ease-in-out infinite"
          }}>
            ▼
          </div>
          <span style={{ fontSize: "11px", opacity: 0.7, marginTop: "4px" }}>TILT DOWN</span>
          <span style={{ fontSize: "10px", color: "#00ff88", fontWeight: "bold" }}>CORRECT</span>
        </div>
      </div>

      {/* HINT */}
      <p style={styles.hint}>
        📱 Hold phone on forehead in landscape • Tilt ↓ = Correct • Tilt ↑ = Wrong
      </p>

      {/* CATEGORIES */}
      <div style={styles.categories}>
        {["easy", "medium", "hard"].map(c => (
          <button
            key={c}
            onClick={() => {
              if (c === "easy" && easyAttempts >= 5) return;
              setCategory(prev => ({
                ...prev,
                [c]: !prev[c]
              }));
            }}
            style={{
              ...styles.catBtn,
              borderColor:
                c === "easy" ? "#00ff88" :
                c === "medium" ? "#ff8800" :
                "#ff0033",
              background: category[c] ? "#111" : "#333",
              boxShadow: category[c]
                ? `0 0 10px ${
                    c === "easy" ? "#00ff88" :
                    c === "medium" ? "#ff8800" :
                    "#ff0033"
                  }`
                : "none",
              opacity: (c === "easy" && easyAttempts >= 5) ? 0.3 : 1
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* CONTROLS */}
      <div style={styles.controls}>
        <button onClick={() => handle("skip")} style={styles.skip}>
          ✗ Wrong
        </button>

        <button onClick={() => handle("correct")} style={styles.correct}>
          ✓ Correct
        </button>
      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    backgroundImage: `url(/background.png)`,
    opacity: 0.7,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#b9ff09",
    height: "100vh",
    display: "flex",
    position: "relative",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "12px 16px",
    overflow: "hidden"
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "22px",
    fontWeight: "bold"
  },

  topItem: {
    background: "rgba(0,0,0,0.5)",
    padding: "6px 14px",
    borderRadius: "10px",
    backdropFilter: "blur(10px)"
  },

  gyroHintContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    flex: 1
  },

  gyroHintLeft: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#ff0033",
    minWidth: "60px"
  },

  gyroHintRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#00ff88",
    minWidth: "60px"
  },

  card: {
    flex: 1,
    maxWidth: "60%",
    maxHeight: "25vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(24px, 5vw, 40px)",
    textAlign: "center",
    borderRadius: "20px",
    padding: "20px",
    background: "rgba(0,0,0,0.6)",
    position: "relative",
    zIndex: 1,
    backdropFilter: "blur(10px)",
    fontWeight: "bold",
    letterSpacing: "1px"
  },

  hint: {
    textAlign: "center",
    opacity: 0.6,
    fontSize: "11px",
    margin: "4px 0"
  },

  categories: {
    display: "flex",
    justifyContent: "center",
    gap: "16px"
  },

  catBtn: {
    padding: "8px 18px",
    borderRadius: "10px",
    color: "white",
    border: "2px solid",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase"
  },

  controls: {
    display: "flex",
    gap: "10px",
    position: "relative",
    zIndex: 20
  },

  skip: {
    flex: 1,
    padding: "14px",
    background: "linear-gradient(135deg, #ff0033, #cc0029)",
    color: "white",
    borderRadius: "12px",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "0 4px 15px rgba(255,0,51,0.4)"
  },

  correct: {
    flex: 1,
    padding: "14px",
    background: "linear-gradient(135deg, #00ff88, #00cc6a)",
    color: "black",
    borderRadius: "12px",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "0 4px 15px rgba(0,255,136,0.4)"
  },

  center: {
    background: "black",
    color: "white",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  
  endContainer: {
    backgroundImage: `url(/trophy.png)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: "0.5",
    color: "#00ffff",
    height: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "auto"
  },

  endTitle: {
    fontSize: "32px",
    marginBottom: "10px"
  },

  score: {
    fontSize: "28px",
    marginBottom: "20px"
  },

  listBox: {
    width: "100%"
  },

  list: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "10px"
  },

  correctItem: {
    background: "#00ff8833",
    padding: "6px 10px",
    borderRadius: "8px",
    fontSize: "12px"
  },

  skipItem: {
    background: "#ff444433",
    padding: "6px 10px",
    borderRadius: "8px",
    fontSize: "12px"
  },

  playAgain: {
    marginTop: "20px",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "12px",
    background: "#00ff88",
    color: "black",
    border: "none",
    width: "auto"
  }
};
