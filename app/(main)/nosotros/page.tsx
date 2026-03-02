"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stories = [
  {
    tag: "El origen",
    title: "Nació de una pregunta simple",
    text: "¿Qué pasaría si cada servicio profesional que contratas generara impacto social? Esa pregunta nos llevó a crear Social Vission — un marketplace donde talento y propósito se encuentran.",
    highlight: "1 idea, 1 marketplace, miles de vidas.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=1000&fit=crop",
  },
  {
    tag: "La misión",
    title: "Conectamos talento con propósito",
    text: "Reunimos a los mejores profesionales independientes con empresas y personas que buscan calidad. Cada transacción genera un impacto directo en comunidades que más lo necesitan.",
    highlight: "+45 profesionales comprometidos con el cambio.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=1000&fit=crop",
  },
  {
    tag: "El modelo",
    title: "El 10% que transforma",
    text: "De cada servicio contratado, el 10% se destina automáticamente a causas sociales verificadas. Sin pasos extra, sin complicaciones. Tu compra ya es un acto de cambio.",
    highlight: "10% de cada transacción va directo a causas.",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=1000&fit=crop",
  },
  {
    tag: "El impacto",
    title: "Transparencia total",
    text: "Cada peso donado es rastreable. Publicamos informes de impacto en tiempo real para que veas exactamente cómo tu inversión profesional transforma comunidades enteras.",
    highlight: "$12,450 donados y 100% rastreables.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=1000&fit=crop",
  },
];

const valuesData = [
  {
    title: "Impacto real",
    description:
      "No es marketing. Cada centavo donado llega a causas verificadas que transforman vidas reales. Medimos, reportamos y garantizamos que tu inversión genera cambio tangible.",
  },
  {
    title: "Comunidad",
    description:
      "Creemos en la fuerza colectiva. Profesionales y clientes unidos por un propósito mayor. Cada conexión fortalece una red que sostiene comunidades enteras.",
  },
  {
    title: "Transparencia",
    description:
      "Reportes abiertos, métricas públicas. Sabes exactamente a dónde va cada peso. Sin letra pequeña, sin intermediarios ocultos — solo verdad.",
  },
];

const stats = [
  { value: 12450, label: "Donados a causas", prefix: "$", format: "currency" },
  { value: 156, label: "Servicios completados", prefix: "", format: "number" },
  { value: 8, label: "Causas activas", prefix: "", format: "number" },
  {
    value: 45,
    label: "Profesionales comprometidos",
    prefix: "",
    format: "number",
  },
];

/* ------------------------------------------------------------------ */
/*  SVG Illustrations                                                  */
/* ------------------------------------------------------------------ */

function RippleSVG() {
  return (
    <svg className="svg-ripple w-full h-full" viewBox="0 0 400 400" fill="none">
      <circle
        cx="200"
        cy="200"
        r="40"
        stroke="#D4956B"
        strokeWidth="1.5"
        opacity="0.35"
      />
      <circle
        cx="200"
        cy="200"
        r="80"
        stroke="#D4956B"
        strokeWidth="1"
        opacity="0.2"
        strokeDasharray="6 6"
      />
      <circle
        cx="200"
        cy="200"
        r="120"
        stroke="#D4956B"
        strokeWidth="0.8"
        opacity="0.12"
      />
      <circle
        cx="200"
        cy="200"
        r="160"
        stroke="#A7C4A0"
        strokeWidth="0.5"
        opacity="0.08"
        strokeDasharray="10 10"
      />
      <path
        d="M200 178c0-12 10-22 22-22s22 10 22 22c0 24-44 44-44 44s-44-20-44-44c0-12 10-22 22-22s22 10 22 22z"
        fill="#D4956B"
        opacity="0.25"
      />
      <circle cx="200" cy="48" r="3" fill="#D4956B" opacity="0.2" />
      <circle cx="352" cy="200" r="2.5" fill="#A7C4A0" opacity="0.2" />
      <circle cx="200" cy="352" r="2" fill="#D4956B" opacity="0.15" />
      <circle cx="48" cy="200" r="3" fill="#A7C4A0" opacity="0.2" />
      <circle cx="310" cy="90" r="2" fill="#D4956B" opacity="0.12" />
      <circle cx="90" cy="310" r="2" fill="#A7C4A0" opacity="0.12" />
    </svg>
  );
}

