import React, { useEffect, useRef } from "react";
import "./confirmation-modal.css";

/**
 * Confirmation Modal with smooth animated green checkmark
 * Props:
 * - onClose: function to close the modal
 */

export default function ConfirmationModal({ onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    // Lock scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus modal
    if (modalRef.current) {
      modalRef.current.focus();
    }

    // Close on Esc
    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);

    // Auto close after 4 seconds
    const autoCloseTimer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(autoCloseTimer);
    };
  }, [onClose]);

  return (
    <div
      className="confirmation-overlay"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="confirmation-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Message de confirmation"
        tabIndex={-1}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Smooth animated checkmark icon */}
        <div className="confirmation-icon">
          <div className="checkmark-container">
            <svg viewBox="0 0 60 60" className="checkmark-svg">
              <circle 
                className="checkmark-circle" 
                cx="30" 
                cy="30" 
                r="25" 
                fill="none" 
                stroke="#4CAF50" 
                strokeWidth="3"
              />
              <path 
                className="checkmark-path" 
                fill="none" 
                stroke="#4CAF50" 
                strokeWidth="4" 
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 30 L27 37 L40 22"
              />
            </svg>
          </div>
        </div>

        {/* Message content */}
        <div className="confirmation-content">
          <h3>Message envoyé avec succès !</h3>
          <p>Votre demande a été envoyée. Je vous répondrai dans les plus brefs délais.</p>
        </div>

        {/* Close button */}
        <button
          className="confirmation-close"
          onClick={onClose}
          aria-label="Fermer"
          title="Fermer"
        >
          ×
        </button>
      </div>
    </div>
  );
}