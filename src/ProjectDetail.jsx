import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import "./modal-dark.css";

/**
 * Modal project detail (dark theme) with modern image carousel.
 * Props:
 * - project: { title, description, link, image, images, slug, status?, technos?, notes?, period? }
 * - onClose: function to close the detail view
 */

export default function ProjectDetail({ project, onClose }) {
  const modalRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const autoPlayRef = useRef(null);

  // Use images array or fallback to single image
  const images = project.images && project.images.length > 0 ? project.images : [project.image];

  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${project.title} — Projet`;
    return () => {
      document.title = prevTitle;
    };
  }, [project]);

  useEffect(() => {
    // Lock scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus modal
    if (modalRef.current) {
      modalRef.current.focus();
    }

    // Close on Esc and navigate images with arrows
    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "ArrowLeft") {
        goToPrevImage();
      }
      if (e.key === "ArrowRight") {
        goToNextImage();
      }
      if (e.key === " ") {
        e.preventDefault();
        toggleAutoPlay();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [onClose]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && images.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 3000); // Change image every 3 seconds
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, images.length]);

  const TRANSPARENT_PLACEHOLDER =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

  const getBadgeText = (status) => {
    switch (status) {
      case "en-cours":
        return "En cours";
      case "termine":
        return "Terminé";
      case "en-pause":
        return "En pause";
      default:
        return null;
    }
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case "en-cours":
        return "badge-orange";
      case "termine":
        return "badge-green";
      case "en-pause":
        return "badge-gray";
      default:
        return "";
    }
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Touch handlers for swipe navigation
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNextImage();
    }
    if (isRightSwipe) {
      goToPrevImage();
    }
  };

  return (
    <div
      className="modal-overlay dark"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="modal-card dark"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} — Détails du projet`}
        tabIndex={-1}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <div className="modal-title-block">
            <h2 className="modal-title">{project.title}</h2>
            {project.period && <div className="modal-period muted">{project.period}</div>}
          </div>

          <div className="modal-actions">
            <div className="actions-left">
              {project.status === "en-cours" && (
                <div className={`bb ${getBadgeClass(project.status)}`}>
                  {getBadgeText(project.status)}
                </div>
              )}

              {/* Only show demo link when project is NOT "en-cours" */}
              {project.status !== "en-cours" && project.link && (
                <a className="btn ghost modal-ghost" href={project.link} target="_blank" rel="noreferrer">
                  Ouvrir Demo
                </a>
              )}
            </div>

            <div className="actions-right">
              <button
                className="btn modal-close"
                onClick={onClose}
                aria-label="Fermer la fenêtre"
                title="Fermer"
              >
                <span style={{ fontSize: 18, lineHeight: 1, fontWeight: 800 }}>×</span>
              </button>
            </div>
          </div>
        </header>

        <main className="modal-main" aria-live="polite">
          <div className="modal-image-container">
            <div 
              className="modal-image"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={images[currentImageIndex]}
                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = TRANSPARENT_PLACEHOLDER;
                }}
                draggable={false}
              />

              {/* Image overlay with progress */}
              {images.length > 1 && (
                <div className="image-overlay" aria-hidden>
                  <div className="image-counter">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${((currentImageIndex + 1) / images.length) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Navigation */}
            {images.length > 1 && (
              <>
                <div className="image-navigation" aria-hidden>
                  <button
                    className="nav-button nav-prev"
                    onClick={goToPrevImage}
                    aria-label="Image précédente"
                    title="Image précédente"
                  >
                    <ChevronLeft size={24} strokeWidth={2.5} />
                  </button>

                  <div className="nav-center" aria-hidden>

                  </div>

                  <button
                    className="nav-button nav-next"
                    onClick={goToNextImage}
                    aria-label="Image suivante"
                    title="Image suivante"
                  >
                    <ChevronRight size={24} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Enhanced Image Indicators */}
                <div className="image-indicators" aria-hidden>
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Aller à l'image ${index + 1}`}
                      style={{
                        animationDelay: `${index * 0.1}s`
                      }}
                    />
                  ))}
                </div>

                {/* Thumbnail Strip for Large Screens */}
                <div className="thumbnail-strip" aria-hidden>
                  {images.map((image, index) => (
                    <button
                      key={index}
                      className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Miniature ${index + 1}`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = TRANSPARENT_PLACEHOLDER;
                        }}
                        draggable={false}
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="modal-body">
            <h3>Description complète</h3>
            <p>{project.description}</p>

            <section>
              <h4>Technos utilisées</h4>
              {Array.isArray(project.technos) ? (
                <ul className="tech-list">
                  {project.technos.map((t, i) => (
                    <li key={i} className="tech-item">{t}</li>
                  ))}
                </ul>
              ) : (
                <p>{project.technos || "Technologies, frameworks et outils utilisés pour ce projet."}</p>
              )}
            </section>

            <section>
              <h4>Notes techniques</h4>
              {project.notes ? (
                Array.isArray(project.notes) ? (
                  <ul className="notes-list">
                    {project.notes.map((n, i) => (
                      <li key={i}>{n}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{project.notes}</p>
                )
              ) : (
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Informations techniques non fournies.</p>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}