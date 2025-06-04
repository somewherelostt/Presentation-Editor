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

const API_URL = "http://localhost:3001/api";

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
      const response = await axios.get(`${API_URL}/slides`);
      console.log("Fetched slides:", response.data);
      if (response.data.length === 0) {
        await handleAddSlide();
      } else {
        setSlides(response.data);
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
      const newSlide = {
        content: `# New Slide ${
          slides.length + 1
        }\n\nStart typing your content here...\n\n- Use markdown for formatting\n- Add bullet points\n- Include images or links`,
        order: slides.length,
        layout: "default",
      };
      const response = await axios.post(`${API_URL}/slides`, newSlide);
      console.log("Created new slide:", response.data);
      setSlides([...slides, response.data]);
      setCurrentSlideIndex(slides.length);
      setIsEditing(true);
    } catch (error) {
      console.error("Error adding slide:", error);
      setError("Failed to add new slide. Please try again.");
    }
  };

  const handleSaveChanges = async () => {
    if (!slides[currentSlideIndex]) {
      setError("No slide to save");
      return;
    }

    try {
      const updatedSlide = {
        ...slides[currentSlideIndex],
        content: editedContent,
        order: currentSlideIndex,
      };

      const response = await axios.put(
        `${API_URL}/slides/${updatedSlide.id}`,
        updatedSlide
      );

      if (response.data) {
        const updatedSlides = [...slides];
        updatedSlides[currentSlideIndex] = response.data;
        setSlides(updatedSlides);
        setIsEditing(false);
        setError(null);
      } else {
        throw new Error("No data received from server");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      setError(
        error.response?.data?.details ||
          error.response?.data?.error ||
          "Failed to save changes. Please try again."
      );
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
