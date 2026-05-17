import { useState, useEffect, useRef } from "react";
import Loader from "./Loader";

const foods = [
  {
    name: "Premium Burger",
    price: "₱199",
    desc: "Flame-grilled wagyu patty, aged cheddar, truffle aioli",
    tag: "Best Seller",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Cheese Pizza",
    price: "₱399",
    desc: "Wood-fired sourdough, San Marzano tomato, buffalo mozzarella",
    tag: "Chef's Pick",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Crispy Chicken",
    price: "₱249",
    desc: "Double-fried buttermilk chicken, hot honey glaze, pickled slaw",
    tag: "Fan Fave",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=1200&auto=format&fit=crop",
  },
];

const drinks = [
  {
    name: "Chocolate Shake",
    price: "₱129",
    desc: "Valrhona 70% dark chocolate, cold brew, hand-whipped cream",
    tag: "Indulgent",
    image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Mango Juice",
    price: "₱99",
    desc: "Fresh Carabao mangoes, light ginger, coconut water",
    tag: "Refreshing",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Mineral Water",
    price: "₱35",
    desc: "Naturally sourced from mountain springs, lightly sparkling",
    tag: "Pure",
    image: "https://images.unsplash.com/photo-1564419320461-6870880221ad?q=80&w=1200&auto=format&fit=crop",
  },
];

