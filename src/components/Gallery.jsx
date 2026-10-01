import React, { useState, useEffect } from 'react';
import { Reveal } from './Reveal';
import { siteData } from '../data/siteData';

export const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const galleryItems = siteData.gallery || [
    {
      id: '1',
      title: 'Cámara de Maduración',
      category: 'Procesos',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: '2',
      title: 'Mesa del Chef',
      category: 'Experiencia',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: '3',
      title: 'Fuego & Brasas',
      category: 'Cocina',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: '4',
      title: 'Ingredientes de Origen',
      category: 'Insumos',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: '5',
      title: 'Coctelería de Autor',
      category: 'Bar',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: '6',
      title: 'Plato Terminado',
      category: 'Cocina',
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: '7',
      title: 'Cava de Vinos',
      category: 'Experiencia',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: '8',
      title: 'Detalles del Salón',
      category: 'Ambiente',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1200',
    },
  ];

  const selectedImage = selectedIndex !== null ? galleryItems[selectedIndex] : null;

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKey = (e) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') setSelectedIndex((i) => (i + 1) % galleryItems.length);
      if (e.key === 'ArrowLeft') setSelectedIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedIndex, galleryItems.length]);

  return (
    <section id="gallery" className="relative px-6 py-24 text-slate-100 sm:px-12">
      <div className="pointer-events-none absolute left-0 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-amber-500/5 blur-[140px]" />

      <Reveal className="mx-auto max-w-7xl space-y-12">
        {/* Encabezado */}
        <div className="flex flex-col justify-between gap-6 border-b border-amber-900/20 pb-8 sm:flex-row sm:items-end">
          <div>
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-amber-500">
              Registro Visual
            </span>
            <h2 className="mt-2 font-serif text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
              Dentro de InGen.
            </h2>
          </div>

          <a
            href={`https://instagram.com/${siteData.info.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400 transition-colors hover:text-amber-500 sm:self-auto"
          >
            {siteData.info.instagram}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {galleryItems.map((item, index) => {
            const isFeatured = index === 0;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`
                  group relative overflow-hidden rounded-2xl border border-amber-900/20 
                  bg-slate-900/40 transition-all duration-500 
                  hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500
                  ${isFeatured ? 'col-span-2 row-span-2 lg:col-span-2 lg:row-span-2' : 'aspect-[4/5]'}
                `}
                aria-label={`Abrir imagen: ${item.title}`}
              >
                <div className="relative h-full w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-[#0a0f0d]/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
                </div>

                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-5 text-left sm:p-6">
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-amber-400">
                    {item.category}
                  </span>
                  <h3 className="mt-1 font-serif text-base font-medium leading-snug text-slate-100 transition-colors group-hover:text-amber-200 sm:text-lg">
                    {item.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-md"
          onClick={() => setSelectedIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
        >
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-amber-900/40 bg-amber-500/10 text-slate-100 transition-all hover:bg-amber-500 hover:text-slate-950"
            aria-label="Cerrar"
          >
            ✕
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((selectedIndex - 1 + galleryItems.length) % galleryItems.length);
            }}
            className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-amber-900/40 bg-amber-500/10 text-2xl text-slate-100 transition-all hover:bg-amber-500 hover:text-slate-950 md:left-10"
            aria-label="Anterior"
          >
            ‹
          </button>

          <div className="relative max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-h-[85vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-amber-500">
                  {selectedImage.category}
                </p>
                <p className="mt-1 font-serif text-lg text-slate-100">
                  {selectedImage.title}
                </p>
              </div>
              <p className="font-mono text-xs text-slate-500">
                {selectedIndex + 1} / {galleryItems.length}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((selectedIndex + 1) % galleryItems.length);
            }}
            className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-amber-900/40 bg-amber-500/10 text-2xl text-slate-100 transition-all hover:bg-amber-500 hover:text-slate-950 md:right-10"
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};