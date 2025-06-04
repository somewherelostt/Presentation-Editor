import React from "react";
import styled from "styled-components";

const ProgressContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: #e9ecef;
  position: relative;
`;

const Progress = styled.div`
  height: 100%;
  background-color: #4a90e2;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  position: absolute;
  right: 1rem;
  top: 0.5rem;
  font-size: 0.875rem;
  color: #6c757d;
`;

const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <ProgressContainer>
      <Progress style={{ width: `${progress}%` }} />
      <ProgressText>
        {current} / {total}
      </ProgressText>
    </ProgressContainer>
  );
};

export default ProgressBar;