function NetworkSVG() {
  return (
    <svg
      className="svg-network w-full h-full"
      viewBox="0 0 400 400"
      fill="none">
      {/* Connection lines */}
      <line
        x1="200"
        y1="100"
        x2="100"
        y2="240"
        stroke="#C5D1CA"
        strokeWidth="1"
        opacity="0.25"
      />
      <line
        x1="200"
        y1="100"
        x2="300"
        y2="240"
        stroke="#C5D1CA"
        strokeWidth="1"
        opacity="0.25"
      />
      <line
        x1="100"
        y1="240"
        x2="300"
        y2="240"
        stroke="#C5D1CA"
        strokeWidth="0.8"
        opacity="0.18"
      />
      <line
        x1="100"
        y1="240"
        x2="200"
        y2="340"
        stroke="#C5D1CA"
        strokeWidth="0.8"
        opacity="0.18"
      />
      <line
        x1="300"
        y1="240"
        x2="200"
        y2="340"
        stroke="#C5D1CA"
        strokeWidth="0.8"
        opacity="0.18"
      />
      <line
        x1="200"
        y1="100"
        x2="130"
        y2="150"
        stroke="#C5D1CA"
        strokeWidth="0.5"
        opacity="0.12"
      />
      <line
        x1="200"
        y1="100"
        x2="270"
        y2="150"
        stroke="#C5D1CA"
        strokeWidth="0.5"
        opacity="0.12"
      />
      <line
        x1="100"
        y1="240"
        x2="60"
        y2="310"
        stroke="#C5D1CA"
        strokeWidth="0.5"
        opacity="0.1"
      />
      <line
        x1="300"
        y1="240"
        x2="340"
        y2="310"
        stroke="#C5D1CA"
        strokeWidth="0.5"
        opacity="0.1"
      />
      {/* Main nodes */}
      <circle cx="200" cy="100" r="14" fill="#D4956B" opacity="0.3" />
      <circle cx="100" cy="240" r="11" fill="#7BA074" opacity="0.3" />
      <circle cx="300" cy="240" r="11" fill="#7BAAC4" opacity="0.3" />
      <circle cx="200" cy="340" r="9" fill="#D4956B" opacity="0.25" />
      {/* Secondary nodes */}
      <circle cx="130" cy="150" r="5" fill="#A7C4A0" opacity="0.2" />
      <circle cx="270" cy="150" r="5" fill="#B8D4E3" opacity="0.2" />
      <circle cx="340" cy="310" r="4" fill="#D4956B" opacity="0.15" />
      <circle cx="60" cy="310" r="4" fill="#7BA074" opacity="0.15" />
      {/* Center glow */}
      <circle cx="200" cy="210" r="30" fill="#D4956B" opacity="0.04" />
    </svg>
  );
}

