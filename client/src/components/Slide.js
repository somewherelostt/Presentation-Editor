import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";

const SlideWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
`;

const SlideContent = styled.div`
  max-width: 900px;
  width: 100%;
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: perspective(1000px) rotateX(0deg);
  transition: transform 0.3s ease;

  &:hover {
    transform: perspective(1000px) rotateX(2deg);
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 2rem;
    color: #2c3e50;
    text-align: center;
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: #34495e;
    font-weight: 600;
  }

  h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #2c3e50;
    font-weight: 600;
  }

  p {
    font-size: 1.5rem;
    line-height: 1.6;
    color: #2c3e50;
    margin-bottom: 1.5rem;
  }

  ul,
  ol {
    font-size: 1.5rem;
    line-height: 1.6;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  code {
    font-family: "Fira Code", monospace;
    background-color: #f8f9fa;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 1.3rem;
  }

  pre {
    margin: 1.5rem 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  blockquote {
    border-left: 4px solid #3498db;
    margin: 1.5rem 0;
    padding: 1rem 2rem;
    background-color: #f8f9fa;
    border-radius: 0 8px 8px 0;
    font-style: italic;
    color: #2c3e50;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1.5rem 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  a {
    color: #3498db;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s;

    &:hover {
      border-bottom-color: #3498db;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 1.3rem;

    th,
    td {
      padding: 1rem;
      border: 1px solid #dee2e6;
      text-align: left;
    }

    th {
      background-color: #f8f9fa;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background-color: #f8f9fa;
    }
  }
`;

const Slide = ({ content, layout = "default" }) => {
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
    <SlideWrapper>
      <SlideContent>
        <ReactMarkdown renderers={renderers} children={content} />
      </SlideContent>
    </SlideWrapper>
  );
};

export default Slide;