function useIntersection(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function CommercialPopup({ onClose }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", animation: "fadeIn 0.3s ease" }} />
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1001, width: "min(700px, 92vw)", borderRadius: "20px", overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.8), 0 0 60px rgba(255,106,0,0.15)", border: "1px solid rgba(255,106,0,0.2)", animation: "popupIn 0.4s cubic-bezier(.22,1,.36,1)" }}>
        <div style={{ position: "relative", aspectRatio: "16/9", background: "#000" }}>
          <iframe
  width="100%"
  height="100%"
  src="https://www.youtube.com/embed/H8IBZjzBRoM?autoplay=1&mute=0"
  title="Suj Commercial"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  style={{ display: "block", border: "none" }}
/>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase", color: "#ff6a00" }}>✦ Suj · Premium Food</span>
            <button onClick={onClose} style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", width: "32px", height: "32px", borderRadius: "50%", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <p style={{ margin: "0 0 4px", fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: "900", color: "#fff" }}>Taste Worth</p>
              <p style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "28px", fontWeight: "400", background: "linear-gradient(100deg, #ff6a00, #ffb347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Remembering.</p>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button onClick={toggleMute} style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", width: "36px", height: "36px", borderRadius: "50%", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{muted ? "🔇" : "🔊"}</button>
              <a href="#menu" onClick={onClose} style={{ background: "linear-gradient(135deg, #ff6a00, #ffb347)", color: "#000", textDecoration: "none", padding: "10px 20px", borderRadius: "10px", fontFamily: "'DM Sans', sans-serif", fontWeight: "800", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" }}>Order Now</a>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes popupIn { from { opacity: 0; transform: translate(-50%, -46%) scale(0.95); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }`}</style>
    </>
  );
}

function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    return () => { audioRef.current.pause(); };
  }, []);

  const toggle = () => {
    if (playing) { audioRef.current.pause(); } else { audioRef.current.play(); }
    setPlaying(!playing);
  };

  return (
    <button onClick={toggle} style={{ position: "fixed", bottom: "32px", right: "32px", zIndex: 500, width: "48px", height: "48px", borderRadius: "50%", background: playing ? "linear-gradient(135deg, #ff6a00, #ffb347)" : "rgba(255,255,255,0.07)", border: "1px solid rgba(255,106,0,0.4)", color: playing ? "#000" : "#ff6a00", fontSize: "20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: playing ? "0 0 20px rgba(255,106,0,0.5)" : "none", transition: "all 0.3s ease" }}>
      {playing ? "⏸" : "🎵"}
    </button>
  );
}

function Card({ item, index, accent, onAdd }) {
  const [ref, visible] = useIntersection();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `all 0.45s cubic-bezier(.22,1,.36,1), opacity 0.7s ease ${index * 0.12}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${index * 0.12}s`, background: "rgba(15,10,5,0.7)", border: hovered ? `1px solid ${accent}55` : "1px solid rgba(255,255,255,0.07)", borderRadius: "24px", overflow: "hidden", backdropFilter: "blur(20px)", boxShadow: hovered ? `0 30px 60px rgba(0,0,0,0.6), 0 0 40px ${accent}22` : "0 8px 32px rgba(0,0,0,0.5)", cursor: "pointer", flex: "1 1 280px", maxWidth: "340px", minWidth: "260px" }}>
      <div style={{ position: "relative", overflow: "hidden", height: "220px" }}>
        <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.07)" : "scale(1)", transition: "transform 0.6s cubic-bezier(.22,1,.36,1)", filter: hovered ? "brightness(1.1)" : "brightness(0.85)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }} />
        <span style={{ position: "absolute", top: "14px", right: "14px", background: accent, color: "#000", fontSize: "10px", fontFamily: "'DM Mono', monospace", fontWeight: "700", letterSpacing: "1.5px", padding: "5px 10px", borderRadius: "20px", textTransform: "uppercase" }}>{item.tag}</span>
      </div>
      <div style={{ padding: "22px 24px 26px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
          <h3 style={{ margin: 0, fontSize: "20px", fontFamily: "'Playfair Display', serif", fontWeight: "700", color: "#fff", letterSpacing: "-0.3px" }}>{item.name}</h3>
          <span style={{ fontSize: "19px", fontFamily: "'DM Mono', monospace", fontWeight: "700", color: accent, whiteSpace: "nowrap", marginLeft: "12px" }}>{item.price}</span>
        </div>
        <p style={{ margin: "0 0 20px", fontSize: "13px", lineHeight: "1.65", color: "rgba(255,255,255,0.48)", fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
        <button onClick={handleAdd} style={{ width: "100%", padding: "13px", border: `1.5px solid ${added ? "#22c55e" : accent}`, borderRadius: "12px", background: added ? "#22c55e" : hovered ? accent : "transparent", color: added ? "#fff" : hovered ? "#000" : accent, fontFamily: "'DM Sans', sans-serif", fontWeight: "700", fontSize: "13px", letterSpacing: "1.2px", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s ease" }}>
          {added ? "✓ Added!" : "+ Add to Order"}
        </button>
      </div>
    </div>
  );
}

function CartDrawer({ cart, onClose, onRemove, onQtyChange }) {
  const total = cart.reduce((sum, i) => sum + i.qty * parseInt(i.price.replace("₱", "")), 0);
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 900, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", animation: "fadeIn 0.25s ease" }} />
      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(420px, 100vw)", zIndex: 1000, background: "rgba(10,7,3,0.97)", backdropFilter: "blur(30px)", borderLeft: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", animation: "slideIn 0.35s cubic-bezier(.22,1,.36,1)", boxShadow: "-20px 0 60px rgba(0,0,0,0.6)" }}>
        <div style={{ padding: "28px 28px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: "700", color: "#fff" }}>Your Order</h2>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "2px" }}>{cart.reduce((s, i) => s + i.qty, 0)} ITEM{cart.reduce((s, i) => s + i.qty, 0) !== 1 ? "S" : ""}</span>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.07)", border: "none", color: "#fff", width: "38px", height: "38px", borderRadius: "10px", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 28px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,0.25)" }}>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>🛒</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px" }}>Your order is empty</p>
            </div>
          ) : cart.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "14px", alignItems: "center", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <img src={item.image} alt={item.name} style={{ width: "60px", height: "60px", borderRadius: "12px", objectFit: "cover", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: "0 0 4px", fontFamily: "'Playfair Display', serif", fontSize: "15px", fontWeight: "700", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                <p style={{ margin: 0, fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#ff6a00" }}>{item.price}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                <button onClick={() => onQtyChange(item.name, -1)} style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "14px", color: "#fff", minWidth: "16px", textAlign: "center" }}>{item.qty}</span>
                <button onClick={() => onQtyChange(item.name, 1)} style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(255,106,0,0.2)", border: "none", color: "#ff6a00", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
              </div>
              <button onClick={() => onRemove(item.name)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.2)", fontSize: "18px", cursor: "pointer", padding: "4px", marginLeft: "4px", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#ff4444"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.2)"}
              >🗑</button>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div style={{ padding: "20px 28px 32px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>Total</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "22px", fontWeight: "700", color: "#ff6a00" }}>₱{total.toLocaleString()}</span>
            </div>
            <button style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg, #ff6a00, #ffb347)", border: "none", borderRadius: "14px", color: "#000", fontFamily: "'DM Sans', sans-serif", fontWeight: "800", fontSize: "14px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer", boxShadow: "0 10px 30px rgba(255,106,0,0.4)" }}
              onClick={() => alert(`Order placed! Total: ₱${total.toLocaleString()} 🎉\nThank you pare!`)}
            >Place Order · ₱{total.toLocaleString()}</button>
          </div>
        )}
      </div>
    </>
  );
}

function SectionTitle({ children, visible }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "36px", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-20px)", transition: "all 0.7s ease" }}>
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: "700", color: "#fff", letterSpacing: "-0.5px" }}>{children}</span>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(255,255,255,0.15), transparent)" }} />
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showCommercial, setShowCommercial] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroRef, heroVisible] = useIntersection(0.01);
  const [foodRef, foodVisible] = useIntersection(0.05);
  const [drinkRef, drinkVisible] = useIntersection(0.05);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) return prev.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (name) => setCart(prev => prev.filter(i => i.name !== name));
  const changeQty = (name, delta) => setCart(prev => prev.map(i => i.name === name ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0));
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  const handleLoaderFinish = () => {
    setLoading(false);
    setTimeout(() => setShowCommercial(true), 800);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;700&family=DM+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <>
      {loading && <Loader onFinish={handleLoaderFinish} />}
      {showCommercial && <CommercialPopup onClose={() => setShowCommercial(false)} />}
      <div style={{ minHeight: "100vh", background: "#080604", color: "#fff", overflowX: "hidden", fontFamily: "'DM Sans', sans-serif" }}>
        {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onQtyChange={changeQty} />}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, #ff6a0055 0%, transparent 70%)", top: "-200px", left: "-200px", filter: "blur(80px)" }} />
          <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, #c8860033 0%, transparent 70%)", bottom: "20%", right: "-100px", filter: "blur(100px)" }} />
          <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, #ff4d0022 0%, transparent 70%)", top: "50%", left: "40%", filter: "blur(120px)" }} />
        </div>
        <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`, opacity: 0.4 }} />

        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, padding: "0 48px", height: "72px", display: "flex", justifyContent: "space-between", alignItems: "center", background: scrolled ? "rgba(8,6,4,0.85)" : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent", transition: "all 0.4s ease" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: "700", letterSpacing: "-0.5px" }}><span style={{ color: "#ff6a00" }}>Suj</span></span>
          <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
            {["Menu", "Contact"].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", fontWeight: "500", letterSpacing: "0.5px", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#ff6a00"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}
              >{link}</a>
            ))}
            <button onClick={() => setShowCommercial(true)} style={{ background: "rgba(255,106,0,0.1)", border: "1px solid rgba(255,106,0,0.3)", color: "#ff6a00", padding: "10px 18px", borderRadius: "10px", fontSize: "13px", fontWeight: "700", letterSpacing: "0.8px", textTransform: "uppercase", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>▶ Watch Ad</button>
            <a href="#menu" style={{ background: "linear-gradient(to right, #ff6a00, #ffb347)", color: "#000", textDecoration: "none", padding: "10px 22px", borderRadius: "10px", fontSize: "13px", fontWeight: "700", letterSpacing: "0.8px", textTransform: "uppercase" }}>Order Now</a>
            <button onClick={() => setCartOpen(true)} style={{ position: "relative", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "10px 18px", borderRadius: "10px", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
              🛒
              {totalItems > 0 && <span style={{ background: "linear-gradient(135deg, #ff6a00, #ffb347)", color: "#000", fontFamily: "'DM Mono', monospace", fontWeight: "700", fontSize: "11px", borderRadius: "20px", padding: "2px 8px", minWidth: "20px", textAlign: "center" }}>{totalItems}</span>}
            </button>
          </div>
        </nav>

        <section ref={heroRef} style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", zIndex: 2 }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center 40%", filter: "brightness(0.22) saturate(0.5)", transform: "scale(1.04)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(20,8,0,0.7) 0%, transparent 50%, rgba(8,4,0,0.9) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,6,4,0.5) 0%, transparent 30%, transparent 60%, rgba(8,6,4,1) 100%)" }} />
          <div style={{ position: "absolute", width: "900px", height: "700px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,100,0,0.28) 0%, rgba(255,60,0,0.10) 40%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%, -52%)", filter: "blur(60px)", pointerEvents: "none", animation: "glowPulse 4s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: "600px", height: "500px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,180,30,0.18) 0%, transparent 65%)", top: "38%", left: "50%", transform: "translate(-50%, -50%)", filter: "blur(80px)", pointerEvents: "none", animation: "glowPulse 4s ease-in-out infinite 1s" }} />
          <div style={{ position: "absolute", left: "32px", top: "50%", transform: "translateY(-50%) rotate(-90deg)", transformOrigin: "center center", opacity: heroVisible ? 0.3 : 0, transition: "opacity 1.2s ease 0.8s", whiteSpace: "nowrap" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "5px", textTransform: "uppercase", color: "#fff" }}>✦ Est. 2026 · Suj · Premium Food</span>
          </div>
          <div style={{ position: "absolute", right: "32px", top: "50%", transform: "translateY(-50%) rotate(90deg)", transformOrigin: "center center", opacity: heroVisible ? 0.3 : 0, transition: "opacity 1.2s ease 0.9s", whiteSpace: "nowrap" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "5px", textTransform: "uppercase", color: "#fff" }}>Taste · Craft · Passion ✦</span>
          </div>
          <div style={{ position: "absolute", top: "90px", left: "48px", opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(-8px)", transition: "all 1s ease 0.3s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "1px", background: "linear-gradient(to right, transparent, #ff6a00)" }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(255,106,0,0.7)" }}>Sample · PH</span>
            </div>
          </div>
          <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: "900px", padding: "0 40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "40px", opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(14px)", transition: "all 0.9s ease 0.1s" }}>
              <div style={{ width: "28px", height: "1px", background: "#ff6a00" }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(255,160,60,0.8)" }}>Premium Food Experience</span>
              <div style={{ width: "28px", height: "1px", background: "#ff6a00" }} />
            </div>
            <div style={{ marginBottom: "12px", opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(30px)", transition: "all 1s cubic-bezier(.22,1,.36,1) 0.2s" }}>
              <span style={{ display: "block", fontFamily: "'Playfair Display', serif", fontSize: "clamp(60px, 10vw, 120px)", fontWeight: "900", lineHeight: 0.95, letterSpacing: "-3px", color: "#fff" }}>Taste</span>
            </div>
            <div style={{ marginBottom: "12px", opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(30px)", transition: "all 1s cubic-bezier(.22,1,.36,1) 0.32s" }}>
              <span style={{ display: "block", fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(60px, 10vw, 120px)", fontWeight: "400", lineHeight: 0.95, letterSpacing: "-2px", background: "linear-gradient(100deg, #ff6a00 0%, #ffb347 40%, #ff8c00 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Worth</span>
            </div>
            <div style={{ marginBottom: "48px", opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(30px)", transition: "all 1s cubic-bezier(.22,1,.36,1) 0.44s" }}>
              <span style={{ display: "block", fontFamily: "'Playfair Display', serif", fontSize: "clamp(60px, 10vw, 120px)", fontWeight: "900", lineHeight: 0.95, letterSpacing: "-3px", color: "#fff" }}>Remembering</span>
            </div>
            <div style={{ width: heroVisible ? "120px" : "0px", height: "1px", background: "linear-gradient(to right, transparent, #ff6a00, transparent)", marginBottom: "32px", transition: "width 1s ease 0.7s" }} />
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "16px", lineHeight: "1.9", maxWidth: "420px", margin: "0 0 50px", fontWeight: "300", letterSpacing: "0.3px", fontFamily: "'DM Sans', sans-serif", opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(16px)", transition: "all 1s ease 0.6s" }}>
              Premium meals crafted with intention.<br />Refreshing drinks made with care.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(16px)", transition: "all 1s ease 0.72s" }}>
              <a href="#menu" style={{ padding: "17px 40px", background: "linear-gradient(135deg, #ff6a00, #ffb347)", color: "#000", borderRadius: "100px", fontWeight: "800", fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", textDecoration: "none", boxShadow: "0 0 40px rgba(255,106,0,0.4), 0 20px 40px rgba(0,0,0,0.4)", fontFamily: "'DM Sans', sans-serif" }}>Explore Menu</a>
              <button onClick={() => setShowCommercial(true)} style={{ padding: "17px 40px", background: "transparent", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "100px", fontWeight: "500", fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer", backdropFilter: "blur(12px)", fontFamily: "'DM Sans', sans-serif" }}>▶ Watch Commercial</button>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: "44px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", opacity: heroVisible ? 0.35 : 0, transition: "opacity 1.2s ease 1.2s", animation: heroVisible ? "bounce 2.5s ease infinite 2s" : "none" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Scroll</span>
            <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, rgba(255,106,0,0.6), transparent)" }} />
          </div>
        </section>

        <div style={{ position: "relative", zIndex: 2, borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
          {[{ num: "6+", label: "Menu Items" }, { num: "₱35", label: "Starting Price" }, { num: "Fast", label: "Delivery" }, { num: "100%", label: "Fresh Daily" }].map((stat, i) => (
            <div key={i} style={{ padding: "30px 52px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: "700", color: "#ff6a00", marginBottom: "4px" }}>{stat.num}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <section id="menu" style={{ padding: "100px 48px", position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ marginBottom: "72px", textAlign: "center" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#ff6a00", display: "block", marginBottom: "14px" }}>What We Serve</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 5vw, 64px)", fontWeight: "900", margin: 0, letterSpacing: "-1.5px", color: "#fff" }}>Our Best Sellers</h2>
            </div>
            <div ref={foodRef}>
              <SectionTitle visible={foodVisible}>🍔 Foods</SectionTitle>
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "72px" }}>
                {foods.map((item, i) => <Card key={i} item={item} index={i} accent="#ff6a00" onAdd={addToCart} />)}
              </div>
            </div>
            <div ref={drinkRef}>
              <SectionTitle visible={drinkVisible}>🥤 Drinks</SectionTitle>
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                {drinks.map((item, i) => <Card key={i} item={item} index={i} accent="#ffb347" onAdd={addToCart} />)}
              </div>
            </div>
          </div>
        </section>

        <footer id="contact" style={{ position: "relative", zIndex: 2, borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)", padding: "80px 48px 48px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "48px", marginBottom: "60px" }}>
              <div style={{ maxWidth: "320px" }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: "700" }}><span style={{ color: "#ff6a00" }}>Suj</span></span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "14px", lineHeight: "1.8", margin: 0 }}>Premium food crafted with intention, delivered with speed. Sample lang pare.</p>
              </div>
              <div>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#ff6a00", display: "block", marginBottom: "16px" }}>Get In Touch</span>
                <a href="https://facebook.com/justinedotaa" target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "linear-gradient(135deg, #1877f2, #0a5dc2)", color: "#fff", textDecoration: "none", padding: "13px 22px", borderRadius: "12px", fontFamily: "'DM Sans', sans-serif", fontWeight: "700", fontSize: "14px", letterSpacing: "0.5px", boxShadow: "0 8px 24px rgba(24,119,242,0.35)", transition: "all 0.3s ease" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" /></svg>
                  DM me on Facebook
                </a>
              </div>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "28px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", fontFamily: "'DM Mono', monospace" }}>© 2026 Suj · All rights reserved</span>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", fontFamily: "'DM Mono', monospace" }}>Sample · PH</span>
            </div>
          </div>
        </footer>

        <MusicPlayer />

        <style>{`
          @keyframes bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }
          @keyframes glowPulse { 0%, 100% { opacity: 1; transform: translate(-50%, -52%) scale(1); } 50% { opacity: 0.65; transform: translate(-50%, -52%) scale(1.08); } }
          @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          * { box-sizing: border-box; }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: #080604; }
          ::-webkit-scrollbar-thumb { background: #ff6a0055; border-radius: 3px; }
          html { scroll-behavior: smooth; }
        `}</style>
      </div>
    </>
  );
}
