import React from 'react';
import { Reveal } from './Reveal';
import { siteData } from '../data/siteData';

export const Contact = () => {
  const { address, hours = [], phone, instagram, whatsappNumber } = siteData.info;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hola! Quisiera consultar disponibilidad en InGen Kitchen.'
  )}`;

 const mapEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52339.50908875064!2d-56.195884792687025!3d-34.92603617322278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f819e0be26dff%3A0x5721a12a2943bc00!2sPunta%20Carretas%2C%2011300%20Montevideo%2C%20Departamento%20de%20Montevideo!5e0!3m2!1ses!2suy!4v1790811739106!5m2!1ses!2suy';

  return (
    <section
      id="contact"
      className="relative bg-[#0a0f0d] px-6 py-24 text-slate-100 sm:px-12"
    >
      <div className="pointer-events-none absolute right-0 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-amber-500/5 blur-[140px]" />

      <Reveal className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="border-b border-amber-900/20 pb-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-amber-500/60" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-amber-500">
              Visitanos
            </span>
          </div>
          <h2 className="mt-3 font-serif text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
            Dónde encontrarnos
          </h2>
          <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-slate-400">
            Reservas por WhatsApp o llamada directa. Cupos limitados por turno.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Info */}
          <div className="space-y-10 lg:col-span-5">
            {/* Dirección */}
            {address && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-amber-500">
                  Dirección
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block font-serif text-2xl leading-tight text-slate-100 transition-colors hover:text-amber-500"
                >
                  {address}
                </a>
              </div>
            )}

            {/* Horarios */}
            {hours.length > 0 && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-amber-500">
                  Horarios
                </p>
                <ul className="mt-3 space-y-2.5">
                  {hours.map((h, index) => (
                    <li
                      key={h.days || index}
                      className="flex items-baseline justify-between gap-4 border-b border-amber-900/20 pb-2.5 text-sm"
                    >
                      <span className="text-slate-400">{h.days}</span>
                      <span className="font-mono text-slate-100">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contacto */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-amber-500">
                Contacto
              </p>
              <div className="mt-3 space-y-2">
                {phone && (
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="block font-sans text-sm text-slate-300 transition-colors hover:text-slate-100"
                  >
                    {phone}
                  </a>
                )}
                {instagram && (
                  <a
                    href={`https://instagram.com/${instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-sans text-sm text-slate-300 transition-colors hover:text-slate-100"
                  >
                    {instagram}
                  </a>
                )}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 pt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-amber-500 transition-colors hover:text-amber-400"
                >
                  Escribinos por WhatsApp
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="lg:col-span-7">
            <div className="relative h-[420px] min-h-[420px] overflow-hidden rounded-2xl border border-amber-900/20 lg:h-full">
              {mapEmbed ? (
                <>
                  <iframe
                    src={mapEmbed}
                    title={`Mapa de InGen Kitchen`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full"
                    style={{
                      border: 0,
                      filter: 'grayscale(0.75) brightness(0.55) contrast(1.1)',
                    }}
                    allowFullScreen
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-10"
                    style={{
                      background:
                        'radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.08) 0%, rgba(10,15,13,0.45) 100%)',
                      mixBlendMode: 'overlay',
                    }}
                  />
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-center">
                  <p className="max-w-xs font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
                    Configurá el embed de Google Maps<br />
                    en <code className="text-amber-500">Contact.jsx</code>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};