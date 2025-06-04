import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaSave, FaUndo, FaEye, FaEdit } from "react-icons/fa";

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
`;

const EditorHeader = styled.div`
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditorTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0;
  color: #2c3e50;
`;

const EditorContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const TextArea = styled.textarea`
  flex: 1;
  padding: 1.5rem;
  font-family: "Fira Code", monospace;
  font-size: 1rem;
  line-height: 1.6;
  border: none;
  resize: none;
  background-color: white;
  color: #2c3e50;
  border-right: 1px solid #dee2e6;

  &:focus {
    outline: none;
  }
`;

const PreviewPanel = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow: auto;
  background-color: #f8f9fa;
  font-family: "Segoe UI", system-ui, -apple-system, sans-serif;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #2c3e50;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    color: #34495e;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  ul,
  ol {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #2c3e50;
    margin-bottom: 1rem;
    padding-left: 2rem;
  }

  code {
    font-family: "Fira Code", monospace;
    background-color: #f1f3f5;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
  }

  pre {
    margin: 1rem 0;
    border-radius: 8px;
    overflow: hidden;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SaveButton = styled(Button)`
  background-color: #2ecc71;
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: #e74c3c;
  color: white;
`;

const ToggleButton = styled(Button)`
  background-color: #3498db;
  color: white;
`;

const Editor = ({ content, onSave }) => {
  const [markdown, setMarkdown] = useState(content);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    setMarkdown(content);
  }, [content]);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  const handleSave = () => {
    onSave(markdown);
  };

  const handleCancel = () => {
    setMarkdown(content);
  };

  const renderers = {
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <EditorContainer>
      <EditorHeader>
        <EditorTitle>Edit Slide</EditorTitle>
        <ToggleButton onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? <FaEdit /> : <FaEye />}
          {showPreview ? "Hide Preview" : "Show Preview"}
        </ToggleButton>
      </EditorHeader>
      <EditorContent>
        <TextArea
          value={markdown}
          onChange={handleChange}
          placeholder="Write your slide content in Markdown..."
        />
        {showPreview && (
          <PreviewPanel>
            <ReactMarkdown renderers={renderers}>{markdown}</ReactMarkdown>
          </PreviewPanel>
        )}
      </EditorContent>
      <ButtonContainer>
        <SaveButton onClick={handleSave}>
          <FaSave />
          Save Changes
        </SaveButton>
        <CancelButton onClick={handleCancel}>
          <FaUndo />
          Cancel
        </CancelButton>
      </ButtonContainer>
    </EditorContainer>
  );
};

export default Editor;
