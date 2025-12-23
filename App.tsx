
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
  Instagram,
  MessageCircle,
  CreditCard,
  Bell,
  ArrowLeft,
  Filter,
  Image,
  Check,
  Lock,
  Wifi,
  Users,
  User,
  Database,
  TrendingUp
} from 'lucide-react';
import { motion, useMotionValue, useSpring } from "framer-motion";

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

// Magnetic Button Component
const MagneticButton = ({ children, className = "", onClick, ...props }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const dist = { x: e.clientX - centerX, y: e.clientY - centerY };
    
    // Apply movement
    x.set(dist.x * 0.2);
    y.set(dist.y * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

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

// Reusable Phone Frame Component
const PhoneFrame = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <div className={`relative mx-auto border-slate-800 bg-slate-800 border-[14px] rounded-[3.5rem] shadow-2xl overflow-hidden ${className}`}>
    {/* Buttons */}
    <div className="h-[32px] w-[3px] bg-slate-700 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
    <div className="h-[46px] w-[3px] bg-slate-700 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
    <div className="h-[46px] w-[3px] bg-slate-700 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
    <div className="h-[64px] w-[3px] bg-slate-700 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
    {/* Notch */}
    <div className="absolute top-0 inset-x-0 h-8 bg-slate-800 rounded-b-3xl z-20 w-40 mx-auto"></div>
    {/* Screen */}
    <div className="rounded-[2.5rem] overflow-hidden w-full h-full bg-slate-50 relative flex flex-col">
      {children}
    </div>
  </div>
);

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center">
    <div className="relative mb-8">
        <div className="absolute inset-0 bg-cyan-100 rounded-full animate-ping opacity-30 duration-1000"></div>
        <div className="bg-white p-6 rounded-full shadow-xl relative z-10 border border-cyan-50">
            <Stethoscope className="w-16 h-16 text-cyan-500 animate-pulse" />
        </div>
    </div>
    
    <div className="w-64 h-16 relative flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 300 100" className="w-full h-full text-cyan-500">
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
      <h2 className="text-3xl font-bold text-slate-800 tracking-tight mb-1 font-['Poppins']">MedCey</h2>
      <p className="text-slate-400 text-sm font-medium tracking-wide uppercase font-['Inter']">Your Health Companion</p>
    </div>
  </div>
);

// --- Phone App Screens Components ---

const PhoneHomeScreen = () => (
  <div className="bg-slate-50 w-full min-h-full pb-20">
     {/* Header */}
     <div className="bg-blue-600 p-6 pt-12 text-white rounded-b-[2rem] shadow-lg shadow-blue-200/50">
        <div className="flex justify-between items-start">
           <div>
              <h1 className="text-lg font-bold font-['Poppins']">Hi, Lahiru</h1>
              <h2 className="text-2xl font-bold font-['Poppins']">Good evening,</h2>
           </div>
           <div className="bg-blue-500/50 p-2 rounded-xl backdrop-blur-sm cursor-pointer hover:bg-blue-500 transition-colors">
              <Bell className="w-6 h-6" />
           </div>
        </div>
        {/* Search */}
        <div className="mt-6 bg-white rounded-xl flex items-center px-4 py-3 shadow-md">
           <Search className="text-slate-400 w-5 h-5 mr-3" />
           <input 
             type="text" 
             placeholder="Search doctor by name" 
             className="flex-1 bg-transparent outline-none border-none focus:ring-0 text-slate-700 text-sm font-['Inter'] placeholder-slate-400" 
           />
           <Filter className="text-slate-400 w-5 h-5 cursor-pointer" />
        </div>
     </div>
     
     {/* Upcoming Appointment */}
     <div className="px-5 mt-6">
        <div className="flex justify-between items-center mb-3">
           <h3 className="font-bold text-slate-800 font-['Poppins']">Upcoming Appointment</h3>
           <span className="text-xs font-bold text-slate-500 cursor-pointer">See all &gt;</span>
        </div>
        <div className="bg-blue-600 rounded-2xl p-5 text-white shadow-xl shadow-blue-200 hover:scale-[1.02] transition-transform cursor-pointer">
           <div className="flex justify-between items-start mb-4">
              <div className="flex gap-3">
                 <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200" className="w-full h-full object-cover" alt="Doctor" />
                 </div>
                 <div>
                    <div className="font-bold font-['Poppins'] text-lg">Dr. Chathuranga</div>
                    <div className="text-xs opacity-80 font-['Inter']">Colombo, Colombo 07</div>
                 </div>
              </div>
           </div>
           <div className="flex justify-between items-center bg-blue-700/50 p-3 rounded-xl backdrop-blur-sm">
              <span className="text-xs font-medium">Mon, 06 Sep 2025</span>
              <span className="text-xs font-medium">10.00 - 11.00 AM</span>
           </div>
        </div>
     </div>

     {/* Categories */}
     <div className="px-5 mt-6">
        <div className="flex justify-between items-center mb-3">
           <h3 className="font-bold text-slate-800 font-['Poppins']">Doctor Specialties</h3>
           <span className="text-xs font-bold text-slate-500 cursor-pointer">See all &gt;</span>
        </div>
        <div className="flex justify-between gap-2 overflow-x-auto pb-2 scrollbar-hide">
           {[
              {n:'Neurology', i:'🧠', c:'bg-orange-100'}, 
              {n:'Urology', i:'🩺', c:'bg-red-100'}, 
              {n:'Oncology', i:'👶', c:'bg-blue-100'}, 
              {n:'Pediatric', i:'🏥', c:'bg-pink-100'}
           ].map((c,i) => (
              <div key={i} className="flex flex-col items-center gap-2 min-w-[70px] cursor-pointer hover:opacity-80 transition-opacity">
                 <div className={`w-16 h-16 ${c.c} rounded-full flex items-center justify-center text-2xl shadow-sm border border-white`}>
                    {c.i}
                 </div>
                 <span className="text-xs font-medium text-slate-700 font-['Inter']">{c.n}</span>
              </div>
           ))}
        </div>
     </div>

     {/* Top Doctor */}
     <div className="px-5 mt-4 mb-4">
         <div className="flex justify-between items-center mb-3">
           <h3 className="font-bold text-slate-800 font-['Poppins']">Top Doctor</h3>
           <span className="text-xs font-bold text-slate-500 cursor-pointer">See all &gt;</span>
        </div>
        <div className="bg-white p-3 rounded-2xl flex items-center gap-4 shadow-sm border border-slate-100">
           <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200&h=200" className="w-16 h-16 rounded-xl object-cover" alt="Doc" />
           <div className="flex-1">
              <div className="flex justify-between items-start">
                 <h4 className="font-bold text-slate-800 font-['Poppins']">Dr. Priyantha</h4>
                 <div className="flex items-center text-amber-400 text-xs font-bold">
                    <Star className="w-3 h-3 fill-current mr-1" /> 4.8
                 </div>
              </div>
              <div className="text-xs text-slate-500 font-['Inter'] mb-2">Kandy General Hospital</div>
              <div className="flex items-center text-xs text-blue-600 font-medium">
                 <MapPin className="w-3 h-3 mr-1" /> Cardiology
              </div>
           </div>
        </div>
     </div>
  </div>
);

