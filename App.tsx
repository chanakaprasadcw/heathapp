import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Menu, 
  X, 
  ShieldCheck,
  Zap,
  CheckCircle,
  Star,
  Smartphone,
  Bot,
  Heart,
  Calendar,
  Clock,
  MapPin,
  Search,
  Video,
  Pill,
  FileText,
  Stethoscope,
  ChevronRight,
  Facebook,
  Instagram
} from 'lucide-react';

// SVG Assets for Store Buttons
const AppleLogo = () => (
  <svg className="w-6 h-6 mb-1" viewBox="0 0 384 512" fill="currentColor">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 79.4c14.2 41.3 49 109.1 90.7 109.1 26.3 0 37.3-19.8 68.3-19.8 30.8 0 42.7 19.8 71.7 19.8 29 0 52.3-51.4 69-92.6 15.1-37.2 24.6-82 24.6-83.6-.6-.2-53-27.1-53.8-97.1zM247.5 74.8c16.9-21.7 34.4-46.1 29.4-74.8-22.5 1.5-50.6 14.8-68.7 35.5-15.6 18.1-30.8 45.4-26.4 73.8 26.5 2.1 49-13.8 65.7-34.5z"/>
  </svg>
);

const PlayStoreLogo = () => (
  <svg className="w-6 h-6" viewBox="0 0 512 512" fill="currentColor">
    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
  </svg>
);

