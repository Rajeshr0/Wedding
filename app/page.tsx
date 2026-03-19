'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone } from 'lucide-react';

export default function WeddingPage() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const flowerContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!showInvitation) return;
    const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -100px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('animate-in'); });
    }, observerOptions);
    const timelineItems = document.querySelectorAll('.timeline-item-left, .timeline-item-right');
    timelineItems.forEach(item => observer.observe(item));
    return () => { timelineItems.forEach(item => observer.unobserve(item)); };
  }, [showInvitation]);

  const handleOpenInvitation = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.65;
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(err => console.log("Play failed:", err));
    }
    setShowInvitation(true);
  };

  return (
    <>
      <audio ref={audioRef} loop><source src="/wedding.mp3" type="audio/mpeg" /></audio>

      {showInvitation ? (
        <div ref={flowerContainerRef} className="relative min-h-screen w-full bg-[#1a0f0f] overflow-y-auto">
          <div className="fixed inset-0 pointer-events-none opacity-10">
            <div className="absolute inset-0 bg-pattern-fine"></div>
          </div>
          <div className="relative z-10">

            {/* HERO */}
            <section className="relative min-h-screen flex items-center justify-center px-4 py-20 text-center overflow-hidden">
              <div className="absolute inset-0">
                <img src="/bg.jpg" alt="wedding bg" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 md:w-96 opacity-30 pointer-events-none" style={{filter:'drop-shadow(0 0 20px rgba(212,175,55,0.4))'}}>
                <img src="/couple.png" alt="mandap" className="w-full object-contain" />
              </div>
              <div className="absolute inset-4 pointer-events-none border border-[#d4af37]/30 rounded-sm"></div>
              <div className="absolute inset-7 pointer-events-none border border-[#d4af37]/12 rounded-sm"></div>
              <div className="absolute top-8 left-8 text-[#d4af37] opacity-40 text-3xl">✿</div>
              <div className="absolute top-8 right-8 text-[#d4af37] opacity-40 text-3xl">✿</div>
              <div className="absolute bottom-8 left-8 text-[#d4af37] opacity-40 text-3xl">✿</div>
              <div className="absolute bottom-8 right-8 text-[#d4af37] opacity-40 text-3xl">✿</div>
              <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
                <img src="/icon.png" alt="icon" className="w-20 md:w-24 mb-6 hero-icon" />
                <p className="text-xs uppercase tracking-[0.6em] text-[#e6d3a3] mb-4 hero-fadein" style={{animationDelay:'0.3s'}}>✦ Together with their families ✦</p>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold whitespace-nowrap mb-6 hero-fadein" style={{fontFamily:"'Playfair Display', serif",background:"linear-gradient(90deg, #d4af37, #fff4c2, #d4af37)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animationDelay:'0.5s'}}>
                  Nitesh <span style={{WebkitTextFillColor:'#fff4c2aa'}}>&</span> Meena
                </h1>
                <div className="flex items-center gap-3 mb-6 hero-fadein" style={{animationDelay:'0.6s'}}>
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                  <span className="text-[#d4af37]">🪷</span>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                </div>
                <p className="text-base md:text-lg text-[#f5e6c8] leading-relaxed mb-8 max-w-xl hero-fadein" style={{fontFamily:"'Lora', serif",fontStyle:'italic',animationDelay:'0.7s'}}>
                  Request the pleasure of your company<br />at the celebration of their love and union
                </p>
                <div className="flex items-center gap-6 justify-center mb-6 hero-fadein" style={{animationDelay:'0.8s'}}>
                  <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
                  <p className="text-xl text-[#fff4c2] font-semibold tracking-wide" style={{fontFamily:"'Cormorant Garamond', serif"}}>26 April 2026</p>
                  <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
                </div>
                <p className="text-[#e6d3a3] text-base tracking-[3px] mb-12 hero-fadein" style={{animationDelay:'0.9s'}}>Bhadli, Gujarat</p>
                <div className="hero-fadein animate-bounce-slow" style={{animationDelay:'1s'}}>
                  <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </section>

            {/* Our Story */}
            <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-[#f5e6d3] relative overflow-hidden">
              <div className="absolute inset-0 rajasthan-bg opacity-5"></div>
              <div className="w-full max-w-5xl space-y-16 relative z-10">
                <div className="text-center space-y-3">
                  <p className="text-xs uppercase tracking-widest text-[#8b6f47]">— The Two Souls —</p>
                  <h2 className="text-5xl md:text-6xl font-bold text-[#2d1a1a]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Our Story</h2>
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                    <span className="text-[#d4af37]">❋</span>
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6 text-center timeline-item-left">
                    <div className="flex justify-center">
                      <div className="w-64 h-64 rounded-full border-4 border-[#8b6f47] overflow-hidden shadow-lg ring-4 ring-[#d4af37]/20">
                        <img src="/nitesh.jpeg" alt="Groom" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-4xl font-bold text-[#2d1a1a]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Nitesh</p>
                      <p className="text-sm uppercase tracking-widest text-[#8b6f47]">Groom</p>
                      <div className="space-y-2 py-4 border-t border-[#d4af37]">
                        <p className="text-xs text-[#8b6f47]">Son of</p>
                        <p className="text-lg font-semibold text-[#2d1a1a]">Mr. BabuBhai. H Rajgor & Mrs. Radhaben. B Rajgor</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6 text-center timeline-item-right">
                    <div className="flex justify-center">
                      <div className="w-64 h-64 rounded-full border-4 border-[#8b6f47] overflow-hidden shadow-lg ring-4 ring-[#d4af37]/20">
                        <img src="/meena.jpeg" alt="Bride" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-4xl font-bold text-[#2d1a1a]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Meena</p>
                      <p className="text-sm uppercase tracking-widest text-[#8b6f47]">Bride</p>
                      <div className="space-y-2 py-4 border-t border-[#d4af37]">
                        <p className="text-xs text-[#8b6f47]">Daughter of</p>
                        <p className="text-lg font-semibold text-[#2d1a1a]">Mr. Hariji Mafaji Purohit & Mrs. Manguben Hariji Purohit</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* WEDDING EVENTS — STARRY DESERT BG */}
            <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
              <div className="absolute inset-0">
                <img src="/dessert.png" alt="starry desert night" className="w-full h-full object-cover" style={{animation:'slowZoomBg 30s ease-in-out infinite alternate'}} />
                <div className="absolute inset-0 bg-black/65"></div>
                <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(120,50,0,0.6) 0%, rgba(80,30,0,0.3) 25%, transparent 55%, rgba(0,10,40,0.25) 100%)'}}></div>
              </div>
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 opacity-8 w-72 h-72 float-slow">
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E2%80%94Pngtree%E2%80%94om%20tattoo%20design%20with%20lotus_8990962-NUJdcfiQh9txDeW25z0Uv92DOtNu3N.png" alt="OM" className="w-full h-full object-contain" />
              </div>
              <div className="absolute top-4 left-4 text-4xl opacity-20 float-slow">🪔</div>
              <div className="absolute top-4 right-4 text-4xl opacity-20 float-slow" style={{animationDelay:'1s'}}>🪔</div>
              <div className="absolute bottom-4 left-4 text-3xl opacity-15 float-slow" style={{animationDelay:'0.5s'}}>🌸</div>
              <div className="absolute bottom-4 right-4 text-3xl opacity-15 float-slow" style={{animationDelay:'1.5s'}}>🌸</div>
              <div className="absolute top-1/3 left-3 text-2xl opacity-10 float-slow" style={{animationDelay:'0.8s'}}>🌺</div>
              <div className="absolute top-1/3 right-3 text-2xl opacity-10 float-slow" style={{animationDelay:'1.3s'}}>🌺</div>
              <div className="absolute top-2/3 left-3 text-2xl opacity-10 float-slow" style={{animationDelay:'0.3s'}}>🪷</div>
              <div className="absolute top-2/3 right-3 text-2xl opacity-10 float-slow" style={{animationDelay:'1.8s'}}>🪷</div>
              <div className="w-full max-w-4xl relative z-10">
                <div className="text-center mb-20 space-y-3">
                  <p className="text-[#c4a869] text-xs uppercase tracking-[0.4em]">— Auspicious Occasions —</p>
                  <h2 className="text-6xl md:text-7xl font-bold text-[#ffffff]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Wedding Events</h2>
                  <p className="text-[#c4a869] text-base" style={{fontFamily:"'Lora', serif",fontStyle:'italic'}}>A celebration of love and tradition</p>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                    <span className="text-[#d4af37] text-xl">🪷</span>
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                  </div>
                </div>
                <div className="space-y-12">
                  <div className="flex gap-6 md:gap-12 items-start timeline-item-left">
                    <div className="md:w-1/2 md:text-right space-y-3 bg-gradient-to-br from-[#2a1a1a]/90 to-[#3a2020]/90 backdrop-blur-sm p-6 rounded-lg border border-[#d4af37]/30 relative overflow-hidden">
                      <div className="absolute top-2 right-2 text-2xl opacity-25">🙏</div>
                      <p className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">24 April 2026</p>
                      <h3 className="text-3xl font-bold text-[#ffffff]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Path</h3>
                      <p className="text-[#c4a869] font-semibold">8:00 AM - 10:00 AM</p>
                      <p className="text-[#c4a869] text-sm">Traditional prayer ceremony</p>
                    </div>
                    <div className="hidden md:flex w-12 justify-center flex-col items-center"><div className="w-px h-28 bg-gradient-to-b from-[#d4af37] to-transparent"></div></div>
                    <div className="md:w-1/2"></div>
                  </div>
                  <div className="flex gap-6 md:gap-12 items-start flex-row-reverse timeline-item-right">
                    <div className="md:w-1/2 md:text-left space-y-3 bg-gradient-to-bl from-[#2a1a1a]/90 to-[#3a2020]/90 backdrop-blur-sm p-6 rounded-lg border border-[#d4af37]/30 relative overflow-hidden">
                      <div className="absolute top-2 left-2 text-2xl opacity-25">💃</div>
                      <p className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">24 April 2026</p>
                      <h3 className="text-3xl font-bold text-[#ffffff]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Sangeet & Garba</h3>
                      <p className="text-[#c4a869] font-semibold">10:30 AM - Evening</p>
                      <p className="text-[#c4a869] text-sm">Music, dance and celebration</p>
                    </div>
                    <div className="hidden md:flex w-12 justify-center flex-col items-center"><div className="w-px h-28 bg-gradient-to-b from-[#d4af37] to-transparent"></div></div>
                    <div className="md:w-1/2"></div>
                  </div>
                  <div className="flex gap-6 md:gap-12 items-start timeline-item-left">
                    <div className="md:w-1/2 md:text-right space-y-3 bg-gradient-to-br from-[#2a1a1a]/90 to-[#3a2020]/90 backdrop-blur-sm p-6 rounded-lg border border-[#d4af37]/30 relative overflow-hidden">
                      <div className="absolute top-2 right-2 text-2xl opacity-25">🕉️</div>
                      <p className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">25 April 2026</p>
                      <h3 className="text-3xl font-bold text-[#ffffff]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Janoi</h3>
                      <p className="text-[#c4a869] font-semibold">2:00 PM</p>
                      <p className="text-[#c4a869] text-sm">Sacred thread ceremony</p>
                    </div>
                    <div className="hidden md:flex w-12 justify-center flex-col items-center"><div className="w-px h-28 bg-gradient-to-b from-[#d4af37] to-transparent"></div></div>
                    <div className="md:w-1/2"></div>
                  </div>
                  <div className="flex gap-6 md:gap-12 items-start flex-row-reverse timeline-item-right">
                    <div className="md:w-1/2 md:text-left space-y-3 bg-gradient-to-bl from-[#2a1a1a]/90 to-[#3a2020]/90 backdrop-blur-sm p-6 rounded-lg border border-[#d4af37] relative overflow-hidden">
                      <div className="absolute top-2 left-2 text-2xl opacity-25">🐎</div>
                      <p className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold relative">26 April 2026</p>
                      <h3 className="text-3xl font-bold text-[#ffffff] relative" style={{fontFamily:"'Cormorant Garamond', serif"}}>Barat</h3>
                      <p className="text-[#c4a869] font-semibold relative">5:00 AM</p>
                      <p className="text-[#c4a869] text-sm relative">Groom&apos;s grand procession</p>
                    </div>
                    <div className="hidden md:flex w-12 justify-center flex-col items-center"><div className="w-px h-28 bg-gradient-to-b from-[#d4af37] to-transparent"></div></div>
                    <div className="md:w-1/2"></div>
                  </div>
                  <div className="flex gap-6 md:gap-12 items-start timeline-item-left">
                    <div className="md:w-1/2 md:text-right space-y-3 bg-gradient-to-br from-[#2a1a1a]/90 to-[#3a2020]/90 backdrop-blur-sm p-6 rounded-lg border-2 border-[#d4af37] relative overflow-hidden">
                      <div className="absolute top-2 right-2 text-2xl opacity-35">🔥</div>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/8 to-transparent"></div>
                      <p className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold relative">26 April 2026</p>
                      <h3 className="text-4xl font-bold text-[#ffffff] relative" style={{fontFamily:"'Cormorant Garamond', serif"}}>The Wedding</h3>
                      <p className="text-[#d4af37] font-semibold text-lg relative">6:30 AM</p>
                      <p className="text-[#c4a869] text-sm relative">Main wedding ceremony</p>
                    </div>
                    <div className="hidden md:flex w-12 justify-center flex-col items-center"><div className="w-px h-32 bg-gradient-to-b from-[#d4af37] via-[#d4af37] to-transparent"></div></div>
                    <div className="md:w-1/2"></div>
                  </div>
                  <div className="flex gap-6 md:gap-12 items-start flex-row-reverse timeline-item-right">
                    <div className="md:w-1/2 md:text-left space-y-3 bg-gradient-to-bl from-[#2a1a1a]/90 to-[#3a2020]/90 backdrop-blur-sm p-6 rounded-lg border border-[#d4af37]/30 relative overflow-hidden">
                      <div className="absolute top-2 left-2 text-2xl opacity-25">🎉</div>
                      <p className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">27 April 2026</p>
                      <h3 className="text-3xl font-bold text-[#ffffff]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Reception</h3>
                      <p className="text-[#c4a869] font-semibold">10:00 AM</p>
                      <p className="text-[#c4a869] text-sm">Celebration dinner and dance</p>
                    </div>
                    <div className="hidden md:flex w-12 justify-center flex-col items-center"><div className="w-px h-28 bg-gradient-to-b from-[#d4af37] to-transparent"></div></div>
                    <div className="md:w-1/2"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Venues */}
            <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-[#1a0a0a]">
              <div className="w-full max-w-4xl space-y-16">
                <div className="text-center space-y-2">
                  <p className="text-[#c4a869] text-xs uppercase tracking-[0.4em]">— Find Us —</p>
                  <h2 className="text-6xl md:text-7xl font-bold text-[#ffffff]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Wedding Venues</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-[#ffffff]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Groom&apos;s Home</h3>
                    <div className="h-56 rounded-lg overflow-hidden shadow-lg border border-[#d4af37]/20">
                      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d474.8161010833453!2d72.34597392895202!3d24.465871430645894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1773901079496!5m2!1sen!2sin" width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[#d4af37] font-semibold text-lg">BabuBhai Rajgor</p>
                      <div className="space-y-2 text-[#c4a869]">
                        <p className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-1 flex-shrink-0" /><span className="text-sm">Bhadli, Gujarat 385545</span></p>
                        <p className="flex items-start gap-2"><Phone className="w-4 h-4 mt-1 flex-shrink-0" /><span className="text-sm">+91 80008 01817</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-[#ffffff]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Bride&apos;s Home</h3>
                    <div className="h-56 rounded-lg overflow-hidden shadow-lg border border-[#d4af37]/20">
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3588.6780154255987!2d75.82479!3d26.913172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db6d9f5c8f6c1%3A0xabcdef1234567890!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1234567890" width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[#d4af37] font-semibold text-lg">Hariji Purohit</p>
                      <div className="space-y-2 text-[#c4a869]">
                        <p className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-1 flex-shrink-0" /><span className="text-sm">Umedpura, Gujarat 385545</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Blessings */}
            <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-[#f5e6d3] relative overflow-hidden">
              <div className="absolute inset-0 rajasthan-bg opacity-5"></div>

              <div className="w-full max-w-6xl text-center space-y-12 relative z-10">

                {/* Header */}
                <div className="space-y-4 border-b-2 border-[#d4af37] pb-8">
                  <p className="text-6xl">👑</p>
                  <h2 className="text-5xl md:text-6xl font-bold text-[#2d1a1a]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Blessings From Our Families</h2>
                </div>

                {/* Photos + center content */}
                <div className="grid grid-cols-3 gap-4 md:gap-8 items-center my-12">
                  {/* Groom photo */}
                  <div className="flex flex-col items-center gap-3 timeline-item-left">
                    <div className="w-32 h-44 md:w-48 md:h-64 rounded-2xl border-4 border-[#8b6f47] overflow-hidden shadow-xl ring-2 ring-[#d4af37]/30">
                      <img src="/nitesh.jpeg" alt="Groom Nitesh" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1 text-center mt-1">
                      <p className="text-xs uppercase tracking-widest text-[#8b6f47]">Groom</p>
                      <p className="text-lg md:text-2xl font-bold text-[#2d1a1a]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Nitesh</p>
                    </div>
                  </div>

                  {/* Center content */}
                  <div className="space-y-4">
                    <p className="text-3xl md:text-4xl font-bold text-[#2d1a1a]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Nitesh</p>
                    <p className="text-sm uppercase tracking-widest text-[#8b6f47]">Groom</p>
                    <div className="space-y-2 py-4 border-t border-[#d4af37]">
                      <p className="text-sm text-[#8b6f47]">Son of</p>
                      <p className="text-sm md:text-base font-semibold text-[#2d1a1a]">Mr. BabuBhai. H Rajgor & Mrs. Radhaben. B Rajgor</p>
                    </div>
                    <div className="flex items-center gap-2 justify-center py-2">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                      <span className="text-xl text-[#d4af37]">♥</span>
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                    </div>
                    <p className="text-3xl md:text-4xl font-bold text-[#2d1a1a]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Meena</p>
                    <p className="text-sm uppercase tracking-widest text-[#8b6f47]">Bride</p>
                    <div className="space-y-2 py-4 border-t border-[#d4af37]">
                      <p className="text-sm text-[#8b6f47]">Daughter of</p>
                      <p className="text-sm md:text-base font-semibold text-[#2d1a1a]">Mr. Hariji Mafaji Purohit & Mrs. Manguben Hariji Purohit</p>
                    </div>
                  </div>

                  {/* Bride photo */}
                  <div className="flex flex-col items-center gap-3 timeline-item-right">
                    <div className="w-32 h-44 md:w-48 md:h-64 rounded-2xl border-4 border-[#8b6f47] overflow-hidden shadow-xl ring-2 ring-[#d4af37]/30">
                      <img src="/meena.jpeg" alt="Bride Meena" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1 text-center mt-1">
                      <p className="text-xs uppercase tracking-widest text-[#8b6f47]">Bride</p>
                      <p className="text-lg md:text-2xl font-bold text-[#2d1a1a]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Meena</p>
                    </div>
                  </div>
                </div>

                {/* ===== GUJARATI QUOTE CARD ===== */}
                <div className="py-10 px-4">
                  <div className="relative max-w-2xl mx-auto">

                    {/* Top diya ornament */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37] to-[#d4af37]"></div>
                      <span className="text-3xl">🪔</span>
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d4af37] to-[#d4af37]"></div>
                    </div>

                    {/* Card */}
                    <div
                      className="relative rounded-2xl px-8 py-10 md:px-14 md:py-12 text-center space-y-6 overflow-hidden"
                      style={{
                        background:'linear-gradient(135deg, #fdf3e3 0%, #fae8cc 40%, #fdf0dc 100%)',
                        border:'1.5px solid #d4af37',
                        boxShadow:'0 0 0 4px rgba(212,175,55,0.08), 0 8px 40px rgba(139,70,0,0.12)',
                      }}
                    >
                      {/* Corner rosettes */}
                      <span className="absolute top-3 left-4 text-2xl text-[#d4af37] opacity-40 select-none">✾</span>
                      <span className="absolute top-3 right-4 text-2xl text-[#d4af37] opacity-40 select-none">✾</span>
                      <span className="absolute bottom-3 left-4 text-2xl text-[#d4af37] opacity-40 select-none">✾</span>
                      <span className="absolute bottom-3 right-4 text-2xl text-[#d4af37] opacity-40 select-none">✾</span>

                      {/* Poetic lines */}
                      <div className="space-y-4">
                        <p className="text-xl md:text-2xl leading-[2] text-[#2d1a00]"
                          style={{fontFamily:"'Noto Serif Gujarati', 'Noto Sans Gujarati', serif", fontWeight:400, letterSpacing:'0.03em'}}>
                          સરિતા સાગર ને મળે તે{' '}
                          <span className="font-bold" style={{fontFamily:"'Noto Serif Gujarati', serif", fontWeight:700, background:'linear-gradient(90deg, #8b3a00, #d4af37, #8b3a00)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', animation:'shineAnim 4s linear infinite'}}>
                            સંગમ
                          </span>{' '}
                          કહેવાય,
                        </p>
                        <p className="text-xl md:text-2xl leading-[2] text-[#2d1a00]"
                          style={{fontFamily:"'Noto Serif Gujarati', 'Noto Sans Gujarati', serif", fontWeight:400, letterSpacing:'0.03em'}}>
                          બે આત્માના મિલન ને{' '}
                          <span className="font-bold" style={{fontFamily:"'Noto Serif Gujarati', serif", fontWeight:700, background:'linear-gradient(90deg, #8b3a00, #d4af37, #8b3a00)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', animation:'shineAnim 4s linear infinite'}}>
                            લગ્ન
                          </span>{' '}
                          કહેવાય,
                        </p>
                        <p className="text-xl md:text-2xl leading-[2] text-[#2d1a00]"
                          style={{fontFamily:"'Noto Serif Gujarati', 'Noto Sans Gujarati', serif", fontWeight:400, letterSpacing:'0.03em'}}>
                          અને લગ્ન માં હોંશ થી આવે તેને{' '}
                          <span className="font-bold" style={{fontFamily:"'Noto Serif Gujarati', serif", fontWeight:700, background:'linear-gradient(90deg, #8b3a00, #d4af37, #8b3a00)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', animation:'shineAnim 4s linear infinite'}}>
                            મહેમાન
                          </span>{' '}
                          કહેવાય...
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="flex items-center justify-center gap-3 py-2">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                        <span className="text-[#d4af37] text-lg">❁</span>
                        <div className="h-px w-3 bg-[#d4af37]"></div>
                        <span className="text-[#d4af37] text-2xl">🪷</span>
                        <div className="h-px w-3 bg-[#d4af37]"></div>
                        <span className="text-[#d4af37] text-lg">❁</span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                      </div>

                      {/* Invite lines */}
                      <div className="space-y-3">
                        <p className="text-xl md:text-2xl text-[#5a1a00] leading-relaxed"
                          style={{fontFamily:"'Noto Serif Gujarati', 'Noto Sans Gujarati', serif", fontWeight:500, letterSpacing:'0.04em'}}>
                          તો મારા વહાલા મહેમાનો,
                        </p>
                        <p className="text-2xl md:text-3xl leading-relaxed"
                          style={{
                            fontFamily:"'Noto Serif Gujarati', 'Noto Sans Gujarati', serif",
                            fontWeight:700,
                            letterSpacing:'0.05em',
                            background:'linear-gradient(90deg, #7a1a00 0%, #d4af37 40%, #c0392b 70%, #d4af37 100%)',
                            backgroundSize:'250% auto',
                            WebkitBackgroundClip:'text',
                            WebkitTextFillColor:'transparent',
                            animation:'shineAnim 5s linear infinite',
                          }}>
                          લગ્ન માં જરૂર ને જરૂર આવજો! 🙏
                        </p>
                      </div>
                    </div>

                    {/* Bottom diya ornament */}
                    <div className="flex items-center justify-center gap-3 mt-8">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37] to-[#d4af37]"></div>
                      <span className="text-3xl">🪔</span>
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d4af37] to-[#d4af37]"></div>
                    </div>

                  </div>
                </div>
                {/* ===== END GUJARATI QUOTE CARD ===== */}

                {/* Together text */}
                <div className="space-y-4 pt-4">
                  <p className="text-2xl font-bold text-[#2d1a1a]" style={{fontFamily:"'Cormorant Garamond', serif"}}>Together with our families</p>
                  <p className="text-[#8b6f47] leading-relaxed max-w-2xl mx-auto">We look forward to celebrating this auspicious occasion with you and your loved ones. Your blessings and presence will make our joy complete.</p>
                </div>

              </div>
            </section>

          </div>

          <style jsx>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Lora:ital@0;1&family=Noto+Sans+Gujarati:wght@400;500;600;700&family=Noto+Serif+Gujarati:wght@400;500;600;700&display=swap');
            .bg-pattern-fine{background-image:radial-gradient(circle,rgba(212,175,55,0.15) 1px,transparent 1px),radial-gradient(circle,rgba(212,175,55,0.08) 1px,transparent 1px);background-size:30px 30px,60px 60px;background-position:0 0,15px 15px;}
            .rajasthan-bg{background-image:repeating-linear-gradient(45deg,rgba(139,111,71,0.3) 0px,rgba(139,111,71,0.3) 1px,transparent 1px,transparent 20px),repeating-linear-gradient(-45deg,rgba(139,111,71,0.3) 0px,rgba(139,111,71,0.3) 1px,transparent 1px,transparent 20px);}
            .hero-icon{animation:heroIconDrop 1.2s cubic-bezier(0.34,1.56,0.64,1) both;}
            @keyframes heroIconDrop{from{opacity:0;transform:translateY(-30px) scale(0.8);}to{opacity:1;transform:translateY(0) scale(1);}}
            .hero-fadein{animation:fadeInUp 1s ease-out both;}
            @keyframes fadeInUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
            @keyframes bounceSlow{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
            .animate-bounce-slow{animation:bounceSlow 3s ease-in-out infinite;}
            @keyframes floatSlow{0%,100%{transform:translateY(0px);}50%{transform:translateY(-12px);}}
            .float-slow{animation:floatSlow 6s ease-in-out infinite;}
            @keyframes slowZoomBg{from{transform:scale(1.0);}to{transform:scale(1.08);}}
            @keyframes shineAnim{0%{background-position:0% center;}100%{background-position:250% center;}}
            @keyframes slideInFromLeft{from{opacity:0;transform:translateX(-60px);}to{opacity:1;transform:translateX(0);}}
            @keyframes slideInFromRight{from{opacity:0;transform:translateX(60px);}to{opacity:1;transform:translateX(0);}}
            .timeline-item-left,.timeline-item-right{opacity:0;}
            .timeline-item-left.animate-in{animation:slideInFromLeft 1s ease-out forwards;}
            .timeline-item-right.animate-in{animation:slideInFromRight 1s ease-out forwards;}
          `}</style>
        </div>

      ) : (
        /* FIRST SCREEN */
        <div className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0">
            <img src="/bg.jpg" alt="bg" className="w-full h-full object-cover" style={{animation:'slowZoom 25s ease-in-out infinite alternate'}} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/85"></div>
            <div className="absolute inset-0" style={{background:'linear-gradient(135deg,rgba(139,40,0,0.25) 0%,transparent 50%,rgba(180,100,0,0.2) 100%)'}}></div>
          </div>

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(18)].map((_,i)=>(
              <div key={i} className="absolute text-lg" style={{left:`${2+i*5.5}%`,top:'-30px',animation:`petalFall ${7+(i%6)}s linear ${i*0.5}s infinite`,opacity:0.5}}>
                {i%5===0?'🌸':i%5===1?'🌺':i%5===2?'🌼':i%5===3?'🪷':'✿'}
              </div>
            ))}
          </div>

          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#8b6000] via-[#fff4c2] to-[#8b6000]"></div>
          <div className="absolute top-2 left-0 right-0 h-px bg-[#d4af37]/40"></div>
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#8b6000] via-[#fff4c2] to-[#8b6000]"></div>
          <div className="absolute bottom-2 left-0 right-0 h-px bg-[#d4af37]/40"></div>

          <div className="absolute top-5 left-5 pointer-events-none" style={{animation:'pulseSlow 3s ease-in-out infinite'}}>
            <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
              <path d="M5 5 L30 5 M5 5 L5 30" stroke="#d4af37" strokeWidth="1.5" strokeOpacity="0.7"/>
              <path d="M5 5 L20 20" stroke="#d4af37" strokeWidth="0.8" strokeOpacity="0.4"/>
              <circle cx="5" cy="5" r="3" fill="#d4af37" fillOpacity="0.6"/>
              <circle cx="30" cy="5" r="1.5" fill="#d4af37" fillOpacity="0.4"/>
              <circle cx="5" cy="30" r="1.5" fill="#d4af37" fillOpacity="0.4"/>
            </svg>
          </div>
          <div className="absolute top-5 right-5 pointer-events-none" style={{animation:'pulseSlow 3s ease-in-out 0.5s infinite'}}>
            <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
              <path d="M65 5 L40 5 M65 5 L65 30" stroke="#d4af37" strokeWidth="1.5" strokeOpacity="0.7"/>
              <circle cx="65" cy="5" r="3" fill="#d4af37" fillOpacity="0.6"/>
              <circle cx="40" cy="5" r="1.5" fill="#d4af37" fillOpacity="0.4"/>
              <circle cx="65" cy="30" r="1.5" fill="#d4af37" fillOpacity="0.4"/>
            </svg>
          </div>
          <div className="absolute bottom-5 left-5 pointer-events-none" style={{animation:'pulseSlow 3s ease-in-out 1s infinite'}}>
            <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
              <path d="M5 65 L30 65 M5 65 L5 40" stroke="#d4af37" strokeWidth="1.5" strokeOpacity="0.7"/>
              <circle cx="5" cy="65" r="3" fill="#d4af37" fillOpacity="0.6"/>
            </svg>
          </div>
          <div className="absolute bottom-5 right-5 pointer-events-none" style={{animation:'pulseSlow 3s ease-in-out 1.5s infinite'}}>
            <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
              <path d="M65 65 L40 65 M65 65 L65 40" stroke="#d4af37" strokeWidth="1.5" strokeOpacity="0.7"/>
              <circle cx="65" cy="65" r="3" fill="#d4af37" fillOpacity="0.6"/>
            </svg>
          </div>

          <div className="absolute left-0 bottom-6 pointer-events-none z-20" style={{animation:'floatSlow 7s ease-in-out infinite'}}>
            <img src="/namaste.png" alt="goddess left" className="w-28 md:w-36 lg:w-44 object-contain"
              style={{filter:'drop-shadow(0 0 14px rgba(212,175,55,0.75)) drop-shadow(0 0 30px rgba(212,175,55,0.3))',transform:'scaleX(1)'}} />
          </div>
          <div className="absolute right-0 bottom-6 pointer-events-none z-20" style={{animation:'floatSlow 7s ease-in-out 1.2s infinite'}}>
            <img src="/namaste.png" alt="goddess right" className="w-28 md:w-36 lg:w-44 object-contain"
              style={{filter:'drop-shadow(0 0 14px rgba(212,175,55,0.75)) drop-shadow(0 0 30px rgba(212,175,55,0.3))',transform:'scaleX(-1)'}} />
          </div>

          <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">

              <div style={{animation:'dropIn 1.2s cubic-bezier(0.34,1.56,0.64,1) 0.1s both'}}>
                <img src="/icon.png" alt="auspicious" className="w-20 h-20 md:w-28 md:h-28 object-contain"
                  style={{filter:'drop-shadow(0 0 16px rgba(212,175,55,0.9)) drop-shadow(0 0 35px rgba(212,175,55,0.4))',animation:'glowPulse 3s ease-in-out infinite, floatSlow 6s ease-in-out infinite'}} />
              </div>

              <div style={{animation:'dropIn 1.2s cubic-bezier(0.34,1.56,0.64,1) 0.3s both'}}>
                <img src="/istockphoto-952809996-612x612-removebg-preview.png" alt="Hindu Wedding Couple" className="w-28 md:w-36 object-contain"
                  style={{filter:'drop-shadow(0 4px 18px rgba(212,175,55,0.5))',animation:'floatSlow 7s ease-in-out 0.5s infinite'}} />
              </div>

              <p className="text-xs uppercase tracking-[0.6em] text-[#e6d3a3]" style={{animation:'fadeInUp 1s ease-out 0.6s both'}}>
                ✦ Together with their families ✦
              </p>

              <div className="flex items-center justify-center gap-3 w-full" style={{animation:'fadeInUp 1s ease-out 0.7s both'}}>
                <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                <span className="text-[#d4af37] text-base">❋</span>
                <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-[#d4af37]"></div>
              </div>

              <div style={{animation:'fadeInUp 1s ease-out 0.8s both'}}>
                <h1 className="text-6xl md:text-8xl font-bold leading-none shine-gold" style={{fontFamily:"'Playfair Display', serif"}}>Nitesh</h1>
                <p className="text-xl md:text-2xl tracking-[0.6em] my-2 font-light" style={{fontFamily:"'Cormorant Garamond', serif",background:"linear-gradient(90deg,#d4af37,#fff4c2,#d4af37)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>weds</p>
                <h1 className="text-6xl md:text-8xl font-bold leading-none shine-gold" style={{fontFamily:"'Playfair Display', serif"}}>Meena</h1>
              </div>

              <div className="flex items-center justify-center gap-4 w-full" style={{animation:'fadeInUp 1s ease-out 0.95s both'}}>
                <div className="h-px w-20 md:w-28 bg-gradient-to-r from-transparent via-[#d4af37] to-[#d4af37]"></div>
                <span className="text-[#d4af37] text-2xl" style={{animation:'floatSlow 5s ease-in-out infinite'}}>🪷</span>
                <div className="h-px w-20 md:w-28 bg-gradient-to-l from-transparent via-[#d4af37] to-[#d4af37]"></div>
              </div>

              <div style={{animation:'fadeInUp 1s ease-out 1.05s both'}}>
                <p className="text-2xl md:text-3xl font-semibold tracking-widest" style={{fontFamily:"'Cormorant Garamond', serif",background:"linear-gradient(90deg,#d4af37,#fff4c2,#d4af37)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>26 · April · 2026</p>
                <p className="text-[#e6d3a3] text-xs uppercase tracking-[0.5em] mt-1">Bhadli, Gujarat</p>
              </div>

              <div className="px-4 py-3 border border-[#d4af37]/40 rounded-sm max-w-xs md:max-w-sm" style={{animation:'fadeInUp 1s ease-out 1.1s both',background:'rgba(0,0,0,0.25)'}}>
                <p className="text-[#fff4c2] text-base md:text-lg leading-relaxed text-center" style={{fontFamily:"'Noto Serif Gujarati', serif"}}>
                  🌸 જ્યાં પ્રેમ છે, ત્યાં પ્રભુ છે 🌸
                </p>
                <p className="text-[#c4a869] text-xs mt-1 tracking-wide text-center">Where there is love, there is God</p>
              </div>

              <p className="text-[#e6d3a3] text-sm md:text-base leading-relaxed" style={{fontFamily:"'Lora', serif",fontStyle:'italic',animation:'fadeInUp 1s ease-out 1.2s both'}}>
                Invite you to join us in the celebration of our love
              </p>

              <div style={{animation:'fadeInUp 1s ease-out 1.3s both'}}>
                <button onClick={handleOpenInvitation} className="royal-cta-btn px-10 py-3 text-[#2d1a1a] font-bold text-base uppercase tracking-[0.25em]" style={{fontFamily:"'Cormorant Garamond', serif"}}>
                  ✦ Open Invitation ✦
                </button>
              </div>

            </div>
          </div>

          <style jsx>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Lora:ital@0;1&family=Noto+Sans+Gujarati:wght@400;500;600;700&family=Noto+Serif+Gujarati:wght@400;500;600;700&display=swap');
            .shine-gold{background:linear-gradient(90deg,#8b6000 0%,#d4af37 20%,#fff4c2 40%,#d4af37 60%,#fff4c2 80%,#8b6000 100%);background-size:250% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shineAnim 4s linear infinite;}
            @keyframes shineAnim{0%{background-position:0% center;}100%{background-position:250% center;}}
            .royal-cta-btn{background:linear-gradient(135deg,#b8860b,#fff4c2,#d4af37,#b8860b);background-size:300% auto;border:2px solid #d4af37;box-shadow:0 0 20px rgba(212,175,55,0.6),0 0 50px rgba(212,175,55,0.2),inset 0 1px 0 rgba(255,255,255,0.3);transition:transform 0.4s,box-shadow 0.4s;animation:btnShine 3.5s linear infinite;}
            .royal-cta-btn:hover{transform:scale(1.06);box-shadow:0 0 32px rgba(212,175,55,0.9),0 0 70px rgba(212,175,55,0.4);}
            @keyframes btnShine{0%{background-position:0% center;}100%{background-position:300% center;}}
            @keyframes slowZoom{from{transform:scale(1.04);}to{transform:scale(1.1);}}
            @keyframes petalFall{0%{transform:translateY(-40px) rotate(0deg) translateX(0px);opacity:0.55;}50%{transform:translateY(50vh) rotate(200deg) translateX(18px);opacity:0.4;}100%{transform:translateY(110vh) rotate(400deg) translateX(-12px);opacity:0;}}
            @keyframes dropIn{from{opacity:0;transform:translateY(-28px) scale(0.82);}to{opacity:1;transform:translateY(0) scale(1);}}
            @keyframes fadeInUp{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);}}
            @keyframes glowPulse{0%,100%{filter:drop-shadow(0 0 8px rgba(212,175,55,0.6)) drop-shadow(0 0 20px rgba(212,175,55,0.3));}50%{filter:drop-shadow(0 0 20px rgba(212,175,55,1)) drop-shadow(0 0 45px rgba(212,175,55,0.6));}}
            @keyframes floatSlow{0%,100%{transform:translateY(0px);}50%{transform:translateY(-10px);}}
            @keyframes pulseSlow{0%,100%{opacity:0.45;}50%{opacity:0.9;}}
          `}</style>
        </div>
      )}

      {showInvitation && (
        <button onClick={()=>{if(audioRef.current){if(isPlaying){audioRef.current.pause();}else{audioRef.current.volume=0.65;audioRef.current.play();}setIsPlaying(!isPlaying);}}} className="fixed bottom-6 right-6 z-50 bg-[#d4af37] text-[#2d1a1a] p-4 rounded-full shadow-lg">
          {isPlaying?"🔊":"🔇"}
        </button>
      )}
    </>
  );
}