const PhoneAppointmentsScreen = () => (
   <div className="bg-slate-50 w-full min-h-full pb-20 pt-12">
      <div className="px-6 mb-6">
         <h2 className="text-2xl font-bold font-['Poppins'] text-slate-900">Today Appointment</h2>
         <div className="text-right text-xs text-slate-500 font-bold mt-1">12 Sep 2025</div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 px-6 mb-6">
         <button className="flex-1 pb-3 text-sm font-bold text-blue-600 border-b-2 border-blue-600 font-['Poppins']">Upcoming</button>
         <button className="flex-1 pb-3 text-sm font-medium text-slate-400 font-['Poppins']">Complete</button>
         <button className="flex-1 pb-3 text-sm font-medium text-slate-400 font-['Poppins']">Canceled</button>
      </div>

      <div className="px-5 space-y-4">
         {/* Card 1 - Active */}
         <div className="bg-blue-600 rounded-2xl p-4 text-white shadow-lg shadow-blue-200">
            <div className="flex justify-between items-start mb-4">
               <div className="flex gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                     <Stethoscope className="text-white w-6 h-6" />
                  </div>
                  <div>
                     <div className="font-bold font-['Poppins']">Doctor</div>
                     <div className="text-xs opacity-80 font-['Inter']">Specialize / Online or Location</div>
                  </div>
               </div>
               <span className="bg-blue-500/50 px-2 py-1 rounded text-[10px] flex items-center"><CheckCircle className="w-3 h-3 mr-1"/> Accepted</span>
            </div>
            
            <div className="bg-blue-700/50 p-3 rounded-xl mb-4 flex justify-between text-xs font-medium">
               <span className="flex items-center"><Calendar className="w-3 h-3 mr-2"/> Monday, 23 Sep 2025</span>
               <span className="flex items-center"><Clock className="w-3 h-3 mr-2"/> 08:00AM - 09:00AM</span>
            </div>

            <div className="flex gap-3">
               <MagneticButton className="flex-1 py-2 border border-white/30 rounded-lg text-xs font-bold hover:bg-white/10 flex items-center justify-center">
                  <X className="w-3 h-3 mr-1" /> Cancel
               </MagneticButton>
               <MagneticButton className="flex-1 py-2 bg-emerald-500 rounded-lg text-xs font-bold hover:bg-emerald-600 flex items-center justify-center shadow-sm">
                  <Calendar className="w-3 h-3 mr-1" /> Reschedule
               </MagneticButton>
            </div>
         </div>

         {/* Card 2 - Past */}
         <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
            <div className="flex justify-between items-start mb-4">
               <div className="flex gap-3">
                  <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center">
                     <Stethoscope className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                     <div className="font-bold font-['Poppins'] text-slate-800">Doctor</div>
                     <div className="text-xs text-slate-500 font-['Inter']">Specialize / Online or Location</div>
                  </div>
               </div>
               <span className="bg-blue-200 px-2 py-1 rounded text-[10px] flex items-center text-blue-700"><CheckCircle className="w-3 h-3 mr-1"/> Accepted</span>
            </div>
            
            <div className="bg-blue-100 p-3 rounded-xl mb-4 flex justify-between text-xs font-medium text-blue-800">
               <span>Monday, 23 Sep 2025</span>
               <span>08:00AM - 09:00AM</span>
            </div>

            <div className="flex gap-3">
               <MagneticButton className="flex-1 py-2 bg-red-500 text-white rounded-lg text-xs font-bold hover:bg-red-600 flex items-center justify-center shadow-sm">
                  <X className="w-3 h-3 mr-1" /> Cancel
               </MagneticButton>
               <MagneticButton className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 flex items-center justify-center shadow-sm">
                  <Calendar className="w-3 h-3 mr-1" /> Reschedule
               </MagneticButton>
            </div>
         </div>
      </div>
   </div>
);

const PhoneSpecialtiesScreen = () => (
   <div className="bg-slate-50 w-full min-h-full pb-20 pt-12">
      <div className="px-5 flex items-center mb-6">
         <button className="p-2 border border-slate-200 rounded-lg bg-white mr-4 shadow-sm">
            <ArrowLeft className="w-5 h-5 text-blue-600" />
         </button>
         <h2 className="text-lg font-bold font-['Poppins'] text-slate-900">Doctor Specialties</h2>
      </div>

      <div className="px-5 mb-6">
         <div className="bg-white border border-slate-200 rounded-xl flex items-center px-4 py-3 shadow-sm">
            <Search className="text-slate-400 w-5 h-5 mr-3" />
            <input 
              type="text" 
              placeholder="Search" 
              className="flex-1 bg-transparent outline-none border-none focus:ring-0 text-slate-700 text-sm font-['Inter']" 
            />
            <Filter className="text-slate-400 w-5 h-5 cursor-pointer" />
         </div>
      </div>

      <div className="px-5 mb-6 flex gap-3">
         <MagneticButton className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md shadow-blue-200">All</MagneticButton>
         <MagneticButton className="px-6 py-2 text-slate-600 rounded-lg text-sm font-bold">Online</MagneticButton>
      </div>

      <div className="px-5 mb-4">
         <h3 className="font-bold text-slate-800 font-['Poppins'] mb-4">100 Doctors available</h3>
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                  <div className="flex text-amber-400 text-[10px] mb-2">
                     <Star className="w-3 h-3 fill-current" /> 
                     <Star className="w-3 h-3 fill-current" />
                     <Star className="w-3 h-3 fill-current" />
                     <Star className="w-3 h-3 fill-current" />
                     <span className="text-slate-400 ml-1">4.7</span>
                  </div>
                  <img src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200&h=200" className="w-16 h-16 rounded-full object-cover mb-2" alt="Doctor" />
                  <h4 className="font-bold text-sm text-slate-800 font-['Poppins']">Dr Chathura</h4>
                  <div className="text-[10px] text-blue-600 font-bold mb-1">Neurology</div>
                  <div className="text-[10px] text-slate-400 mb-3">3 years+</div>
                  <MagneticButton className="w-full bg-blue-600 text-white py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700">Book Now</MagneticButton>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                  <div className="flex text-amber-400 text-[10px] mb-2">
                     <Star className="w-3 h-3 fill-current" /> 
                     <Star className="w-3 h-3 fill-current" />
                     <Star className="w-3 h-3 fill-current" />
                     <Star className="w-3 h-3 fill-current" />
                     <span className="text-slate-400 ml-1">4.8</span>
                  </div>
                  <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200" className="w-16 h-16 rounded-full object-cover mb-2" alt="Doctor" />
                  <h4 className="font-bold text-sm text-slate-800 font-['Poppins']">Dr. Kasuni</h4>
                  <div className="text-[10px] text-blue-600 font-bold mb-1">Cardiology</div>
                  <div className="text-[10px] text-slate-400 mb-3">5 years+</div>
                  <MagneticButton className="w-full bg-blue-600 text-white py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700">Book Now</MagneticButton>
            </div>
         </div>
      </div>
   </div>
);

