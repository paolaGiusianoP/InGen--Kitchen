import React, { useState, useEffect } from 'react';
import { Reveal } from './Reveal';
import { siteData } from '../data/siteData';

export const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2',
    date: '',
    time: '20:30',
    sector: siteData.sectors?.[0]?.name || '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) return;
    const t = setTimeout(() => setSubmitted(false), 10000);
    return () => clearTimeout(t);
  }, [submitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = [
      '*NUEVA SOLICITUD DE RESERVA - INGEN KITCHEN*',
      '',
      `• *Nombre:* ${formData.name}`,
      `• *Teléfono:* ${formData.phone}`,
      `• *Comensales:* ${formData.guests} personas`,
      `• *Fecha:* ${formData.date}`,
      `• *Hora:* ${formData.time} hs`,
      formData.sector ? `• *Ambiente:* ${formData.sector}` : null,
      formData.notes ? `• *Notas:* ${formData.notes}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappUrl = `https://wa.me/${siteData.info.whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="reservation" className="relative bg-[#0a0f0d] px-6 py-24 text-slate-100 sm:px-12">
      {/* Luz ambiental */}
      <div className="pointer-events-none absolute right-0 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-amber-500/5 blur-[140px]" />

      <Reveal className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">

          {/* Columna Izquierda: Info */}
          <div className="space-y-6 lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-amber-500/60" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-amber-500">
                Disponibilidad Exclusiva
              </span>
            </div>

            <h2 className="font-serif text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
              Reservá tu lugar junto al fuego.
            </h2>

            <p className="font-sans text-sm leading-relaxed text-slate-400">
              Diseñamos turnos reducidos para asegurar la máxima precisión en cada servicio. Confirmá tus comensales e indicaciones especiales con anticipación.
            </p>

            <div className="space-y-4 border-t border-amber-900/20 pt-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-900/30 bg-amber-500/10 text-amber-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-base font-medium text-slate-200">Turnos de Degustación</h4>
                  <p className="font-sans text-xs text-slate-400">Mediodía: 12:30 a 15:30 · Noche: 20:00 a 00:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-900/30 bg-amber-500/10 text-amber-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-base font-medium text-slate-200">Ubicación</h4>
                  <p className="font-sans text-xs text-slate-400">{siteData.info.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-amber-900/30 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-md sm:p-10">
              {submitted ? (
                <div className="space-y-4 py-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/20 text-amber-400">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-100">Solicitud Enviada</h3>
                  <p className="mx-auto max-w-sm font-sans text-xs text-slate-400">
                    Te redirigimos a WhatsApp para coordinar la confirmación con el equipo de recepción.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 font-mono text-xs uppercase tracking-widest text-amber-500 hover:underline"
                  >
                    Hacer otra reserva
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Fila 1: Nombre + Teléfono */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ej. Pedro Perez"
                        className="w-full rounded-xl border border-amber-900/30 bg-slate-950/80 px-4 py-3 font-sans text-sm text-slate-100 placeholder-slate-600 transition-colors focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+598 99 000 000"
                        className="w-full rounded-xl border border-amber-900/30 bg-slate-950/80 px-4 py-3 font-sans text-sm text-slate-100 placeholder-slate-600 transition-colors focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Fila 2: Comensales + Fecha + Hora */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div>
                      <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                        Comensales
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-amber-900/30 bg-slate-950/80 px-4 py-3 font-sans text-sm text-slate-100 transition-colors focus:border-amber-500 focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? 'Persona' : 'Personas'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                        Fecha *
                      </label>
                      <input
                        type="date"
                        name="date"
                        required
                        min={today}
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-amber-900/30 bg-slate-950/80 px-4 py-3 font-sans text-sm text-slate-100 transition-colors focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                        Horario
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-amber-900/30 bg-slate-950/80 px-4 py-3 font-sans text-sm text-slate-100 transition-colors focus:border-amber-500 focus:outline-none"
                      >
                        <option value="12:30">12:30 hs</option>
                        <option value="13:30">13:30 hs</option>
                        <option value="20:30">20:30 hs</option>
                        <option value="21:30">21:30 hs</option>
                        <option value="22:30">22:30 hs</option>
                      </select>
                    </div>
                  </div>

                  {/* Fila 3: Sector */}
                  {siteData.sectors && siteData.sectors.length > 0 && (
                    <div>
                      <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                        Ambiente Preferido
                      </label>
                      <select
                        name="sector"
                        value={formData.sector}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-amber-900/30 bg-slate-950/80 px-4 py-3 font-sans text-sm text-slate-100 transition-colors focus:border-amber-500 focus:outline-none"
                      >
                        {siteData.sectors.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Fila 4: Notas */}
                  <div>
                    <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      Alergias o Solicitudes Especiales
                    </label>
                    <textarea
                      name="notes"
                      rows="3"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Indicanos si tenés restricciones alimentarias o es una ocasión especial..."
                      className="w-full resize-none rounded-xl border border-amber-900/30 bg-slate-950/80 px-4 py-3 font-sans text-sm text-slate-100 placeholder-slate-600 transition-colors focus:border-amber-500 focus:outline-none"
                    ></textarea>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full rounded-full bg-amber-500 py-4 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-slate-950 shadow-lg shadow-amber-500/10 transition-all hover:bg-amber-400 hover:shadow-amber-500/20"
                  >
                    Confirmar Reserva vía WhatsApp
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </Reveal>
    </section>
  );
};