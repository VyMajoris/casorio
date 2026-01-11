"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Custom styles for navigation buttons to match our theme could be added here or in global css
// For now we will use standard swiper styling but can customize classes

const photos = [
  { src: "/fotos/1.jpeg", position: "center 35%" },
  { src: "/fotos/2.jpeg", position: "center 5%" },
  { src: "/fotos/3.jpeg", position: "center 35%" },
  { src: "/fotos/4.jpeg", position: "center 15%" },
  { src: "/fotos/5.jpeg", position: "center 0%" },
  { src: "/fotos/6.jpeg", position: "center 15%" },
  { src: "/fotos/7.jpeg", position: "center 5%" },
  { src: "/fotos/8.jpeg", position: "center 35%" },
  { src: "/fotos/9.jpeg", position: "center 15%" },
  { src: "/fotos/10.jpeg", position: "center 0%" },
];

export default function PhotoCarousel() {
  return (
    <div className="w-full max-w-[800px] mx-auto  py-8 relative">
      <div className="rounded-2xl overflow-hidden shadow-xl ">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="w-full aspect-[4/4] sm:aspect-[4/4]"
        >
          {photos.map((photo, index) => (
            <SwiperSlide key={index} className="relative w-full h-full">
              <Image
                src={photo.src}
                alt={`Foto ${index + 1}`}
                fill
                className="object-cover"
                style={{ objectPosition: photo.position }}
                priority={index === 0}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

       {/* Custom styles to override default swiper colors if needed, 
           scoped to this component using embedded style or we could use global CSS.
           Using a simple style tag here for self-containment for now.
        */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          text-shadow: 0 0 3px rgba(0,0,0,0.5);
        }
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
            opacity: 1;
        }
      `}</style>
    </div>
  );
}