// --- New Screens for Ecosystem Section ---

const PhoneDoctorDashboard = () => (
  <div className="bg-slate-50 w-full min-h-full pb-6 font-['Poppins']">
    {/* Header */}
    <div className="px-5 pb-5 pt-12 flex justify-between items-center bg-white border-b border-slate-100">
      <div className="flex items-center gap-3">
        <img src="https://images.unsplash.com/photo-1582750433449-d22b1274be50?auto=format&fit=crop&q=80&w=200&h=200" className="w-10 h-10 rounded-full object-cover" alt="Dr" />
        <div>
           <h3 className="text-xs font-bold text-slate-900">Good Morning, Dr. Perera</h3>
           <div className="flex items-center text-[10px] text-blue-600">
             <span className="w-2 h-2 bg-blue-600 rounded-full mr-1"></span> Active Now <ChevronRight className="w-3 h-3" />
           </div>
        </div>
      </div>
      <Bell className="w-5 h-5 text-slate-400" />
    </div>

    <div className="px-5 mt-4">
      <div className="flex justify-between items-end mb-2">
         <h4 className="text-xs font-bold text-slate-500">Today</h4>
         <span className="text-[10px] font-bold text-slate-400">12 Sep 2025</span>
      </div>
      <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 flex gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-xl flex flex-col items-center justify-center text-blue-600 border border-blue-200">
             <Calendar className="w-6 h-6 mb-1" />
             <span className="text-lg font-bold leading-none">12</span>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-y-2 gap-x-1">
             <div className="text-[10px] text-slate-500">Request <span className="text-blue-600 font-bold block text-sm">3</span></div>
             <div className="text-[10px] text-slate-500">Unread <span className="text-blue-600 font-bold block text-sm">3</span></div>
             <div className="text-[10px] text-slate-500">Completed <span className="text-blue-600 font-bold block text-sm">3</span></div>
             <div className="text-[10px] text-slate-500">Waiting <span className="text-blue-600 font-bold block text-sm">3</span></div>
          </div>
      </div>
    </div>

    <div className="px-5 mt-4">
       <div className="flex justify-between mb-2">
         <h4 className="text-xs font-bold text-slate-800">Today Schedule</h4>
         <span className="text-[10px] text-slate-400 font-bold">View All &gt;</span>
       </div>
       <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
         {[1,2,3].map(i => (
           <div key={i} className="min-w-[90px] p-2 border border-blue-600 rounded-xl text-center bg-white">
             <div className="text-[10px] text-blue-600 font-bold mb-1">08.00 AM</div>
             <div className="text-[10px] font-bold text-slate-800">Namal</div>
             <div className="text-[10px] text-slate-500">Perera</div>
           </div>
         ))}
       </div>
    </div>

    <div className="px-5 mt-2">
       <h4 className="text-xs font-bold text-slate-800 mb-2">New Request (1)</h4>
       <div className="bg-blue-600 rounded-xl p-3 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
             <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
             </div>
             <div>
                <div className="text-sm font-bold">Mr. Kamal Perera</div>
                <div className="text-[10px] opacity-80 flex items-center gap-2">
                  <Calendar className="w-3 h-3"/> 13 Sep 2025 <Clock className="w-3 h-3"/> 10.00 AM
                </div>
             </div>
          </div>
          <div className="flex items-center text-[10px] mb-3">
             <Video className="w-3 h-3 mr-1" /> Video Consultation
          </div>
          <div className="flex gap-2">
             <MagneticButton className="flex-1 bg-white text-blue-600 py-1.5 rounded-lg text-xs font-bold">Accept</MagneticButton>
             <MagneticButton className="flex-1 border border-white/40 py-1.5 rounded-lg text-xs font-bold">Decline</MagneticButton>
          </div>
       </div>
    </div>
    
    {/* Bottom Nav */}
    <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 h-14 flex justify-around items-center px-2">
        <div className="p-2 text-slate-400"><Activity className="w-5 h-5"/></div>
        <div className="p-2 text-slate-400"><Calendar className="w-5 h-5"/></div>
        <div className="p-3 bg-blue-600 rounded-full text-white -mt-5 shadow-lg border-4 border-slate-50"><FileText className="w-5 h-5"/></div>
        <div className="p-2 text-slate-400"><MessageCircle className="w-5 h-5"/></div>
        <div className="p-2 text-slate-400"><Bell className="w-5 h-5"/></div>
    </div>
  </div>
);