function EyeSVG() {
  return (
    <svg className="svg-eye w-full h-full" viewBox="0 0 400 400" fill="none">
      {/* Outer eye */}
      <path
        d="M40 200 Q200 70 360 200 Q200 330 40 200Z"
        stroke="#D4956B"
        strokeWidth="1"
        opacity="0.2"
      />
      {/* Inner eye */}
      <path
        d="M100 200 Q200 130 300 200 Q200 270 100 200Z"
        stroke="#D4956B"
        strokeWidth="0.8"
        opacity="0.12"
      />
      {/* Iris */}
      <circle
        cx="200"
        cy="200"
        r="48"
        stroke="#D4956B"
        strokeWidth="1.5"
        opacity="0.3"
      />
      {/* Pupil */}
      <circle cx="200" cy="200" r="20" fill="#D4956B" opacity="0.18" />
      {/* Light */}
      <circle cx="214" cy="186" r="7" fill="#F7F5F2" opacity="0.25" />
      {/* Geometric accents */}
      <line
        x1="200"
        y1="70"
        x2="200"
        y2="120"
        stroke="#C5D1CA"
        strokeWidth="0.5"
        opacity="0.15"
      />
      <line
        x1="200"
        y1="280"
        x2="200"
        y2="330"
        stroke="#C5D1CA"
        strokeWidth="0.5"
        opacity="0.15"
      />
      <line
        x1="70"
        y1="200"
        x2="40"
        y2="200"
        stroke="#C5D1CA"
        strokeWidth="0.5"
        opacity="0.15"
      />
      <line
        x1="330"
        y1="200"
        x2="360"
        y2="200"
        stroke="#C5D1CA"
        strokeWidth="0.5"
        opacity="0.15"
      />
      {/* Corner dots */}
      <circle cx="80" cy="140" r="2" fill="#A7C4A0" opacity="0.15" />
      <circle cx="320" cy="140" r="2" fill="#A7C4A0" opacity="0.15" />
      <circle cx="80" cy="260" r="2" fill="#D4956B" opacity="0.12" />
      <circle cx="320" cy="260" r="2" fill="#D4956B" opacity="0.12" />
    </svg>
  );
}

