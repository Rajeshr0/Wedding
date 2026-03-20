'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone } from 'lucide-react';


export default function WeddingPage() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [curtainPhase, setCurtainPhase] = useState<'idle'|'closed'|'opening'>('idle');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFirstPlaying, setIsFirstPlaying] = useState(false);
  const flowerContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const firstAudioRef = useRef<HTMLAudioElement>(null);
  const ganpatiStopped = useRef(false);

  useEffect(() => {
    const audio = firstAudioRef.current;
    if (!audio) return;
    audio.muted = false;
    audio.volume = 0.55;

    const doPlay = () => {
      if (ganpatiStopped.current) return;
      if (!audio.paused) return;
      audio.play()
        .then(() => setIsFirstPlaying(true))
        .catch(() => {});
    };

    // Attempt 1: try immediately on mount
    doPlay();

    // Attempt 2: after petals CSS animation fires (petalFall has delays up to 7.8s,
    // first petal starts at 0s delay — we try after 100ms to catch first paint)
    const t1 = setTimeout(doPlay, 100);
    const t2 = setTimeout(doPlay, 500);
    const t3 = setTimeout(doPlay, 1000);

    // Attempt 3: on ANY user gesture (guaranteed to work per browser policy)
    const onGesture = () => { doPlay(); };
    document.addEventListener('touchstart', onGesture, { passive: true });
    document.addEventListener('touchend', onGesture, { passive: true });
    document.addEventListener('scroll', onGesture, { passive: true });
    document.addEventListener('mousemove', onGesture, { once: true });
    document.addEventListener('click', onGesture, { once: true });
    document.addEventListener('keydown', onGesture, { once: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.removeEventListener('touchstart', onGesture);
      document.removeEventListener('touchend', onGesture);
      document.removeEventListener('scroll', onGesture);
      document.removeEventListener('mousemove', onGesture);
      document.removeEventListener('click', onGesture);
      document.removeEventListener('keydown', onGesture);
    };
  }, []);

  useEffect(() => {
    if (!showInvitation) return;
    const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -80px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('animate-in'); });
    }, observerOptions);
    const timelineItems = document.querySelectorAll('.timeline-item-left, .timeline-item-right');
    timelineItems.forEach(item => observer.observe(item));
    return () => { timelineItems.forEach(item => observer.unobserve(item)); };
  }, [showInvitation]);

  const handleOpenInvitation = () => {
    // 1. Stop ganpati permanently — ref ensures gesture listeners won't restart it
    ganpatiStopped.current = true;
    if (firstAudioRef.current) {
      firstAudioRef.current.pause();
      firstAudioRef.current.currentTime = 0;
      setIsFirstPlaying(false);
    }

    // 2. Close curtain instantly — covers everything
    setCurtainPhase('closed');

    // 3. After 50ms swap content BEHIND the closed curtain + start wedding song
    setTimeout(() => {
      setShowInvitation(true);
      if (audioRef.current) {
        audioRef.current.volume = 0.65;
        audioRef.current.currentTime = 0;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }, 50);

    // 4. After 300ms start curtain opening (content is ready behind it)
    setTimeout(() => setCurtainPhase('opening'), 300);

    // 5. After curtain fully opens (300 + 1400ms) remove overlay
    setTimeout(() => setCurtainPhase('idle'), 6000);
  };

  return (
    <div translate="no" className="notranslate">
      <audio ref={audioRef} loop><source src="/wedding.mp3" type="audio/mpeg" /></audio>
      <audio ref={firstAudioRef} loop><source src="/ganpati.mp3" type="audio/mpeg" /></audio>

      {/* ── CURTAIN ANIMATION OVERLAY ── */}
      {curtainPhase !== 'idle' && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">

          {/* ── LEFT curtain panel ── */}
          <div
            className={`absolute top-0 left-0 h-full ${curtainPhase === 'opening' ? 'curtain-opening-left' : ''}`}
            style={{width:'50%'}}
          >
            <div className="absolute inset-0" style={{background:'linear-gradient(to right, #2a0000, #5a0000, #8b0000)',boxShadow:'inset -20px 0 60px rgba(0,0,0,0.9)'}}></div>
            <div className="absolute inset-0" style={{backgroundImage:'repeating-linear-gradient(90deg,rgba(0,0,0,0.3) 0px,rgba(0,0,0,0.05) 12px,rgba(160,0,0,0.2) 24px,rgba(0,0,0,0.3) 36px)',backgroundSize:'36px 100%'}}></div>
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-[#d4af37]/20 via-[#d4af37]/80 to-[#d4af37]/20"></div>
            <div className="absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-[#d4af37]/50 to-transparent"></div>
            {/* Dhol left */}
            <div className="absolute bottom-8 sm:bottom-14 left-4 sm:left-6 md:left-8 w-40 sm:w-52 md:w-64">
              <img src="/dhol.png" alt="dhol" className="w-full object-contain"
                style={{filter:'drop-shadow(0 0 12px rgba(212,175,55,0.6))'}} />
            </div>
          </div>

          {/* ── RIGHT curtain panel ── */}
          <div
            className={`absolute top-0 right-0 h-full ${curtainPhase === 'opening' ? 'curtain-opening-right' : ''}`}
            style={{width:'50%'}}
          >
            <div className="absolute inset-0" style={{background:'linear-gradient(to left, #2a0000, #5a0000, #8b0000)',boxShadow:'inset 20px 0 60px rgba(0,0,0,0.9)'}}></div>
            <div className="absolute inset-0" style={{backgroundImage:'repeating-linear-gradient(90deg,rgba(0,0,0,0.3) 0px,rgba(0,0,0,0.05) 12px,rgba(160,0,0,0.2) 24px,rgba(0,0,0,0.3) 36px)',backgroundSize:'36px 100%'}}></div>
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-[#d4af37]/20 via-[#d4af37]/80 to-[#d4af37]/20"></div>
            <div className="absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-[#d4af37]/50 to-transparent"></div>
            {/* Dhol right */}
            <div className="absolute bottom-8 sm:bottom-14 right-4 sm:right-6 md:right-8 w-40 sm:w-52 md:w-64">
              <img src="/dhol.png" alt="dhol" className="w-full object-contain"
                style={{transform:'scaleX(-1)',filter:'drop-shadow(0 0 12px rgba(212,175,55,0.6))'}} />
            </div>
          </div>

          {/* ── CENTER welcome content — slides LEFT with left curtain ── */}
          {/* By using curtain-opening-left on this div too, it moves off screen
              in the same direction/speed as the left panel, disappearing fully */}
          <div
            className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center ${curtainPhase === 'opening' ? 'curtain-opening-left' : ''}`}
          >
            <div className="w-32 sm:w-44 md:w-56 mb-2" style={{filter:'drop-shadow(0 0 20px rgba(212,175,55,0.8))'}}>
              <img src="/welcome.png" alt="welcome" className="w-full object-contain" />
            </div>
            <p className="text-[#fff4c2] text-xl sm:text-3xl md:text-4xl font-bold tracking-widest mt-1"
              style={{fontFamily:"'Cormorant Garamond',serif",textShadow:'0 0 20px rgba(212,175,55,0.9)'}}>
              Khamma Ghani
            </p>
            <p className="text-[#d4af37] text-xs sm:text-sm tracking-[0.4em] uppercase mt-1"
              style={{fontFamily:"'Cormorant Garamond',serif"}}>
              ✦ Welcome ✦
            </p>
          </div>

          <style jsx>{`
            .curtain-opening-left {
              animation: curtainSlideLeft 5.7s cubic-bezier(0.4,0,0.2,1) forwards;
            }
            .curtain-opening-right {
              animation: curtainSlideRight 5.7s cubic-bezier(0.4,0,0.2,1) forwards;
            }
            @keyframes curtainSlideLeft {
              0%   { transform: translateX(0%);    }
              100% { transform: translateX(-100%); }
            }
            @keyframes curtainSlideRight {
              0%   { transform: translateX(0%);   }
              100% { transform: translateX(100%); }
            }
          `}</style>
        </div>
      )}

      {showInvitation ? (
        <div ref={flowerContainerRef} className="relative min-h-screen w-full bg-[#1a0f0f] overflow-y-auto">
          <div className="fixed inset-0 pointer-events-none opacity-10">
            <div className="absolute inset-0 bg-pattern-fine"></div>
          </div>
          <div className="relative z-10">

            {/* ── HERO ── */}
            <section className="relative min-h-screen flex items-center justify-center px-4 py-16 text-center overflow-hidden">
              <div className="absolute inset-0">
                <img src="/bg.jpg" alt="wedding bg" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 sm:w-72 md:w-96 opacity-25 pointer-events-none" style={{filter:'drop-shadow(0 0 20px rgba(212,175,55,0.4))'}}>
                <img src="/couple.png" alt="mandap" className="w-full object-contain" />
              </div>
              <div className="absolute inset-3 sm:inset-4 pointer-events-none border border-[#d4af37]/30 rounded-sm"></div>
              <div className="absolute inset-5 sm:inset-7 pointer-events-none border border-[#d4af37]/12 rounded-sm"></div>
              <div className="absolute top-6 left-6 text-[#d4af37] opacity-40 text-2xl sm:text-3xl">✿</div>
              <div className="absolute top-6 right-6 text-[#d4af37] opacity-40 text-2xl sm:text-3xl">✿</div>
              <div className="absolute bottom-6 left-6 text-[#d4af37] opacity-40 text-2xl sm:text-3xl">✿</div>
              <div className="absolute bottom-6 right-6 text-[#d4af37] opacity-40 text-2xl sm:text-3xl">✿</div>
              <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto w-full">
                <img src="/icon.png" alt="icon" className="w-16 sm:w-20 md:w-24 mb-5 hero-icon" />
                <div className="mb-4 hero-fadein text-center" style={{animationDelay:'0.3s'}}>
                  <p className="shubh-vivah-hero" translate="no">શુભ વિવાહ</p>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#c4a869] mt-0.5" style={{fontFamily:"'Cormorant Garamond',serif"}}>✦ Shubh Vivah ✦</p>
                </div>
                <h1 className="hero-names mb-5 hero-fadein" style={{animationDelay:'0.5s'}}>
                  <span translate="no">Nitesh</span> <span className="hero-amp" translate="no">&amp;</span> <span translate="no">Meena</span>
                </h1>
                <div className="flex items-center gap-3 mb-5 hero-fadein" style={{animationDelay:'0.6s'}}>
                  <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                  <span className="text-[#d4af37]">🪷</span>
                  <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                </div>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-7 max-w-sm sm:max-w-xl hero-fadein hero-text-shine" style={{fontFamily:"'Lora', serif",fontStyle:'italic',animationDelay:'0.7s'}}>
                  <span translate="no">With joyful hearts, we invite you to witness and celebrate<br />the beginning of our forever together</span>
                </p>
                <div className="flex items-center gap-4 sm:gap-6 justify-center mb-5 hero-fadein" style={{animationDelay:'0.8s'}}>
                  <div className="h-px w-14 sm:w-20 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
                  <p className="text-lg sm:text-xl text-[#fff4c2] font-semibold tracking-wide" style={{fontFamily:"'Cormorant Garamond', serif"}}>26 April 2026</p>
                  <div className="h-px w-14 sm:w-20 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
                </div>
                <div className="mb-10 hero-fadein text-center" style={{animationDelay:'0.9s'}}>
                  <p className="notranslate" style={{fontFamily:"'Noto Serif Gujarati',serif",fontSize:"clamp(0.6rem,1.8vw,0.8rem)",color:"#d4af37",opacity:0.85,letterSpacing:"0.03em",lineHeight:"1.6",display:"block",textAlign:"center"}} translate="no">મુ.પો. ભાડલી (જાત) તા. દાંતીવાડા જિ. બનાસકાંઠા (ગુજ.)</p>
                  <p className="text-[#e6d3a3] text-sm sm:text-base tracking-[2px] sm:tracking-[3px]" translate="no">Bhadli, Gujarat</p>
                </div>
                <div className="hero-fadein animate-bounce-slow" style={{animationDelay:'1s'}}>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </section>

            {/* ── Our Story ── */}
            <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-[#f5e6d3] relative overflow-hidden">
              <div className="absolute inset-0 rajasthan-bg opacity-5"></div>
              <div className="w-full max-w-5xl space-y-12 sm:space-y-16 relative z-10">
                <div className="text-center space-y-3">
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#8b6f47]">— The Two Souls —</p>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2d1a1a]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Our Story</h2>
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                    <span className="text-[#d4af37]">❋</span>
                    <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12">
                  <div className="space-y-5 text-center timeline-item-left">
                    <div className="flex justify-center">
                      <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full border-4 border-[#8b6f47] overflow-hidden shadow-lg ring-4 ring-[#d4af37]/20">
                        <img src="/nitesh.jpeg" alt="Groom" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-3xl sm:text-4xl font-bold text-[#2d1a1a]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Nitesh</p>
                      <p className="text-xs sm:text-sm uppercase tracking-widest text-[#8b6f47]">Groom</p>
                      <div className="space-y-2 py-4 border-t border-[#d4af37]">
                        <p className="text-xs text-[#8b6f47]">Son of</p>
                        <p className="text-base sm:text-lg font-semibold text-[#2d1a1a]">Mr. BabuBhai. Hansaji Rajgor & Mrs. Radhaben. Babubhai Rajgor</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-5 text-center timeline-item-right">
                    <div className="flex justify-center">
                      <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full border-4 border-[#8b6f47] overflow-hidden shadow-lg ring-4 ring-[#d4af37]/20">
                        <img src="/meena.jpeg" alt="Bride" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-3xl sm:text-4xl font-bold text-[#2d1a1a]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Meena</p>
                      <p className="text-xs sm:text-sm uppercase tracking-widest text-[#8b6f47]">Bride</p>
                      <div className="space-y-2 py-4 border-t border-[#d4af37]">
                        <p className="text-xs text-[#8b6f47]">Daughter of</p>
                        <p className="text-base sm:text-lg font-semibold text-[#2d1a1a]">Mr. Hariji Mafaji Purohit & Mrs. Manguben Hariji Purohit</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Wedding Events — Starry Desert BG ── */}
            <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
              <div className="absolute inset-0">
                <img src="/dessert.png" alt="starry desert night" className="w-full h-full object-cover" style={{animation:'slowZoomBg 30s ease-in-out infinite alternate',willChange:'transform'}} />
                <div className="absolute inset-0 bg-black/65"></div>
                <div className="absolute inset-0" style={{background:'linear-gradient(to top,rgba(120,50,0,0.6) 0%,rgba(80,30,0,0.3) 25%,transparent 55%,rgba(0,10,40,0.25) 100%)'}}></div>
              </div>
              <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-8 w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 float-slow pointer-events-none">
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E2%80%94Pngtree%E2%80%94om%20tattoo%20design%20with%20lotus_8990962-NUJdcfiQh9txDeW25z0Uv92DOtNu3N.png" alt="OM" className="w-full h-full object-contain" />
              </div>
              <div className="absolute top-4 left-4 text-3xl sm:text-4xl opacity-20 float-slow">🪔</div>
              <div className="absolute top-4 right-4 text-3xl sm:text-4xl opacity-20 float-slow" style={{animationDelay:'1s'}}>🪔</div>
              <div className="absolute bottom-4 left-4 text-2xl sm:text-3xl opacity-15 float-slow" style={{animationDelay:'0.5s'}}>🌸</div>
              <div className="absolute bottom-4 right-4 text-2xl sm:text-3xl opacity-15 float-slow" style={{animationDelay:'1.5s'}}>🌸</div>
              <div className="hidden sm:block absolute top-1/3 left-3 text-xl sm:text-2xl opacity-10 float-slow" style={{animationDelay:'0.8s'}}>🌺</div>
              <div className="hidden sm:block absolute top-1/3 right-3 text-xl sm:text-2xl opacity-10 float-slow" style={{animationDelay:'1.3s'}}>🌺</div>
              <div className="hidden sm:block absolute top-2/3 left-3 text-xl sm:text-2xl opacity-10 float-slow" style={{animationDelay:'0.3s'}}>🪷</div>
              <div className="hidden sm:block absolute top-2/3 right-3 text-xl sm:text-2xl opacity-10 float-slow" style={{animationDelay:'1.8s'}}>🪷</div>
              <div className="w-full max-w-4xl relative z-10">
                <div className="text-center mb-12 sm:mb-20 space-y-3">
                  <p className="text-[#c4a869] text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em]">— Auspicious Occasions —</p>
                  <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-[#ffffff]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Wedding Events</h2>
                  <p className="text-[#c4a869] text-sm sm:text-base" style={{fontFamily:"'Lora', serif",fontStyle:'italic'}}>A celebration of love and tradition</p>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                    <span className="text-[#d4af37] text-lg sm:text-xl">🪷</span>
                    <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                  </div>
                </div>
                <div className="space-y-8 sm:space-y-12">

                  {/* Path */}
                  <div className="flex gap-4 sm:gap-12 items-start timeline-item-left">
                    <div className="w-full sm:w-1/2 sm:text-right space-y-2 sm:space-y-3 bg-gradient-to-br from-[#2a1a1a]/90 to-[#3a2020]/90 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-[#d4af37]/30 relative overflow-hidden">
                      <div className="absolute top-2 right-2 text-xl sm:text-2xl opacity-25">🙏</div>
                      <p className="text-xs sm:text-sm uppercase tracking-widest text-[#d4af37] font-bold">24 April 2026</p>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#ffffff]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Path<span className="guj-event">( પાટ બેસવાનું )</span></h3>
                      <p className="text-[#c4a869] text-sm sm:text-base font-semibold">8:00 PM - 10:00 PM</p>
                      <p className="text-[#c4a869] text-xs sm:text-sm">Traditional prayer ceremony</p>
                    </div>
                    <div className="hidden sm:flex w-12 justify-center flex-col items-center"><div className="w-px h-28 bg-gradient-to-b from-[#d4af37] to-transparent"></div></div>
                    <div className="hidden sm:block sm:w-1/2"></div>
                  </div>

                  {/* Sangeet */}
                  <div className="flex gap-4 sm:gap-12 items-start sm:flex-row-reverse timeline-item-right">
                    <div className="w-full sm:w-1/2 sm:text-left space-y-2 sm:space-y-3 bg-gradient-to-bl from-[#2a1a1a]/90 to-[#3a2020]/90 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-[#d4af37]/30 relative overflow-hidden">
                      <div className="absolute top-2 left-2 text-xl sm:text-2xl opacity-25">💃</div>
                      <p className="text-xs sm:text-sm uppercase tracking-widest text-[#d4af37] font-bold">24 April 2026</p>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#ffffff]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Sangeet & Garba<span className="guj-event">( રાસ ગરબા )</span></h3>
                      <p className="text-[#c4a869] text-sm sm:text-base font-semibold">10:30 PM - Evening</p>
                      <p className="text-[#c4a869] text-xs sm:text-sm">Music, dance and celebration</p>
                    </div>
                    <div className="hidden sm:flex w-12 justify-center flex-col items-center"><div className="w-px h-28 bg-gradient-to-b from-[#d4af37] to-transparent"></div></div>
                    <div className="hidden sm:block sm:w-1/2"></div>
                  </div>

                  {/* Janoi */}
                  <div className="flex gap-4 sm:gap-12 items-start timeline-item-left">
                    <div className="w-full sm:w-1/2 sm:text-right space-y-2 sm:space-y-3 bg-gradient-to-br from-[#2a1a1a]/90 to-[#3a2020]/90 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-[#d4af37]/30 relative overflow-hidden">
                      <div className="absolute top-2 right-2 text-xl sm:text-2xl opacity-25">🕉️</div>
                      <p className="text-xs sm:text-sm uppercase tracking-widest text-[#d4af37] font-bold">25 April 2026</p>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#ffffff]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Janoi<span className="guj-event">( જનોઈ )</span></h3>
                      <p className="text-[#c4a869] text-sm sm:text-base font-semibold">2:00 PM</p>
                      <p className="text-[#c4a869] text-xs sm:text-sm">Sacred thread ceremony</p>
                    </div>
                    <div className="hidden sm:flex w-12 justify-center flex-col items-center"><div className="w-px h-28 bg-gradient-to-b from-[#d4af37] to-transparent"></div></div>
                    <div className="hidden sm:block sm:w-1/2"></div>
                  </div>

                  {/* Barat */}
                  <div className="flex gap-4 sm:gap-12 items-start sm:flex-row-reverse timeline-item-right">
                    <div className="w-full sm:w-1/2 sm:text-left space-y-2 sm:space-y-3 bg-gradient-to-bl from-[#2a1a1a]/90 to-[#3a2020]/90 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-[#d4af37] relative overflow-hidden">
                      <div className="absolute top-2 left-2 text-xl sm:text-2xl opacity-25">🐎</div>
                      <p className="text-xs sm:text-sm uppercase tracking-widest text-[#d4af37] font-bold">26 April 2026</p>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#ffffff]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Barat<span className="guj-event">( જાન પ્રસ્થાન )</span></h3>
                      <p className="text-[#c4a869] text-sm sm:text-base font-semibold">6:00 AM</p>
                      <p className="text-[#c4a869] text-xs sm:text-sm">Groom&apos;s grand procession</p>
                    </div>
                    <div className="hidden sm:flex w-12 justify-center flex-col items-center"><div className="w-px h-28 bg-gradient-to-b from-[#d4af37] to-transparent"></div></div>
                    <div className="hidden sm:block sm:w-1/2"></div>
                  </div>

                  {/* The Wedding */}
                  <div className="flex gap-4 sm:gap-12 items-start timeline-item-left">
                    <div className="w-full sm:w-1/2 sm:text-right space-y-2 sm:space-y-3 bg-gradient-to-br from-[#2a1a1a]/90 to-[#3a2020]/90 backdrop-blur-sm p-4 sm:p-6 rounded-lg border-2 border-[#d4af37] relative overflow-hidden">
                      <div className="absolute top-2 right-2 text-xl sm:text-2xl opacity-35">🔥</div>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/8 to-transparent"></div>
                      <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#d4af37] font-semibold relative">26 April 2026</p>
                      <h3 className="text-3xl sm:text-4xl font-bold text-[#ffffff] relative" style={{fontFamily:"'Cormorant Garamond', serif"}}>The Wedding<span className="guj-event">( હસ્ત મેળાપ )</span></h3>
                      <p className="text-[#d4af37] font-semibold text-base sm:text-lg relative">7:00 AM</p>
                      <p className="text-[#c4a869] text-xs sm:text-sm relative">Main wedding ceremony</p>
                    </div>
                    <div className="hidden sm:flex w-12 justify-center flex-col items-center"><div className="w-px h-32 bg-gradient-to-b from-[#d4af37] via-[#d4af37] to-transparent"></div></div>
                    <div className="hidden sm:block sm:w-1/2"></div>
                  </div>

                  {/* Reception */}
                  <div className="flex gap-4 sm:gap-12 items-start sm:flex-row-reverse timeline-item-right">
                    <div className="w-full sm:w-1/2 sm:text-left space-y-2 sm:space-y-3 bg-gradient-to-bl from-[#2a1a1a]/90 to-[#3a2020]/90 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-[#d4af37]/30 relative overflow-hidden">
                      <div className="absolute top-2 left-2 text-xl sm:text-2xl opacity-25">🎉</div>
                      <p className="text-xs sm:text-sm uppercase tracking-widest text-[#d4af37] font-bold">27 April 2026</p>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#ffffff]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Reception<span className="guj-event">( સ્વાગત સમારોહ )</span></h3>
                      <p className="text-[#c4a869] text-sm sm:text-base font-semibold">10:00 AM</p>
                      <p className="text-[#c4a869] text-xs sm:text-sm">Celebration dinner and dance</p>
                    </div>
                    <div className="hidden sm:flex w-12 justify-center flex-col items-center"><div className="w-px h-28 bg-gradient-to-b from-[#d4af37] to-transparent"></div></div>
                    <div className="hidden sm:block sm:w-1/2"></div>
                  </div>

                </div>
              </div>
            </section>

            {/* ── Venues ── */}
            <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-[#1a0a0a]">
              <div className="w-full max-w-4xl space-y-12 sm:space-y-16">
                <div className="text-center space-y-2">
                  <p className="text-[#c4a869] text-[10px] sm:text-xs uppercase tracking-[0.4em]">— Find Us —</p>
                  <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-[#ffffff]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Wedding Venues</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12">
                  <div className="space-y-5 sm:space-y-6">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#ffffff]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Groom&apos;s Home</h3>
                    <div className="h-48 sm:h-56 rounded-lg overflow-hidden shadow-lg border border-[#d4af37]/20">
                      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d474.8161010833453!2d72.34597392895202!3d24.465871430645894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1773901079496!5m2!1sen!2sin" width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[#d4af37] font-semibold text-base sm:text-lg">BabuBhai Hansaji Rajgor</p>
                      <div className="space-y-2 text-[#c4a869]">
                        <p className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /><span className="text-xs sm:text-sm">
                              <span className="block notranslate" style={{fontFamily:"'Noto Serif Gujarati',serif"}} translate="no">મુ.પો. ભાડલી (જાત) તા. દાંતીવાડા</span>
                              <span className="block notranslate" style={{fontFamily:"'Noto Serif Gujarati',serif"}} translate="no">જિ. બનાસકાંઠા (ગુજ.) - 385545</span>
                              <span className="block" translate="no">Bhadli, Gujarat 385545</span>
                            </span></p>
                        <p className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 flex-shrink-0" /><span className="text-xs sm:text-sm">+91 80008 01817</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-5 sm:space-y-6">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#ffffff]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Bride&apos;s Home</h3>
                    <div className="h-48 sm:h-56 rounded-lg overflow-hidden shadow-lg border border-[#d4af37]/20">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3450.822246193107!2d72.20809899999999!3d24.504365000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDMwJzE1LjciTiA3MsKwMTInMjkuMiJF!5e1!3m2!1sen!2sin!4v1773989316507!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{border:0}}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                    <div className="space-y-3">
                      <p className="text-[#d4af37] font-semibold text-base sm:text-lg">Hariji Mafaji Purohit</p>
                      <div className="space-y-2 text-[#c4a869]">
                        <p className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /><span className="text-xs sm:text-sm">Umedpura, Gujarat 385545</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Blessings ── */}
            <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-[#f5e6d3] relative overflow-hidden">
              <div className="absolute inset-0 rajasthan-bg opacity-5"></div>
              <div className="w-full max-w-6xl text-center space-y-10 sm:space-y-12 relative z-10">
                <div className="space-y-4 border-b-2 border-[#d4af37] pb-6 sm:pb-8">
                  <p className="text-5xl sm:text-6xl">👑</p>
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#2d1a1a]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Blessings From Our Families</h2>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 items-center my-8 sm:my-12">
                  <div className="flex flex-col items-center gap-2 sm:gap-3 timeline-item-left">
                    <div className="w-24 h-32 sm:w-36 sm:h-48 md:w-48 md:h-64 rounded-xl sm:rounded-2xl border-3 sm:border-4 border-[#8b6f47] overflow-hidden shadow-xl ring-1 sm:ring-2 ring-[#d4af37]/30">
                      <img src="/nitesh.jpeg" alt="Groom Nitesh" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-0.5 text-center">
                      <p className="text-[9px] sm:text-xs uppercase tracking-widest text-[#8b6f47]">Groom</p>
                      <p className="text-sm sm:text-lg md:text-2xl font-bold text-[#2d1a1a]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Nitesh</p>
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <p className="text-xl sm:text-3xl md:text-4xl font-bold text-[#2d1a1a]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Nitesh</p>
                    <p className="text-[9px] sm:text-sm uppercase tracking-widest text-[#8b6f47]">Groom</p>
                    <div className="space-y-1 sm:space-y-2 py-2 sm:py-4 border-t border-[#d4af37]">
                      <p className="text-[9px] sm:text-sm text-[#8b6f47]">Son of</p>
                      <p className="text-[10px] sm:text-sm md:text-base font-semibold text-[#2d1a1a]">Mr. BabuBhai. Hansaji Rajgor & Mrs. Radhaben. Babubhai Rajgor</p>
                    </div>
                    <div className="flex items-center gap-2 justify-center py-1 sm:py-2">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                      <span className="text-base sm:text-xl text-[#d4af37]">♥</span>
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                    </div>
                    <p className="text-xl sm:text-3xl md:text-4xl font-bold text-[#2d1a1a]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Meena</p>
                    <p className="text-[9px] sm:text-sm uppercase tracking-widest text-[#8b6f47]">Bride</p>
                    <div className="space-y-1 sm:space-y-2 py-2 sm:py-4 border-t border-[#d4af37]">
                      <p className="text-[9px] sm:text-sm text-[#8b6f47]">Daughter of</p>
                      <p className="text-[10px] sm:text-sm md:text-base font-semibold text-[#2d1a1a]">Mr. Hariji Mafaji Purohit & Mrs. Manguben Hariji Purohit</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2 sm:gap-3 timeline-item-right">
                    <div className="w-24 h-32 sm:w-36 sm:h-48 md:w-48 md:h-64 rounded-xl sm:rounded-2xl border-3 sm:border-4 border-[#8b6f47] overflow-hidden shadow-xl ring-1 sm:ring-2 ring-[#d4af37]/30">
                      <img src="/meena.jpeg" alt="Bride Meena" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-0.5 text-center">
                      <p className="text-[9px] sm:text-xs uppercase tracking-widest text-[#8b6f47]">Bride</p>
                      <p className="text-sm sm:text-lg md:text-2xl font-bold text-[#2d1a1a]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Meena</p>
                    </div>
                  </div>
                </div>

                {/* Gujarati Quote Card */}
                <div className="py-6 sm:py-10 px-2 sm:px-4">
                  <div className="relative max-w-2xl mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37] to-[#d4af37]"></div>
                      <span className="text-2xl sm:text-3xl">🪔</span>
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d4af37] to-[#d4af37]"></div>
                    </div>
                    <div className="relative rounded-xl sm:rounded-2xl px-5 py-8 sm:px-8 sm:py-10 md:px-14 md:py-12 text-center space-y-5 sm:space-y-6 overflow-hidden"
                      style={{background:'linear-gradient(135deg,#fdf3e3 0%,#fae8cc 40%,#fdf0dc 100%)',border:'1.5px solid #d4af37',boxShadow:'0 0 0 4px rgba(212,175,55,0.08),0 8px 40px rgba(139,70,0,0.12)'}}>
                      <span className="absolute top-2 left-3 text-lg sm:text-2xl text-[#d4af37] opacity-40 select-none">✾</span>
                      <span className="absolute top-2 right-3 text-lg sm:text-2xl text-[#d4af37] opacity-40 select-none">✾</span>
                      <span className="absolute bottom-2 left-3 text-lg sm:text-2xl text-[#d4af37] opacity-40 select-none">✾</span>
                      <span className="absolute bottom-2 right-3 text-lg sm:text-2xl text-[#d4af37] opacity-40 select-none">✾</span>
                      <div className="space-y-3 sm:space-y-4">
                        <p className="text-base sm:text-xl md:text-2xl leading-[2] text-[#2d1a00]" style={{fontFamily:"'Noto Serif Gujarati','Noto Sans Gujarati',serif",fontWeight:400,letterSpacing:'0.03em'}}>
                          તમે આવો તો સ્વજ નો નો{' '}
                          <span className="font-bold" style={{fontFamily:"'Noto Serif Gujarati',serif",fontWeight:700,background:'linear-gradient(90deg,#8b3a00,#d4af37,#8b3a00)',backgroundSize:'200% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',animation:'shineAnim 4s linear infinite'}}>સંગ</span>{' '}
                          મળી જાય,
                        </p>
                        <p className="text-base sm:text-xl md:text-2xl leading-[2] text-[#2d1a00]" style={{fontFamily:"'Noto Serif Gujarati','Noto Sans Gujarati',serif",fontWeight:400,letterSpacing:'0.03em'}}>
                          તમે આવો તો રંગ માં{' '}
                          <span className="font-bold" style={{fontFamily:"'Noto Serif Gujarati',serif",fontWeight:700,background:'linear-gradient(90deg,#8b3a00,#d4af37,#8b3a00)',backgroundSize:'200% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',animation:'shineAnim 4s linear infinite'}}>રંગ</span>{' '}
                          ભળી જાય,
                        </p>
                        <p className="text-base sm:text-xl md:text-2xl leading-[2] text-[#2d1a00]" style={{fontFamily:"'Noto Serif Gujarati','Noto Sans Gujarati',serif",fontWeight:400,letterSpacing:'0.03em'}}>
                          આમ તો લગ્ન એ{' '}
                          <span className="font-bold" style={{fontFamily:"'Noto Serif Gujarati',serif",fontWeight:700,background:'linear-gradient(90deg,#8b3a00,#d4af37,#8b3a00)',backgroundSize:'200% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',animation:'shineAnim 4s linear infinite'}}>પરંપરા</span>{' '}
                          છે આપણી..
                        </p>
                        <p className="text-base sm:text-xl md:text-2xl leading-[2] text-[#2d1a00]" style={{fontFamily:"'Noto Serif Gujarati','Noto Sans Gujarati',serif",fontWeight:400,letterSpacing:'0.03em'}}>
                          તમે આવો તો આ પરંપરા એક{' '}
                          <span className="font-bold" style={{fontFamily:"'Noto Serif Gujarati',serif",fontWeight:700,background:'linear-gradient(90deg,#8b3a00,#d4af37,#8b3a00)',backgroundSize:'200% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',animation:'shineAnim 4s linear infinite'}}>પ્રસંગ</span>{' '}
                          બની જાય.
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2 sm:gap-3 py-1 sm:py-2">
                        <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                        <span className="text-[#d4af37] text-base sm:text-lg">❁</span>
                        <div className="h-px w-2 sm:w-3 bg-[#d4af37]"></div>
                        <span className="text-[#d4af37] text-xl sm:text-2xl">🪷</span>
                        <div className="h-px w-2 sm:w-3 bg-[#d4af37]"></div>
                        <span className="text-[#d4af37] text-base sm:text-lg">❁</span>
                        <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <p className="text-base sm:text-xl md:text-2xl text-[#5a1a00] leading-relaxed" style={{fontFamily:"'Noto Serif Gujarati','Noto Sans Gujarati',serif",fontWeight:500,letterSpacing:'0.04em'}}>
                          તો મારા વહાલા મહેમાનો,
                        </p>
                        <p className="text-lg sm:text-2xl md:text-3xl leading-relaxed"
                          style={{fontFamily:"'Noto Serif Gujarati','Noto Sans Gujarati',serif",fontWeight:700,letterSpacing:'0.05em',background:'linear-gradient(90deg,#7a1a00 0%,#d4af37 40%,#c0392b 70%,#d4af37 100%)',backgroundSize:'250% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',animation:'shineAnim 5s linear infinite'}}>
                          લગ્ન માં જરૂર ને જરૂર આવજો! 🙏
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-3 mt-6 sm:mt-8">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37] to-[#d4af37]"></div>
                      <span className="text-2xl sm:text-3xl">🪔</span>
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d4af37] to-[#d4af37]"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
                  <p className="text-xl sm:text-2xl font-bold text-[#2d1a1a]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Together with our families</p>
                  <p className="text-[#8b6f47] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">We look forward to celebrating this auspicious occasion with you and your loved ones. Your blessings and presence will make our joy complete.</p>
                </div>
              </div>
            </section>

          </div>

          {/* ── Invitation interior CSS — NO @import ── */}
          <style jsx>{`
            .bg-pattern-fine{background-image:radial-gradient(circle,rgba(212,175,55,0.15) 1px,transparent 1px),radial-gradient(circle,rgba(212,175,55,0.08) 1px,transparent 1px);background-size:30px 30px,60px 60px;background-position:0 0,15px 15px;}
            .rajasthan-bg{background-image:repeating-linear-gradient(45deg,rgba(139,111,71,0.3) 0px,rgba(139,111,71,0.3) 1px,transparent 1px,transparent 20px),repeating-linear-gradient(-45deg,rgba(139,111,71,0.3) 0px,rgba(139,111,71,0.3) 1px,transparent 1px,transparent 20px);}
            .hero-icon{animation:heroIconDrop 1.2s cubic-bezier(0.34,1.56,0.64,1) both;}
            @keyframes heroIconDrop{from{opacity:0;transform:translateY(-30px) scale(0.8);}to{opacity:1;transform:translateY(0) scale(1);}}
            .hero-fadein{animation:fadeInUp 1s ease-out both;}
            /* ── శుభ వివాహ in hero interior ── */
            .shubh-vivah-hero {
              font-family: 'Noto Serif Gujarati', serif;
              font-size: clamp(1.3rem, 4vw, 2.8rem);
              font-weight: 700;
              color: #cc0000;
              text-shadow: 0 0 18px rgba(180,0,0,0.5), 1px 1px 0px rgba(100,0,0,0.4);
              animation: shubhGlow 3s ease-in-out infinite;
              letter-spacing: 0.04em;
              line-height: 1.4;
              white-space: nowrap;
              display: block;
              text-align: center;
              padding: 2px 8px;
            }
            .hero-names{font-family:'Playfair Display',serif;font-weight:700;line-height:1;white-space:nowrap;font-size:clamp(2rem,8vw,6rem);background:linear-gradient(90deg,#8b6000 0%,#d4af37 20%,#fff4c2 40%,#d4af37 60%,#fff4c2 80%,#8b6000 100%);background-size:250% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shineAnim 4s linear infinite;}
            .hero-amp{-webkit-text-fill-color:rgba(255,244,194,0.65);margin:0 0.3em;}
            @keyframes fadeInUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
            @keyframes bounceSlow{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
            .animate-bounce-slow{animation:bounceSlow 3s ease-in-out infinite;}
            @keyframes floatSlow{0%,100%{transform:translateY(0px);}50%{transform:translateY(-10px);}}
            .float-slow{animation:floatSlow 6s ease-in-out infinite;will-change:transform;}
            @keyframes slowZoomBg{from{transform:scale(1.0);}to{transform:scale(1.06);}}
            @keyframes shineAnim{0%{background-position:0% center;}100%{background-position:250% center;}}
            @keyframes slideInFromLeft{from{opacity:0;transform:translateX(-50px);}to{opacity:1;transform:translateX(0);}}
            @keyframes slideInFromRight{from{opacity:0;transform:translateX(50px);}to{opacity:1;transform:translateX(0);}}
            .timeline-item-left,.timeline-item-right{opacity:0;}
            .timeline-item-left.animate-in{animation:slideInFromLeft 0.8s ease-out forwards;}
            .timeline-item-right.animate-in{animation:slideInFromRight 0.8s ease-out forwards;}
            /* Readable shine on hero italic text */
            .hero-text-shine {
              color: #f5e6c8;
              background: linear-gradient(90deg, #f5e6c8 0%, #fff4c2 40%, #ffe5a0 60%, #f5e6c8 100%);
              background-size: 200% auto;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              animation: textShine 4s linear infinite;
            }
            @keyframes textShine {
              0%   { background-position: 0% center; }
              100% { background-position: 200% center; }
            }
            /* shubhGlow for hero shubh vivah */
            @keyframes shubhGlowFS {
              0%,100% { color: #bb0000; text-shadow: 0 0 15px rgba(180,0,0,0.4), 1px 1px 0 rgba(80,0,0,0.35); }
              50%      { color: #ee1100; text-shadow: 0 0 28px rgba(220,0,0,0.75), 1px 1px 0 rgba(120,0,0,0.5); }
            }
            .guj-event{display:block;font-family:'Noto Serif Gujarati','Noto Sans Gujarati',serif;font-size:0.58em;font-weight:400;letter-spacing:0.04em;line-height:1.8;color:#d4af37;opacity:0.85;margin-top:0.15em;}
          `}</style>
        </div>

      ) : (
        /* ===== FIRST SCREEN ===== */
        <div className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0">
            <img src="/bg.jpg" alt="bg" className="w-full h-full object-cover" style={{animation:'slowZoom 25s ease-in-out infinite alternate',willChange:'transform'}} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/85"></div>
            <div className="absolute inset-0" style={{background:'linear-gradient(135deg,rgba(139,40,0,0.25) 0%,transparent 50%,rgba(180,100,0,0.2) 100%)'}}></div>
          </div>

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(14)].map((_,i)=>(
              <div key={i} className="absolute text-base sm:text-lg" style={{left:`${3+i*6.8}%`,top:'-30px',animation:`petalFall ${7+(i%5)}s linear ${i*0.6}s infinite`,opacity:0.45,willChange:'transform'}}>
                {i%5===0?'🌸':i%5===1?'🌺':i%5===2?'🌼':i%5===3?'🪷':'✿'}
              </div>
            ))}
          </div>

          <div className="absolute top-0 left-0 right-0 h-1.5 sm:h-2 bg-gradient-to-r from-[#8b6000] via-[#fff4c2] to-[#8b6000]"></div>
          <div className="absolute top-1.5 sm:top-2 left-0 right-0 h-px bg-[#d4af37]/40"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1.5 sm:h-2 bg-gradient-to-r from-[#8b6000] via-[#fff4c2] to-[#8b6000]"></div>
          <div className="absolute bottom-1.5 sm:bottom-2 left-0 right-0 h-px bg-[#d4af37]/40"></div>

          <div className="absolute top-4 sm:top-5 left-4 sm:left-5 pointer-events-none" style={{animation:'pulseSlow 3s ease-in-out infinite'}}>
            <svg width="50" height="50" className="sm:w-[70px] sm:h-[70px]" viewBox="0 0 70 70" fill="none">
              <path d="M5 5 L30 5 M5 5 L5 30" stroke="#d4af37" strokeWidth="1.5" strokeOpacity="0.7"/>
              <circle cx="5" cy="5" r="3" fill="#d4af37" fillOpacity="0.6"/>
              <circle cx="30" cy="5" r="1.5" fill="#d4af37" fillOpacity="0.4"/>
              <circle cx="5" cy="30" r="1.5" fill="#d4af37" fillOpacity="0.4"/>
            </svg>
          </div>
          <div className="absolute top-4 sm:top-5 right-4 sm:right-5 pointer-events-none" style={{animation:'pulseSlow 3s ease-in-out 0.5s infinite'}}>
            <svg width="50" height="50" className="sm:w-[70px] sm:h-[70px]" viewBox="0 0 70 70" fill="none">
              <path d="M65 5 L40 5 M65 5 L65 30" stroke="#d4af37" strokeWidth="1.5" strokeOpacity="0.7"/>
              <circle cx="65" cy="5" r="3" fill="#d4af37" fillOpacity="0.6"/>
              <circle cx="40" cy="5" r="1.5" fill="#d4af37" fillOpacity="0.4"/>
              <circle cx="65" cy="30" r="1.5" fill="#d4af37" fillOpacity="0.4"/>
            </svg>
          </div>
          <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 pointer-events-none" style={{animation:'pulseSlow 3s ease-in-out 1s infinite'}}>
            <svg width="50" height="50" className="sm:w-[70px] sm:h-[70px]" viewBox="0 0 70 70" fill="none">
              <path d="M5 65 L30 65 M5 65 L5 40" stroke="#d4af37" strokeWidth="1.5" strokeOpacity="0.7"/>
              <circle cx="5" cy="65" r="3" fill="#d4af37" fillOpacity="0.6"/>
            </svg>
          </div>
          <div className="absolute bottom-4 sm:bottom-5 right-4 sm:right-5 pointer-events-none" style={{animation:'pulseSlow 3s ease-in-out 1.5s infinite'}}>
            <svg width="50" height="50" className="sm:w-[70px] sm:h-[70px]" viewBox="0 0 70 70" fill="none">
              <path d="M65 65 L40 65 M65 65 L65 40" stroke="#d4af37" strokeWidth="1.5" strokeOpacity="0.7"/>
              <circle cx="65" cy="65" r="3" fill="#d4af37" fillOpacity="0.6"/>
            </svg>
          </div>

          <div className="absolute left-0 bottom-10 sm:bottom-16 md:bottom-20 pointer-events-none z-20" style={{animation:'floatSlow 7s ease-in-out infinite',willChange:'transform'}}>
            <img src="/namaste.png" alt="goddess left" className="w-20 sm:w-28 md:w-36 lg:w-44 object-contain"
              style={{filter:'drop-shadow(0 0 14px rgba(212,175,55,0.75)) drop-shadow(0 0 30px rgba(212,175,55,0.3))',transform:'scaleX(1)'}} />
          </div>
          <div className="absolute right-0 bottom-10 sm:bottom-16 md:bottom-20 pointer-events-none z-20" style={{animation:'floatSlow 7s ease-in-out 1.2s infinite',willChange:'transform'}}>
            <img src="/namaste.png" alt="goddess right" className="w-20 sm:w-28 md:w-36 lg:w-44 object-contain"
              style={{filter:'drop-shadow(0 0 14px rgba(212,175,55,0.75)) drop-shadow(0 0 30px rgba(212,175,55,0.3))',transform:'scaleX(-1)'}} />
          </div>

          <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 sm:px-4 text-center py-16">
            <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-3 sm:gap-4">

              <div style={{animation:'dropIn 1.2s cubic-bezier(0.34,1.56,0.64,1) 0.1s both'}}>
                <img src="/icon.png" alt="auspicious" className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 object-contain"
                  style={{filter:'drop-shadow(0 0 16px rgba(212,175,55,0.9)) drop-shadow(0 0 35px rgba(212,175,55,0.4))',animation:'glowPulse 3s ease-in-out infinite, floatSlow 6s ease-in-out infinite',willChange:'transform,filter'}} />
              </div>

              <div style={{animation:'dropIn 1.2s cubic-bezier(0.34,1.56,0.64,1) 0.3s both'}}>
                <img src="/istockphoto-952809996-612x612-removebg-preview.png" alt="Hindu Wedding Couple" className="w-24 sm:w-28 md:w-36 object-contain"
                  style={{filter:'drop-shadow(0 4px 18px rgba(212,175,55,0.5))',animation:'floatSlow 7s ease-in-out 0.5s infinite',willChange:'transform'}} />
              </div>

              <div style={{animation:'fadeInUp 1s ease-out 0.6s both'}} className="text-center w-full overflow-visible">
                <p className="shubh-vivah-text" translate="no">શુભ વિવાહ</p>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#c4a869] mt-1" style={{fontFamily:"'Cormorant Garamond',serif"}}>✦ Shubh Vivah ✦</p>
              </div>

              <div className="flex items-center justify-center gap-2 sm:gap-3 w-full" style={{animation:'fadeInUp 1s ease-out 0.7s both'}}>
                <div className="h-px flex-1 max-w-[50px] sm:max-w-[60px] bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                <span className="text-[#d4af37] text-sm sm:text-base">❋</span>
                <div className="h-px flex-1 max-w-[50px] sm:max-w-[60px] bg-gradient-to-l from-transparent to-[#d4af37]"></div>
              </div>

              <div style={{animation:'fadeInUp 1s ease-out 0.8s both'}} className="w-full px-2 flex items-baseline justify-center gap-0 flex-nowrap">
                <span className="first-screen-name" translate="no">Nitesh</span>
                <span className="first-screen-amp" translate="no">ના શુભ લગ્ન</span>
                <span className="first-screen-name" translate="no">Meena</span>
              </div>

              <div className="flex items-center justify-center gap-3 sm:gap-4 w-full" style={{animation:'fadeInUp 1s ease-out 0.95s both'}}>
                <div className="h-px w-14 sm:w-20 md:w-28 bg-gradient-to-r from-transparent via-[#d4af37] to-[#d4af37]"></div>
                <span className="text-[#d4af37] text-xl sm:text-2xl" style={{animation:'floatSlow 5s ease-in-out infinite'}}>🪷</span>
                <div className="h-px w-14 sm:w-20 md:w-28 bg-gradient-to-l from-transparent via-[#d4af37] to-[#d4af37]"></div>
              </div>

              <div style={{animation:'fadeInUp 1s ease-out 1.05s both'}}>
                <p className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-widest" style={{fontFamily:"'Cormorant Garamond', serif",background:"linear-gradient(90deg,#d4af37,#fff4c2,#d4af37)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>26 · April · 2026</p>
                <div className="mt-1 text-center">
                  <p className="notranslate" style={{fontFamily:"'Noto Serif Gujarati',serif",fontSize:"clamp(0.58rem,1.6vw,0.75rem)",color:"#d4af37",opacity:0.85,letterSpacing:"0.03em",lineHeight:"1.6",display:"block",textAlign:"center"}} translate="no">મુ.પો. ભાડલી (જાત) તા. દાંતીવાડા જિ. બનાસકાંઠા (ગુજ.)</p>
                  <p className="text-[#e6d3a3] text-[10px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.5em]" translate="no">Bhadli, Gujarat</p>
                </div>
              </div>

              <div className="px-4 py-3 border border-[#d4af37]/40 rounded-sm w-full max-w-xs sm:max-w-sm" style={{animation:'fadeInUp 1s ease-out 1.1s both',background:'rgba(0,0,0,0.25)'}}>
                <p className="text-[#fff4c2] text-sm sm:text-base md:text-lg leading-relaxed text-center" style={{fontFamily:"'Noto Serif Gujarati', serif"}}>
                  🌸 જ્યાં પ્રેમ છે, ત્યાં પ્રભુ છે 🌸
                </p>
                <p className="text-[#c4a869] text-[10px] sm:text-xs mt-1 tracking-wide text-center">Where there is love, there is God</p>
              </div>

              <p className="text-[#e6d3a3] text-xs sm:text-sm md:text-base leading-relaxed" style={{fontFamily:"'Lora', serif",fontStyle:'italic',animation:'fadeInUp 1s ease-out 1.2s both'}}>
                આપ સૌ ને પ્રેમ પૂર્વક આમંત્રણ છે
              </p>

              <div style={{animation:'fadeInUp 1s ease-out 1.3s both'}}>
                <button onClick={handleOpenInvitation} className="royal-cta-btn px-8 sm:px-10 py-2.5 sm:py-3 text-[#2d1a1a] font-bold text-sm sm:text-base uppercase tracking-[0.2em] sm:tracking-[0.25em]" style={{fontFamily:"'Cormorant Garamond', serif"}}>
                  ✦ Open Invitation ✦
                </button>
              </div>

            </div>
          </div>

          {/* Music button — prominent when muted, small when playing */}
          <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center gap-1">
            {/* Small hint label when muted */}
            {!isFirstPlaying && (
              <span className="text-[#d4af37] text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded-full"
                style={{fontFamily:"'Cormorant Garamond',serif",animation:'fadeInUp 0.5s ease-out both'}}>
                tap for music
              </span>
            )}
            <button
              onClick={()=>{
                if(firstAudioRef.current){
                  if(isFirstPlaying){
                    firstAudioRef.current.pause();
                    setIsFirstPlaying(false);
                  } else {
                    firstAudioRef.current.volume=0.55;
                    firstAudioRef.current.play().then(()=>setIsFirstPlaying(true)).catch(()=>{});
                  }
                }
              }}
              className={`bg-[#d4af37] text-[#2d1a1a] p-3 sm:p-4 rounded-full shadow-lg ${!isFirstPlaying ? 'music-pulse-soft' : ''}`}
            >
              {isFirstPlaying ? "🔊" : "🔇"}
            </button>
          </div>

          {/* ── First screen CSS — NO @import ── */}
          <style jsx>{`
            .music-pulse-soft{animation:musicPulseSoft 3s ease-in-out infinite;}
            @keyframes musicPulseSoft{0%,100%{box-shadow:0 0 8px rgba(212,175,55,0.4);}50%{box-shadow:0 0 18px rgba(212,175,55,0.8);}}
            /* ── શુભ વિવાહ decorative text — red royal style like PDF ── */
            .shubh-vivah-text {
              font-family: 'Noto Serif Gujarati', serif;
              font-size: clamp(1.4rem, 5.5vw, 3.5rem);
              font-weight: 700;
              color: #cc0000;
              text-shadow: 0 0 20px rgba(180,0,0,0.4), 1px 1px 0px rgba(120,0,0,0.5);
              animation: shubhGlowFS 3s ease-in-out infinite;
              letter-spacing: 0.04em;
              line-height: 1.4;
              white-space: nowrap;
              display: block;
              width: 100%;
              text-align: center;
              padding: 4px 12px;
            }
            @keyframes shubhGlowFS {
              0%,100% { color: #bb0000; text-shadow: 0 0 15px rgba(180,0,0,0.4), 1px 1px 0 rgba(80,0,0,0.35); }
              50%      { color: #ee1100; text-shadow: 0 0 28px rgba(220,0,0,0.75), 1px 1px 0 rgba(120,0,0,0.5); }
            }

            .first-screen-name{font-family:'Playfair Display',serif;font-weight:700;line-height:1.1;white-space:nowrap;font-size:clamp(1.8rem,7vw,5.5rem);background:linear-gradient(90deg,#8b6000 0%,#d4af37 25%,#fff4c2 50%,#d4af37 75%,#8b6000 100%);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shineAnim 4s linear infinite;display:inline-block;}
            .first-screen-amp{font-family:'Noto Serif Gujarati','Noto Sans Gujarati',serif;font-weight:400;font-size:clamp(0.85rem,2.8vw,2rem);letter-spacing:0.08em;color:rgba(255,244,194,0.85);white-space:nowrap;display:inline-block;margin:0 0.25em;line-height:1.2;}
            .shine-gold{background:linear-gradient(90deg,#8b6000 0%,#d4af37 20%,#fff4c2 40%,#d4af37 60%,#fff4c2 80%,#8b6000 100%);background-size:250% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shineAnim 4s linear infinite;}
            @keyframes shineAnim{0%{background-position:0% center;}100%{background-position:250% center;}}
            .royal-cta-btn{background:linear-gradient(135deg,#b8860b,#fff4c2,#d4af37,#b8860b);background-size:300% auto;border:2px solid #d4af37;box-shadow:0 0 20px rgba(212,175,55,0.6),0 0 50px rgba(212,175,55,0.2),inset 0 1px 0 rgba(255,255,255,0.3);transition:transform 0.3s,box-shadow 0.3s;animation:btnShine 3.5s linear infinite;}
            .royal-cta-btn:hover{transform:scale(1.05);box-shadow:0 0 32px rgba(212,175,55,0.9),0 0 70px rgba(212,175,55,0.4);}
            @keyframes btnShine{0%{background-position:0% center;}100%{background-position:300% center;}}
            @keyframes slowZoom{from{transform:scale(1.02);}to{transform:scale(1.08);}}
            @keyframes petalFall{0%{transform:translateY(-40px) rotate(0deg);opacity:0.5;}50%{transform:translateY(50vh) rotate(180deg) translateX(12px);opacity:0.35;}100%{transform:translateY(110vh) rotate(360deg) translateX(-8px);opacity:0;}}
            @keyframes dropIn{from{opacity:0;transform:translateY(-20px) scale(0.85);}to{opacity:1;transform:translateY(0) scale(1);}}
            @keyframes fadeInUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
            @keyframes glowPulse{0%,100%{filter:drop-shadow(0 0 8px rgba(212,175,55,0.6)) drop-shadow(0 0 20px rgba(212,175,55,0.3));}50%{filter:drop-shadow(0 0 20px rgba(212,175,55,1)) drop-shadow(0 0 45px rgba(212,175,55,0.6));}}
            @keyframes floatSlow{0%,100%{transform:translateY(0px);}50%{transform:translateY(-10px);}}
            @keyframes pulseSlow{0%,100%{opacity:0.45;}50%{opacity:0.9;}}
          `}</style>
        </div>
      )}

      {showInvitation && (
        <button
          onClick={()=>{if(audioRef.current){if(isPlaying){audioRef.current.pause();}else{audioRef.current.volume=0.65;audioRef.current.play();}setIsPlaying(!isPlaying);}}}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#d4af37] text-[#2d1a1a] p-3 sm:p-4 rounded-full shadow-lg"
        >
          {isPlaying ? "🔊" : "🔇"}
        </button>
      )}
    </div>
  );
}