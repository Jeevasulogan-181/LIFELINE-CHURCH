"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

const galleryItems = [
  {
    src: "/images/gallery-worship.jpg",
    alt: "Worship service with congregation praising together",
    label: "Sunday Worship",
  },
  {
    src: "/images/gallery-prayer.jpg",
    alt: "Church members gathered in a prayer circle",
    label: "Prayer Meeting",
  },
  {
    src: "/images/gallery-youth.jpg",
    alt: "Youth group having a Bible study discussion",
    label: "Youth Gathering",
  },
  {
    src: "/images/gallery-fellowship.jpg",
    alt: "Community fellowship meal with church members",
    label: "Fellowship",
  },
  {
    src: "/images/gallery-mothers.jpg",
    alt: "Mothers prayer group meeting together",
    label: "Mothers' Prayer",
  },
  {
    src: "/images/gallery-event.jpg",
    alt: "Church community event with families",
    label: "Church Events",
  },
]

export function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <>
      <section id="gallery" className="relative py-24 lg:py-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Gallery
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
                Moments of Grace
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Glimpses of our community in worship, prayer, and fellowship.
              </p>
            </div>
          </AnimatedSection>

          {/* Grid layout: 3 columns, first image is large spanning 2 cols and 2 rows */}
          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item, i) => (
              <AnimatedSection key={item.label} delay={i * 100}>
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className={`group relative w-full overflow-hidden rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${
                    i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                  }`}
                  aria-label={`View ${item.label} photo`}
                >
                  <div className={`relative w-full bg-muted ${i === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm font-medium text-white">{item.label}</p>
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setLightbox(null)
            if (e.key === "ArrowRight") setLightbox((lightbox + 1) % galleryItems.length)
            if (e.key === "ArrowLeft") setLightbox((lightbox - 1 + galleryItems.length) % galleryItems.length)
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery image: ${galleryItems[lightbox].label}`}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Nav arrows */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setLightbox((lightbox - 1 + galleryItems.length) % galleryItems.length)
            }}
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors text-2xl"
            aria-label="Previous image"
          >
            {'<'}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setLightbox((lightbox + 1) % galleryItems.length)
            }}
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors text-2xl"
            aria-label="Next image"
          >
            {'>'}
          </button>

          <div className="relative max-h-[85vh] max-w-5xl w-full aspect-[16/10]" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={galleryItems[lightbox].src}
              alt={galleryItems[lightbox].alt}
              className="absolute inset-0 h-full w-full object-contain rounded-lg"
            />
          </div>

          {/* Caption */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="text-sm font-medium text-white/90">
              {galleryItems[lightbox].label}
            </p>
            <p className="text-xs text-white/50 mt-1">
              {lightbox + 1} / {galleryItems.length}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