const SocialX = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Scroll Animation Component
const RevealOnScroll: React.FC<{ children?: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center">
    <div className="relative mb-8">
        <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-30 duration-1000"></div>
        <div className="bg-white p-6 rounded-full shadow-xl relative z-10 border border-blue-50">
            <Stethoscope className="w-16 h-16 text-blue-600 animate-pulse" />
        </div>
    </div>
    
    <div className="w-64 h-16 relative flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 300 100" className="w-full h-full text-blue-500">
           <path 
             d="M0 50 L40 50 L55 50 L70 10 L90 90 L110 30 L130 60 L150 50 L300 50" 
             fill="none" 
             stroke="currentColor" 
             strokeWidth="4" 
             strokeLinecap="round" 
             strokeLinejoin="round"
             className="animate-ecg"
           />
        </svg>
    </div>

    <div className="text-center mt-2">
      <h2 className="text-3xl font-bold text-slate-800 tracking-tight mb-1">MediPulse</h2>
      <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">Your Health Companion</p>
    </div>
  </div>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 animate-fade-in">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="bg-gradient-to-tr from-blue-600 to-cyan-500 p-2.5 rounded-xl mr-3 shadow-lg shadow-blue-500/20">
                 <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-slate-900 tracking-tight">MediPulse</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Services</button>
              <button onClick={() => scrollToSection('interface')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">App View</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Reviews</button>
              <button 
                onClick={() => scrollToSection('download')}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Download App
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-slate-900 focus:outline-none p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 absolute w-full shadow-xl">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <button onClick={() => scrollToSection('features')} className="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 w-full text-left">Services</button>
              <button onClick={() => scrollToSection('interface')} className="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 w-full text-left">App View</button>
              <button onClick={() => scrollToSection('testimonials')} className="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 w-full text-left">Reviews</button>
              <button onClick={() => scrollToSection('download')} className="block px-3 py-3 mt-4 rounded-lg text-base font-bold text-white bg-blue-600 hover:bg-blue-700 w-full text-center shadow-md">Download Now</button>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-20 lg:pt-32 lg:pb-28">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-gradient-to-bl from-blue-100/50 to-cyan-100/50 rounded-full blur-3xl -z-10 opacity-70"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-gradient-to-tr from-purple-100/50 to-pink-100/50 rounded-full blur-3xl -z-10 opacity-70"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="lg:w-1/2 text-center lg:text-left z-10">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-blue-100 text-blue-700 font-semibold text-xs uppercase tracking-wide mb-8 shadow-sm animate-fade-in" style={{animationDelay: '0.1s'}}>
                  <Star className="w-3 h-3 mr-2 text-orange-500 fill-orange-500" />
                  No.1 Healthcare App
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1] animate-fade-in" style={{animationDelay: '0.2s'}}>
                  Find Your Doctor <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600">& Book Online</span>
                </h1>
                <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in" style={{animationDelay: '0.3s'}}>
                  The complete healthcare ecosystem. From finding the best specialists to medicine delivery and lab tests—MediPulse brings the hospital to your home.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
                  <button className="flex items-center bg-slate-900 text-white px-6 py-3.5 rounded-xl hover:bg-slate-800 transition-all hover:scale-105 shadow-xl shadow-slate-900/20 min-w-[180px] justify-center">
                    <AppleLogo />
                    <div className="ml-3 text-left">
                      <div className="text-[10px] font-medium opacity-80 leading-none mb-1">Download on the</div>
                      <div className="text-lg font-bold leading-none">App Store</div>
                    </div>
                  </button>
                  <button className="flex items-center bg-slate-900 text-white px-6 py-3.5 rounded-xl hover:bg-slate-800 transition-all hover:scale-105 shadow-xl shadow-slate-900/20 min-w-[180px] justify-center">
                    <PlayStoreLogo />
                    <div className="ml-3 text-left">
                      <div className="text-[10px] font-medium opacity-80 leading-none mb-1">GET IT ON</div>
                      <div className="text-lg font-bold leading-none">Google Play</div>
                    </div>
                  </button>
                </div>
                
                <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8 animate-fade-in" style={{animationDelay: '0.5s'}}>
                   <div className="flex flex-col">
                      <div className="flex -space-x-3">
                        {[1,2,3,4].map((i) => (
                           <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="User" />
                           </div>
                        ))}
                      </div>
                      <div className="mt-2 text-sm font-semibold text-slate-700">10k+ Doctors</div>
                   </div>
                   <div className="h-10 w-px bg-slate-200"></div>
                   <div className="flex flex-col">
                      <div className="flex text-orange-400">
                         {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                      </div>
                      <div className="mt-2 text-sm font-semibold text-slate-700">4.9/5 Rating</div>
                   </div>
                </div>
              </div>

              <div className="lg:w-1/2 relative flex justify-center lg:justify-end animate-fade-in" style={{animationDelay: '0.4s'}}>
                {/* Decorative circles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
                
                {/* Phone Mockup */}
                <div className="relative mx-auto border-slate-900 bg-slate-900 border-[12px] rounded-[3rem] h-[650px] w-[320px] shadow-2xl">
                  <div className="h-[32px] w-[3px] bg-slate-800 absolute -left-[15px] top-[72px] rounded-l-lg"></div>
                  <div className="h-[46px] w-[3px] bg-slate-800 absolute -left-[15px] top-[124px] rounded-l-lg"></div>
                  <div className="h-[46px] w-[3px] bg-slate-800 absolute -left-[15px] top-[178px] rounded-l-lg"></div>
                  <div className="h-[64px] w-[3px] bg-slate-800 absolute -right-[15px] top-[142px] rounded-r-lg"></div>
                  
                  {/* Notch */}
                  <div className="absolute top-0 inset-x-0 h-8 bg-slate-900 rounded-b-3xl z-20 w-40 mx-auto"></div>

                  <div className="rounded-[2.2rem] overflow-hidden w-full h-full bg-white relative">
                    {/* Simulated App UI */}
                    <div className="bg-slate-50 h-full w-full overflow-y-auto scrollbar-hide pb-10 cursor-ns-resize">
                      
                      {/* App Header */}
                      <div className="bg-white p-6 pb-4 pt-12 sticky top-0 z-10 border-b border-slate-50">
                        <div className="flex justify-between items-center mb-4">
                           <div className="flex items-center gap-2">
                              <MapPin size={16} className="text-blue-600"/>
                              <span className="text-sm font-bold text-slate-700">Colombo, Sri Lanka</span>
                           </div>
                           <div className="w-8 h-8 bg-slate-200 rounded-full overflow-hidden">
                              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Profile" />
                           </div>
                        </div>
                        <div className="text-2xl font-bold text-slate-800">Find your specialist</div>
                        
                        <div className="mt-4 relative">
                           <input type="text" placeholder="Search doctor, medicines..." className="w-full bg-slate-100 py-3 pl-10 pr-4 rounded-xl text-sm outline-none" />
                           <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                        </div>
                      </div>

                      <div className="p-4 space-y-6">
                        {/* Categories */}
                        <div className="grid grid-cols-4 gap-2 text-center">
                           {[
                              {icon: <Stethoscope size={20}/>, label: "Doctor", color: "bg-blue-100 text-blue-600"},
                              {icon: <Pill size={20}/>, label: "Pharmacy", color: "bg-green-100 text-green-600"},
                              {icon: <Activity size={20}/>, label: "Hospital", color: "bg-orange-100 text-orange-600"},
                              {icon: <Video size={20}/>, label: "Consult", color: "bg-purple-100 text-purple-600"},
                           ].map((item, i) => (
                              <div key={i} className="flex flex-col items-center gap-2">
                                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}>
                                    {item.icon}
                                 </div>
                                 <span className="text-xs font-medium text-slate-600">{item.label}</span>
                              </div>
                           ))}
                        </div>

                        {/* Top Doctors */}
                        <div>
                           <div className="flex justify-between items-center mb-3">
                              <h3 className="font-bold text-slate-800">Top Doctors</h3>
                              <span className="text-blue-600 text-xs font-bold">See All</span>
                           </div>
                           <div className="space-y-3">
                              {[
                                 {name: "Dr. Emily Chen", spec: "Cardiologist", rating: "4.8", reviews: "120"},
                                 {name: "Dr. James Wilson", spec: "Neurologist", rating: "4.9", reviews: "85"},
                                 {name: "Dr. Sarah Miller", spec: "Dentist", rating: "4.7", reviews: "200"},
                              ].map((doc, i) => (
                                 <div key={i} className="bg-white p-3 rounded-2xl flex items-center gap-3 shadow-sm border border-slate-50">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${doc.name}`} className="w-14 h-14 bg-slate-100 rounded-xl" alt="Doc" />
                                    <div className="flex-1">
                                       <div className="font-bold text-slate-800 text-sm">{doc.name}</div>
                                       <div className="text-xs text-slate-500 mb-1">{doc.spec}</div>
                                       <div className="flex items-center text-xs text-orange-400 gap-1">
                                          <Star size={10} fill="currentColor"/> 
                                          <span className="text-slate-700 font-medium">{doc.rating}</span>
                                          <span className="text-slate-400">({doc.reviews} reviews)</span>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>

                         {/* Banner */}
                         <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-4 text-white relative overflow-hidden">
                           <div className="relative z-10">
                              <div className="text-xs font-medium opacity-80 mb-1">EARLY PROTECTION</div>
                              <div className="font-bold text-lg mb-2 w-2/3">Check your health regularly!</div>
                              <button className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold">Check Now</button>
                           </div>
                           <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-xl"></div>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white relative">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RevealOnScroll>
                <div className="text-center mb-16 max-w-3xl mx-auto">
                   <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Services</h2>
                   <p className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">Everything you need for a healthier life</p>
                   <p className="mt-4 text-slate-500 text-lg">We bring together the best specialists, pharmacies, and diagnostic labs to provide a seamless healthcare experience.</p>
                </div>
              </RevealOnScroll>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {/* Feature 1 */}
                 <RevealOnScroll delay={100}>
                    <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                        <Search className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Find Specialists</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                        Search and filter top-rated doctors by specialty, location, and insurance acceptance.
                        </p>
                    </div>
                 </RevealOnScroll>

                 {/* Feature 2 */}
                 <RevealOnScroll delay={200}>
                    <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                        <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                        <Video className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Video Consultations</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                        Connect with doctors instantly via secure HD video calls from the comfort of your home.
                        </p>
                    </div>
                 </RevealOnScroll>

                 {/* Feature 3 */}
                 <RevealOnScroll delay={300}>
                    <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                        <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                        <Pill className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Order Medicines</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                        Upload prescriptions and get medicines delivered to your doorstep within hours.
                        </p>
                    </div>
                 </RevealOnScroll>

                 {/* Feature 4 */}
                 <RevealOnScroll delay={400}>
                    <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                        <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                        <Activity className="w-6 h-6 text-orange-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Lab Tests</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                        Book diagnostic tests and full body checkups with convenient home sample collection.
                        </p>
                    </div>
                 </RevealOnScroll>

                 {/* Feature 5 */}
                 <RevealOnScroll delay={500}>
                    <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                        <div className="w-12 h-12 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                        <Bot className="w-6 h-6 text-cyan-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">AI Health Assistant</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                        Get 24/7 answers to your health queries and symptom assessments powered by advanced AI.
                        </p>
                    </div>
                 </RevealOnScroll>

                 {/* Feature 6 */}
                 <RevealOnScroll delay={600}>
                    <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                        <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center mb-6">
                        <FileText className="w-6 h-6 text-pink-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Health Records</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                        Store all your prescriptions, reports, and medical history securely in one place.
                        </p>
                    </div>
                 </RevealOnScroll>
              </div>
           </div>
        </section>

        {/* Interface Showcase Section */}
        <section id="interface" className="py-24 bg-slate-900 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
               <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600 rounded-full filter blur-[100px] opacity-20"></div>
               <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[100px] opacity-20"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
               <div className="flex flex-col md:flex-row items-center gap-16">
                  <div className="md:w-1/2">
                    <RevealOnScroll>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Intuitive Design.<br/>Powerful Features.</h2>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            Designed with care for patients and doctors alike. Navigate through your health journey with a clean, clutter-free interface that puts your well-being first.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mt-1 flex-shrink-0">
                                <span className="text-blue-400 font-bold">01</span>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-white font-bold text-lg">Smart Search</h4>
                                <p className="text-slate-500 text-sm">Find doctors by symptoms, specialty, or hospital name.</p>
                            </div>
                            </div>
                            <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mt-1 flex-shrink-0">
                                <span className="text-blue-400 font-bold">02</span>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-white font-bold text-lg">Instant Booking</h4>
                                <p className="text-slate-500 text-sm">Real-time availability calendar for hassle-free appointments.</p>
                            </div>
                            </div>
                            <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mt-1 flex-shrink-0">
                                <span className="text-blue-400 font-bold">03</span>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-white font-bold text-lg">Secure Payments</h4>
                                <p className="text-slate-500 text-sm">Integrated wallet and insurance processing.</p>
                            </div>
                            </div>
                        </div>
                     </RevealOnScroll>
                  </div>

                  {/* UI Cards Simulation */}
                  <div className="md:w-1/2 relative h-[500px] w-full flex justify-center items-center">
                     <RevealOnScroll delay={300} className="w-full flex justify-center">
                        <div className="relative w-full h-[500px] flex justify-center items-center">
                            {/* Card 1: Doctor Profile */}
                            <div className="absolute top-0 right-0 md:right-10 w-64 bg-white rounded-3xl p-5 shadow-2xl transform rotate-6 z-10 hover:rotate-0 transition-all duration-500 hover:scale-105 hover:z-30 cursor-pointer border-4 border-slate-800/20">
                                <div className="flex justify-between mb-4">
                                <ChevronRight className="rotate-180 text-slate-400"/>
                                <Heart className="text-slate-300"/>
                                </div>
                                <div className="flex flex-col items-center mb-4">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Doctor2" className="w-20 h-20 bg-blue-50 rounded-full mb-3" alt="Doc"/>
                                <h4 className="font-bold text-slate-800">Dr. Albert Flores</h4>
                                <span className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full mt-1">Surgeon</span>
                                </div>
                                <div className="flex justify-between text-center mb-4">
                                <div>
                                    <div className="font-bold text-slate-800">350+</div>
                                    <div className="text-[10px] text-slate-400">Patients</div>
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800">15+</div>
                                    <div className="text-[10px] text-slate-400">Exp.</div>
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800">4.9</div>
                                    <div className="text-[10px] text-slate-400">Rating</div>
                                </div>
                                </div>
                                <button className="w-full bg-blue-600 text-white py-2 rounded-xl text-sm font-bold">Book Appointment</button>
                            </div>

                            {/* Card 2: Medicine */}
                            <div className="absolute bottom-10 left-0 md:left-10 w-64 bg-white rounded-3xl p-5 shadow-2xl transform -rotate-6 z-20 hover:rotate-0 transition-all duration-500 hover:scale-105 hover:z-30 cursor-pointer border-4 border-slate-800/20">
                                <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600"><Pill size={20}/></div>
                                <div>
                                    <h4 className="font-bold text-sm text-slate-800">Order Placed</h4>
                                    <p className="text-[10px] text-slate-400">Arriving today, 2:00 PM</p>
                                </div>
                                </div>
                                <div className="space-y-3">
                                {[1,2].map(i => (
                                    <div key={i} className="flex gap-3 items-center p-2 bg-slate-50 rounded-xl">
                                        <div className="w-8 h-8 bg-white rounded-lg border border-slate-100"></div>
                                        <div className="flex-1">
                                            <div className="h-2 w-20 bg-slate-200 rounded mb-1"></div>
                                            <div className="h-2 w-10 bg-slate-200 rounded"></div>
                                        </div>
                                        <div className="font-bold text-sm text-slate-700">Rs. 850</div>
                                    </div>
                                ))}
                                </div>
                                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-500">Total</span>
                                <span className="text-lg font-bold text-slate-800">Rs. 1,700</span>
                                </div>
                            </div>
                        </div>
                     </RevealOnScroll>
                  </div>
               </div>
            </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 bg-white">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RevealOnScroll>
                <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">Trusted by millions</h2>
              </RevealOnScroll>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                    { name: "Alex Morgan", role: "Fitness Enthusiast", text: "The doctor search is so easy. I found a specialist and booked a slot in under 5 minutes.", img: "Alex" },
                    { name: "Dr. Sarah Lin", role: "General Practitioner", text: "I recommend MediPulse to all my patients. It helps them stay engaged with their health between visits.", img: "Sarah" },
                    { name: "James Wilson", role: "Patient", text: "Medicine delivery is a game changer. No more waiting in lines at the pharmacy.", img: "James" },
                 ].map((t, i) => (
                    <RevealOnScroll key={i} delay={i * 150}>
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-shadow">
                        <div className="flex text-orange-400 mb-4">
                            {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                        </div>
                        <p className="text-slate-700 mb-6 italic">"{t.text}"</p>
                        <div className="flex items-center">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.img}`} alt={t.name} className="w-10 h-10 rounded-full bg-white border border-slate-200" />
                            <div className="ml-3">
                                <div className="text-sm font-bold text-slate-900">{t.name}</div>
                                <div className="text-xs text-slate-500">{t.role}</div>
                            </div>
                        </div>
                        </div>
                    </RevealOnScroll>
                 ))}
              </div>
           </div>
        </section>

        {/* Download CTA */}
        <section id="download" className="py-24 bg-slate-900 text-white overflow-hidden relative">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] -mr-40 -mt-40"></div>
           <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px] -ml-40 -mb-40"></div>
           
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <RevealOnScroll>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to take control?</h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
                    Join the health revolution today. Download MediPulse AI and start your journey to a healthier, happier life.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="flex items-center bg-white text-slate-900 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all hover:scale-105 min-w-[200px] justify-center">
                        <AppleLogo />
                        <div className="ml-3 text-left">
                        <div className="text-[10px] font-bold opacity-60 uppercase tracking-wide leading-none mb-1">Download on the</div>
                        <div className="text-xl font-bold leading-none">App Store</div>
                        </div>
                    </button>
                    <button className="flex items-center bg-transparent border border-white/30 text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all hover:scale-105 min-w-[200px] justify-center backdrop-blur-sm">
                        <PlayStoreLogo />
                        <div className="ml-3 text-left">
                        <div className="text-[10px] font-bold opacity-60 uppercase tracking-wide leading-none mb-1">GET IT ON</div>
                        <div className="text-xl font-bold leading-none">Google Play</div>
                        </div>
                    </button>
                </div>
                <p className="mt-8 text-sm text-slate-400 opacity-60">
                    Requires iOS 15.0+ or Android 10.0+ • Free with in-app purchases
                </p>
              </RevealOnScroll>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-2 md:col-span-1">
                    <div className="flex items-center mb-4">
                    <div className="bg-blue-600 p-1.5 rounded-lg mr-2">
                        <Activity className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-xl text-slate-900">MediPulse</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-4">
                    Your intelligent health companion for a better life.
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 mb-4">Product</h3>
                    <ul className="space-y-2 text-sm text-slate-500">
                    <li><a href="#" className="hover:text-blue-600">Features</a></li>
                    <li><a href="#" className="hover:text-blue-600">Security</a></li>
                    <li><a href="#" className="hover:text-blue-600">For Doctors</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 mb-4">Company</h3>
                    <ul className="space-y-2 text-sm text-slate-500">
                    <li><a href="#" className="hover:text-blue-600">About Us</a></li>
                    <li><a href="#" className="hover:text-blue-600">Careers</a></li>
                    <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 mb-4">Connect</h3>
                    <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all hover:scale-110">
                        <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:bg-pink-50 hover:text-pink-600 transition-all hover:scale-110">
                        <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-900 hover:text-white transition-all hover:scale-110">
                        <SocialX className="w-4 h-4" />
                    </a>
                    </div>
                </div>
            </div>
          </RevealOnScroll>
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
             <p>© 2024 MediPulse AI Inc. All rights reserved.</p>
             <div className="flex items-center mt-4 md:mt-0">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Colombo, Sri Lanka</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;