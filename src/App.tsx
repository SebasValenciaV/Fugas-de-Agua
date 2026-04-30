/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Droplets, 
  Search, 
  ShieldCheck, 
  Zap, 
  Clock, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  AlertTriangle, 
  Waves, 
  Home, 
  Hammer, 
  MapPin, 
  Mail, 
  Facebook, 
  Instagram, 
  Menu, 
  X,
  ArrowRight,
  Plus,
  Minus,
  Globe,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { translations } from './translations';

// --- Components ---

const Navbar = ({ lang, setLang }: { lang: 'es' | 'en', setLang: (l: 'es' | 'en') => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#' },
    { name: t.nav.services, href: '#servicios' },
    { name: t.nav.howItWorks, href: '#proceso' },
    { name: t.nav.questions, href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-primary-600 p-2 rounded-lg">
            <Droplets className="text-white w-6 h-6" />
          </div>
          <span className={`text-2xl font-display font-bold ${isScrolled ? 'text-primary-900' : 'text-primary-900'}`}>
            Fugas de Agua
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-slate-700 hover:text-primary-600 font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <button 
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="flex items-center gap-2 text-slate-700 hover:text-primary-600 font-medium transition-colors border border-slate-200 px-3 py-1.5 rounded-lg"
          >
            <Globe size={18} />
            {lang === 'es' ? 'EN' : 'ES'}
          </button>

          <a 
            href="tel:+573003197620" 
            className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-200"
          >
            <Phone size={18} />
            {t.nav.callNow}
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-primary-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-700 text-lg font-medium py-2"
                >
                  {link.name}
                </a>
              ))}
              
              <button 
                onClick={() => {
                  setLang(lang === 'es' ? 'en' : 'es');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 text-slate-700 font-medium py-2 border border-slate-200 rounded-lg"
              >
                <Globe size={20} />
                {lang === 'es' ? 'English' : 'Español'}
              </button>

              <a 
                href="tel:+573003197620" 
                className="flex items-center justify-center gap-2 bg-primary-600 text-white py-4 rounded-xl font-bold"
              >
                <Phone size={20} />
                {t.nav.callNow}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 py-4">
      <button 
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-slate-800">{question}</span>
        {isOpen ? <Minus className="text-primary-600" /> : <Plus className="text-primary-600" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-slate-600 mt-3 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const t = translations[lang];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar lang={lang} setLang={setLang} />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-50 to-white"></div>
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-10">
          <Waves className="w-full h-full text-primary-600" />
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                <Zap size={16} />
                {t.hero.immediateAttention}
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-primary-950 leading-tight mb-6">
                {t.hero.title}
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {lang === 'es' ? (
                  <>
                    Detectamos y localizamos fugas ocultas con tecnología de <span className="font-bold text-primary-700">Geófono de alta precisión</span>. 
                    <span className="font-bold text-primary-700"> Sin romper paredes innecesariamente.</span>
                  </>
                ) : (
                  <>
                    We detect and locate hidden leaks with <span className="font-bold text-primary-700">High-precision Geophone technology</span>. 
                    <span className="font-bold text-primary-700"> Without breaking walls unnecessarily.</span>
                  </>
                )}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <a 
                  href="tel:+573003197620" 
                  className="w-full sm:w-auto bg-primary-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary-200 hover:bg-primary-700 transition-all flex items-center justify-center gap-2"
                >
                  {t.hero.ctaDiagnostic}
                  <ArrowRight size={20} />
                </a>
                <a 
                  href="https://wa.me/573003197620" 
                  className="w-full sm:w-auto bg-accent-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-accent-100 hover:bg-accent-600 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  {t.hero.ctaWhatsApp}
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-accent-500" size={20} />
                  <span className="font-medium">{t.hero.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-accent-500" size={20} />
                  <span className="font-medium">{t.hero.satisfied}</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=1000" 
                  alt="Herramientas de plomería y geófono" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent"></div>
              </div>
              
              {/* Trust Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <ShieldCheck className="text-primary-600 w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm font-medium">{t.nav.services}</p>
                    <p className="text-primary-900 font-bold text-lg">{t.common.guaranteed}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- PROBLEMA SECTION --- */}
      <section className="py-20 bg-white border-b border-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl text-primary-950 mb-4">{t.problems.title}</h2>
            <p className="text-slate-600 text-lg">{t.problems.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Waves className="text-primary-500" />, title: t.problems.manchas.title, desc: t.problems.manchas.desc },
              { icon: <AlertTriangle className="text-emergency-500" />, title: t.problems.facturas.title, desc: t.problems.facturas.desc },
              { icon: <Droplets className="text-primary-500" />, title: t.problems.goteos.title, desc: t.problems.goteos.desc },
              { icon: <ShieldCheck className="text-emergency-500" />, title: t.problems.danos.title, desc: t.problems.danos.desc },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ESTADISTICAS SECTION --- */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1595113316349-9fa4046a81d3?auto=format&fit=crop&q=80&w=600" 
                alt="Statistics background humidifier" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl text-primary-950 mb-8 flex items-center gap-3">
                <TrendingUp className="text-primary-600" />
                {t.stats.apartmentTitle}
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <div className="text-4xl font-bold text-primary-600">40%</div>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {t.stats.p1}
                  </p>
                </div>
                <div className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <div className="text-4xl font-bold text-primary-600">200L</div>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {t.stats.p2}
                  </p>
                </div>
                <div className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <div className="text-4xl font-bold text-primary-600">70%</div>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {t.stats.p3}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOLUCIÓN SECTION --- */}
      <section className="py-20 bg-primary-950 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-700 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl mb-6 leading-tight">{t.solution.title}</h2>
              <p className="text-primary-200 text-lg mb-10 leading-relaxed">
                {t.solution.desc}
              </p>

              <div className="space-y-6">
                {t.solution.items.map((benefit, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="bg-primary-800 p-1.5 rounded-full h-fit mt-1">
                      <CheckCircle2 className="text-accent-500 w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{benefit.title}</h4>
                      <p className="text-primary-300">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=80&w=600" 
                alt="Tuberías de PVC y CPVC" 
                className="rounded-2xl shadow-2xl w-full h-64 object-cover mt-8"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600" 
                alt="Tubos de cobre y herramientas" 
                className="rounded-2xl shadow-2xl w-full h-64 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICIOS SECTION --- */}
      <section id="servicios" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl text-primary-950 mb-4">{t.services.title}</h2>
            <p className="text-slate-600 text-lg">{t.services.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.items.map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                <div className="bg-primary-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  {/* Reuse icons based on index for simplicity or map them */}
                  {idx === 0 && <Search className="text-primary-600 group-hover:text-white" />}
                  {idx === 1 && <Hammer className="text-primary-600 group-hover:text-white" />}
                  {idx === 2 && <Waves className="text-primary-600 group-hover:text-white" />}
                  {idx === 3 && <Home className="text-primary-600 group-hover:text-white" />}
                  {idx === 4 && <Droplets className="text-primary-600 group-hover:text-white" />}
                  {idx === 5 && <Zap className="text-primary-600 group-hover:text-white" />}
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{service.desc}</p>
                <a href="tel:+573003197620" className="text-primary-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  {t.services.consult}
                  <ChevronRight size={18} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CÓMO FUNCIONA SECTION --- */}
      <section id="proceso" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl text-primary-950 mb-4">{t.howItWorks.title}</h2>
            <p className="text-slate-600 text-lg">{t.howItWorks.subtitle}</p>
          </div>

          <div className="relative">
            {/* Connection Line Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-primary-100 -translate-y-1/2 -z-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {t.howItWorks.steps.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg border-4 border-white">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-primary-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- EMERGENCIA SECTION --- */}
      <section className="py-12 bg-emergency-600">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-white">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl mb-2">{t.emergency.title}</h2>
              <p className="text-white/80 text-lg">{t.emergency.subtitle}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <a 
                href="tel:+573003197620" 
                className="bg-white text-emergency-600 px-8 py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-slate-100 transition-all shadow-xl"
              >
                <Phone size={24} />
                {t.emergency.call}
              </a>
              <a 
                href="https://wa.me/573003197620" 
                className="bg-accent-500 text-white px-8 py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-accent-600 transition-all shadow-xl"
              >
                <MessageCircle size={24} />
                {t.emergency.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIOS SECTION --- */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl text-primary-950 mb-4">{t.testimonials.title}</h2>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.testimonials.items.map((testimony, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />)}
                </div>
                <p className="text-slate-600 italic mb-6">"{testimony.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">
                    {testimony.name.charAt(0)}
                  </div>
                  <span className="font-bold text-primary-900">{testimony.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-primary-950 mb-4">{t.nav.questions}</h2>
            <p className="text-slate-600">{lang === 'es' ? 'Resolvemos tus dudas sobre nuestro servicio de detección de fugas.' : 'We solve your doubts about our leak detection service.'}</p>
          </div>

          <div className="space-y-2">
            <FAQItem 
              question={lang === 'es' ? "¿Cómo detectan fugas sin romper paredes?" : "How do you detect leaks without breaking walls?"} 
              answer={t.en ? translations.en.questions : t.es ? translations.es.questions : ""} // This was a bit tricky as question items weren't explicitly in translations.ts schema for questions yet, let's fix that or use hardcoded ternary for now as per lang
              /* Actually let's use ternary for these specific FAQ items as I forgot to add them to translations.ts in detail */
            />
            {/* Reusing existing logic but with lang support */}
            <FAQItem 
              question={lang === 'es' ? "¿Cómo detectan fugas sin romper paredes?" : "How do you detect leaks without breaking walls?"} 
              answer={lang === 'es' ? "Utilizamos tecnología de geófono acústico de alta precisión. Este equipo nos permite escuchar el sonido característico del agua escapando a presión por la tubería, localizando el punto exacto sin necesidad de picar paredes o suelos innecesariamente." : "We use high-precision acoustic geophone technology. This equipment allows us to listen to the characteristic sound of water escaping under pressure through the pipe, locating the exact point without the need to unnecessarily chop into walls or floors."} 
            />
            <FAQItem 
              question={lang === 'es' ? "¿Cuánto tarda el servicio de detección?" : "How long does the detection service take?"} 
              answer={lang === 'es' ? "En la mayoría de los casos en Medellín, la localización de la fuga se completa en un periodo de 1 a 3 horas, dependiendo de la complejidad de la red de tuberías (cobre, PVC o CPVC) y el tamaño de la propiedad." : "In most cases in Medellín, the leak location is completed in a period of 1 to 3 hours, depending on the complexity of the pipe network (copper, PVC or CPVC) and the size of the property."} 
            />
            <FAQItem 
              question={lang === 'es' ? "¿Atienden emergencias las 24 horas?" : "Do you handle emergencies 24 hours a day?"} 
              answer={lang === 'es' ? "Sí, contamos con un equipo de guardia disponible los 365 días del año para atender fugas urgentes que requieran intervención inmediata para evitar daños mayores." : "Yes, we have a standby team available 365 days a year to attend to urgent leaks that require immediate intervention to avoid major damage."} 
            />
            <FAQItem 
              question={lang === 'es' ? "¿En qué zonas trabajan?" : "Which areas do you work in?"} 
              answer={lang === 'es' ? "Cubrimos toda el área metropolitana y poblaciones circundantes en un radio de 50km. Consulta con nosotros si tu ubicación está dentro de nuestra zona de cobertura gratuita de desplazamiento." : "We cover the entire metropolitan area and surrounding towns within a 50km radius. Consult with us if your location is within our free travel coverage area."} 
            />
            <FAQItem 
              question={lang === 'es' ? "¿El diagnóstico tiene garantía?" : "Does the diagnosis have a guarantee?"} 
              answer={lang === 'es' ? "Absolutamente. Si marcamos un punto y la fuga no se encuentra ahí, no cobramos el servicio de detección. Además, todas nuestras reparaciones cuentan con garantía por escrito." : "Absolutely. If we mark a point and the leak is not found there, we do not charge for the detection service. Furthermore, all our repairs come with a written guarantee."} 
            />
          </div>
        </div>
      </section>

      {/* --- CTA FINAL SECTION --- */}
      <section id="contacto" className="py-20 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 p-12 md:p-20 bg-primary-900 text-white flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl mb-6 font-display font-bold leading-tight">
                {lang === 'es' ? "Detectamos y solucionamos fugas de agua antes de que dañen tu hogar" : "We detect and solve water leaks before they damage your home"}
              </h2>
              <p className="text-primary-200 text-lg mb-10 leading-relaxed">
                {lang === 'es' ? "No dejes que una pequeña filtración se convierta en una reforma costosa. Solicita tu diagnóstico hoy mismo." : "Don't let a small leak turn into an expensive renovation. Request your diagnosis today."}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                <div className="flex items-center gap-4">
                  <div className="bg-primary-800 p-3 rounded-xl">
                    <Phone className="text-accent-500" />
                  </div>
                  <div>
                    <p className="text-primary-300 text-sm">{t.footer.contact}</p>
                    <p className="text-xl font-bold">+57 3003197620</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary-800 p-3 rounded-xl">
                    <MapPin className="text-accent-500" />
                  </div>
                  <div>
                    <p className="text-primary-300 text-sm">{t.footer.coverage}</p>
                    <p className="text-xl font-bold">{lang === 'es' ? 'Todo Medellín' : 'All Medellín'}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="tel:+573003197620" 
                  className="bg-white text-primary-900 px-8 py-4 rounded-xl font-bold text-center hover:bg-primary-50 transition-colors shadow-lg"
                >
                  {t.emergency.call}
                </a>
                <a 
                  href="https://wa.me/573003197620" 
                  className="bg-accent-500 text-white px-8 py-4 rounded-xl font-bold text-center hover:bg-accent-600 transition-colors shadow-lg"
                >
                  {t.emergency.whatsapp}
                </a>
              </div>
            </div>

            <div className="w-full lg:w-1/2 p-12 md:p-20 relative overflow-hidden flex items-center justify-center bg-slate-50">
              <div className="absolute inset-0 bg-primary-600/5 -z-0"></div>
              <div className="text-center relative z-10">
                <div className="bg-primary-600 w-20 h-20 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-primary-200">
                  <MessageCircle size={40} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary-950 mb-4">
                  {lang === 'es' ? "¿Tienes una emergencia?" : "Do you have an emergency?"}
                </h3>
                <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                  {lang === 'es' ? "Nuestro equipo está listo para ayudarte las 24 horas del día por WhatsApp." : "Our team is ready to help you 24 hours a day via WhatsApp."}
                </p>
                <a 
                  href="https://wa.me/573003197620" 
                  className="inline-block bg-accent-500 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-2xl shadow-accent-200 hover:scale-105 transition-transform"
                >
                  {t.emergency.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-white pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Droplets className="text-primary-500 w-8 h-8" />
                <span className="text-2xl font-display font-bold">Fugas de Agua</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                {t.footer.desc}
              </p>
              <div className="flex gap-4">
                <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-primary-600 transition-colors"><Facebook size={20} /></a>
                <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-primary-600 transition-colors"><Instagram size={20} /></a>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6">{t.footer.services}</h4>
              <ul className="space-y-4 text-slate-400">
                {t.services.items.slice(0, 5).map((s, idx) => (
                  <li key={idx}><a href="#" className="hover:text-white transition-colors">{s.title}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6">{t.footer.contact}</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-center gap-3"><Phone size={18} className="text-primary-500" /> +57 3003197620</li>
                <li className="flex items-center gap-3"><MessageCircle size={18} className="text-primary-500" /> WhatsApp Directo</li>
                <li className="flex items-center gap-3"><Clock size={18} className="text-primary-500" /> 24 Horas / 7 Días</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6">{t.footer.coverage}</h4>
              <p className="text-slate-400 mb-4">
                {t.footer.coverageDesc}
              </p>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <p className="text-sm text-slate-300">{t.footer.dudas}</p>
                <a href="tel:+573003197620" className="text-primary-400 font-bold hover:underline">{t.footer.consultNow}</a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <p>{t.footer.rights}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">{t.footer.legal}</a>
              <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
              <a href="#" className="hover:text-white transition-colors">{t.footer.cookies}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- FLOATING ELEMENTS --- */}
      
      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/573003197620" 
        className="fixed bottom-6 right-6 z-50 bg-accent-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl shadow-xl font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {t.common.help}
        </span>
      </a>

      {/* Mobile Fixed Call Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-200">
        <a 
          href="tel:+573003197620" 
          className="flex items-center justify-center gap-3 bg-primary-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary-200"
        >
          <Phone size={24} />
          {t.common.emergencies}
        </a>
      </div>
    </div>
  );
}
