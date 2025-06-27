
import React, { useRef, useEffect, useState } from 'react';

const DNAViewer3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let rotation = 0;
    let mouseX = 0;
    let mouseY = 0;

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
      mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setIsInteracting(true);
      setTimeout(() => setIsInteracting(false), 100);
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // DNA helix drawing function
    const drawDNAHelix = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2, height / 2);

      // Interactive rotation
      const rotationSpeed = isInteracting ? 0.02 : 0.005;
      rotation += rotationSpeed + mouseX * 0.01;

      // Draw DNA strands
      const numBases = 40;
      const helixRadius = 80;
      const helixHeight = 300;

      for (let i = 0; i < numBases; i++) {
        const t = (i / numBases) * Math.PI * 4 + rotation;
        const y = (i / numBases - 0.5) * helixHeight;

        // First strand
        const x1 = Math.cos(t) * helixRadius;
        const z1 = Math.sin(t) * helixRadius;
        
        // Second strand (opposite)
        const x2 = Math.cos(t + Math.PI) * helixRadius;
        const z2 = Math.sin(t + Math.PI) * helixRadius;

        // Apply 3D perspective
        const perspective = 800;
        const scale1 = perspective / (perspective + z1);
        const scale2 = perspective / (perspective + z2);

        const projX1 = x1 * scale1;
        const projY1 = y * scale1;
        const projX2 = x2 * scale2;
        const projY2 = y * scale2;

        // Color based on depth
        const color1 = `hsl(${220 + z1 * 0.5}, 80%, ${60 + z1 * 0.3}%)`;
        const color2 = `hsl(${280 + z2 * 0.5}, 80%, ${60 + z2 * 0.3}%)`;

        // Draw base pairs (connecting lines)
        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.moveTo(projX1, projY1);
          ctx.lineTo(projX2, projY2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 + Math.abs(z1) * 0.01})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Draw nucleotides
        ctx.beginPath();
        ctx.arc(projX1, projY1, 4 * scale1, 0, Math.PI * 2);
        ctx.fillStyle = color1;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(projX2, projY2, 4 * scale2, 0, Math.PI * 2);
        ctx.fillStyle = color2;
        ctx.fill();

        // Add glow effect for interacting nucleotides
        if (isInteracting && i % 5 === 0) {
          ctx.beginPath();
          ctx.arc(projX1, projY1, 8 * scale1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, 0.3)`;
          ctx.fill();
        }
      }

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      drawDNAHelix();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isInteracting]);

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20 rounded-2xl overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
        style={{ background: 'transparent' }}
      />
      
      {/* Overlay info */}
      <div className="absolute top-4 left-4 glass rounded-lg p-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">DNA Helix Visualization</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Interactive 3D model • Move mouse to explore
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 glass rounded-lg p-3">
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Adenine / Thymine</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span>Guanine / Cytosine</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DNAViewer3D;