const PhoneAppointmentDetails = () => (
  <div className="bg-slate-50 w-full min-h-full pb-6 font-['Poppins'] pt-12">
    <div className="px-4 flex items-center mb-4">
      <button className="p-1.5 border border-slate-200 rounded-lg bg-white mr-3 shadow-sm">
        <ArrowLeft className="w-4 h-4 text-blue-600" />
      </button>
      <h2 className="text-sm font-bold text-slate-900">Appointment Details</h2>
    </div>

    <div className="px-4 mb-4">
      <h3 className="text-xs font-bold text-slate-800 mb-2">Patient</h3>
      <div className="bg-blue-50 p-3 rounded-xl flex items-center justify-start gap-3 border border-blue-100">
          <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200" className="w-12 h-12 rounded-full object-cover border border-blue-200" alt="Pat" />
          <div>
             <div className="text-sm font-bold text-slate-800">Mr. Namal Perera</div>
             <div className="text-[10px] text-slate-500">34 Years, Male</div>
          </div>
      </div>
    </div>

    <div className="px-4 mb-4">
       <h3 className="text-xs font-bold text-slate-800 mb-2">Appointment Info</h3>
       <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 space-y-2">
          <div className="flex items-center text-xs text-slate-700">
             <Calendar className="w-3 h-3 mr-2 text-slate-400" /> Monday, 13 Sep 2025
          </div>
          <div className="flex items-center text-xs text-slate-700">
             <Clock className="w-3 h-3 mr-2 text-slate-400" /> 10.00 AM - 10.30 AM
          </div>
          <div className="flex justify-between items-center text-xs text-slate-700">
             <div className="flex items-center"><Video className="w-3 h-3 mr-2 text-slate-400" /> Video Consultation</div>
             <span className="text-blue-600 font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Completed</span>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-700">
             <div className="flex items-center"><CreditCard className="w-3 h-3 mr-2 text-slate-400" /> Fee : LKR 2500</div>
             <span className="text-blue-600 font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Paid</span>
          </div>
          <div className="flex gap-2 mt-2 pt-2 border-t border-blue-100">
             <MagneticButton className="flex-1 py-1.5 border border-blue-600 text-blue-600 rounded text-[10px] font-bold">Cancel</MagneticButton>
             <MagneticButton className="flex-1 py-1.5 bg-blue-600 text-white rounded text-[10px] font-bold flex justify-center items-center gap-1"><Check className="w-3 h-3"/> Mark Complete</MagneticButton>
          </div>
       </div>
    </div>

    <div className="px-4">
      <h3 className="text-xs font-bold text-slate-800 mb-2">Actions</h3>
      <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
         <div className="bg-white border border-slate-200 rounded-lg p-2 mb-2 h-16">
            <p className="text-[10px] text-slate-500">Reason for visit: "Persistence cough & fever"</p>
         </div>
         <div className="flex justify-end mb-3">
             <MagneticButton className="bg-blue-600 text-white px-3 py-1 rounded text-[10px] font-bold">Add Note</MagneticButton>
         </div>
         <div className="flex justify-between items-center">
             <div className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center text-slate-400 border border-slate-300">
                 <Image className="w-5 h-5" />
             </div>
             <MagneticButton className="bg-blue-600 text-white px-3 py-1.5 rounded text-[10px] font-bold">Add Prescription</MagneticButton>
         </div>
      </div>
    </div>
  </div>
);

const PhoneConsultationSummary = () => (
  <div className="bg-slate-50 w-full min-h-full pb-6 font-['Poppins'] pt-12">
    <div className="px-4 flex items-center mb-4">
      <button className="p-1.5 border border-slate-200 rounded-lg bg-white mr-3 shadow-sm">
        <ArrowLeft className="w-4 h-4 text-blue-600" />
      </button>
      <h2 className="text-sm font-bold text-slate-900">Summary</h2>
    </div>

    <div className="px-4 mb-4">
      <h3 className="text-xs font-bold text-slate-800 mb-2">Doctor</h3>
      <div className="bg-blue-50 p-3 rounded-xl flex items-center justify-start gap-3 border border-blue-100">
         <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200" className="w-12 h-12 rounded-full object-cover border border-blue-200" alt="Doc" />
         <div>
            <div className="text-sm font-bold text-slate-800">Dr. Anjali</div>
            <div className="text-[10px] text-blue-600 flex items-center gap-1"><Stethoscope className="w-3 h-3"/> Neurology</div>
         </div>
      </div>
    </div>

    <div className="px-4 mb-4">
       <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center text-xs text-slate-700 mb-1">
             <Calendar className="w-3 h-3 mr-2 text-slate-400" /> Monday, 13 Sep 2025
          </div>
          <div className="flex items-center text-xs text-slate-700 mb-1">
             <Clock className="w-3 h-3 mr-2 text-slate-400" /> 10.00 AM - 10.30 AM
          </div>
          <div className="flex items-center text-xs text-slate-700 mb-2">
             <Video className="w-3 h-3 mr-2 text-slate-400" /> Video Consultation
          </div>
          <div className="flex justify-end">
             <span className="bg-emerald-500 text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Completed</span>
          </div>
       </div>
    </div>
    
    <div className="px-4 mb-4">
       <h3 className="text-xs font-bold text-slate-800 mb-2">Payment Details</h3>
       <div className="bg-slate-100 p-3 rounded-xl border border-slate-200">
          <div className="flex justify-between text-[10px] text-slate-600 mb-1">
             <span>Consultation Fee</span> <span>LKR 3000</span>
          </div>
          <div className="flex justify-between text-[10px] text-slate-600 mb-1">
             <span>Service Fee</span> <span>LKR 200</span>
          </div>
          <div className="flex justify-between text-[10px] text-green-600 mb-2 border-b border-slate-200 pb-2">
             <span>Promotion</span> <span>- LKR 500</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-800 mb-2">
             <span>Total Fee</span> <span>LKR 2500</span>
          </div>
          <MagneticButton className="w-full bg-emerald-500 text-white py-1.5 rounded text-[10px] font-bold flex items-center justify-center gap-1"><CheckCircle className="w-3 h-3"/> Payment : Paid</MagneticButton>
       </div>
    </div>

    <div className="px-4">
       <h3 className="text-xs font-bold text-slate-800 mb-2">Prescription</h3>
       <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
           <div className="flex items-start gap-2 mb-2">
               <div className="mt-0.5"><Pill className="w-3 h-3 text-slate-500"/></div>
               <div>
                  <div className="text-[10px] text-slate-500 font-bold">Reason For: Persistence cough & fever</div>
                  <div className="text-[10px] text-slate-500">Note: Brief Note from doctor</div>
               </div>
           </div>
           <div className="flex justify-between items-center mt-2">
              <span className="text-[10px] font-bold text-slate-700 flex items-center gap-1"><FileText className="w-3 h-3"/> Prescription :</span>
              <MagneticButton className="bg-blue-600 text-white px-4 py-1 rounded text-[10px] font-bold">View</MagneticButton>
           </div>
       </div>
       <MagneticButton className="w-full bg-blue-600 text-white py-2 rounded-lg text-xs font-bold mt-4">Ask for Refund</MagneticButton>
    </div>
  </div>
);