const valueSVGs = [RippleSVG, NetworkSVG, EyeSVG];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function NosotrosPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const storySectionRef = useRef<HTMLDivElement>(null);
  const storyTextsRef = useRef<(HTMLDivElement | null)[]>([]);
  const storyImagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const storyDotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const storyCounterRef = useRef<HTMLSpanElement>(null);
  const valuesTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ============================================================ */
      /*  HERO                                                         */
      /* ============================================================ */

      gsap.from(".hero-word", {
        y: 120,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.3,
      });

      gsap.from(".hero-subtitle", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1,
      });

      gsap.from(".hero-scroll", {
        opacity: 0,
        duration: 1,
        delay: 1.5,
      });

      gsap.to(".scroll-line", {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power1.inOut",
      });

      gsap.to(".hero-bg", {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* ============================================================ */
      /*  BIG LETTERS                                                  */
      /* ============================================================ */

      gsap.from(".big-letter", {
        y: 200,
        opacity: 0,
        stagger: 0.04,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".big-text-section",
          start: "top 85%",
          end: "top 25%",
          scrub: 1,
        },
      });

      /* ============================================================ */
      /*  MANIFESTO — Pinned full-screen with animated patterns        */
      /* ============================================================ */

      const mTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".manifesto-section",
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 1.2,
        },
      });

      // Patterns fade in
      mTl.to(
        ".m-circle",
        {
          opacity: 0.08,
          stagger: 0.08,
          duration: 0.4,
        },
        0,
      );
      mTl.to(
        ".m-dot",
        {
          opacity: 0.18,
          stagger: 0.04,
          duration: 0.3,
        },
        0.1,
      );
      mTl.to(
        ".m-cross",
        {
          opacity: 0.1,
          rotation: 45,
          stagger: 0.08,
          duration: 0.3,
          transformOrigin: "center center",
        },
        0.15,
      );
      mTl.fromTo(
        ".m-hline",
        { scaleX: 0 },
        {
          scaleX: 1,
          opacity: 0.06,
          stagger: 0.1,
          duration: 0.4,
          transformOrigin: "left center",
        },
        0.2,
      );

      // Word-by-word reveal — main statement
      mTl.to(
        ".m-word",
        {
          opacity: 1,
          stagger: 0.1,
          duration: 0.08,
          ease: "none",
        },
        0.3,
      );

      // Divider draws from center
      mTl.fromTo(
        ".m-divider",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.25, transformOrigin: "center center" },
        1.3,
      );

      // Word-by-word reveal — body text
      mTl.to(
        ".m-body-word",
        {
          opacity: 1,
          stagger: 0.05,
          duration: 0.04,
          ease: "none",
        },
        1.4,
      );

      // Hold for reading
      mTl.to({}, { duration: 2.0 });

      /* ============================================================ */
      /*  STORY PARALLAX (pinned)                                      */
      /* ============================================================ */

      const storySection = storySectionRef.current;
      const texts = storyTextsRef.current.filter(Boolean) as HTMLDivElement[];
      const images = storyImagesRef.current.filter(Boolean) as HTMLDivElement[];
      const dots = storyDotsRef.current.filter(Boolean) as HTMLDivElement[];
      const counter = storyCounterRef.current;

      if (storySection && texts.length > 1 && images.length > 1) {
        texts.forEach((el, i) => {
          if (i > 0) gsap.set(el, { opacity: 0, y: 60 });
        });
        images.forEach((el, i) => {
          if (i > 0) gsap.set(el, { opacity: 0, scale: 1.1 });
        });
        dots.forEach((el, i) => {
          gsap.set(el, {
            width: i === 0 ? 32 : 6,
            backgroundColor: i === 0 ? "#D4956B" : "#C5D1CA",
          });
        });

        const scrollPerStory = 350;
        const totalScroll = stories.length * scrollPerStory;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: storySection,
            start: "top top",
            end: `+=${totalScroll}vh`,
            pin: true,
            scrub: 1.5,
          },
        });

        stories.forEach((_, i) => {
          if (i < stories.length - 1) {
            const label = `s${i}`;
            tl.to({}, { duration: 2.5 }, label);
            tl.to(
              texts[i],
              { opacity: 0, y: -60, duration: 0.5 },
              `${label}+=2.5`,
            )
              .to(
                images[i],
                { opacity: 0, scale: 1.12, duration: 0.6 },
                `${label}+=2.5`,
              )
              .to(
                dots[i],
                { width: 6, backgroundColor: "#C5D1CA", duration: 0.4 },
                `${label}+=2.5`,
              )
              .fromTo(
                texts[i + 1],
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 0.5 },
                `${label}+=2.9`,
              )
              .fromTo(
                images[i + 1],
                { opacity: 0, scale: 1.1 },
                { opacity: 1, scale: 1, duration: 0.6 },
                `${label}+=2.8`,
              )
              .to(
                dots[i + 1],
                { width: 32, backgroundColor: "#D4956B", duration: 0.4 },
                `${label}+=2.9`,
              );
            if (counter) {
              tl.call(
                () => {
                  counter.textContent = String(i + 2).padStart(2, "0");
                },
                [],
                `${label}+=3.0`,
              );
            }
          }
        });
        tl.to({}, { duration: 2.5 });
      }

      /* ============================================================ */
      /*  VALUES — Horizontal scroll                                   */
      /* ============================================================ */

      const track = valuesTrackRef.current;
      if (track) {
        const scrollDist = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: -scrollDist,
          ease: "none",
          scrollTrigger: {
            trigger: ".values-section",
            start: "top top",
            end: `+=${scrollDist}`,
            pin: true,
            scrub: 1,
          },
        });

        // Animate each value panel when it enters the viewport area
        gsap.utils.toArray<HTMLElement>(".value-panel").forEach((panel, i) => {
          gsap.from(panel.querySelectorAll(".vp-anim"), {
            y: 60,
            opacity: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: gsap.getById("hScroll") || undefined,
              start: "left 80%",
              toggleActions: "play none none none",
            },
          });

          // SVG subtle pulse
          const circles = panel.querySelectorAll("svg circle");
          if (circles.length) {
            gsap.to(circles, {
              scale: 1.04,
              stagger: { each: 0.2, repeat: -1, yoyo: true },
              duration: 2.5,
              ease: "sine.inOut",
              transformOrigin: "center center",
            });
          }
        });
      }

      /* ============================================================ */
      /*  STATS COUNTER                                                */
      /* ============================================================ */

      gsap.utils.toArray<HTMLElement>(".stat-number").forEach((el) => {
        const target = parseInt(el.dataset.value || "0", 10);
        const fmt = el.dataset.format;
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            if (fmt === "currency") {
              el.textContent =
                (obj.val / 1000).toFixed(obj.val >= 1000 ? 1 : 0) + "k";
            } else {
              el.textContent = Math.round(obj.val).toLocaleString("en-US");
            }
          },
        });
      });

      /* ============================================================ */
      /*  CTA                                                          */
      /* ============================================================ */

      ScrollTrigger.create({
        trigger: ".cta-section",
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.from(".cta-content", {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div ref={containerRef} className="-mt-16">
      {/* ===== HERO ===== */}
      <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
        <div className="hero-bg absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop&q=80"
            className="w-full h-full object-cover">
            <source src="/videos/nosotros-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-deep/70 via-deep/60 to-deep/90" />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="text-cloud font-bold text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-tight">
            {"Somos el cambio que elegimos".split(" ").map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden mr-[0.25em]">
                <span className="hero-word inline-block">{word}</span>
              </span>
            ))}
          </h1>
          <p className="hero-subtitle text-cloud/60 text-xl md:text-2xl mt-8 max-w-2xl mx-auto leading-relaxed">
            Un marketplace donde cada transacción genera impacto social real y
            medible.
          </p>
        </div>

        <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-cloud/40 text-xs uppercase tracking-[0.2em] font-medium">
            Scroll
          </span>
          <div className="scroll-line w-px h-12 bg-gradient-to-b from-cloud/40 to-transparent" />
        </div>
      </section>

      {/* ===== BIG LETTERS ===== */}
      <section className="big-text-section bg-mist py-28 md:py-40 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          <p className="text-deep font-bold text-[clamp(4rem,14vw,13rem)] leading-[0.85] tracking-[-0.04em]">
            {"IMPACTO".split("").map((char, i) => (
              <span key={i} className="big-letter inline-block">
                {char}
              </span>
            ))}
          </p>
          <p className="text-warmth font-bold text-[clamp(4rem,14vw,13rem)] leading-[0.85] tracking-[-0.04em]">
            {"SOCIAL".split("").map((char, i) => (
              <span key={`s${i}`} className="big-letter inline-block">
                {char}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ===== MANIFESTO — Full screen pinned with animated SVG patterns ===== */}
      <section className="manifesto-section relative bg-deep overflow-hidden">
        <div className="h-screen flex items-center justify-center relative">
          {/* Animated SVG patterns */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1440 900"
              fill="none"
              preserveAspectRatio="xMidYMid slice">
              {/* Concentric circles */}
              <circle
                className="m-circle"
                cx="720"
                cy="450"
                r="120"
                stroke="#D4956B"
                strokeWidth="0.6"
                opacity="0"
              />
              <circle
                className="m-circle"
                cx="720"
                cy="450"
                r="220"
                stroke="#D4956B"
                strokeWidth="0.5"
                opacity="0"
              />
              <circle
                className="m-circle"
                cx="720"
                cy="450"
                r="340"
                stroke="#D4956B"
                strokeWidth="0.4"
                opacity="0"
                strokeDasharray="8 8"
              />
              <circle
                className="m-circle"
                cx="720"
                cy="450"
                r="480"
                stroke="#A7C4A0"
                strokeWidth="0.3"
                opacity="0"
              />
              <circle
                className="m-circle"
                cx="720"
                cy="450"
                r="640"
                stroke="#C5D1CA"
                strokeWidth="0.3"
                opacity="0"
                strokeDasharray="12 12"
              />

              {/* Floating dots */}
              <circle
                className="m-dot"
                cx="180"
                cy="160"
                r="3"
                fill="#D4956B"
                opacity="0"
              />
              <circle
                className="m-dot"
                cx="1250"
                cy="220"
                r="2.5"
                fill="#A7C4A0"
                opacity="0"
              />
              <circle
                className="m-dot"
                cx="320"
                cy="720"
                r="2"
                fill="#7BAAC4"
                opacity="0"
              />
              <circle
                className="m-dot"
                cx="1100"
                cy="130"
                r="3.5"
                fill="#D4956B"
                opacity="0"
              />
              <circle
                className="m-dot"
                cx="900"
                cy="780"
                r="2"
                fill="#C5D1CA"
                opacity="0"
              />
              <circle
                className="m-dot"
                cx="460"
                cy="100"
                r="2.5"
                fill="#A7C4A0"
                opacity="0"
              />
              <circle
                className="m-dot"
                cx="1300"
                cy="650"
                r="3"
                fill="#D4956B"
                opacity="0"
              />
              <circle
                className="m-dot"
                cx="100"
                cy="500"
                r="2"
                fill="#7BAAC4"
                opacity="0"
              />

              {/* Cross shapes */}
              <g className="m-cross" opacity="0">
                <line
                  x1="130"
                  y1="130"
                  x2="170"
                  y2="130"
                  stroke="#D4956B"
                  strokeWidth="1"
                />
                <line
                  x1="150"
                  y1="110"
                  x2="150"
                  y2="150"
                  stroke="#D4956B"
                  strokeWidth="1"
                />
              </g>
              <g className="m-cross" opacity="0">
                <line
                  x1="1260"
                  y1="720"
                  x2="1300"
                  y2="720"
                  stroke="#A7C4A0"
                  strokeWidth="1"
                />
                <line
                  x1="1280"
                  y1="700"
                  x2="1280"
                  y2="740"
                  stroke="#A7C4A0"
                  strokeWidth="1"
                />
              </g>
              <g className="m-cross" opacity="0">
                <line
                  x1="1320"
                  y1="180"
                  x2="1350"
                  y2="180"
                  stroke="#C5D1CA"
                  strokeWidth="0.8"
                />
                <line
                  x1="1335"
                  y1="165"
                  x2="1335"
                  y2="195"
                  stroke="#C5D1CA"
                  strokeWidth="0.8"
                />
              </g>
              <g className="m-cross" opacity="0">
                <line
                  x1="80"
                  y1="680"
                  x2="110"
                  y2="680"
                  stroke="#D4956B"
                  strokeWidth="0.8"
                />
                <line
                  x1="95"
                  y1="665"
                  x2="95"
                  y2="695"
                  stroke="#D4956B"
                  strokeWidth="0.8"
                />
              </g>

              {/* Horizontal accent lines */}
              <line
                className="m-hline"
                x1="0"
                y1="360"
                x2="380"
                y2="360"
                stroke="#C5D1CA"
                strokeWidth="0.4"
                opacity="0"
              />
              <line
                className="m-hline"
                x1="1060"
                y1="540"
                x2="1440"
                y2="540"
                stroke="#C5D1CA"
                strokeWidth="0.4"
                opacity="0"
              />
            </svg>
          </div>

          {/* Glow accents */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-warmth/[0.04] rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-sprout/[0.03] rounded-full blur-[120px] pointer-events-none" />

          {/* Content — word-by-word reveal */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <p className="text-cloud font-bold text-[clamp(1.4rem,3.5vw,2.5rem)] leading-[1.3] tracking-tight">
              {"Creemos que cada acción profesional"
                .split(" ")
                .map((word, i) => (
                  <span
                    key={`a${i}`}
                    className="m-word inline-block mr-[0.25em] opacity-[0.08]">
                    {word}
                  </span>
                ))}
            </p>
            <p className="text-warmth font-bold text-[clamp(2.5rem,8vw,6.5rem)] leading-[1] tracking-tight mt-3">
              {"tiene el poder de transformar".split(" ").map((word, i) => (
                <span
                  key={`b${i}`}
                  className="m-word inline-block mr-[0.3em] opacity-[0.08]">
                  {word}
                </span>
              ))}
            </p>
            <p className="text-cloud font-bold text-[clamp(1.4rem,3.5vw,2.5rem)] leading-[1.3] tracking-tight mt-3">
              {"una comunidad entera.".split(" ").map((word, i) => (
                <span
                  key={`c${i}`}
                  className="m-word inline-block mr-[0.25em] opacity-[0.08]">
                  {word}
                </span>
              ))}
            </p>

            <div className="m-divider w-24 h-[2px] bg-warmth/40 mx-auto mt-12" />

            <p className="text-cloud/50 text-lg md:text-xl max-w-2xl mx-auto mt-10 leading-relaxed">
              {"No somos solo un marketplace. Somos un movimiento que demuestra que el talento profesional puede ser la herramienta más poderosa de cambio social."
                .split(" ")
                .map((word, i) => (
                  <span
                    key={`d${i}`}
                    className="m-body-word inline-block mr-[0.2em] opacity-[0.05]">
                    {word}
                  </span>
                ))}
            </p>
            <p className="text-cloud/40 text-base md:text-lg max-w-xl mx-auto mt-5 leading-relaxed">
              {"Cada servicio contratado activa una cadena de impacto: del profesional al cliente, del cliente a la causa, de la causa a la comunidad."
                .split(" ")
                .map((word, i) => (
                  <span
                    key={`e${i}`}
                    className="m-body-word inline-block mr-[0.2em] opacity-[0.05]">
                    {word}
                  </span>
                ))}
            </p>
          </div>
        </div>
      </section>

      {/* ===== STORY PARALLAX ===== */}
      <section ref={storySectionRef} className="relative bg-cloud">
        <div className="h-screen flex flex-col lg:grid lg:grid-cols-2 overflow-hidden">
          <div className="relative flex-1 lg:flex-auto bg-cloud overflow-hidden">
            {stories.map((story, i) => (
              <div
                key={i}
                ref={(el) => {
                  storyTextsRef.current[i] = el;
                }}
                className="absolute inset-0 flex items-center p-8 md:p-12 lg:p-16">
                <div className="max-w-lg relative">
                  <span className="absolute -top-12 -left-4 lg:-top-16 lg:-left-6 text-[clamp(7rem,15vw,12rem)] font-bold leading-none text-warmth/[0.06] select-none tracking-[-0.05em] pointer-events-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-[2px] bg-warmth rounded-full" />
                      <span className="text-warmth text-sm font-semibold uppercase tracking-[0.15em]">
                        {story.tag}
                      </span>
                    </div>
                    <h3 className="text-deep text-2xl sm:text-3xl lg:text-[2.75rem] font-bold leading-[1.08] tracking-tight">
                      {story.title}
                    </h3>
                    <p className="text-stone text-base lg:text-lg mt-5 leading-relaxed">
                      {story.text}
                    </p>
                    <div className="mt-8 pl-5 border-l-[3px] border-warmth/40">
                      <p className="text-deep text-lg lg:text-xl font-bold leading-snug">
                        {story.highlight}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="absolute bottom-8 left-8 md:left-12 lg:left-16 flex items-center gap-4 z-10">
              <div className="flex gap-2">
                {stories.map((_, j) => (
                  <div
                    key={j}
                    ref={(el) => {
                      storyDotsRef.current[j] = el;
                    }}
                    className="h-1.5 rounded-full"
                  />
                ))}
              </div>
              <span className="text-stone text-xs font-medium tracking-wider">
                <span ref={storyCounterRef} className="text-deep font-bold">
                  01
                </span>{" "}
                / {String(stories.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="relative flex-1 lg:flex-auto">
            {stories.map((story, i) => (
              <div
                key={i}
                ref={(el) => {
                  storyImagesRef.current[i] = el;
                }}
                className="absolute inset-0">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUES — Horizontal scroll with SVG illustrations ===== */}
      <section className="values-section relative bg-mist overflow-hidden">
        <div
          ref={valuesTrackRef}
          className="flex h-screen"
          style={{ width: `${(valuesData.length + 1) * 100}vw` }}>
          {/* Intro panel */}
          <div className="w-screen h-screen flex items-center justify-center flex-shrink-0 px-8 relative overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #2D3B36 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
            </div>
            <div className="text-center relative z-10">
              <span className="text-warmth text-sm font-semibold uppercase tracking-[0.2em]">
                Nuestros pilares
              </span>
              <h2 className="text-deep font-bold text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-tight mt-4">
                Lo que nos
                <br />
                <span className="text-warmth">define</span>
              </h2>
              <div className="flex items-center justify-center gap-3 mt-8 text-stone">
                <div className="w-8 h-px bg-sage" />
                <span className="text-sm font-medium uppercase tracking-[0.15em]">
                  scroll
                </span>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "18px" }}>
                  arrow_forward
                </span>
              </div>
            </div>
          </div>

          {/* Value panels */}
          {valuesData.map((value, i) => {
            const SvgComponent = valueSVGs[i];
            return (
              <div
                key={i}
                className="value-panel w-screen h-screen flex items-center flex-shrink-0 px-8 lg:px-20 relative">
                {/* Panel background accent */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-warmth/[0.03] blur-[100px] pointer-events-none" />

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-7xl mx-auto w-full items-center">
                  {/* Left — Text */}
                  <div className="relative">
                    <span className="vp-anim text-warmth/15 font-bold text-[clamp(5rem,14vw,11rem)] leading-none tracking-[-0.05em] select-none block">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="vp-anim text-deep font-bold text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight -mt-6 lg:-mt-10">
                      {value.title}
                    </h3>
                    <p className="vp-anim text-stone text-base lg:text-lg mt-5 leading-relaxed max-w-md">
                      {value.description}
                    </p>
                    <div className="vp-anim w-16 h-[2px] bg-warmth/30 mt-8 rounded-full" />
                  </div>

                  {/* Right — SVG illustration */}
                  <div className="vp-anim flex items-center justify-center">
                    <div className="w-[280px] h-[280px] lg:w-[360px] lg:h-[360px]">
                      <SvgComponent />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== IMPACT STATS ===== */}
      <section className="relative bg-deep overflow-hidden py-24 md:py-32">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #F7F5F2 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-warmth/[0.06] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sprout/[0.05] rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-warmth text-sm font-semibold uppercase tracking-[0.15em]">
            Nuestro impacto
          </span>
          <h2 className="text-white font-bold text-3xl md:text-[2.75rem] leading-[1.15] tracking-tight mt-3">
            Numeros que hablan
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="font-mono text-warmth text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none">
                  {stat.prefix}
                  <span
                    className="stat-number"
                    data-value={stat.value}
                    data-format={stat.format}>
                    0
                  </span>
                </p>
                <div className="w-8 h-0.5 bg-warmth/40 rounded-full mt-4 mb-2 mx-auto" />
                <p className="text-cloud/70 text-sm font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1800&h=800&fit=crop&q=80"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep/90 to-deep/70" />
        </div>

        <div className="cta-content relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-cloud font-bold text-3xl md:text-5xl tracking-tight leading-[1.1]">
            ¿Listo para ser parte del cambio?
          </h2>
          <p className="text-cloud/60 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
            Unete como profesional o contrata servicios que transforman
            comunidades. Cada accion cuenta.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/auth/registro-proveedor">
              <Button>
                <span className="flex items-center gap-2">
                  Ser proveedor
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "18px" }}>
                    arrow_forward
                  </span>
                </span>
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button variant="secondary">
                <span className="flex items-center gap-2 text-cloud">
                  Explorar marketplace
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "18px" }}>
                    arrow_forward
                  </span>
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
