import { useState, useEffect, useRef } from "react";

const PRODUCTS = [
  { id:1, name:"Sparepart Industri", desc:"Suku cadang mesin & peralatan industri berbahan besi tempa berkualitas tinggi.", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop", tag:"Industri" },
  { id:2, name:"Tiang Listrik", desc:"Tiang besi kokoh untuk instalasi listrik dan proyek infrastruktur.", img:"https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&auto=format&fit=crop", tag:"Konstruksi" },
  { id:3, name:"Alat Pertanian", desc:"Cangkul, parang, bajak, dan perkakas pertanian tradisional yang tahan lama.", img:"https://images.unsplash.com/photo-1586864387789-628af9feed72?w=600&auto=format&fit=crop", tag:"Pertanian" },
  { id:4, name:"Pagar & Teralis Custom", desc:"Desain pagar dan teralis besi sesuai pesanan — dari klasik hingga modern.", img:"https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&auto=format&fit=crop", tag:"Custom" },
  { id:5, name:"Perkakas Dapur", desc:"Wajan besi, spatula, dan peralatan dapur tradisional yang awet seumur hidup.", img:"https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop", tag:"Rumah Tangga" },
  { id:6, name:"Pesanan Custom", desc:"Produk besi apa pun sesuai desain & spesifikasi Anda. Diskusikan kebutuhan Anda.", img:"https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=600&auto=format&fit=crop", tag:"Custom" },
];

const GALLERY = [
  { id:1, src:"https://images.unsplash.com/photo-1565785901975-8b40df05e07d?w=600&auto=format&fit=crop", caption:"Proses tempa di tungku tradisional" },
  { id:2, src:"https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=600&auto=format&fit=crop", caption:"Pengrajin senior 20+ tahun" },
  { id:3, src:"https://images.unsplash.com/photo-1547623542-de3ff5941ddb?w=600&auto=format&fit=crop", caption:"Display produk siap kirim" },
  { id:4, src:"https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&auto=format&fit=crop", caption:"Workshop Desa Kureksari" },
  { id:5, src:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop", caption:"Sparepart hasil produksi" },
  { id:6, src:"https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=600&auto=format&fit=crop", caption:"Proses finishing produk" },
];

const INIT_REVIEWS = [
  { id:1, name:"Budi Hartono", city:"Surabaya", role:"Manajer Produksi", rating:5, text:"Kualitas sparepart dari sini beda banget sama yang di pasaran. Sudah 2 tahun pakai, belum ada masalah. Harganya juga kompetitif.", product:"Sparepart Industri", verified:true },
  { id:2, name:"Rudi Santoso", city:"Sidoarjo", role:"Kontraktor", rating:5, text:"Pesan tiang listrik custom, selesai tepat waktu dan hasilnya sangat memuaskan. Komunikasi via WhatsApp juga responsif sekali.", product:"Tiang Listrik", verified:true },
  { id:3, name:"Siti Julaiha", city:"Mojokerto", role:"Petani", rating:4, text:"Sudah langganan 3 tahun buat kebutuhan alat pertanian. Produknya kuat dan awet. Harga langsung dari pengrajin jauh lebih murah.", product:"Alat Pertanian", verified:true },
];

const TICKER = ["Sparepart Industri","✦","Tiang Listrik","✦","Alat Pertanian","✦","Pagar Custom","✦","Pesanan Custom","✦","Perkakas Dapur","✦","Sparepart Industri","✦","Tiang Listrik","✦","Alat Pertanian","✦","Pagar Custom","✦","Pesanan Custom","✦","Perkakas Dapur","✦"];
const PALETTE = ["#B84A2F","#C9A84C","#3a6b3a","#2F5FA8","#7B3FA8"];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth <= breakpoint : false);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [breakpoint]);
  return isMobile;
}

