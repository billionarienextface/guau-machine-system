'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-[#0A0A0A]/80 backdrop-blur border-b border-[#FF6B00]/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-[#FF0000]">GUAU</div>
          <div className="flex gap-6 text-sm">
            <Link href="/machine" className="hover:text-[#FF6B00] transition">MÁQUINA</Link>
            <Link href="/leads" className="hover:text-[#FF6B00] transition">LEADS</Link>
            <Link href="/clients" className="hover:text-[#FF6B00] transition">CLIENTES</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/miami_brickell_bokeh.webp"
            alt="Miami Brickell"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0A0A0A]/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-3xl px-6">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/assets/guao_logo_transparent.png"
              alt="GUAU"
              width={300}
              height={300}
              className="drop-shadow-2xl"
            />
          </div>

          {/* Title */}
          <h1 className="font-black text-6xl md:text-7xl uppercase mb-4 tracking-widest">
            <span className="text-white">LABORATORIO DE</span>
            <br />
            <span className="text-[#FF6B00]">ESTRATEGIAS</span>
            <span className="text-white"> DE VISIÓN</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-[#CCCCCC] mb-8 font-light">
            De invisible a inevitable — Miami
          </p>

          {/* Tagline */}
          <p className="text-base text-[#999999] mb-12 max-w-2xl mx-auto leading-relaxed">
            Sistema operativo interno SaaS para que tu agencia de 3 personas opere en automático.
            Extrae, audita, contacta, cierra. Sin equipo grande.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/machine"
              className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-[#0A0A0A] font-black px-8 py-4 rounded text-lg uppercase tracking-widest transition transform hover:scale-105"
            >
              ENTRAR A LA MÁQUINA
            </Link>
            <Link
              href="/leads"
              className="border-2 border-white hover:border-[#FF6B00] text-white hover:text-[#FF6B00] font-black px-8 py-4 rounded text-lg uppercase tracking-widest transition"
            >
              VER LEADS
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