// Moved FeatureCard outside to prevent re-renders causing animation flicker
const FeatureCard = ({ title, desc, icon: Icon, tags, isHero, colorClass, gradientClass, delay }: any) => (
    <RevealOnScroll delay={delay} className={isHero ? "md:col-span-2" : ""}>
        <div className={`group relative h-full rounded-3xl bg-white border border-slate-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/5 hover:border-cyan-200 overflow-hidden`}>
            {/* Background decoration */}
            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${colorClass}`}></div>
            
            <div className="flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${gradientClass} text-white group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7" />
                    </div>
                    {isHero && (
                        <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center">
                            <Star className="w-3 h-3 mr-1 fill-current" /> Most Popular
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag: string, i: number) => (
                        <span key={i} className="bg-slate-50 text-slate-500 border border-slate-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide group-hover:bg-white group-hover:border-slate-200 transition-colors">
                            {tag}
                        </span>
                    ))}
                </div>
                
                <h3 className={`font-bold text-slate-900 mb-2 font-['Poppins'] ${isHero ? 'text-2xl' : 'text-xl'}`}>{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-['Inter'] mb-4 flex-grow">
                    {desc}
                </p>

                {/* "Interactive" Element */}
                <div className="flex items-center text-xs font-bold text-slate-400 group-hover:text-cyan-600 transition-colors cursor-pointer">
                    <span>Learn more</span>
                    <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
            
            {/* Visual Illustration Elements for SaaS feel */}
            <div className="absolute bottom-4 right-4 opacity-5 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500 pointer-events-none">
                 <Icon className="w-24 h-24" />
            </div>
        </div>
    </RevealOnScroll>
);


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeScreen, setActiveScreen] = useState(0);
  const [activeServiceTab, setActiveServiceTab] = useState('care-access');

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Auto-slide phone screens
  useEffect(() => {
     const interval = setInterval(() => {
        setActiveScreen((prev) => (prev + 1) % 3);
     }, 3000);
     return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Adjust for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-cyan-100 animate-fade-in">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="bg-gradient-to-tr from-cyan-500 to-teal-400 p-2 rounded-xl mr-3 shadow-md shadow-cyan-500/20">
                 <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-slate-900 tracking-tight font-['Poppins']">MedCey</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-10 items-center">
              <button onClick={() => scrollToSection('features')} className="text-sm font-semibold text-slate-600 hover:text-cyan-600 transition-colors font-['Poppins']">Services</button>
              <button onClick={() => scrollToSection('interface')} className="text-sm font-semibold text-slate-600 hover:text-cyan-600 transition-colors font-['Poppins']">App View</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-sm font-semibold text-slate-600 hover:text-cyan-600 transition-colors font-['Poppins']">Reviews</button>
              <MagneticButton 
                onClick={() => scrollToSection('download')}
                className="bg-cyan-500 text-white px-7 py-3 rounded-full text-sm font-bold hover:bg-cyan-600 transition-colors font-['Poppins']"
              >
                Download App
              </MagneticButton>
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
          <div className="md:hidden bg-white border-b border-slate-100 absolute w-full shadow-xl">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <button onClick={() => scrollToSection('features')} className="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 w-full text-left font-['Poppins']">Services</button>
              <button onClick={() => scrollToSection('interface')} className="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 w-full text-left font-['Poppins']">App View</button>
              <button onClick={() => scrollToSection('testimonials')} className="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 w-full text-left font-['Poppins']">Reviews</button>
              <button onClick={() => scrollToSection('download')} className="block px-3 py-3 mt-4 rounded-lg text-base font-bold text-white bg-cyan-500 hover:bg-cyan-600 w-full text-center shadow-md font-['Poppins']">Download Now</button>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-12 lg:pt-32 lg:pb-20">
          {/* Subtle Background Blobs */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-cyan-50 rounded-full blur-3xl -z-10 opacity-60"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-teal-50 rounded-full blur-3xl -z-10 opacity-60"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="lg:w-1/2 text-center lg:text-left z-10">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 font-bold text-xs uppercase tracking-wide mb-8 shadow-sm animate-fade-in font-['Poppins']" style={{animationDelay: '0.1s'}}>
                  <Star className="w-3.5 h-3.5 mr-2 text-amber-500 fill-amber-500" />
                  No.1 Healthcare App
                </div>
                <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1] animate-fade-in font-['Poppins']" style={{animationDelay: '0.2s'}}>
                  Find Your Doctor <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500">& Book Online</span>
                </h1>
                <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in font-['Inter']" style={{animationDelay: '0.3s'}}>
                  The complete healthcare ecosystem. From finding the best specialists to medicine delivery and lab tests—MedCey brings the hospital to your home.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
                  <MagneticButton className="flex items-center bg-slate-900 text-white px-6 py-3.5 rounded-xl hover:bg-slate-800 transition-colors shadow-xl shadow-slate-900/10 min-w-[180px] justify-center group">
                    <div className="group-hover:text-cyan-300 transition-colors">
                      <AppleLogo />
                    </div>
                    <div className="ml-3 text-left">
                      <div className="text-[10px] font-medium opacity-80 leading-none mb-1 font-['Poppins']">Download on the</div>
                      <div className="text-lg font-bold leading-none font-['Poppins']">App Store</div>
                    </div>
                  </MagneticButton>
                  <MagneticButton className="flex items-center bg-slate-900 text-white px-6 py-3.5 rounded-xl hover:bg-slate-800 transition-colors shadow-xl shadow-slate-900/10 min-w-[180px] justify-center group">
                     <div className="group-hover:text-cyan-300 transition-colors">
                      <PlayStoreLogo />
                    </div>
                    <div className="ml-3 text-left">
                      <div className="text-[10px] font-medium opacity-80 leading-none mb-1 font-['Poppins']">GET IT ON</div>
                      <div className="text-lg font-bold leading-none font-['Poppins']">Google Play</div>
                    </div>
                  </MagneticButton>
                </div>
              </div>

              <div className="lg:w-1/2 relative flex justify-center lg:justify-end animate-fade-in" style={{animationDelay: '0.4s'}}>
                {/* Decorative circles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-100 rounded-full blur-3xl -z-10 animate-pulse opacity-50"></div>
                
                {/* Hero Phone Mockup Using PhoneFrame */}
                <PhoneFrame className="h-[650px] w-[320px]">
                    <div 
                        className="flex h-full w-full transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${activeScreen * 100}%)` }}
                    >
                       {/* Screen 1: Home */}
                       <div className="w-full h-full flex-shrink-0 bg-slate-50 overflow-y-auto scrollbar-hide">
                          <PhoneHomeScreen />
                       </div>
                       {/* Screen 2: Appointments */}
                       <div className="w-full h-full flex-shrink-0 bg-slate-50 overflow-y-auto scrollbar-hide">
                          <PhoneAppointmentsScreen />
                       </div>
                       {/* Screen 3: Specialties */}
                       <div className="w-full h-full flex-shrink-0 bg-slate-50 overflow-y-auto scrollbar-hide">
                           <PhoneSpecialtiesScreen />
                       </div>
                    </div>
                    
                    {/* Navigation Bar Fixed at Bottom */}
                    <div className="absolute bottom-0 w-full bg-white border-t border-slate-200 h-16 flex justify-around items-center px-2 z-30">
                        <button onClick={() => setActiveScreen(0)} className={`p-2 transition-colors ${activeScreen === 0 ? 'text-blue-600' : 'text-slate-400'}`}>
                            <Smartphone className="w-6 h-6"/>
                        </button>
                        <button onClick={() => setActiveScreen(2)} className={`p-2 transition-colors ${activeScreen === 2 ? 'text-blue-600' : 'text-slate-400'}`}>
                            <Search className="w-6 h-6"/>
                        </button>
                        <button onClick={() => setActiveScreen(1)} className={`p-2 transition-colors ${activeScreen === 1 ? 'text-blue-600' : 'text-slate-400'}`}>
                            <Calendar className="w-6 h-6"/>
                        </button>
                        <div className="p-2 text-slate-400"><Bell className="w-6 h-6"/></div>
                        <div className="p-2 text-slate-400"><Menu className="w-6 h-6"/></div>
                    </div>
                </PhoneFrame>
              </div>
            </div>
          </div>
        </section>

        {/* Revamped Features Section */}
        <section id="features" className="py-16 bg-white relative overflow-hidden min-h-[800px]">
           {/* Abstract Background Patterns */}
           <div className="absolute top-0 right-0 opacity-40 pointer-events-none">
              <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
                 <circle cx="350" cy="50" r="100" fill="#E0F2FE" />
                 <circle cx="350" cy="50" r="200" stroke="#E0F2FE" strokeWidth="1" />
                 <circle cx="350" cy="50" r="300" stroke="#E0F2FE" strokeWidth="1" />
              </svg>
           </div>
           
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <RevealOnScroll>
                <div className="text-center mb-12 max-w-3xl mx-auto">
                   <h2 className="text-cyan-500 font-bold tracking-wider uppercase text-sm mb-3 font-['Poppins']">Our Services</h2>
                   <p className="text-3xl md:text-4xl font-bold text-slate-900 font-['Poppins']">Designed for Complete Healthcare</p>
                   <p className="mt-4 text-slate-500 text-lg font-['Inter']">Everything you need to manage your well-being, organized for simplicity.</p>
                </div>
              </RevealOnScroll>

              <div className="flex flex-col lg:flex-row gap-12">
                  {/* Sticky Side Navigation / Tabs */}
                  <div className="lg:w-64 flex-shrink-0">
                      <div className="lg:sticky lg:top-32 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
                          <h4 className="hidden lg:block font-bold text-slate-900 mb-2 px-4 uppercase tracking-wider text-xs">Categories</h4>
                          
                          {[
                              { id: 'care-access', label: 'Care Access', icon: Search },
                              { id: 'patient-tools', label: 'Patient Tools', icon: User },
                              { id: 'clinic-tools', label: 'Clinic Tools', icon: Stethoscope }
                          ].map((tab) => (
                              <button 
                                  key={tab.id}
                                  onClick={() => setActiveServiceTab(tab.id)}
                                  onMouseEnter={() => setActiveServiceTab(tab.id)}
                                  className={`w-full text-left px-4 py-3 rounded-xl font-medium font-['Poppins'] flex items-center justify-between transition-all duration-300 whitespace-nowrap lg:whitespace-normal ${
                                      activeServiceTab === tab.id 
                                      ? 'bg-cyan-50 text-cyan-700 border border-cyan-100 shadow-sm lg:translate-x-2' 
                                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                                  }`}
                              >
                                  <span className="flex items-center">
                                      <span className={`w-6 h-6 rounded mr-3 flex items-center justify-center ${activeServiceTab === tab.id ? 'bg-cyan-100 text-cyan-600' : 'bg-slate-100 text-slate-400'}`}>
                                          <tab.icon className="w-3.5 h-3.5" />
                                      </span>
                                      {tab.label}
                                  </span>
                                  {activeServiceTab === tab.id && <ChevronRight className="w-4 h-4 text-cyan-500 hidden lg:block"/>}
                              </button>
                          ))}
                      </div>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 min-h-[500px] relative">
                      
                      {/* Care Access Content */}
                      <div className={activeServiceTab === 'care-access' ? 'block' : 'hidden'}>
                              <h3 className="text-2xl font-bold text-slate-900 mb-8 font-['Poppins'] flex items-center">
                                  <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3"><Search className="w-5 h-5"/></span>
                                  Care Access
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                  {/* Hero Card */}
                                  <FeatureCard 
                                      title="HD Video Consultations"
                                      desc="Secure, high-quality video calls. See your doctor from the comfort of home with encryption."
                                      icon={Video}
                                      tags={["HD Secure", "Low Latency"]}
                                      isHero={true}
                                      colorClass="bg-blue-100"
                                      gradientClass="bg-gradient-to-br from-blue-400 to-indigo-600"
                                      delay={0}
                                  />
                                  <FeatureCard 
                                      title="Find Doctor"
                                      desc="AI-powered search matches you with the right specialist instantly."
                                      icon={Search}
                                      tags={["Verified", "AI Match"]}
                                      colorClass="bg-cyan-100"
                                      gradientClass="bg-gradient-to-br from-cyan-400 to-blue-500"
                                      delay={100}
                                  />
                                  <FeatureCard 
                                      title="Book Appts"
                                      desc="Real-time calendar syncing for instant booking confirmation."
                                      icon={Calendar}
                                      tags={["Instant", "24/7"]}
                                      colorClass="bg-teal-100"
                                      gradientClass="bg-gradient-to-br from-teal-400 to-emerald-600"
                                      delay={200}
                                  />
                              </div>
                      </div>

                      {/* Patient Tools Content */}
                      <div className={activeServiceTab === 'patient-tools' ? 'block' : 'hidden'}>
                               <h3 className="text-2xl font-bold text-slate-900 mb-8 font-['Poppins'] flex items-center">
                                  <span className="w-8 h-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center mr-3"><User className="w-5 h-5"/></span>
                                  Patient Tools
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                  <FeatureCard 
                                      title="Health Records"
                                      desc="Centralized storage for all your prescriptions, lab reports, and history."
                                      icon={FileText}
                                      tags={["HIPAA", "Cloud"]}
                                      colorClass="bg-emerald-100"
                                      gradientClass="bg-gradient-to-br from-emerald-400 to-teal-600"
                                      delay={0}
                                  />
                                  <FeatureCard 
                                      title="Chat With Doctor"
                                      desc="Direct messaging channel for follow-ups and quick queries."
                                      icon={MessageCircle}
                                      tags={["Private", "Direct"]}
                                      colorClass="bg-violet-100"
                                      gradientClass="bg-gradient-to-br from-violet-400 to-purple-600"
                                      delay={100}
                                  />
                                  <FeatureCard 
                                      title="Alerts & Reminders"
                                      desc="Never miss a pill or appointment with smart automated notifications."
                                      icon={Bell}
                                      tags={["Smart", "Custom"]}
                                      colorClass="bg-amber-100"
                                      gradientClass="bg-gradient-to-br from-amber-400 to-orange-500"
                                      delay={200}
                                  />
                              </div>
                      </div>

                       {/* Clinic Tools Content */}
                       <div className={activeServiceTab === 'clinic-tools' ? 'block' : 'hidden'}>
                               <h3 className="text-2xl font-bold text-slate-900 mb-8 font-['Poppins'] flex items-center">
                                  <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3"><Stethoscope className="w-5 h-5"/></span>
                                  Clinic Tools
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                  <FeatureCard 
                                      title="Schedule Mgmt"
                                      desc="Advanced tools for doctors to manage slots, breaks, and vacations."
                                      icon={Clock}
                                      tags={["Flexible", "Auto"]}
                                      colorClass="bg-sky-100"
                                      gradientClass="bg-gradient-to-br from-sky-400 to-blue-600"
                                      delay={0}
                                  />
                                  <FeatureCard 
                                      title="Payments"
                                      desc="Integrated billing, invoicing, and earnings analytics for clinics."
                                      icon={CreditCard}
                                      tags={["Secure", "Fast"]}
                                      colorClass="bg-pink-100"
                                      gradientClass="bg-gradient-to-br from-pink-400 to-rose-600"
                                      delay={100}
                                  />
                                  <FeatureCard 
                                      title="Verified Profiles"
                                      desc="Build trust with verification badges for qualifications and experience."
                                      icon={ShieldCheck}
                                      tags={["Trusted", "Vetted"]}
                                      colorClass="bg-blue-100"
                                      gradientClass="bg-gradient-to-br from-blue-500 to-cyan-600"
                                      delay={200}
                                  />
                              </div>
                      </div>

                  </div>
              </div>
           </div>
        </section>

        {/* Interface Showcase Section */}
        <section id="interface" className="py-16 bg-slate-50 overflow-hidden relative border-y border-slate-100">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
               <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-100 rounded-full filter blur-[100px] opacity-40"></div>
               <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-100 rounded-full filter blur-[100px] opacity-40"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
               <div className="flex flex-col md:flex-row items-center gap-16">
                  <div className="md:w-1/2">
                    <RevealOnScroll>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-['Poppins']">Intuitive Design.<br/>Powerful Features.</h2>
                        <p className="text-slate-600 text-lg mb-8 leading-relaxed font-['Inter']">
                            Designed with care for patients and doctors alike. Navigate through your health journey with a clean, clutter-free interface that puts your well-being first.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mt-1 flex-shrink-0">
                                <span className="text-cyan-500 font-bold font-['Poppins']">01</span>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-slate-900 font-bold text-lg font-['Poppins']">Smart Search</h4>
                                <p className="text-slate-500 text-sm font-['Inter']">Find doctors by symptoms, specialty, or hospital name.</p>
                            </div>
                            </div>
                            <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mt-1 flex-shrink-0">
                                <span className="text-cyan-500 font-bold font-['Poppins']">02</span>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-slate-900 font-bold text-lg font-['Poppins']">Instant Booking</h4>
                                <p className="text-slate-500 text-sm font-['Inter']">Real-time availability calendar for hassle-free appointments.</p>
                            </div>
                            </div>
                            <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mt-1 flex-shrink-0">
                                <span className="text-cyan-500 font-bold font-['Poppins']">03</span>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-slate-900 font-bold text-lg font-['Poppins']">Secure Payments</h4>
                                <p className="text-slate-500 text-sm font-['Inter']">Integrated wallet and insurance processing.</p>
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
                            <div className="absolute top-0 right-0 md:right-10 w-64 bg-white rounded-3xl p-5 shadow-2xl shadow-slate-200 transform rotate-6 z-10 hover:rotate-0 transition-all duration-500 hover:scale-105 hover:z-30 cursor-pointer border border-slate-100">
                                <div className="flex justify-between mb-4">
                                <ChevronRight className="rotate-180 text-slate-300"/>
                                <Heart className="text-slate-300"/>
                                </div>
                                <div className="flex flex-col items-center mb-4">
                                <img src="https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&q=80&w=200&h=200" className="w-20 h-20 bg-cyan-50 rounded-full mb-3 object-cover" alt="Doc"/>
                                <h4 className="font-bold text-slate-800 font-['Poppins']">Dr. Albert Flores</h4>
                                <span className="text-xs text-cyan-600 bg-cyan-50 px-2 py-1 rounded-full mt-1 font-['Inter'] font-semibold">Surgeon</span>
                                </div>
                                <div className="flex justify-between text-center mb-4 border-t border-slate-50 pt-3">
                                <div>
                                    <div className="font-bold text-slate-800 font-['Poppins']">350+</div>
                                    <div className="text-[10px] text-slate-400">Patients</div>
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800 font-['Poppins']">15+</div>
                                    <div className="text-[10px] text-slate-400">Exp.</div>
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800 font-['Poppins']">4.9</div>
                                    <div className="text-[10px] text-slate-400">Rating</div>
                                </div>
                                </div>
                                <MagneticButton className="w-full bg-cyan-500 text-white py-2 rounded-xl text-sm font-bold hover:bg-cyan-600 font-['Poppins']">Book Appointment</MagneticButton>
                            </div>

                            {/* Card 2: Medicine */}
                            <div className="absolute bottom-10 left-0 md:left-10 w-64 bg-white rounded-3xl p-5 shadow-2xl shadow-slate-200 transform -rotate-6 z-20 hover:rotate-0 transition-all duration-500 hover:scale-105 hover:z-30 cursor-pointer border border-slate-100">
                                <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-500"><Pill size={20}/></div>
                                <div>
                                    <h4 className="font-bold text-sm text-slate-800 font-['Poppins']">Order Placed</h4>
                                    <p className="text-[10px] text-slate-400 font-['Inter']">Arriving today, 2:00 PM</p>
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
                                        <div className="font-bold text-sm text-slate-700 font-['Poppins']">Rs. 850</div>
                                    </div>
                                ))}
                                </div>
                                <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-500 font-['Inter']">Total</span>
                                <span className="text-lg font-bold text-slate-800 font-['Poppins']">Rs. 1,700</span>
                                </div>
                            </div>
                        </div>
                     </RevealOnScroll>
                  </div>
               </div>
            </div>
        </section>

        {/* NEW Ecosystem Showcase Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <div className="text-center mb-12 max-w-3xl mx-auto">
                 <h2 className="text-cyan-500 font-bold tracking-wider uppercase text-sm mb-3 font-['Poppins']">Powering the Entire Ecosystem</h2>
                 <p className="text-3xl md:text-4xl font-bold text-slate-900 font-['Poppins']">Complete Care Workflow</p>
                 <p className="mt-4 text-slate-500 text-lg font-['Inter']">From doctor dashboards to patient summaries, experience a platform built for every step of the healthcare journey.</p>
              </div>
            </RevealOnScroll>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">
               {/* Phone 1: Doctor Dashboard */}
               <RevealOnScroll delay={100} className="flex flex-col items-center">
                  <PhoneFrame className="h-[580px] w-[290px]">
                      <PhoneDoctorDashboard />
                  </PhoneFrame>
                  <h3 className="mt-8 text-xl font-bold text-slate-900 font-['Poppins']">Doctor Dashboard</h3>
                  <p className="mt-2 text-slate-500 text-center text-sm px-8">Manage appointments, requests, and schedules in one view.</p>
               </RevealOnScroll>
               
               {/* Phone 2: Appointment Action */}
               <RevealOnScroll delay={200} className="flex flex-col items-center">
                  <PhoneFrame className="h-[580px] w-[290px] border-blue-900 ring-4 ring-cyan-100">
                      <PhoneAppointmentDetails />
                  </PhoneFrame>
                  <h3 className="mt-8 text-xl font-bold text-slate-900 font-['Poppins']">Smart Consultations</h3>
                  <p className="mt-2 text-slate-500 text-center text-sm px-8">Add notes, prescriptions, and track payment status instantly.</p>
               </RevealOnScroll>
               
               {/* Phone 3: Patient Summary */}
               <RevealOnScroll delay={300} className="flex flex-col items-center">
                   <PhoneFrame className="h-[580px] w-[290px]">
                      <PhoneConsultationSummary />
                  </PhoneFrame>
                  <h3 className="mt-8 text-xl font-bold text-slate-900 font-['Poppins']">Patient Summary</h3>
                  <p className="mt-2 text-slate-500 text-center text-sm px-8">Transparent billing and easy access to digital prescriptions.</p>
               </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-16 bg-slate-50 border-t border-slate-100">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RevealOnScroll>
                <h2 className="text-3xl font-bold text-center text-slate-900 mb-12 font-['Poppins']">Trusted by millions</h2>
              </RevealOnScroll>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                    { name: "Alex Morgan", role: "Fitness Enthusiast", text: "The doctor search is so easy. I found a specialist and booked a slot in under 5 minutes.", img: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=200&h=200" },
                    { name: "Dr. Sarah Lin", role: "General Practitioner", text: "I recommend MedCey to all my patients. It helps them stay engaged with their health between visits.", img: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=200&h=200" },
                    { name: "James Wilson", role: "Patient", text: "Medicine delivery is a game changer. No more waiting in lines at the pharmacy.", img: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200&h=200" },
                 ].map((t, i) => (
                    <RevealOnScroll key={i} delay={i * 150}>
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-lg hover:shadow-cyan-500/5 transition-all">
                        <div className="flex text-amber-400 mb-4">
                            {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                        </div>
                        <p className="text-slate-600 mb-6 italic font-['Inter'] leading-relaxed">"{t.text}"</p>
                        <div className="flex items-center">
                            <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-100" />
                            <div className="ml-3">
                                <div className="text-sm font-bold text-slate-900 font-['Poppins']">{t.name}</div>
                                <div className="text-xs text-slate-500 font-['Inter']">{t.role}</div>
                            </div>
                        </div>
                        </div>
                    </RevealOnScroll>
                 ))}
              </div>
           </div>
        </section>

        {/* Download CTA */}
        <section id="download" className="py-16 bg-gradient-to-br from-teal-500 to-cyan-500 text-white overflow-hidden relative">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[80px] -mr-40 -mt-40"></div>
           <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-800/20 rounded-full blur-[80px] -ml-40 -mb-40"></div>
           
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <RevealOnScroll>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 font-['Poppins']">Ready to take control?</h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12 font-['Inter']">
                    Join the health revolution today. Download MedCey AI and start your journey to a healthier, happier life.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <MagneticButton className="flex items-center bg-white text-teal-600 px-8 py-4 rounded-xl hover:bg-teal-50 transition-colors min-w-[200px] justify-center shadow-lg">
                        <AppleLogo />
                        <div className="ml-3 text-left">
                        <div className="text-[10px] font-bold opacity-60 uppercase tracking-wide leading-none mb-1 font-['Poppins']">Download on the</div>
                        <div className="text-xl font-bold leading-none font-['Poppins']">App Store</div>
                        </div>
                    </MagneticButton>
                    <MagneticButton className="flex items-center bg-teal-600/30 border border-white/40 text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-colors min-w-[200px] justify-center backdrop-blur-sm">
                        <PlayStoreLogo />
                        <div className="ml-3 text-left">
                        <div className="text-[10px] font-bold opacity-60 uppercase tracking-wide leading-none mb-1 font-['Poppins']">GET IT ON</div>
                        <div className="text-xl font-bold leading-none font-['Poppins']">Google Play</div>
                        </div>
                    </MagneticButton>
                </div>
                <p className="mt-8 text-sm text-white/60 font-['Inter']">
                    Requires iOS 15.0+ or Android 10.0+ • Free with in-app purchases
                </p>
              </RevealOnScroll>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-2 md:col-span-1">
                    <div className="flex items-center mb-4">
                    <div className="bg-cyan-500 p-1.5 rounded-lg mr-2">
                        <Activity className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-xl text-slate-900 font-['Poppins']">MedCey</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-4 font-['Inter'] leading-relaxed">
                    Your intelligent health companion for a better life. Connected care for everyone, everywhere.
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 mb-4 font-['Poppins']">Product</h3>
                    <ul className="space-y-2 text-sm text-slate-500 font-['Inter']">
                    <li><a href="#" className="hover:text-cyan-600 transition-colors">Features</a></li>
                    <li><a href="#" className="hover:text-cyan-600 transition-colors">Security</a></li>
                    <li><a href="#" className="hover:text-cyan-600 transition-colors">For Doctors</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 mb-4 font-['Poppins']">Company</h3>
                    <ul className="space-y-2 text-sm text-slate-500 font-['Inter']">
                    <li><a href="#" className="hover:text-cyan-600 transition-colors">About Us</a></li>
                    <li><a href="#" className="hover:text-cyan-600 transition-colors">Careers</a></li>
                    <li><a href="#" className="hover:text-cyan-600 transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 mb-4 font-['Poppins']">Connect</h3>
                    <div className="flex space-x-3">
                    <a href="#" className="w-9 h-9 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all hover:scale-110">
                        <Facebook className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-9 h-9 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-pink-50 hover:text-pink-600 transition-all hover:scale-110">
                        <Instagram className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-9 h-9 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all hover:scale-110">
                        <SocialX className="w-3.5 h-3.5" />
                    </a>
                    </div>
                </div>
            </div>
          </RevealOnScroll>
          <div className="border-t border-slate-50 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 font-['Inter']">
             <p>© 2024 MedCey Inc. All rights reserved.</p>
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