function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function Stars({ count, size = 16 }) {
  return (
    <span style={{ color: "#C9A84C", fontSize: size }}>
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

const WA_SVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// ── SECTIONS ──────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobile = useIsMobile();
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);
  const navLinks = [["#about","Tentang"],["#products","Produk"],["#gallery","Galeri"],["#reviews","Ulasan"]];
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"space-between", padding: scrolled ? "14px clamp(20px,4vw,40px)" : "20px clamp(20px,4vw,40px)", background: scrolled ? "rgba(24,24,24,0.97)" : "rgba(24,24,24,0.6)", backdropFilter:"blur(12px)", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent", transition:"all 0.4s ease" }}>
      <a href="#hero" style={{ fontFamily:"Georgia,serif", fontSize:"1.2rem", fontWeight:900, color:"#C9A84C", textDecoration:"none", letterSpacing:"0.08em", zIndex:101 }}>
        BESI<span style={{ color:"#B84A2F", fontStyle:"italic" }}>KUREKSARI</span>
      </a>
      {mobile ? (
        <>
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background:"none", border:"none", cursor:"pointer", zIndex:101, padding:8, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
            <div style={{ width:22, height:2, background:"#fff", marginBottom:5, transition:"all 0.3s", transform: mobileOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <div style={{ width:22, height:2, background:"#fff", marginBottom:5, transition:"all 0.3s", opacity: mobileOpen ? 0 : 1 }} />
            <div style={{ width:22, height:2, background:"#fff", transition:"all 0.3s", transform: mobileOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
          {mobileOpen && (
            <div style={{ position:"fixed", inset:0, background:"rgba(24,24,24,0.98)", zIndex:100, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:28 }}>
              {navLinks.map(([href, label]) => (
                <a key={href} href={href} onClick={() => setMobileOpen(false)} style={{ color:"rgba(255,255,255,0.8)", textDecoration:"none", fontSize:"1.1rem", letterSpacing:"0.12em", textTransform:"uppercase", transition:"color 0.2s" }}>{label}</a>
              ))}
              <a href="#contact" onClick={() => setMobileOpen(false)} style={{ background:"#B84A2F", color:"#fff", padding:"12px 28px", textDecoration:"none", fontSize:"0.85rem", letterSpacing:"0.1em", textTransform:"uppercase", fontWeight:600, marginTop:8 }}>Hubungi Kami</a>
            </div>
          )}
        </>
      ) : (
        <div style={{ display:"flex", alignItems:"center", gap:32 }}>
          {navLinks.map(([href, label]) => (
            <a key={href} href={href} style={{ color:"rgba(255,255,255,0.6)", textDecoration:"none", fontSize:"0.75rem", letterSpacing:"0.15em", textTransform:"uppercase", transition:"color 0.2s" }}
              onMouseEnter={e => e.target.style.color="#fff"}
              onMouseLeave={e => e.target.style.color="rgba(255,255,255,0.6)"}>{label}</a>
          ))}
          <a href="#contact" style={{ background:"#B84A2F", color:"#fff", padding:"8px 20px", textDecoration:"none", fontSize:"0.72rem", letterSpacing:"0.1em", textTransform:"uppercase", fontWeight:600, transition:"background 0.2s" }}
            onMouseEnter={e => e.target.style.background="#E8651A"}
            onMouseLeave={e => e.target.style.background="#B84A2F"}>Hubungi Kami</a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);
  const sparks = [{top:"22%",left:"74%",d:0},{top:"58%",left:"82%",d:0.6},{top:"38%",left:"63%",d:1.1},{top:"72%",left:"71%",d:0.3}];
  return (
    <section id="hero" style={{ minHeight:"100vh", background:"#181818", position:"relative", overflow:"hidden", display:"flex", alignItems:"center" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:`url(https://images.unsplash.com/photo-1565785901975-8b40df05e07d?w=1600&auto=format&fit=crop&q=75)`, backgroundSize:"cover", backgroundPosition:"center", opacity:0.18 }} />
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(105deg, #181818 45%, rgba(24,24,24,0.7) 75%, rgba(24,24,24,0.2) 100%)" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(255,255,255,0.018) 59px,rgba(255,255,255,0.018) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(255,255,255,0.018) 59px,rgba(255,255,255,0.018) 60px)" }} />

      {sparks.map((s,i) => (
        <div key={i} style={{ position:"absolute", top:s.top, left:s.left, width:3+i%2, height:3+i%2, borderRadius:"50%", background:"#E8651A", animation:`floatSpark ${3.5+i*0.5}s ease-in-out ${s.d}s infinite` }} />
      ))}

      <div style={{ position:"absolute", right:"6%", top:"50%", transform:"translateY(-50%)", width:360, height:360, borderRadius:"50%", border:"1px solid rgba(201,168,76,0.1)", animation:"spinSlow 35s linear infinite" }} />
      <div style={{ position:"absolute", right:"6%", top:"50%", transform:"translateY(-50%)", width:260, height:260, borderRadius:"50%", border:"1px solid rgba(184,74,47,0.15)", animation:"spinSlow 22s linear infinite reverse" }} />

      <div className="hero-content" style={{ position:"relative", zIndex:2, padding:"130px clamp(24px,5vw,60px) 80px", maxWidth:780 }}>
        <div style={{ opacity: mounted ? 1:0, transform: mounted ? "translateY(0)":"translateY(30px)", transition:"all 0.8s ease 0.2s", display:"inline-flex", alignItems:"center", gap:10, fontSize:"0.65rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"#B84A2F", fontWeight:600, marginBottom:28, border:"1px solid rgba(184,74,47,0.3)", padding:"6px 14px" }}>
          <span style={{ width:20, height:1, background:"#B84A2F", display:"block" }} />
          Pande Besi Tradisional · Desa Kureksari · Sidoarjo
        </div>

        <h1 style={{ opacity: mounted ? 1:0, transform: mounted ? "translateY(0)":"translateY(40px)", transition:"all 0.8s ease 0.35s", fontFamily:"Georgia,serif", fontSize:"clamp(3.2rem,7vw,6.5rem)", fontWeight:900, lineHeight:1.08, color:"#fff", marginBottom:28 }}>
          Kualitas{" "}<span style={{ color:"#B84A2F", fontStyle:"italic" }}>Besi</span><br/>dari Tangan<br/><span style={{ color:"#C9A84C" }}>Para Ahli.</span>
        </h1>

        <p style={{ opacity: mounted ? 1:0, transform: mounted ? "translateY(0)":"translateY(30px)", transition:"all 0.8s ease 0.5s", color:"rgba(255,255,255,0.55)", fontSize:"1rem", lineHeight:1.85, maxWidth:480, marginBottom:40 }}>
          Pande besi Kureksari telah menempa produk berkualitas selama puluhan tahun — sparepart industri, tiang listrik, alat pertanian, hingga pesanan custom. Pesan langsung dari pengrajinnya.
        </p>

        <div className="hero-btns" style={{ opacity: mounted ? 1:0, transform: mounted ? "translateY(0)":"translateY(20px)", transition:"all 0.8s ease 0.65s", display:"flex", gap:16, flexWrap:"wrap" }}>
          <a href="#products" style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#B84A2F", color:"#fff", padding:"14px 32px", textDecoration:"none", fontSize:"0.85rem", fontWeight:600, letterSpacing:"0.05em", transition:"all 0.25s" }}
            onMouseEnter={e => { e.currentTarget.style.background="#E8651A"; e.currentTarget.style.transform="translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="#B84A2F"; e.currentTarget.style.transform="translateY(0)"; }}>
            Lihat Produk →
          </a>
          <a href="#contact" style={{ display:"inline-flex", alignItems:"center", gap:10, border:"1px solid rgba(255,255,255,0.2)", color:"rgba(255,255,255,0.75)", padding:"14px 32px", textDecoration:"none", fontSize:"0.85rem", fontWeight:500, letterSpacing:"0.05em", transition:"all 0.25s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="#C9A84C"; e.currentTarget.style.color="#C9A84C"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"; e.currentTarget.style.color="rgba(255,255,255,0.75)"; }}>
            <WA_SVG /> WhatsApp Sekarang
          </a>
        </div>

        <div className="hero-stats" style={{ opacity: mounted ? 1:0, transition:"opacity 0.8s ease 0.85s", display:"flex", gap:40, marginTop:56, paddingTop:36, borderTop:"1px solid rgba(255,255,255,0.1)" }}>
          {[["25+","Tahun Pengalaman"],["500+","Pelanggan Puas"],["100%","Produk Lokal"]].map(([n,l]) => (
            <div key={l}>
              <span style={{ fontFamily:"Georgia,serif", fontSize:"2.4rem", fontWeight:900, color:"#C9A84C", display:"block", lineHeight:1 }}>{n}</span>
              <span style={{ color:"rgba(255,255,255,0.38)", fontSize:"0.68rem", letterSpacing:"0.18em", textTransform:"uppercase" }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-right" style={{ position:"absolute", right:0, top:0, bottom:0, width:"36%", zIndex:1 }}>
        <div style={{ position:"absolute", left:0, top:0, bottom:0, width:100, background:"linear-gradient(90deg,#181818,transparent)", zIndex:2 }} />
        <img src="https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&auto=format&fit=crop&q=80" style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.45 }} alt="" />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,rgba(24,24,24,0.5) 0%,transparent 40%,rgba(24,24,24,0.7) 100%)" }} />
      </div>

      <div style={{ position:"absolute", bottom:24, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:6, zIndex:3 }}>
        <span style={{ color:"rgba(255,255,255,0.28)", fontSize:"0.6rem", letterSpacing:"0.22em", textTransform:"uppercase" }}>Scroll</span>
        <div style={{ width:1, height:40, background:"linear-gradient(180deg,#B84A2F,transparent)", animation:"bounceY 1.5s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

function Ticker() {
  return (
    <div style={{ background:"#B84A2F", padding:"12px 0", overflow:"hidden" }}>
      <div style={{ display:"flex", width:"max-content", animation:"marquee 22s linear infinite" }}>
        {TICKER.map((t,i) => (
          <span key={i} style={{ color:"rgba(255,255,255,0.9)", fontSize:"0.68rem", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:600, padding:"0 20px", whiteSpace:"nowrap" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function About() {
  const mobile = useIsMobile();
  return (
    <section id="about" style={{ background:"#F4EFE6", padding: mobile ? "60px 24px" : "90px clamp(24px,5vw,60px)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 40 : 80, alignItems:"center" }}>
        <FadeUp>
          <div style={{ position:"relative" }}>
            <div style={{ overflow:"hidden", borderRadius:2, boxShadow:"0 24px 60px rgba(0,0,0,0.18)" }}>
              <img src="https://images.unsplash.com/photo-1565785901975-8b40df05e07d?w=800&auto=format&fit=crop" style={{ width:"100%", height: mobile ? 300 : 500, objectFit:"cover", display:"block", transition:"transform 0.7s ease, filter 0.4s", filter:"saturate(0.85)" }}
                onMouseEnter={e => { e.target.style.transform="scale(1.05)"; e.target.style.filter="saturate(1.1)"; }}
                onMouseLeave={e => { e.target.style.transform="scale(1)"; e.target.style.filter="saturate(0.85)"; }} alt="Proses pande besi"/>
            </div>
            <div style={{ position:"absolute", bottom:-16, right:-16, width:"100%", height:"100%", border:"1px solid rgba(201,168,76,0.35)", borderRadius:2, zIndex:-1, pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:-24, left:28, background:"#181818", color:"#fff", padding:"18px 24px" }}>
              <p style={{ fontFamily:"Georgia,serif", fontSize:"1.8rem", fontWeight:900, color:"#C9A84C", lineHeight:1 }}>Kureksari</p>
              <p style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.68rem", letterSpacing:"0.15em", textTransform:"uppercase", marginTop:4 }}>Waru, Sidoarjo</p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:10, fontSize:"0.65rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"#B84A2F", fontWeight:600, marginBottom:16 }}>
            <span style={{ width:22, height:1, background:"#B84A2F", display:"block" }} /> Tentang Kami
          </div>
          <h2 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(2.2rem,4vw,3.4rem)", fontWeight:900, lineHeight:1.1, marginBottom:24, color:"#181818" }}>
            Diwariskan<br/><span style={{ color:"#B84A2F", fontStyle:"italic" }}>Lintas Generasi</span>
          </h2>
          <p style={{ color:"#6b6b6b", fontSize:"0.97rem", lineHeight:1.9, marginBottom:16 }}>
            Desa Kureksari di Sidoarjo dikenal sebagai salah satu sentra pande besi tertua di Jawa Timur. Para pengrajin di sini mewarisi ilmu tempa besi secara turun-temurun selama lebih dari dua dekade.
          </p>
          <p style={{ color:"#6b6b6b", fontSize:"0.97rem", lineHeight:1.9, marginBottom:28 }}>
            Setiap produk dibuat dengan tangan oleh para ahli — bukan produksi massal. Kami memastikan setiap detail diperhatikan, dari pemilihan bahan hingga hasil akhir yang kuat dan tahan lama.
          </p>
          <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10, marginBottom:32 }}>
            {["Bahan baku pilihan, kontrol kualitas ketat","Pengerjaan custom sesuai kebutuhan pelanggan","Pengiriman ke seluruh wilayah Jawa Timur","Harga kompetitif, langsung dari pengrajin","Pelayanan responsif via WhatsApp"].map(item => (
              <li key={item} style={{ display:"flex", alignItems:"center", gap:12, fontSize:"0.88rem", color:"#2c2c2c" }}>
                <span style={{ color:"#B84A2F", fontSize:"0.7rem" }}>✦</span>{item}
              </li>
            ))}
          </ul>
          <a href="#contact" style={{ fontSize:"0.85rem", fontWeight:600, color:"#B84A2F", textDecoration:"none", borderBottom:"1px solid rgba(184,74,47,0.4)", paddingBottom:2, transition:"border-color 0.2s" }}>Hubungi Kami Sekarang →</a>
        </FadeUp>
      </div>
    </section>
  );
}

function Products() {
  const [hovered, setHovered] = useState(null);
  const mobile = useIsMobile();
  const isSmall = useIsMobile(480);
  return (
    <section id="products" style={{ background:"#181818", padding: mobile ? "60px 24px" : "90px clamp(24px,5vw,60px)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <FadeUp>
          <div className="section-header" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:52, flexWrap:"wrap", gap:20 }}>
            <div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:10, fontSize:"0.65rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"#B84A2F", fontWeight:600, marginBottom:14 }}>
                <span style={{ width:22, height:1, background:"#B84A2F", display:"block" }} /> Produk Kami
              </div>
              <h2 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(2.2rem,4vw,3.4rem)", fontWeight:900, color:"#fff", lineHeight:1.1 }}>
                Apa yang <span style={{ color:"#B84A2F", fontStyle:"italic" }}>Kami Buat</span>
              </h2>
            </div>
            <p className="section-header-desc" style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.85rem", maxWidth:340, lineHeight:1.7 }}>
              Semua produk dibuat secara handmade oleh pengrajin berpengalaman di Desa Kureksari.
            </p>
          </div>
        </FadeUp>

        <div style={{ display:"grid", gridTemplateColumns: isSmall ? "1fr" : mobile ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: mobile ? 6 : 2 }}>
          {PRODUCTS.map((p,i) => (
            <FadeUp key={p.id} delay={i * 0.07}>
              <div style={{ position:"relative", overflow:"hidden", cursor:"pointer", background:"#2c2c2c", transform: hovered===p.id ? "scale(1.015)" : "scale(1)", transition:"transform 0.35s ease", zIndex: hovered===p.id ? 2:1 }}
                onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)}>
                <div style={{ overflow:"hidden", height: mobile ? 200 : 270 }}>
                  <img src={p.img} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover", opacity: hovered===p.id ? 0.8:0.55, transform: hovered===p.id ? "scale(1.07)":"scale(1)", transition:"all 0.6s ease", display:"block" }} />
                </div>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)" }} />
                <div style={{ position:"absolute", top:14, left:14, background:"#B84A2F", color:"#fff", fontSize:"0.6rem", letterSpacing:"0.15em", textTransform:"uppercase", padding:"4px 10px", fontWeight:700 }}>{p.tag}</div>
                <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"20px 22px" }}>
                  <h3 style={{ fontFamily:"Georgia,serif", fontSize:"1.35rem", fontWeight:700, color:"#fff", marginBottom:6, lineHeight:1.2 }}>{p.name}</h3>
                  <p style={{ color:"rgba(255,255,255,0.6)", fontSize:"0.75rem", lineHeight:1.6, opacity: hovered===p.id ? 1:0, transform: hovered===p.id ? "translateY(0)":"translateY(8px)", transition:"all 0.35s ease", marginBottom: hovered===p.id ? 10:0 }}>{p.desc}</p>
                  <a href="#contact" style={{ display:"inline-flex", alignItems:"center", gap:6, color:"#C9A84C", fontSize:"0.72rem", letterSpacing:"0.1em", textTransform:"uppercase", fontWeight:600, textDecoration:"none", borderBottom:"1px solid rgba(201,168,76,0.4)", paddingBottom:1, opacity: hovered===p.id ? 1:0, transform: hovered===p.id ? "translateY(0)":"translateY(8px)", transition:"all 0.35s ease 0.05s" }}>Tanya Harga →</a>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3}>
          <div style={{ marginTop:40, textAlign:"center" }}>
            <p style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.82rem", marginBottom:14 }}>Tidak menemukan yang Anda cari?</p>
            <a href="#contact" style={{ display:"inline-block", border:"1px solid rgba(201,168,76,0.3)", color:"#C9A84C", fontSize:"0.82rem", padding:"10px 28px", textDecoration:"none", letterSpacing:"0.08em", transition:"border-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor="#C9A84C"}
              onMouseLeave={e => e.currentTarget.style.borderColor="rgba(201,168,76,0.3)"}>
              Diskusikan Pesanan Custom →
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const [hovered, setHovered] = useState(null);
  const mobile = useIsMobile();
  const isSmall = useIsMobile(480);

  return (
    <section id="gallery" style={{ background:"#FAF8F3", padding: mobile ? "60px 24px" : "90px clamp(24px,5vw,60px)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <FadeUp>
          <div className="section-header" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:48, flexWrap:"wrap", gap:20 }}>
            <div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:10, fontSize:"0.65rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"#B84A2F", fontWeight:600, marginBottom:14 }}>
                <span style={{ width:22, height:1, background:"#B84A2F", display:"block" }} /> Galeri
              </div>
              <h2 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(2.2rem,4vw,3.4rem)", fontWeight:900, lineHeight:1.1, color:"#181818" }}>
                Di Balik Setiap <span style={{ color:"#B84A2F", fontStyle:"italic" }}>Produk</span>
              </h2>
            </div>
            <p style={{ color:"#6b6b6b", fontSize:"0.85rem", maxWidth:280, lineHeight:1.7 }}>Dari percikan api di pagi hari hingga produk jadi yang siap dikirim.</p>
          </div>
        </FadeUp>

        <div style={{ display:"grid", gridTemplateColumns: isSmall ? "1fr" : mobile ? "repeat(2,1fr)" : "repeat(3,1fr)", gap:10 }}>
          {GALLERY.map((item,i) => (
            <FadeUp key={item.id} delay={i * 0.07}>
              <div style={{ overflow:"hidden", cursor:"pointer", position:"relative", borderRadius:4 }}
                onMouseEnter={() => setHovered(item.id)} onMouseLeave={() => setHovered(null)} onClick={() => setLightbox(item)}>
                <img src={item.src} alt={item.caption} style={{ width:"100%", height: mobile ? 200 : 260, objectFit:"cover", display:"block", transform: hovered===item.id ? "scale(1.07)":"scale(1)", filter: hovered===item.id ? "saturate(1.1)":"saturate(0.82)", transition:"all 0.6s ease" }} />
                <div style={{ position:"absolute", inset:0, background: hovered===item.id ? "rgba(24,24,24,0.35)":"rgba(24,24,24,0)", transition:"background 0.3s", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ color:"#fff", fontSize:"1.8rem", opacity: hovered===item.id ? 1:0, transition:"opacity 0.3s" }}>⊕</span>
                </div>
                <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"10px 14px", background:"linear-gradient(transparent,rgba(0,0,0,0.65))", color: hovered===item.id ? "rgba(255,255,255,0.9)":"rgba(255,255,255,0)", fontSize:"0.75rem", transition:"color 0.3s" }}>{item.caption}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {lightbox && (
        <div style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(0,0,0,0.94)", display:"flex", alignItems:"center", justifyContent:"center", padding:24, cursor:"pointer" }} onClick={() => setLightbox(null)}>
          <div style={{ position:"relative", maxWidth:900, width:"100%" }} onClick={e => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.caption} style={{ width:"100%", maxHeight:"82vh", objectFit:"contain", display:"block" }} />
            <p style={{ color:"rgba(255,255,255,0.55)", fontSize:"0.82rem", marginTop:12, textAlign:"center" }}>{lightbox.caption}</p>
            <button onClick={() => setLightbox(null)} style={{ position:"absolute", top:-14, right:-14, background:"#B84A2F", color:"#fff", border:"none", borderRadius:"50%", width:30, height:30, cursor:"pointer", fontSize:"1rem", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
          </div>
        </div>
      )}
    </section>
  );
}

function Reviews() {
  const [reviews, setReviews] = useState(INIT_REVIEWS);
  const [form, setForm] = useState({ name:"", city:"", product:"", rating:0, text:"" });
  const [hoverStar, setHoverStar] = useState(0);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const mobile = useIsMobile();

  const avg = (reviews.reduce((a,r) => a+r.rating, 0)/reviews.length).toFixed(1);

  const submit = () => {
    if (!form.name || !form.text || !form.rating) { setErr("Mohon isi nama, rating, dan ulasan."); return; }
    setErr("");
    setReviews(prev => [{ id:Date.now(), name:form.name, city:form.city, product:form.product, rating:form.rating, text:form.text, verified:false }, ...prev]);
    setForm({ name:"", city:"", product:"", rating:0, text:"" });
    setDone(true); setTimeout(() => setDone(false), 4000);
  };

  const inputStyle = { background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"#fff", padding:"11px 16px", fontSize:"0.88rem", outline:"none", width:"100%", fontFamily:"inherit", transition:"border-color 0.2s", borderRadius:0 };

  return (
    <section id="reviews" style={{ background:"#F4EFE6", padding: mobile ? "60px 24px" : "90px clamp(24px,5vw,60px)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <FadeUp>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems: mobile ? "flex-start" : "flex-end", marginBottom: mobile ? 36 : 52, flexWrap:"wrap", gap:20 }}>
            <div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:10, fontSize:"0.65rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"#B84A2F", fontWeight:600, marginBottom:14 }}>
                <span style={{ width:22, height:1, background:"#B84A2F", display:"block" }} /> Ulasan Pelanggan
              </div>
              <h2 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(2.2rem,4vw,3.4rem)", fontWeight:900, lineHeight:1.1, color:"#181818" }}>
                Kata <span style={{ color:"#B84A2F", fontStyle:"italic" }}>Mereka</span>
              </h2>
            </div>
            <div style={{ textAlign:"right" }}>
              <span style={{ fontFamily:"Georgia,serif", fontSize:"4.5rem", fontWeight:900, color:"#B84A2F", lineHeight:1, display:"block" }}>{avg}</span>
              <Stars count={5} size={15} />
              <p style={{ color:"#6b6b6b", fontSize:"0.75rem", marginTop:4 }}>{reviews.length} ulasan pelanggan</p>
            </div>
          </div>
        </FadeUp>

        <div style={{ display:"grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3,1fr)", gap: mobile ? 16 : 20, marginBottom:40 }}>
          {reviews.map((r,i) => {
            const initials = r.name.split(" ").map(w=>w[0]).join("").substring(0,2).toUpperCase();
            return (
              <FadeUp key={r.id} delay={i*0.07}>
                <div style={{ background:"#fff", padding:"26px", border:"1px solid rgba(0,0,0,0.05)", boxShadow:"0 2px 12px rgba(0,0,0,0.04)", display:"flex", flexDirection:"column", gap:14, transition:"box-shadow 0.3s, transform 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,0.1)"; e.currentTarget.style.transform="translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.04)"; e.currentTarget.style.transform="translateY(0)"; }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <Stars count={r.rating} size={14} />
                    {r.verified && <span style={{ fontSize:"0.62rem", color:"#2d7a2d", fontWeight:600, letterSpacing:"0.05em" }}>✓ Verified</span>}
                  </div>
                  <p style={{ color:"#3a3a3a", fontSize:"0.88rem", lineHeight:1.75, fontStyle:"italic", flex:1 }}>"{r.text}"</p>
                  <div style={{ display:"flex", alignItems:"center", gap:12, paddingTop:12, borderTop:"1px solid rgba(0,0,0,0.05)" }}>
                    <div style={{ width:38, height:38, borderRadius:"50%", background:PALETTE[i%PALETTE.length], display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:"0.85rem", flexShrink:0 }}>{initials}</div>
                    <div>
                      <p style={{ fontSize:"0.85rem", fontWeight:600, color:"#181818", lineHeight:1.3 }}>{r.name}</p>
                      <p style={{ fontSize:"0.72rem", color:"#6b6b6b", marginTop:2 }}>
                        {r.city}{r.role ? ` · ${r.role}`:""}{r.product ? ` · ${r.product}`:""}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

        <FadeUp delay={0.2}>
          <div className="review-form" style={{ background:"#181818", padding:"48px clamp(20px,4vw,52px)" }}>
            <h3 style={{ fontFamily:"Georgia,serif", fontSize:"2rem", color:"#fff", fontWeight:900, marginBottom:6 }}>Bagikan Pengalaman Anda</h3>
            <p style={{ color:"rgba(255,255,255,0.38)", fontSize:"0.85rem", marginBottom:32 }}>Ulasan Anda membantu pengrajin kami dan pembeli lain.</p>
            <div style={{ display:"grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap:14, marginBottom:14 }}>
              <div>
                <label style={{ color:"rgba(255,255,255,0.38)", fontSize:"0.65rem", letterSpacing:"0.18em", textTransform:"uppercase", display:"block", marginBottom:7 }}>Nama Anda</label>
                <input value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Nama lengkap" style={inputStyle}
                  onFocus={e=>e.target.style.borderColor="#C9A84C"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"} />
              </div>
              <div>
                <label style={{ color:"rgba(255,255,255,0.38)", fontSize:"0.65rem", letterSpacing:"0.18em", textTransform:"uppercase", display:"block", marginBottom:7 }}>Kota & Profesi</label>
                <input value={form.city} onChange={e=>setForm(p=>({...p,city:e.target.value}))} placeholder="Surabaya · Kontraktor" style={inputStyle}
                  onFocus={e=>e.target.style.borderColor="#C9A84C"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"} />
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap:14, marginBottom:14 }}>
              <div>
                <label style={{ color:"rgba(255,255,255,0.38)", fontSize:"0.65rem", letterSpacing:"0.18em", textTransform:"uppercase", display:"block", marginBottom:7 }}>Produk Dibeli</label>
                <select value={form.product} onChange={e=>setForm(p=>({...p,product:e.target.value}))} style={{...inputStyle, cursor:"pointer"}}>
                  <option value="" style={{background:"#181818"}}>-- Pilih Produk --</option>
                  {PRODUCTS.map(p=><option key={p.id} value={p.name} style={{background:"#181818"}}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ color:"rgba(255,255,255,0.38)", fontSize:"0.65rem", letterSpacing:"0.18em", textTransform:"uppercase", display:"block", marginBottom:7 }}>Rating</label>
                <div style={{ display:"flex", gap:6, alignItems:"center", paddingTop:8 }}>
                  {[1,2,3,4,5].map(s => (
                    <span key={s} style={{ fontSize:"1.6rem", cursor:"pointer", color: s<=(hoverStar||form.rating) ? "#C9A84C":"rgba(255,255,255,0.18)", transition:"color 0.15s, transform 0.15s", display:"inline-block", transform: hoverStar===s ? "scale(1.2)":"scale(1)" }}
                      onMouseEnter={()=>setHoverStar(s)} onMouseLeave={()=>setHoverStar(0)} onClick={()=>setForm(p=>({...p,rating:s}))}>★</span>
                  ))}
                  {(hoverStar||form.rating) > 0 && <span style={{ color:"#C9A84C", fontSize:"0.72rem", marginLeft:6 }}>{["","Buruk","Cukup","Baik","Sangat Baik","Luar Biasa!"][hoverStar||form.rating]}</span>}
                </div>
              </div>
            </div>
            <div style={{ marginBottom:14 }}>
              <label style={{ color:"rgba(255,255,255,0.38)", fontSize:"0.65rem", letterSpacing:"0.18em", textTransform:"uppercase", display:"block", marginBottom:7 }}>Ulasan Anda</label>
              <textarea value={form.text} onChange={e=>setForm(p=>({...p,text:e.target.value}))} placeholder="Ceritakan pengalaman Anda dengan produk dan pelayanan kami..." style={{...inputStyle, height:110, resize:"none"}}
                onFocus={e=>e.target.style.borderColor="#C9A84C"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"} />
            </div>
            {err && <p style={{ color:"#f87171", fontSize:"0.78rem", marginBottom:10 }}>{err}</p>}
            <div style={{ display:"flex", alignItems:"center", gap:16, marginTop:6 }}>
              <button onClick={submit} style={{ background:"#B84A2F", color:"#fff", border:"none", padding:"12px 32px", fontSize:"0.85rem", fontWeight:600, letterSpacing:"0.08em", cursor:"pointer", transition:"background 0.2s, transform 0.2s", fontFamily:"inherit" }}
                onMouseEnter={e=>{e.target.style.background="#E8651A";e.target.style.transform="translateY(-2px)"}}
                onMouseLeave={e=>{e.target.style.background="#B84A2F";e.target.style.transform="translateY(0)"}}>
                Kirim Ulasan
              </button>
              {done && <span style={{ color:"#4ade80", fontSize:"0.82rem", display:"flex", alignItems:"center", gap:6 }}>✓ Ulasan berhasil dikirim!</span>}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Contact() {
  const mobile = useIsMobile();
  return (
    <section id="contact" style={{ background:"#181818", display:"grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr" }}>
      <FadeUp>
        <div style={{ padding: mobile ? "48px 24px" : "90px clamp(24px,5vw,60px)", borderRight: mobile ? "none" : "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:10, fontSize:"0.65rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(201,168,76,0.75)", fontWeight:600, marginBottom:16 }}>
            <span style={{ width:22, height:1, background:"#C9A84C", display:"block" }} /> Hubungi Kami
          </div>
          <h2 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(2.2rem,4vw,3.2rem)", fontWeight:900, color:"#fff", lineHeight:1.1, marginBottom:12 }}>
            Siap Melayani <span style={{ color:"#B84A2F", fontStyle:"italic" }}>Anda</span>
          </h2>
          <p style={{ color:"rgba(255,255,255,0.38)", fontSize:"0.88rem", lineHeight:1.75, maxWidth:400, marginBottom:44 }}>
            Punya pertanyaan soal produk, harga, atau mau pesan langsung? Kami siap membantu.
          </p>
          {[
            { icon:<svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, label:"Alamat", val:"Desa Kureksari, Waru, Sidoarjo\nJawa Timur, Indonesia" },
            { icon:<svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>, label:"Kontak", val:"Pak Ahmad: +62 8xx-xxxx-xxxx\nPak Budi: +62 8xx-xxxx-xxxx" },
            { icon:<svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label:"Jam Kerja", val:"Senin–Jumat 07.00–17.00 WIB\nSabtu 07.00–14.00 WIB" },
            { icon:<svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 3 20 16 16 16"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, label:"Pengiriman", val:"Seluruh Jawa Timur & Ekspedisi Nasional" },
          ].map(({icon,label,val}) => (
            <div key={label} style={{ display:"flex", gap:18, marginBottom:28 }}>
              <div style={{ width:44, height:44, flexShrink:0, border:"1px solid rgba(201,168,76,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>{icon}</div>
              <div>
                <p style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.62rem", letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:4 }}>{label}</p>
                {val.split("\n").map((line,i) => <p key={i} style={{ color:"rgba(255,255,255,0.72)", fontSize:"0.88rem", lineHeight:1.6 }}>{line}</p>)}
              </div>
            </div>
          ))}
        </div>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div style={{ padding: mobile ? "48px 24px" : "90px clamp(24px,5vw,60px)", background:"#0d1a0e", display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <div style={{ width:52, height:52, background:"rgba(37,211,102,0.1)", border:"1px solid rgba(37,211,102,0.2)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:28 }}>
            <WA_SVG />
          </div>
          <h3 style={{ fontFamily:"Georgia,serif", fontSize:"2rem", color:"#fff", fontWeight:900, marginBottom:10 }}>
            Pesan via <span style={{ color:"#25D366" }}>WhatsApp</span>
          </h3>
          <p style={{ color:"rgba(255,255,255,0.38)", fontSize:"0.88rem", lineHeight:1.75, maxWidth:340, marginBottom:32 }}>
            Cara paling mudah untuk tanya harga, negosiasi, atau pesan langsung. Respon cepat dari tim kami.
          </p>
          <a href="https://wa.me/628xxxxxxxxxx?text=Halo%20Pak%2C%20saya%20ingin%20menanyakan%20produk%20besi" target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:14, background:"#25D366", color:"#fff", padding:"15px 30px", textDecoration:"none", fontSize:"0.92rem", fontWeight:700, width:"fit-content", boxShadow:"0 8px 28px rgba(37,211,102,0.2)", transition:"all 0.25s" }}
            onMouseEnter={e=>{e.currentTarget.style.background="#1db954";e.currentTarget.style.transform="translateY(-2px)"}}
            onMouseLeave={e=>{e.currentTarget.style.background="#25D366";e.currentTarget.style.transform="translateY(0)"}}>
            <WA_SVG /> Chat WhatsApp Sekarang
          </a>
          <p style={{ color:"rgba(255,255,255,0.22)", fontSize:"0.75rem", marginTop:12 }}>Klik tombol — pesan otomatis terisi. Tinggal kirim!</p>

          <div style={{ marginTop:44, paddingTop:32, borderTop:"1px solid rgba(255,255,255,0.07)" }}>
            <p style={{ color:"rgba(255,255,255,0.28)", fontSize:"0.6rem", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:16 }}>Jam Respon WhatsApp</p>
            {[["Senin – Jumat","07.00 – 17.00"],["Sabtu","07.00 – 14.00"],["Minggu","Libur"]].map(([day,time]) => (
              <div key={day} style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                <span style={{ color:"rgba(255,255,255,0.52)", fontSize:"0.85rem" }}>{day}</span>
                <span style={{ color: time==="Libur" ? "rgba(255,255,255,0.22)":"#25D366", fontSize:"0.85rem", fontWeight:600 }}>{time}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background:"#111", padding:"36px clamp(24px,5vw,60px)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div className="footer-inner" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBottom:24, borderBottom:"1px solid rgba(255,255,255,0.06)", marginBottom:18, flexWrap:"wrap", gap:16 }}>
          <div>
            <p style={{ fontFamily:"Georgia,serif", fontSize:"1.2rem", fontWeight:900, color:"#C9A84C", letterSpacing:"0.08em" }}>
              BESI<span style={{ color:"#B84A2F", fontStyle:"italic" }}>KUREKSARI</span>
            </p>
            <p style={{ color:"rgba(255,255,255,0.25)", fontSize:"0.72rem", marginTop:4 }}>Pande Besi Tradisional · Sidoarjo, Jawa Timur</p>
          </div>
          <div className="footer-links" style={{ display:"flex", gap:24, flexWrap:"wrap" }}>
            {["#about","#products","#gallery","#reviews","#contact"].map(href => (
              <a key={href} href={href} style={{ color:"rgba(255,255,255,0.32)", textDecoration:"none", fontSize:"0.75rem", letterSpacing:"0.08em", transition:"color 0.2s", textTransform:"capitalize" }}
                onMouseEnter={e=>e.target.style.color="#C9A84C"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.32)"}>
                {href.replace("#","")}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom" style={{ display:"flex", justifyContent:"space-between", color:"rgba(255,255,255,0.18)", fontSize:"0.72rem", flexWrap:"wrap", gap:8 }}>
          <span>© 2025 Besi Kureksari. Semua hak dilindungi.</span>
          <span>Dibuat dengan ❤ untuk pengrajin lokal Sidoarjo</span>
        </div>
      </div>
    </footer>
  );
}

// ── APP ────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ fontFamily:"'Outfit',system-ui,sans-serif", background:"#FAF8F3", color:"#181818", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes spinSlow { from{transform:translateY(-50%) rotate(0deg)} to{transform:translateY(-50%) rotate(360deg)} }
        @keyframes floatSpark { 0%,100%{transform:translateY(0);opacity:.55} 50%{transform:translateY(-14px);opacity:1} }
        @keyframes bounceY { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(0.6)} }
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#181818} ::-webkit-scrollbar-thumb{background:#B84A2F;border-radius:2px}
        html{scroll-behavior:smooth}
        img{max-width:100%;height:auto}

        /* ── RESPONSIVE ────────────────────────── */
        @media(max-width:768px){
          .hamburger{display:flex!important;flex-direction:column;align-items:center;justify-content:center}
          .nav-links{position:fixed!important;inset:0!important;background:rgba(24,24,24,0.98)!important;flex-direction:column!important;justify-content:center!important;align-items:center!important;gap:28px!important;opacity:1;z-index:100}
          .nav-links a{font-size:1rem!important;letter-spacing:0.12em!important}
          .site-nav:not(:has(.nav-links)){}
          .mobile-overlay{position:fixed;inset:0;z-index:99}
          .hero-content{padding:100px 24px 60px!important;max-width:100%!important}
          .hero-right{display:none!important}
          .hero-stats{gap:20px!important;margin-top:36px!important;padding-top:24px!important;flex-wrap:wrap}
          .hero-stats span:first-child{font-size:1.8rem!important}
          .about-grid{grid-template-columns:1fr!important;gap:40px!important}
          .about-img{height:320px!important}
          .products-grid{grid-template-columns:repeat(2,1fr)!important;gap:6px!important}
          .products-grid .prod-img{height:200px!important}
          .gallery-grid{grid-template-columns:repeat(2,1fr)!important;gap:8px!important}
          .gallery-grid img{height:180px!important}
          .reviews-grid{grid-template-columns:1fr!important;gap:16px!important}
          .review-form{padding:28px 20px!important}
          .review-form-grid{grid-template-columns:1fr!important}
          .contact-section{grid-template-columns:1fr!important}
          .contact-left,.contact-right{padding:48px 24px!important}
          .footer-inner{flex-direction:column!important;text-align:center}
          .footer-links{justify-content:center!important}
          .footer-bottom{flex-direction:column!important;align-items:center!important;text-align:center}
          .section-pad{padding-left:24px!important;padding-right:24px!important}
          .section-header{flex-direction:column!important;align-items:flex-start!important}
          .section-header-desc{max-width:100%!important}
          .lightbox-img{max-height:70vh!important}
          .lightbox-close{top:-8px!important;right:-8px!important}
        }
        @media(max-width:480px){
          .products-grid{grid-template-columns:1fr!important}
          .products-grid .prod-img{height:220px!important}
          .gallery-grid{grid-template-columns:1fr!important}
          .gallery-grid img{height:220px!important}
          .hero-btns{flex-direction:column!important}
          .hero-btns a{text-align:center;justify-content:center}
        }
        @media(min-width:769px){
          .hamburger{display:none!important}
          .mobile-overlay{display:none}
        }
      `}</style>
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <Products />
      <Gallery />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
}
