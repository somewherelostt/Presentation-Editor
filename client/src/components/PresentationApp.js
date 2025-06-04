import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import {
  FaEdit,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
  FaSave,
  FaTimes,
  FaInfoCircle,
} from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

function PresentationApp() {
  const [slides, setSlides] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [error, setError] = useState(null);
  const [showTips, setShowTips] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      setEditedContent(slides[currentSlideIndex]?.content || "");
    }
  }, [currentSlideIndex, slides]);

  const fetchSlides = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/slides`);
      if (!response.ok) {
        throw new Error("Failed to fetch slides");
      }
      const data = await response.json();
      setSlides(data);
      if (data.length > 0) {
        setCurrentSlideIndex(0);
        setEditedContent(data[0].content);
      }
    } catch (error) {
      console.error("Error fetching slides:", error);
      setError("Failed to load slides. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSlide = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/slides`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: "# New Slide\n\nStart typing here...",
          order: slides.length + 1,
          layout: "default",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create new slide");
      }

      const newSlide = await response.json();
      setSlides([...slides, newSlide]);
      setCurrentSlideIndex(slides.length);
      setEditedContent(newSlide.content);
      setError(null);
    } catch (error) {
      console.error("Error creating new slide:", error);
      setError("Failed to create new slide. Please try again.");
    }
  };

  const handleSaveChanges = async () => {
    if (!slides[currentSlideIndex]) {
      setError("No slide to save");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/slides/${slides[currentSlideIndex].id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: editedContent,
            order: currentSlideIndex,
            layout: slides[currentSlideIndex].layout,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save changes");
      }

      const updatedSlide = await response.json();
      const updatedSlides = [...slides];
      updatedSlides[currentSlideIndex] = updatedSlide;
      setSlides(updatedSlides);
      setIsEditing(false);
      setError(null);
    } catch (error) {
      console.error("Error saving changes:", error);
      setError("Failed to save changes. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditedContent(slides[currentSlideIndex]?.content || "");
    setIsEditing(false);
    setError(null);
  };

  const handlePreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const toggleTips = () => {
    setShowTips(!showTips);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        handleSaveChanges();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [editedContent, currentSlideIndex]);

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading presentation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>PPT Web</h1>
        <div className="controls">
          <button className="button primary" onClick={handleAddSlide}>
            <FaPlus /> New Slide
          </button>
          <button className="button info" onClick={toggleTips}>
            <FaInfoCircle /> {showTips ? "Hide Tips" : "Show Tips"}
          </button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      {showTips && (
        <div className="tips-container">
          <h3>Quick Tips</h3>
          <ul>
            <li>Use # for headings</li>
            <li>Use - or * for bullet points</li>
            <li>Use **text** for bold</li>
            <li>Use *text* for italic</li>
            <li>Press Ctrl+Enter to save changes</li>
          </ul>
        </div>
      )}

      <div className="main-content">
        {isEditing ? (
          <div className="editor-container">
            <textarea
              className="editor"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="Enter your slide content using markdown..."
            />
            <div className="editor-controls">
              <button className="button success" onClick={handleSaveChanges}>
                <FaSave /> Save Changes
              </button>
              <button className="button danger" onClick={handleCancelEdit}>
                <FaTimes /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="slide-container">
            <div className="slide">
              <div className="slide-content">
                <ReactMarkdown>
                  {slides[currentSlideIndex]?.content || ""}
                </ReactMarkdown>
              </div>
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Slide
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="navigation">
        <button
          className="button primary"
          onClick={handlePreviousSlide}
          disabled={currentSlideIndex === 0}
        >
          <FaChevronLeft /> Previous
        </button>
        <div className="slide-counter">
          Slide {currentSlideIndex + 1} of {slides.length}
        </div>
        <button
          className="button primary"
          onClick={handleNextSlide}
          disabled={currentSlideIndex === slides.length - 1}
        >
          Next <FaChevronRight />
        </button>
      </div>

      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${((currentSlideIndex + 1) / slides.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

export default PresentationApp;
