"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowDownTrayIcon,
  ArrowUturnLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DevicePhoneMobileIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Libre_Baskerville, Cormorant_Garamond } from "next/font/google";
import {
  downloadUrl,
  flattenGroups,
  fullUrl,
  getPhotoGroups,
  readCachedPhotoGroups,
  srcSet,
  thumbUrl,
  tinyUrl,
  writeCachedPhotoGroups,
  type Photo,
  type PhotoGroup,
} from "@/lib/photos";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

export default function PhotoGallery() {
  const [groups, setGroups] = useState<PhotoGroup[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [activeGroup, setActiveGroup] = useState(0);
  const touchStartX = useRef(0);

  const [downloading, setDownloading] = useState(false);
  const [showRotateHint, setShowRotateHint] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const flat = useMemo(() => flattenGroups(groups), [groups]);

  useEffect(() => {
    const cached = readCachedPhotoGroups();
    if (cached.length > 0) setGroups(cached);
    getPhotoGroups()
      .then((fresh) => {
        if (fresh.length > 0) {
          setGroups(fresh);
          writeCachedPhotoGroups(fresh);
        }
      })
      .catch((err) => console.error("Failed to load photo groups:", err))
      .finally(() => setLoaded(true));
  }, []);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((i) => (i === null ? null : (i - 1 + flat.length) % flat.length)),
    [flat.length]
  );
  const next = useCallback(
    () => setOpen((i) => (i === null ? null : (i + 1) % flat.length)),
    [flat.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  useEffect(() => {
    if (open === null) return;
    [open + 1, open - 1].forEach((i) => {
      const p = flat[(i + flat.length) % flat.length];
      if (!p) return;
      const img = new window.Image();
      img.src = fullUrl(p.id);
    });
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const gi = flat[open]?.groupIndex;
    if (gi !== undefined && gi !== activeGroup) setActiveGroup(gi);
  }, [open, activeGroup]);

  useEffect(() => {
    if (open === null) {
      setShowRotateHint(false);
      return;
    }
    const isMobile =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 900);
    if (!isMobile) return;

    const update = () => {
      const portrait = window.matchMedia("(orientation: portrait)").matches;
      setShowRotateHint(portrait);
    };
    update();

    const el = lightboxRef.current;
    const orientation = (
      screen as unknown as { orientation?: { lock?: (o: string) => Promise<void> } }
    ).orientation;
    if (el?.requestFullscreen && orientation?.lock) {
      el.requestFullscreen()
        .then(() => orientation.lock?.("landscape"))
        .catch(() => {});
    }

    const mq = window.matchMedia("(orientation: portrait)");
    mq.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, [open]);

  const current = open !== null ? flat[open] : null;
  const activePhotos = groups[activeGroup]?.photos ?? [];

  return (
    <div
      className={`min-h-screen flex flex-col items-center py-10 px-4 ${libreBaskerville.className}`}
    >
      <div className="w-full relative max-w-5xl shadow-2xl rounded-lg bg-white/20">
        <div className="z-20 px-4 sm:px-10 pt-6 sm:pt-10 pb-6 sm:pb-10 relative mt-10 sm:mt-20">
          <header className="text-center mb-6 sm:mb-10">
            <div className="flex items-center justify-center gap-3 mb-3 sm:mb-5 opacity-70">
              <span className="h-px w-8 sm:w-16 bg-[var(--accent-blue,#4a5a6a)]" />
              <span
                className="text-lg tracking-[0.4em] uppercase"
                style={{ color: "var(--text-bronze, #8a6a3f)", fontSize: "0.7rem" }}
              >
                Álbum
              </span>
              <span className="h-px w-8 sm:w-16 bg-[var(--accent-blue,#4a5a6a)]" />
            </div>

            <h1
              className={`${cormorant.className} text-5xl sm:text-8xl italic leading-none mb-2 sm:mb-4`}
              style={{ color: "var(--text-bronze, #5a4428)" }}
            >
              Memórias
            </h1>

            <p
              className="italic text-xs sm:text-base opacity-80 mt-2 sm:mt-4"
              style={{ color: "var(--text-bronze, #5a4428)" }}
            >
              Eduardo &amp; Lília · 28 de Fevereiro de 2026
            </p>

            <div className="mx-auto mt-4 sm:mt-6 max-w-md text-xs sm:text-base leading-relaxed opacity-75 px-2 sm:px-4">
              <span
                className={`${cormorant.className} float-left text-4xl sm:text-5xl leading-none mr-2 mt-1 italic`}
                style={{ color: "var(--text-bronze, #8a6a3f)" }}
              >
                U
              </span>
              m registro dos momentos que guardaremos para sempre. Toque em uma
              fotografia para vê-la em tamanho maior.
            </div>

            <div className="mt-4 sm:mt-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity"
                style={{ color: "var(--accent-blue, #3a4a5a)" }}
              >
                <ArrowUturnLeftIcon className="w-4 h-4" />
                Voltar ao início
              </Link>
            </div>
          </header>

          {groups.length === 0 ? (
            loaded ? <EmptyState /> : null
          ) : (
            <>
              <nav
                className="sticky top-0 z-30 mb-6 sm:mb-10 -mx-4 sm:-mx-10 px-3 sm:px-10 py-3 sm:py-4"
                aria-label="Grupos"
                style={{
                  backgroundColor: "rgba(250, 246, 237, 0.94)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  borderBottom: "1px solid rgba(138, 106, 63, 0.18)",
                }}
              >
                <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-x-8 sm:gap-y-2">
                  {groups.map((g, gi) => {
                    const isActive = gi === activeGroup;
                    return (
                      <li key={g.id}>
                        <button
                          onClick={() => setActiveGroup(gi)}
                          className={`${cormorant.className} italic text-[13px] sm:text-2xl leading-tight pb-0.5 sm:pb-1 transition-all duration-300`}
                          style={{
                            color: isActive
                              ? "var(--text-bronze, #5a4428)"
                              : "rgba(90,68,40,0.5)",
                            borderBottom: isActive
                              ? "1px solid var(--text-bronze, #8a6a3f)"
                              : "1px solid transparent",
                            letterSpacing: isActive ? "0.01em" : "0",
                          }}
                        >
                          {g.title}
                          <span
                            className="ml-1 sm:ml-2 not-italic text-[0.7em] sm:text-[0.6em] tracking-widest align-middle"
                            style={{ opacity: isActive ? 0.7 : 0.5 }}
                          >
                            · {g.photos.length.toString().padStart(2, "0")}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div
                key={activeGroup}
                className="columns-1 sm:columns-2 lg:columns-3 gap-5 sm:gap-7 [column-fill:_balance]"
              >
                {activePhotos.length === 0 ? (
                  <div className="[column-span:all]">
                    <EmptyState />
                  </div>
                ) : (
                  activePhotos.map((p, i) => (
                    <PhotoCard
                      key={p.id + i}
                      photo={p}
                      index={i}
                      onOpen={() => {
                        const flatIndex = flat.findIndex(
                          (f) =>
                            f.groupId === groups[activeGroup].id &&
                            f.indexInGroup === i
                        );
                        if (flatIndex !== -1) setOpen(flatIndex);
                      }}
                    />
                  ))
                )}
              </div>
            </>
          )}

          <footer
            className="text-center mt-14 pt-8 border-t"
            style={{ borderColor: "var(--accent-blue, #4a5a6a)" }}
          >
            <p
              className={`${cormorant.className} italic text-lg`}
              style={{ color: "var(--accent-blue, #3a4a5a)" }}
            >
              Deo gratias
            </p>
          </footer>
        </div>

        {/* Background decorative flourishes — match the main page */}
        <div
          className="z-10 rounded-lg absolute top-0 left-0 w-full h-64 sm:h-[400px]"
          style={{
            mixBlendMode: "multiply",
            backgroundImage: "url('/bg_flowers_1.webp')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
            backgroundSize: "cover",
            opacity: 0.18,
            filter: "blur(0.4px) sepia(10%)",
            transform: "scaleY(-1)",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        />
      </div>

      {current && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(20,15,10,0.98) 0%, rgba(5,3,2,1) 100%)",
          }}
          onClick={close}
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (diff > 50) next();
            else if (diff < -50) prev();
          }}
        >
          <img
            key={current.id}
            src={fullUrl(current.id)}
            alt={current.caption ?? ""}
            width={current.width}
            height={current.height}
            className="absolute inset-0 w-full h-full object-contain select-none"
            style={{ animation: "photoFadeIn 260ms ease-out" }}
            onClick={(e) => e.stopPropagation()}
          />

          <div
            className={`absolute top-4 left-1/2 -translate-x-1/2 z-[60] px-4 py-1.5 rounded-full bg-black/55 backdrop-blur-sm border border-white/20 text-white text-sm tracking-[0.3em] ${cormorant.className}`}
          >
            {String(open! + 1).padStart(2, "0")}
            <span className="mx-2 opacity-60">/</span>
            {String(flat.length).padStart(2, "0")}
          </div>

          <button
            aria-label="Fechar"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute top-4 right-4 z-[60] p-2.5 rounded-full bg-black/55 hover:bg-black/75 backdrop-blur-sm border border-white/30 text-white transition"
          >
            <XMarkIcon className="w-6 h-6" strokeWidth={2.2} />
          </button>

          <button
            aria-label="Anterior"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-[60] p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm border-2 border-white/40 text-white shadow-[0_6px_20px_rgba(0,0,0,0.6)] transition"
          >
            <ChevronLeftIcon className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
          </button>

          <button
            aria-label="Próxima"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[60] p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm border-2 border-white/40 text-white shadow-[0_6px_20px_rgba(0,0,0,0.6)] transition"
          >
            <ChevronRightIcon className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
          </button>

          {current.caption && (
            <figcaption
              className={`${cormorant.className} absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-[60] italic text-white/90 text-center text-sm sm:text-base max-w-xl px-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]`}
            >
              {current.caption}
            </figcaption>
          )}

          <a
            href={downloadUrl(current.id)}
            download
            onClick={async (e) => {
              e.stopPropagation();
              if (downloading) {
                e.preventDefault();
                return;
              }
              e.preventDefault();
              setDownloading(true);
              try {
                const res = await fetch(downloadUrl(current.id));
                const blob = await res.blob();
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = blobUrl;
                a.download = `${current.id.split("/").pop() ?? "foto"}.jpg`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(blobUrl);
              } catch (err) {
                console.error("Download failed:", err);
                window.location.href = downloadUrl(current.id);
              } finally {
                setDownloading(false);
              }
            }}
            aria-label="Baixar esta foto para o seu dispositivo"
            aria-busy={downloading}
            className={`absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-[60] inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-[#faf6ed] hover:bg-white text-[#5a4428] font-semibold text-base sm:text-lg tracking-wide shadow-[0_10px_30px_-6px_rgba(0,0,0,0.8)] border-2 border-[#d9c9a3] transition-all duration-200 ${
              downloading
                ? "cursor-wait opacity-90"
                : "hover:scale-[1.03] active:scale-[0.98]"
            }`}
          >
            {downloading ? (
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.2" opacity="0.25" />
                <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            ) : (
              <ArrowDownTrayIcon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.2} />
            )}
            <span>{downloading ? "Baixando…" : "Baixar foto"}</span>
          </a>

          {showRotateHint && (
            <div
              className="absolute inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm px-6"
              onClick={(e) => {
                e.stopPropagation();
                setShowRotateHint(false);
              }}
            >
              <div className="flex flex-col items-center text-center text-white max-w-xs">
                <DevicePhoneMobileIcon
                  className="w-20 h-20 mb-4"
                  style={{ animation: "rotateHint 2.2s ease-in-out infinite" }}
                  strokeWidth={1.5}
                />
                <p className={`${cormorant.className} italic text-xl mb-2`}>
                  Gire o celular
                </p>
                <p className="text-sm opacity-80">
                  Para uma melhor visualização, use o aparelho na horizontal.
                </p>
                <button
                  className="mt-5 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowRotateHint(false);
                  }}
                >
                  Continuar assim mesmo
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx global>{`
        @keyframes photoFadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rotateHint {
          0%, 100% { transform: rotate(0deg); }
          40%, 60% { transform: rotate(-90deg); }
        }
      `}</style>
    </div>
  );
}

function PhotoCard({
  photo,
  index,
  onOpen,
}: {
  photo: Photo;
  index: number;
  onOpen: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const delay = Math.min(index, 18) * 45;

  return (
    <button
      onClick={onOpen}
      className="group mb-5 sm:mb-7 block w-full break-inside-avoid text-left"
      style={{
        animation: `cardReveal 600ms ease-out ${delay}ms both`,
      }}
    >
      <div
        className=""
        style={{
          boxShadow:
            "0 2px 6px rgba(90,60,30,0.08), 0 18px 40px -20px rgba(90,60,30,0.35)",
        }}
      >
        <div
          className="relative overflow-hidden bg-[#ece3d2]"
          style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
        >
          <img
            src={tinyUrl(photo.id)}
            alt=""
            aria-hidden
            className={`absolute inset-0 w-full h-full object-cover scale-110 blur-lg transition-opacity duration-700 ${
              loaded ? "opacity-0" : "opacity-100"
            }`}
          />
          <img
            src={thumbUrl(photo.id, 800)}
            srcSet={srcSet(photo.id)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            alt={photo.caption ?? ""}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            width={photo.width}
            height={photo.height}
            className={`relative w-full h-full object-cover transition-all duration-700 ${
              loaded ? "opacity-100" : "opacity-0"
            } group-hover:brightness-[1.04]`}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 60%, rgba(90,60,30,0.18) 100%)",
            }}
          />
        </div>
        {photo.caption && (
          <figcaption
            className="absolute bottom-1 left-0 right-0 text-center italic text-[11px] sm:text-[12px] tracking-wide px-3 truncate"
            style={{ color: "#8a6a3f", fontFamily: "serif" }}
          >
            {photo.caption}
          </figcaption>
        )}
      </div>
    </button>
  );
}

function EmptyState() {
  return (
    <div
      className="text-center py-20 px-6 rounded-md border border-dashed"
      style={{
        borderColor: "var(--accent-blue, #4a5a6a)",
        color: "var(--text-bronze, #5a4428)",
      }}
    >
      <p className="italic opacity-80">
        Em breve as fotografias do nosso grande dia serão publicadas aqui.
      </p>
    </div>
  );
}
