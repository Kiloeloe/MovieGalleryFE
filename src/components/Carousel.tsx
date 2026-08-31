import { useState } from "react";

interface Props {
  images: string[];
  alt: string;
}

export default function Carousel({ images, alt }: Props) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  function goTo(i: number) {
    setIndex((i + images.length) % images.length);
  }

  return (
    <div className="carousel">
      <div className="carousel-viewport">
        <img
          src={images[index]}
          alt={`${alt} screenshot ${index + 1}`}
          className="carousel-image"
        />

        {images.length > 1 && (
          <>
            <button
              className="carousel-nav carousel-prev"
              onClick={() => goTo(index - 1)}
              aria-label="Previous screenshot"
            >
              ‹
            </button>
            <button
              className="carousel-nav carousel-next"
              onClick={() => goTo(index + 1)}
              aria-label="Next screenshot"
            >
              ›
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="carousel-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={i === index ? "carousel-dot active" : "carousel-dot"}
              onClick={() => goTo(i)}
              aria-label={`Go to screenshot ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
