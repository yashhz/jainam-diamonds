"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type ViewState = "loading" | "home" | "diamonds" | "jewelry" | "collection";

const WORDS = ["Precision.", "Brilliance.", "Provenance.", "Jainam Diamonds."];

export default function ClientPage({ config, products }: { config: any, products: any }) {
  const [view, setView] = useState<ViewState>("loading");
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setView("home"), 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (view !== "loading") return;
    const cycle = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % WORDS.length);
        setWordVisible(true);
      }, 350);
    }, 700);
    return () => clearInterval(cycle);
  }, [view]);

  const openCollection = (id: string) => {
    setActiveCollection(id);
    setView("collection");
  };

  const handleBack = () => {
    if (view === "collection") {
      setView("jewelry");
      setActiveCollection(null);
    } else {
      setView("home");
    }
  };

  const contactPhoneRaw = config.contactPhone?.replace(/[^0-9]/g, "") || "919737263395";

  if (view === "loading") {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden">
        <div className="text-center flex flex-col items-center gap-8 px-8">
          <div className="relative w-36 h-36 md:w-48 md:h-48 animate-pulse-slow">
            <Image src="/logo.png" alt="Jainam Diamonds" fill className="object-contain" priority />
          </div>
          <div
            className="text-lg md:text-xl font-serif tracking-[0.25em] text-[#CCA43D] transition-all duration-300"
            style={{ opacity: wordVisible ? 1 : 0, transform: wordVisible ? 'translateY(0)' : 'translateY(6px)' }}
          >
            {WORDS[wordIdx]}
          </div>
          <div className="w-48 md:w-64 h-[1px] bg-[#1a1a1a] relative overflow-hidden rounded-full">
            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#CCA43D] to-[#E8C96B] animate-progress-bar rounded-full" />
          </div>
          <p className="text-xs text-gray-500 tracking-[0.25em] uppercase mt-4 animate-pulse">
            Crafting your experience
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#0a0a0a] text-white font-sans selection:bg-[#CCA43D] selection:text-black">
      {/* Dynamic Header */}
      {view !== "home" && (
        <header className="w-full p-6 flex justify-between items-center border-b border-[#1a1a1a] animate-fade-in z-40 sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-md">
          <button
            onClick={handleBack}
            aria-label="Go back to previous page"
            className="text-[#CCA43D] hover:text-white transition-colors duration-300 flex items-center gap-2 group text-sm uppercase tracking-widest"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Back
          </button>
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView("home")}>
            <div className="relative w-16 h-16">
              <Image src="/logo.png" alt="Jainam Diamonds" fill className="object-contain" />
            </div>
          </div>
          <div className="w-[60px]"></div> {/* Spacer for center alignment */}
        </header>
      )}

      {/* Home View */}
      {view === "home" && (
        <>
          <div className="flex flex-col md:flex-row w-full animate-fade-in relative min-h-screen">
            {/* Center Brand Overlay */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10 w-full">
              <div className="relative w-64 h-64 md:w-[440px] md:h-[440px] pointer-events-auto transition-all duration-700 hover:scale-[1.03]">
                <Image src="/logo.png" alt="Jainam Diamonds Logo" fill className="object-contain" priority />
              </div>
            </div>

            {/* Diamonds Split */}
            <div onClick={() => setView("diamonds")} className="w-full md:w-1/2 relative group cursor-pointer overflow-hidden bg-black min-h-[50vh] md:min-h-screen">
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${config.heroDiamondImage || '/Diamond.jpg'})` }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-start justify-end pb-16 md:pb-24 px-8 md:px-14 z-20">
                <p className="text-[#CCA43D] text-[12px] md:text-[14px] tracking-[0.4em] uppercase mb-4 font-semibold transition-all duration-500 group-hover:scale-105 group-hover:text-[#E8C96B] drop-shadow-[0_2px_10px_rgba(204,164,61,0.25)]">The Diamonds</p>
                <h2 className="text-4xl md:text-7xl lg:text-8xl text-white font-serif leading-[0.9] mb-6 group-hover:-translate-y-2 transition-transform duration-700 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Precision.<br/>Brilliance.</h2>
                <div className="w-10 h-[1px] bg-[#CCA43D] group-hover:w-20 transition-all duration-700" />
                <p className="premium-subtext mt-5 max-h-0 overflow-hidden group-hover:max-h-16 transition-all duration-700 delay-100 max-w-xs">
                  Every facet engineered to bend light at its most perfect angle.
                </p>
              </div>
            </div>

            {/* Jewelry Split */}
            <div onClick={() => setView("jewelry")} className="w-full md:w-1/2 relative group cursor-pointer overflow-hidden bg-[#100a05] min-h-[50vh] md:min-h-screen">
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${config.heroJewelryImage || 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2000&auto=format&fit=crop'})` }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-end justify-end pb-16 md:pb-24 px-8 md:px-14 z-20 text-right">
                <p className="text-[#CCA43D] text-[12px] md:text-[14px] tracking-[0.4em] uppercase mb-4 font-semibold transition-all duration-500 group-hover:scale-105 group-hover:text-[#E8C96B] drop-shadow-[0_2px_10px_rgba(204,164,61,0.25)]">Fine Jewelry</p>
                <h2 className="text-4xl md:text-7xl lg:text-8xl text-white font-serif leading-[0.9] mb-6 group-hover:-translate-y-2 transition-transform duration-700 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Worn.<br/>Cherished.</h2>
                <div className="w-10 h-[1px] bg-[#CCA43D] ml-auto group-hover:w-20 transition-all duration-700" />
                <p className="premium-subtext mt-5 max-h-0 overflow-hidden group-hover:max-h-16 transition-all duration-700 delay-100 max-w-xs">
                  Passed down. Every piece holds a story worth telling forever.
                </p>
              </div>
            </div>
          </div>

          {/* About Us & Founder Section */}
          <section className="w-full bg-[#070707] py-24 md:py-32 px-6 md:px-12 border-t border-[#121212] relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute -left-48 top-1/4 w-96 h-96 rounded-full bg-[#CCA43D]/3 blur-[120px] pointer-events-none" />
            <div className="absolute -right-48 bottom-1/4 w-96 h-96 rounded-full bg-[#CCA43D]/3 blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
              {/* Image / Graphic container */}
              <div className="w-full lg:w-5/12 flex flex-col gap-6 order-2 lg:order-1">
                <div className="relative aspect-[4/5] w-full border border-[#1a1a1a] p-4 bg-[#0a0a0a]/50 backdrop-blur-sm group hover:border-[#CCA43D]/40 transition-all duration-500">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image 
                      src="/founder.jpg" 
                      alt="Jainam Mehta - Founder of Jainam Diamonds" 
                      fill 
                      className="object-cover object-top transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                  </div>
                  {/* Decorative corner accents */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#CCA43D]/40" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#CCA43D]/40" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#CCA43D]/40" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#CCA43D]/40" />
                </div>
                
                {/* Founder Info Overlay Card */}
                <div className="border border-[#1a1a1a] bg-[#0c0c0c]/80 backdrop-blur-sm p-6 text-center lg:text-left transition-all duration-500 hover:border-[#CCA43D]/30">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#CCA43D] mb-1 font-semibold">Founder & Visionary</p>
                  <h4 className="text-xl font-serif text-white tracking-wide">Jainam Mehta</h4>
                  <div className="w-8 h-[1px] bg-[#CCA43D] my-3 mx-auto lg:mx-0" />
                  <p className="premium-subtext italic">
                    "Every diamond we curate is a testament to the pursuit of ultimate perfection. We don't just supply gems; we immortalize moments of profound emotion."
                  </p>
                </div>
              </div>

              {/* Text content */}
              <div className="w-full lg:w-7/12 flex flex-col justify-center order-1 lg:order-2">
                <span className="text-[#CCA43D] text-[10px] md:text-xs tracking-[0.3em] uppercase mb-4 font-semibold inline-block">The Provenance</span>
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
                  About Jainam Diamonds
                </h2>
                <div className="w-20 h-[1px] bg-[#CCA43D] mb-8" />
                
                <div className="space-y-6 premium-subtext">
                  <p>
                    Established on the principles of immaculate precision and timeless luxury, <strong className="text-white font-semibold">Jainam Diamonds</strong> represents the absolute pinnacle of diamond curation. Rooted deeply in Surat—the diamond capital of the world—our legacy thrives where world-class craftsmanship meets the most sophisticated global standards.
                  </p>
                  <p>
                    Under the expert stewardship of our founder, <strong className="text-white font-semibold">Jainam Mehta</strong>, we operate with a singular, uncompromising vision: to elevate diamond selection into a profound form of art. Every single stone is examined, touched, and certified under three generations of rigorous training.
                  </p>
                  <p>
                    Whether selecting a flawless natural diamond shaped over billions of years under the Earth’s mantle, or a pristine, traceably sustainable lab-grown diamond, our patrons receive pieces that set a new benchmark for fire, brilliance, and emotional value.
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap gap-8 items-center pt-8 border-t border-[#1a1a1a]">
                  <div>
                    <p className="text-3xl font-serif text-[#CCA43D]">3+</p>
                    <p className="text-[10px] uppercase tracking-widest mt-1 premium-subtext">Generations of Eyes</p>
                  </div>
                  <div className="w-[1px] h-10 bg-[#1a1a1a]" />
                  <div>
                    <p className="text-3xl font-serif text-[#CCA43D]">90%</p>
                    <p className="text-[10px] uppercase tracking-widest mt-1 premium-subtext">Surat Cut Advantage</p>
                  </div>
                  <div className="w-[1px] h-10 bg-[#1a1a1a]" />
                  <div>
                    <p className="text-3xl font-serif text-[#CCA43D]">100%</p>
                    <p className="text-[10px] uppercase tracking-widest mt-1 premium-subtext">Certified Integrity</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pillars of Excellence / Why Us Section */}
          <section className="w-full bg-[#050505] py-24 md:py-32 px-6 md:px-12 border-t border-[#121212] relative overflow-hidden">
            {/* Ambient gold line across bg */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#CCA43D]/10 to-transparent" />
            
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center max-w-2xl mx-auto mb-20">
                <span className="text-[#CCA43D] text-[10px] md:text-xs tracking-[0.3em] uppercase mb-4 font-semibold inline-block">The Signature Standard</span>
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Four Pillars of Perfection</h2>
                <div className="w-16 h-[1px] bg-[#CCA43D] mx-auto mb-6" />
                <p className="premium-subtext text-center">
                  Our pursuit of unmatched brilliance is anchored upon four core values that define every commission and curation we deliver.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 stagger-children">
                {[
                  {
                    num: "I",
                    title: "Surat Craft Heritage",
                    desc: "Harnessing the immense prestige of Surat, the unparalleled diamond-cutting nucleus of the planet. Generational masters finish each facet with unmatched mathematical precision."
                  },
                  {
                    num: "II",
                    title: "Bespoke Consultation",
                    desc: "We align with your distinct creative desires. Every major piece undergoes personal curation directly under Jainam Mehta, ensuring your jewelry is entirely unique."
                  },
                  {
                    num: "III",
                    title: "Ethical Provenance",
                    desc: "Pure trust. Every natural and lab-grown diamond we represent is responsibly sourced, certified conflict-free, and graded by world-renowned gemological laboratories."
                  },
                  {
                    num: "IV",
                    title: "Optic Fire Engineering",
                    desc: "Beyond generic dimensions. We select stones graded only with ultimate light dispersion potential, ensuring spectacular fire, brilliance, and scintillation under all lighting."
                  }
                ].map((pillar) => (
                  <div 
                    key={pillar.num}
                    className="luxury-card group border border-[#141414] hover:border-[#CCA43D]/30 bg-[#0a0a0a] p-8 transition-all duration-500 flex flex-col justify-between hover:-translate-y-1 relative animate-fade-in"
                  >
                    <div>
                      {/* Giant subtle roman numeral */}
                      <span className="text-[4rem] font-serif text-white/[0.02] group-hover:text-white/[0.04] transition-colors duration-500 absolute top-4 right-6 select-none pointer-events-none">
                        {pillar.num}
                      </span>
                      <div className="w-8 h-[1px] bg-[#CCA43D]/50 mb-8 group-hover:w-16 transition-all duration-500" />
                      <h3 className="text-lg md:text-xl font-serif text-white mb-4 group-hover:text-[#CCA43D] transition-colors duration-300">
                        {pillar.title}
                      </h3>
                      <p className="premium-subtext">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/* Default Footer is handled below */}
        </>
      )}

      {/* Collection Details View */}
      {view === "collection" && activeCollection && products && products[activeCollection] && (
        <div className="animate-slide-up w-full px-6 md:px-12 py-20 pb-32 min-h-[80vh]">
          <div className="text-center mb-20 md:mb-24">
            <h2 className="text-[#CCA43D] tracking-[0.2em] mb-4 text-sm uppercase font-semibold">Bespoke Collection</h2>
            <h1 className="text-4xl md:text-6xl font-serif">{products[activeCollection].title}</h1>
            <div className="w-24 h-[1px] bg-[#CCA43D] mx-auto mt-8"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto px-4 stagger-children">
            {products[activeCollection].products.map((product: any) => (
              <div key={product.id} className="luxury-card group cursor-pointer border border-[#1a1a1a] hover:border-[#CCA43D]/40 bg-[#080808] flex flex-col animate-fade-in" onClick={() => setSelectedProduct(product)}>
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-115 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-[#CCA43D]/0 group-hover:bg-[#CCA43D]/5 transition-colors duration-500" />
                </div>
                <div className="p-5 md:p-6 text-center flex-1 flex flex-col justify-center">
                  <h3 className="text-xs md:text-sm font-serif mb-3 text-white leading-snug tracking-wide">{product.name}</h3>
                  <div className="h-[1px] w-6 mx-auto bg-[#CCA43D]/40 mb-3 group-hover:w-14 transition-all duration-500" />
                  <p className="text-[#CCA43D] text-[9px] uppercase tracking-[0.25em] opacity-60 group-hover:opacity-100 transition-opacity duration-300">View Details</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Popup Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in bg-black/90 backdrop-blur-md" 
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedProduct(null); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-title"
        >
          <div className="relative w-full max-w-5xl bg-[#0a0a0a] border border-[#1a1a1a] flex flex-col md:flex-row shadow-2xl overflow-hidden animate-scale-in">
            <button 
              onClick={() => setSelectedProduct(null)} 
              aria-label="Close product details"
              className="absolute top-4 right-4 z-50 text-gray-500 hover:text-[#CCA43D] transition-all duration-300 bg-[#0a0a0a]/80 border border-[#1a1a1a] hover:border-[#CCA43D]/40 w-11 h-11 flex items-center justify-center text-xs hover:scale-105 active:scale-95"
            >✕</button>

            <div className="w-full md:w-1/2 relative h-56 md:h-auto min-h-[420px]">
              <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/20" />
            </div>

            <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
              <p className="text-[#CCA43D] text-[10px] uppercase tracking-[0.3em] mb-4 font-medium">Jainam Diamonds</p>
              <h2 id="product-title" className="text-2xl md:text-3xl font-serif mb-5 leading-tight">{selectedProduct.name}</h2>
              <div className="w-16 h-[1px] bg-gradient-to-r from-[#CCA43D]/60 to-transparent mb-7" />
              
              <p className="premium-subtext mb-12">
                {selectedProduct.details}
              </p>

              <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-3">
                <a
                   href={`https://wa.me/${contactPhoneRaw}?text=Hello%20Jainam%20Diamonds!%20I%20am%20interested%20in%20the%20${encodeURIComponent(selectedProduct.name)}%20and%20would%20like%20more%20details.`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex-1 group/btn relative overflow-hidden border border-[#CCA43D]/60 text-[#CCA43D] hover:text-black px-6 py-4 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-400 text-center flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="absolute inset-0 bg-[#CCA43D] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-400 ease-out" />
                  <svg className="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M11.996 2C6.474 2 2 6.474 2 12c0 1.954.566 3.774 1.545 5.334L2 22l4.811-1.503C8.318 21.468 10.106 22 11.996 22 17.518 22 22 17.526 22 12c0-5.526-4.482-10-10.004-10zM12 20.301c-1.636 0-3.197-.432-4.576-1.24l-.328-.194-3.394 1.06 1.08-3.31-.212-.338C3.765 14.887 3.298 13.486 3.298 12 3.298 7.211 7.213 3.298 12.001 3.298 16.787 3.298 20.702 7.211 20.702 12c0 4.79-3.914 8.701-8.702 8.701zm4.783-6.526c-.262-.132-1.55-.765-1.79-.854-.239-.089-.413-.132-.587.132-.174.264-.678.854-.83 1.028-.152.175-.304.22-.566.089-1.29-.646-2.52-1.666-3.102-3.15-.152-.39-.016-.604.116-.736.118-.118.261-.305.393-.457.13-.153.174-.263.26-.438.087-.175.044-.329-.022-.46-.065-.132-.587-1.416-.805-1.938-.211-.51-.424-.442-.587-.45-.152-.008-.326-.008-.501-.008-.174 0-.457.065-.696.329-.239.263-.914.893-.914 2.179 0 1.286.936 2.531 1.066 2.706.13.175 1.846 2.817 4.473 3.95.626.269 1.115.429 1.497.55.628.2 1.201.17 1.65.103.504-.075 1.55-.633 1.768-1.244.218-.611.218-1.135.152-1.245-.065-.109-.239-.175-.501-.307z"/></svg>
                  <span className="relative z-10">Enquire via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Diamonds View */}
      {view === "diamonds" && (
        <div className="animate-slide-up max-w-6xl mx-auto px-6 py-20 pb-32">
          {/* ... knowledge base content identical to original ... */}
          <div className="text-center mb-20">
            <h2 className="text-[#CCA43D] tracking-[0.2em] mb-4 text-sm uppercase font-semibold">Knowledge Base</h2>
            <h1 className="text-4xl md:text-6xl font-serif">The 4 C's of Diamonds</h1>
            <div className="w-24 h-[1px] bg-[#CCA43D] mx-auto mt-8"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 stagger-children">
            {[
              { n: '01', title: 'Cut', body: 'The cut is the only C determined by human hands — and the most critical. We source only Excellent and Ideal grade cuts: Round Brilliant, Princess, Emerald, Oval. Every facet positioned to return light at its most breathtaking angle.' },
              { n: '02', title: 'Color', body: 'Color in diamonds is measured by its absence. Our curated selection sits between D–F (Colorless) and G–H (Near Colorless) — stones so clear they appear to freeze light itself. Nothing warm, nothing yellow.' },
              { n: '03', title: 'Clarity', body: 'Clarity is a record of a stone\'s journey through the Earth. We select only FL to VS grades — eye-clean stones with no visible inclusions to the naked eye. Immaculate, as every Jainam piece should be.' },
              { n: '04', title: 'Carat', body: 'Carat is weight, not size — and size is shaped by the cut. Whether a 0.5ct daily accent or a 5ct centrepiece, we match the right carat to the right cut so the stone wears larger than it weighs.' },
            ].map(({ n, title, body }) => (
              <div key={n} className="luxury-card animate-fade-in relative group border border-[#1a1a1a] p-8 md:p-10 hover:border-[#CCA43D]/40 transition-colors duration-500 bg-[#0c0c0c] overflow-hidden">
                <span className="absolute top-4 right-6 text-[5rem] font-serif text-white/[0.03] leading-none select-none pointer-events-none group-hover:text-white/[0.06] transition-colors duration-700">{n}</span>
                <div className="w-8 h-[1px] bg-[#CCA43D]/60 mb-6" />
                <h3 className="text-2xl md:text-3xl font-serif mb-4 text-white">{title}</h3>
                <p className="premium-subtext">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-24 border-t border-[#1a1a1a] pt-24 text-center">
            <h2 className="text-[#CCA43D] tracking-[0.2em] mb-4 text-sm uppercase font-semibold">The Origin</h2>
            <h1 className="text-3xl md:text-5xl font-serif mb-12">Natural vs. Lab-Grown Diamonds</h1>

            <div className="flex flex-col md:flex-row gap-12 w-full max-w-5xl mx-auto text-left">
              <div className="flex-1 bg-[#050505] p-10 lg:p-14 border border-[#1a1a1a] hover:border-[#CCA43D]/30 transition-colors">
                <div className="relative w-full h-64 mb-8 overflow-hidden rounded-sm">
                  <Image src="/natural.jpg" alt="Natural Diamonds" fill className="object-cover transition-transform duration-[1200ms] hover:scale-105" />
                </div>
                <h3 className="text-2xl font-serif mb-4 text-white">Natural Diamonds</h3>
                <div className="w-12 h-[1px] bg-[#CCA43D] mb-6"></div>
                <p className="premium-subtext mb-6">Formed deep within the Earth over billions of years under extreme heat and pressure, natural diamonds are nature's ultimate miracle.</p>
                <ul className="space-y-4 premium-subtext">
                  <li className="flex gap-3"><span className="text-[#CCA43D]">•</span> Holds long-term historic and intrinsic value</li>
                  <li className="flex gap-3"><span className="text-[#CCA43D]">•</span> Created over 1 to 3 billion years ago</li>
                  <li className="flex gap-3"><span className="text-[#CCA43D]">•</span> Finite supply makes each stone exceptionally rare</li>
                </ul>
              </div>

              <div className="flex-1 bg-[#050505] p-10 lg:p-14 border border-[#1a1a1a] hover:border-[#CCA43D]/30 transition-colors">
                <div className="relative w-full h-64 mb-8 overflow-hidden rounded-sm">
                  <Image src="/lab.jpg" alt="Lab Grown Diamonds" fill className="object-cover transition-transform duration-[1200ms] hover:scale-105" />
                </div>
                <h3 className="text-2xl font-serif mb-4 text-white">Lab-Grown Diamonds</h3>
                <div className="w-12 h-[1px] bg-[#CCA43D] mb-6"></div>
                <p className="premium-subtext mb-6">Created in highly controlled laboratory environments using advanced technological processes that duplicate the conditions under which diamonds naturally develop.</p>
                <ul className="space-y-4 premium-subtext">
                  <li className="flex gap-3"><span className="text-[#CCA43D]">•</span> Emotionally, chemically, optically identical to Natural</li>
                  <li className="flex gap-3"><span className="text-[#CCA43D]">•</span> Significantly more affordable, allowing for larger stones</li>
                  <li className="flex gap-3"><span className="text-[#CCA43D]">•</span> Environmentally sustainable and traceably conflict-free</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Jewelry Catalog View */}
      {view === "jewelry" && (
        <div className="animate-slide-up w-full px-6 md:px-12 py-20 pb-32">
          <div className="text-center mb-20 md:mb-24">
            <h2 className="text-[#CCA43D] tracking-[0.2em] mb-4 text-sm uppercase font-semibold">Exquisite Craftsmanship</h2>
            <h1 className="text-4xl md:text-6xl font-serif">Masterpiece Collection</h1>
            <div className="w-24 h-[1px] bg-[#CCA43D] mx-auto mt-8 mb-8"></div>
            <p className="premium-subtext text-center max-w-2xl mx-auto mb-10">
              Discover our curated selections of fine jewelry, handcrafted in the diamond capital of the world.<br/>
              Each individual masterwork represents three generations of aesthetic lineage and unparalleled expertise.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 px-4 md:px-0 stagger-children">
            <div onClick={() => openCollection("eternity-rings")} className="group cursor-pointer relative aspect-[2/3] overflow-hidden border border-[#1a1a1a] hover:border-[#CCA43D]/50 transition-colors">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${config.collectionEternityRings || 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1500&auto=format&fit=crop'})` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-4 w-full translate-y-4 group-hover:translate-y-0 transition-transform">
                <h3 className="text-2xl md:text-3xl font-serif mb-2 text-white tracking-wide">Eternity Rings</h3>
                <div className="h-[1px] w-0 bg-[#CCA43D] group-hover:w-full transition-all duration-700 ease-out"></div>
                <p className="text-[#CCA43D] mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 uppercase tracking-widest text-xs">Discover</p>
              </div>
            </div>

            <div onClick={() => openCollection("bridal-necklaces")} className="group cursor-pointer relative aspect-[2/3] overflow-hidden border border-[#1a1a1a] hover:border-[#CCA43D]/50 transition-colors">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${config.collectionBridalNecklaces || 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1500&auto=format&fit=crop'})` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-4 w-full translate-y-4 group-hover:translate-y-0 transition-transform">
                <h3 className="text-2xl md:text-3xl font-serif mb-2 text-white tracking-wide">Bridal Necklaces</h3>
                <div className="h-[1px] w-0 bg-[#CCA43D] group-hover:w-full transition-all duration-700 ease-out"></div>
                <p className="text-[#CCA43D] mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 uppercase tracking-widest text-xs">Discover</p>
              </div>
            </div>

            <div onClick={() => openCollection("diamond-bracelets")} className="group cursor-pointer relative aspect-[2/3] overflow-hidden border border-[#1a1a1a] hover:border-[#CCA43D]/50 transition-colors">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${config.collectionDiamondBracelets || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1500&auto=format&fit=crop'})` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-4 w-full translate-y-4 group-hover:translate-y-0 transition-transform">
                <h3 className="text-2xl md:text-3xl font-serif mb-2 text-white tracking-wide">Diamond Bracelets</h3>
                <div className="h-[1px] w-0 bg-[#CCA43D] group-hover:w-full transition-all duration-700 ease-out"></div>
                <p className="text-[#CCA43D] mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 uppercase tracking-widest text-xs">Discover</p>
              </div>
            </div>

            <div onClick={() => openCollection("statement-earrings")} className="group cursor-pointer relative aspect-[2/3] overflow-hidden border border-[#1a1a1a] hover:border-[#CCA43D]/50 transition-colors">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${config.collectionStatementEarrings || 'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?q=80&w=1500&auto=format&fit=crop'})` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-4 w-full translate-y-4 group-hover:translate-y-0 transition-transform">
                <h3 className="text-2xl md:text-3xl font-serif mb-2 text-white tracking-wide">Statement Earrings</h3>
                <div className="h-[1px] w-0 bg-[#CCA43D] group-hover:w-full transition-all duration-700 ease-out"></div>
                <p className="text-[#CCA43D] mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 uppercase tracking-widest text-xs">Discover</p>
              </div>
            </div>

            <div onClick={() => openCollection("solitaire-pendants")} className="group cursor-pointer relative aspect-[2/3] overflow-hidden border border-[#1a1a1a] hover:border-[#CCA43D]/50 transition-colors">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${config.collectionSolitairePendants || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1500&auto=format&fit=crop'})` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-4 w-full translate-y-4 group-hover:translate-y-0 transition-transform">
                <h3 className="text-2xl md:text-3xl font-serif mb-2 text-white tracking-wide">Solitaire Pendants</h3>
                <div className="h-[1px] w-0 bg-[#CCA43D] group-hover:w-full transition-all duration-700 ease-out"></div>
                <p className="text-[#CCA43D] mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 uppercase tracking-widest text-xs">Discover</p>
              </div>
            </div>


          </div>
        </div>
      )}



      {/* Footer */}
      <footer className="w-full mt-auto" style={{ background: 'linear-gradient(180deg, #050505 0%, #030303 100%)' }}>

        {/* Top gold accent line */}
        <div className="w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 0%, #CCA43D 30%, #E8C96B 50%, #CCA43D 70%, transparent 100%)' }} />

        {/* WhatsApp CTA Banner */}
        <a
          href={`https://wa.me/${contactPhoneRaw}?text=Hello%20Jainam%20Diamonds!%20I%20would%20like%20to%20know%20more%20about%20your%20collection.`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center gap-4 py-6 px-6 bg-gradient-to-r from-[#CCA43D] to-[#E8C96B] hover:from-[#E8C96B] hover:to-[#F5D76E] transition-all duration-500 shadow-[0_4px_20px_rgba(204,164,61,0.25)] relative overflow-hidden"
        >
          {/* Shine animation overlay */}
          <span className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
          
          <svg className="w-5 h-5 text-black flex-shrink-0 relative z-10 transition-transform duration-500 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.996 2C6.474 2 2 6.474 2 12c0 1.954.566 3.774 1.545 5.334L2 22l4.811-1.503C8.318 21.468 10.106 22 11.996 22 17.518 22 22 17.526 22 12c0-5.526-4.482-10-10.004-10zM12 20.301c-1.636 0-3.197-.432-4.576-1.24l-.328-.194-3.394 1.06 1.08-3.31-.212-.338C3.765 14.887 3.298 13.486 3.298 12 3.298 7.211 7.213 3.298 12.001 3.298 16.787 3.298 20.702 7.211 20.702 12c0 4.79-3.914 8.701-8.702 8.701zm4.783-6.526c-.262-.132-1.55-.765-1.79-.854-.239-.089-.413-.132-.587.132-.174.264-.678.854-.83 1.028-.152.175-.304.22-.566.089-1.29-.646-2.52-1.666-3.102-3.15-.152-.39-.016-.604.116-.736.118-.118.261-.305.393-.457.13-.153.174-.263.26-.438.087-.175.044-.329-.022-.46-.065-.132-.587-1.416-.805-1.938-.211-.51-.424-.442-.587-.45-.152-.008-.326-.008-.501-.008-.174 0-.457.065-.696.329-.239.263-.914.893-.914 2.179 0 1.286.936 2.531 1.066 2.706.13.175 1.846 2.817 4.473 3.95.626.269 1.115.429 1.497.55.628.2 1.201.17 1.65.103.504-.075 1.55-.633 1.768-1.244.218-.611.218-1.135.152-1.245-.065-.109-.239-.175-.501-.307z"/>
          </svg>
          <span className="text-[12px] tracking-[0.25em] uppercase text-black font-semibold relative z-10 transition-colors duration-300">
            Speak to a diamond expert — WhatsApp us now
          </span>
          <svg className="w-3.5 h-3.5 text-black relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>

        {/* Main footer grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-14 pb-12">
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-20 items-start justify-between">

            {/* Brand column */}
            <div className="flex flex-col gap-5 md:w-[40%] flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                  <Image src="/logo.png" alt="Jainam Diamonds Logo" fill className="object-contain" />
                </div>
                <div>
                  <h2 className="gold-shimmer font-serif text-2xl md:text-3xl tracking-[0.12em] uppercase mb-1">Jainam Diamonds</h2>
                  <p className="text-[#CCA43D]/70 text-[10px] md:text-xs tracking-[0.2em] uppercase">Surat · Diamond Capital of the World</p>
                </div>
              </div>
              <p className="premium-subtext">
                Born in Surat — where 90% of the world's diamonds are cut. Every stone passes through three generations of trained eyes before it reaches you.
              </p>
              {/* Social icons */}
              <div className="flex gap-3">
                {config.socialInstagram && (
                  <a href={config.socialInstagram} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 border border-[#CCA43D]/40 hover:border-[#CCA43D] flex items-center justify-center text-[#E5D9B6] hover:text-[#CCA43D] hover:bg-[#CCA43D]/5 transition-all duration-300 hover:-translate-y-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                  </a>
                )}
                {config.socialFacebook && (
                  <a href={config.socialFacebook} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 border border-[#CCA43D]/40 hover:border-[#CCA43D] flex items-center justify-center text-[#E5D9B6] hover:text-[#CCA43D] hover:bg-[#CCA43D]/5 transition-all duration-300 hover:-translate-y-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                  </a>
                )}
                {config.socialLinkedIn && (
                  <a href={config.socialLinkedIn} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 border border-[#CCA43D]/40 hover:border-[#CCA43D] flex items-center justify-center text-[#E5D9B6] hover:text-[#CCA43D] hover:bg-[#CCA43D]/5 transition-all duration-300 hover:-translate-y-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" clipRule="evenodd" /></svg>
                  </a>
                )}
              </div>
            </div>

            {/* Navigate column */}
            <div className="flex-shrink-0 md:pt-6">
              <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#CCA43D] mb-6 font-semibold">Navigate</p>
              <ul className="space-y-3">
                {[
                  { label: 'The Diamonds', action: () => setView('diamonds') },
                  { label: 'Fine Jewelry', action: () => setView('jewelry') },
                ].map(({ label, action }) => (
                  <li key={label}>
                    <button onClick={action} className="text-gray-300 hover:text-[#CCA43D] text-sm font-light tracking-wide transition-colors duration-300 text-left group flex items-center gap-2">
                      <span className="w-0 h-[1px] bg-[#CCA43D] group-hover:w-3 transition-all duration-300 inline-block" />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div className="flex-shrink-0 md:pt-6">
              <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#CCA43D] mb-6 font-semibold">Contact</p>
              <ul className="space-y-4 premium-subtext">
                <li className="flex items-start gap-3">
                  <svg className="w-3.5 h-3.5 text-[#CCA43D] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <a href={`mailto:${config.contactEmail}`} className="hover:text-[#CCA43D] transition-colors duration-300 break-all">{config.contactEmail}</a>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-3.5 h-3.5 text-[#CCA43D] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <a href={`tel:${contactPhoneRaw}`} className="hover:text-[#CCA43D] transition-colors duration-300">{config.contactPhone}</a>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-3.5 h-3.5 text-[#CCA43D] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span className="leading-relaxed whitespace-pre-line">{config.contactAddress}</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1a1a1a] px-6 md:px-10 py-5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-gray-500 text-[11px] tracking-[0.2em] uppercase">
              &copy; {new Date().getFullYear()} Jainam Diamonds — All rights reserved
            </p>

          </div>
        </div>

      </footer>
    </main>
  );
}
