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
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Cómo Funciona', href: '#proceso' },
    { name: 'Preguntas', href: '#faq' },
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
          <a 
            href="tel:+1234567890" 
            className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-200"
          >
            <Phone size={18} />
            Llamar Ahora
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
              <a 
                href="tel:+1234567890" 
                className="flex items-center justify-center gap-2 bg-primary-600 text-white py-4 rounded-xl font-bold"
              >
                <Phone size={20} />
                Llamar Ahora
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
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

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
                Atención Inmediata 24/7
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-primary-950 leading-tight mb-6">
                ¿Tienes una fuga de agua y no sabes de dónde viene?
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Detectamos y localizamos fugas ocultas con tecnología electrónica avanzada. 
                <span className="font-bold text-primary-700"> Sin romper paredes innecesariamente.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <a 
                  href="#contacto" 
                  className="w-full sm:w-auto bg-primary-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary-200 hover:bg-primary-700 transition-all flex items-center justify-center gap-2"
                >
                  Solicitar diagnóstico ahora
                  <ArrowRight size={20} />
                </a>
                <a 
                  href="https://wa.me/1234567890" 
                  className="w-full sm:w-auto bg-accent-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-accent-100 hover:bg-accent-600 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  WhatsApp Inmediato
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-accent-500" size={20} />
                  <span className="font-medium">+10 años de experiencia</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-accent-500" size={20} />
                  <span className="font-medium">+5,000 clientes satisfechos</span>
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
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000" 
                  alt="Detección de fugas profesional" 
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
                    <p className="text-slate-500 text-sm font-medium">Servicio</p>
                    <p className="text-primary-900 font-bold text-lg">100% Garantizado</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- PROBLEMA SECTION --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl text-primary-950 mb-4">¿Notas señales de una fuga oculta?</h2>
            <p className="text-slate-600 text-lg">No ignores los síntomas. Una fuga pequeña hoy puede ser un desastre estructural mañana.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Waves className="text-primary-500" />, title: "Humedad en paredes", desc: "Manchas oscuras, moho o pintura descascarada sin causa aparente." },
              { icon: <AlertTriangle className="text-emergency-500" />, title: "Facturas altas", desc: "Aumentos inexplicables en tu recibo de agua mes tras mes." },
              { icon: <Droplets className="text-primary-500" />, title: "Goteos invisibles", desc: "Sonido de agua corriendo cuando todos los grifos están cerrados." },
              { icon: <ShieldCheck className="text-emergency-500" />, title: "Daños estructurales", desc: "Grietas en suelos o cimientos causadas por erosión de agua." },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-100 transition-all"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
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
              <h2 className="text-3xl md:text-5xl mb-6 leading-tight">La solución definitiva sin obras innecesarias</h2>
              <p className="text-primary-200 text-lg mb-10 leading-relaxed">
                Utilizamos equipos de última generación para localizar el punto exacto de la fuga. Ahorra tiempo, dinero y evita el caos de romper toda tu casa.
              </p>

              <div className="space-y-6">
                {[
                  { title: "Detección electrónica", desc: "Geófonos y cámaras térmicas de alta precisión." },
                  { title: "Reparación puntual", desc: "Solo intervenimos donde es estrictamente necesario." },
                  { title: "Técnicos certificados", desc: "Personal experto con años de entrenamiento especializado." },
                ].map((benefit, idx) => (
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
                src="https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=600" 
                alt="Equipo técnico" 
                className="rounded-2xl shadow-2xl w-full h-64 object-cover mt-8"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600" 
                alt="Reparación profesional" 
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
            <h2 className="text-3xl md:text-4xl text-primary-950 mb-4">Nuestros Servicios Especializados</h2>
            <p className="text-slate-600 text-lg">Cubrimos todas las necesidades de detección y reparación de fugas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Search className="text-primary-600" />, title: "Fugas Ocultas", desc: "Localización exacta en tuberías internas de agua fría y caliente." },
              { icon: <Hammer className="text-primary-600" />, title: "Reparación de Tuberías", desc: "Sustitución y arreglo de tramos dañados con materiales de alta calidad." },
              { icon: <Waves className="text-primary-600" />, title: "Fugas en Piscinas", desc: "Detección en vasos, skimmers y sistemas de filtración sin vaciar." },
              { icon: <Home className="text-primary-600" />, title: "Baños y Cocinas", desc: "Inspección técnica en zonas de alta humedad y desagües." },
              { icon: <Droplets className="text-primary-600" />, title: "Fugas en Jardines", desc: "Localización en sistemas de riego y acometidas exteriores." },
              { icon: <Zap className="text-primary-600" />, title: "Inspección Electrónica", desc: "Diagnóstico completo con cámaras y sensores acústicos." },
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                <div className="bg-primary-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{service.desc}</p>
                <a href="#contacto" className="text-primary-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  Consultar servicio
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
            <h2 className="text-3xl md:text-4xl text-primary-950 mb-4">Tu solución en 4 simples pasos</h2>
            <p className="text-slate-600 text-lg">Un proceso transparente y eficiente diseñado para tu tranquilidad.</p>
          </div>

          <div className="relative">
            {/* Connection Line Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-primary-100 -translate-y-1/2 -z-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { step: "01", title: "Contacto inmediato", desc: "Llámanos o escríbenos. Atendemos tu emergencia al instante." },
                { step: "02", title: "Diagnóstico profesional", desc: "Llegamos a tu hogar con equipos electrónicos de detección." },
                { step: "03", title: "Reparación especializada", desc: "Solucionamos la fuga de forma limpia y eficiente." },
                { step: "04", title: "Solución garantizada", desc: "Verificamos el éxito y entregamos garantía por escrito." },
              ].map((item, idx) => (
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
              <h2 className="text-3xl md:text-4xl mb-2">¿Fuga urgente? No esperes más</h2>
              <p className="text-white/80 text-lg">Atención prioritaria para emergencias las 24 horas.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <a 
                href="tel:+1234567890" 
                className="bg-white text-emergency-600 px-8 py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-slate-100 transition-all shadow-xl"
              >
                <Phone size={24} />
                Llamar ahora
              </a>
              <a 
                href="https://wa.me/1234567890" 
                className="bg-accent-500 text-white px-8 py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-accent-600 transition-all shadow-xl"
              >
                <MessageCircle size={24} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIOS SECTION --- */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl text-primary-950 mb-4">Lo que dicen nuestros clientes</h2>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Carlos Mendoza", text: "Tenía una humedad en el salón que nadie encontraba. Vinieron con sus equipos y en 20 minutos localizaron la fuga exacta tras un mueble. Increíble.", rating: 5 },
              { name: "Elena Rodríguez", text: "Excelente servicio. Muy limpios y profesionales. Me ahorraron tener que levantar todo el suelo de la cocina. Totalmente recomendados.", rating: 5 },
              { name: "Juan Pérez", text: "Atención rápida un domingo por la noche. Solucionaron una fuga en el jardín que estaba disparando mi factura de agua. Muy agradecido.", rating: 5 },
            ].map((testimony, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimony.rating)].map((_, i) => <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />)}
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
            <h2 className="text-3xl md:text-4xl text-primary-950 mb-4">Preguntas Frecuentes</h2>
            <p className="text-slate-600">Resolvemos tus dudas sobre nuestro servicio de detección de fugas.</p>
          </div>

          <div className="space-y-2">
            <FAQItem 
              question="¿Cómo detectan fugas sin romper paredes?" 
              answer="Utilizamos tecnología avanzada que incluye geófonos (escucha acústica), cámaras termográficas para detectar cambios de temperatura y gas trazador en casos complejos. Esto nos permite marcar el punto exacto de la fuga con un margen de error mínimo." 
            />
            <FAQItem 
              question="¿Cuánto tarda el servicio de detección?" 
              answer="En la mayoría de los casos residenciales, la localización de la fuga se completa en un periodo de 1 a 3 horas, dependiendo de la complejidad de la red de tuberías y el tamaño de la propiedad." 
            />
            <FAQItem 
              question="¿Atienden emergencias las 24 horas?" 
              answer="Sí, contamos con un equipo de guardia disponible los 365 días del año para atender fugas urgentes que requieran intervención inmediata para evitar daños mayores." 
            />
            <FAQItem 
              question="¿En qué zonas trabajan?" 
              answer="Cubrimos toda el área metropolitana y poblaciones circundantes en un radio de 50km. Consulta con nosotros si tu ubicación está dentro de nuestra zona de cobertura gratuita de desplazamiento." 
            />
            <FAQItem 
              question="¿El diagnóstico tiene garantía?" 
              answer="Absolutamente. Si marcamos un punto y la fuga no se encuentra ahí, no cobramos el servicio de detección. Además, todas nuestras reparaciones cuentan con garantía por escrito." 
            />
          </div>
        </div>
      </section>

      {/* --- CTA FINAL SECTION --- */}
      <section id="contacto" className="py-20 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 md:p-20 bg-primary-900 text-white">
              <h2 className="text-3xl md:text-5xl mb-6">Detectamos y solucionamos fugas antes de que dañen tu hogar</h2>
              <p className="text-primary-200 text-lg mb-10">
                No dejes que una pequeña filtración se convierta en una reforma costosa. Solicita tu diagnóstico hoy mismo.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary-800 p-3 rounded-xl">
                    <Phone className="text-accent-500" />
                  </div>
                  <div>
                    <p className="text-primary-300 text-sm">Llámanos</p>
                    <p className="text-xl font-bold">+57 3003197620</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary-800 p-3 rounded-xl">
                    <Mail className="text-accent-500" />
                  </div>
                  <div>
                    <p className="text-primary-300 text-sm">Email</p>
                    <p className="text-xl font-bold">contacto@fugasdeagua.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary-800 p-3 rounded-xl">
                    <MapPin className="text-accent-500" />
                  </div>
                  <div>
                    <p className="text-primary-300 text-sm">Cobertura</p>
                    <p className="text-xl font-bold">Toda el área metropolitana</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 p-12 md:p-20">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 font-bold mb-2">Nombre completo</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all" placeholder="Ej. Juan Pérez" />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-2">Teléfono</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all" placeholder="Ej. 123456789" />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-2">Tipo de problema</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white">
                    <option>Fuga en pared/suelo</option>
                    <option>Factura de agua alta</option>
                    <option>Fuga en piscina</option>
                    <option>Otro problema</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-2">Mensaje (opcional)</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all" placeholder="Cuéntanos brevemente qué sucede..."></textarea>
                </div>
                <button type="submit" className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary-100 hover:bg-primary-700 transition-all">
                  Enviar solicitud de diagnóstico
                </button>
              </form>
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
                Expertos en localización y reparación de fugas de agua con tecnología no invasiva. Servicio profesional, rápido y garantizado.
              </p>
              <div className="flex gap-4">
                <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-primary-600 transition-colors"><Facebook size={20} /></a>
                <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-primary-600 transition-colors"><Instagram size={20} /></a>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6">Servicios</h4>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Detección de fugas ocultas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Reparación de tuberías</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fugas en piscinas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Inspección con cámaras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fugas en jardines</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6">Contacto</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-center gap-3"><Phone size={18} className="text-primary-500" /> +123 456 7890</li>
                <li className="flex items-center gap-3"><MessageCircle size={18} className="text-primary-500" /> WhatsApp Directo</li>
                <li className="flex items-center gap-3"><Mail size={18} className="text-primary-500" /> contacto@fugasdeagua.com</li>
                <li className="flex items-center gap-3"><Clock size={18} className="text-primary-500" /> 24 Horas / 7 Días</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6">Zona de Cobertura</h4>
              <p className="text-slate-400 mb-4">
                Atendemos en toda el área metropolitana y poblaciones cercanas.
              </p>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <p className="text-sm text-slate-300">¿Dudas sobre tu zona?</p>
                <a href="tel:+1234567890" className="text-primary-400 font-bold hover:underline">Consultar ahora</a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <p>© 2026 Fugas de Agua. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Aviso Legal</a>
              <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- FLOATING ELEMENTS --- */}
      
      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/1234567890" 
        className="fixed bottom-6 right-6 z-50 bg-accent-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl shadow-xl font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          ¿Necesitas ayuda? Chatea con nosotros
        </span>
      </a>

      {/* Mobile Fixed Call Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-200">
        <a 
          href="tel:+1234567890" 
          className="flex items-center justify-center gap-3 bg-primary-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary-200"
        >
          <Phone size={24} />
          Llamar ahora (Emergencias)
        </a>
      </div>
    </div>
  );
}
