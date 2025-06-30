
import React from 'react';
import Enhanced3DDNA from './Enhanced3DDNA';

interface DNAViewer3DProps {
  width?: string;
  height?: string;
}

const DNAViewer3D: React.FC<DNAViewer3DProps> = ({ width = "100%", height = "400px" }) => {
  return <Enhanced3DDNA width={width} height={height} animated={true} showControls={true} />;
};

export default DNAViewer3D;
