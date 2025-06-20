import React, { useEffect, useRef } from 'react';

const TriangleDrawing = ({ sides, angles }) => {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!sides || !angles || sides.length !== 3 || angles.length !== 3) {
      return;
    }
    
    drawTriangle();
  }, [sides, angles]);
  
  const drawTriangle = () => {
    // Convert angles to radians for calculations
    const anglesRad = angles.map(angle => angle * Math.PI / 180);
    
    // Calculate coordinates using the Law of Cosines
    // We'll place the first vertex at the origin
    const vertices = [
      { x: 0, y: 0 }, // Vertex A at origin
      { x: sides[2], y: 0 }, // Vertex B at (side c, 0)
      { x: 0, y: 0 } // Vertex C to be calculated
    ];
    
    // Calculate the coordinates of the third vertex
    vertices[2].x = sides[0] * Math.cos(anglesRad[1]);
    vertices[2].y = sides[0] * Math.sin(anglesRad[1]);
    
    // Find the bounding box
    let minX = Math.min(...vertices.map(v => v.x));
    let minY = Math.min(...vertices.map(v => v.y));
    let maxX = Math.max(...vertices.map(v => v.x));
    let maxY = Math.max(...vertices.map(v => v.y));
    
    // Add padding
    const padding = Math.max(maxX - minX, maxY - minY) * 0.2;
    minX -= padding;
    minY -= padding;
    maxX += padding;
    maxY += padding;
    
    // Calculate width and height
    const width = maxX - minX;
    const height = maxY - minY;
    
    // Get the SVG element
    const svg = svgRef.current;
    if (!svg) return;
    
    // Clear previous content
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    
    // Set viewBox
    svg.setAttribute('viewBox', `${minX} ${minY} ${width} ${height}`);
    
    // Adjust vertices to account for the viewBox
    const adjustedVertices = vertices.map(v => ({
      x: v.x,
      y: v.y
    }));
    
    // Create the triangle path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute(
      'd', 
      `M ${adjustedVertices[0].x} ${adjustedVertices[0].y} 
       L ${adjustedVertices[1].x} ${adjustedVertices[1].y} 
       L ${adjustedVertices[2].x} ${adjustedVertices[2].y} 
       Z`
    );
    path.setAttribute('fill', 'rgba(59, 130, 246, 0.1)'); // Light blue fill
    path.setAttribute('stroke', '#3B82F6'); // Blue stroke
    path.setAttribute('stroke-width', Math.min(width, height) * 0.01);
    svg.appendChild(path);
    
    // Add side labels
    const addSideLabel = (start, end, label, side) => {
      // Calculate midpoint
      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;
      
      // Calculate normal vector for offset
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      const offsetX = -dy / len * (width * 0.03);
      const offsetY = dx / len * (height * 0.03);
      
      // Create text element
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', midX + offsetX);
      text.setAttribute('y', midY + offsetY);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('fill', '#3B82F6');
      text.setAttribute('font-size', Math.min(width, height) * 0.05);
      text.textContent = `${label} = ${side}`;
      
      // Add background for better readability
      const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const padding = Math.min(width, height) * 0.02;
      const bbox = { width: Math.min(width, height) * 0.15, height: Math.min(width, height) * 0.06 };
      bg.setAttribute('x', midX + offsetX - bbox.width / 2);
      bg.setAttribute('y', midY + offsetY - bbox.height / 2);
      bg.setAttribute('width', bbox.width);
      bg.setAttribute('height', bbox.height);
      bg.setAttribute('fill', 'white');
      bg.setAttribute('rx', padding);
      bg.setAttribute('ry', padding);
      
      svg.appendChild(bg);
      svg.appendChild(text);
    };
    
    // Add side labels
    addSideLabel(adjustedVertices[1], adjustedVertices[2], 'a', sides[0]);
    addSideLabel(adjustedVertices[0], adjustedVertices[2], 'b', sides[1]);
    addSideLabel(adjustedVertices[0], adjustedVertices[1], 'c', sides[2]);
    
    // Add angle markers and labels
    const addAngleMarker = (vertex, start, end, angle, label) => {
      // Calculate angle bisector
      const startAngle = Math.atan2(start.y - vertex.y, start.x - vertex.x);
      const endAngle = Math.atan2(end.y - vertex.y, end.x - vertex.x);
      
      // Ensure correct angle direction
      let sweepAngle = endAngle - startAngle;
      if (sweepAngle < 0) sweepAngle += 2 * Math.PI;
      if (sweepAngle > Math.PI) {
        // Swap start and end for correct arc direction
        const temp = startAngle;
        startAngle = endAngle;
        endAngle = temp;
        sweepAngle = 2 * Math.PI - sweepAngle;
      }
      
      // Calculate radius for the arc
      const radius = Math.min(width, height) * 0.06;
      
      // Calculate points on the arc
      const arcStart = {
        x: vertex.x + radius * Math.cos(startAngle),
        y: vertex.y + radius * Math.sin(startAngle)
      };
      
      const arcEnd = {
        x: vertex.x + radius * Math.cos(endAngle),
        y: vertex.y + radius * Math.sin(endAngle)
      };
      
      // Create arc path
      const arc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const largeArcFlag = sweepAngle > Math.PI ? 1 : 0;
      arc.setAttribute(
        'd',
        `M ${arcStart.x} ${arcStart.y} 
         A ${radius} ${radius} 0 ${largeArcFlag} 1 ${arcEnd.x} ${arcEnd.y}`
      );
      arc.setAttribute('fill', 'none');
      arc.setAttribute('stroke', '#8B5CF6'); // Purple stroke
      arc.setAttribute('stroke-width', Math.min(width, height) * 0.008);
      svg.appendChild(arc);
      
      // Add angle label
      const midAngle = (startAngle + endAngle) / 2;
      const labelRadius = radius * 1.5;
      const labelX = vertex.x + labelRadius * Math.cos(midAngle);
      const labelY = vertex.y + labelRadius * Math.sin(midAngle);
      
      // Create text element
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', labelX);
      text.setAttribute('y', labelY);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('fill', '#8B5CF6');
      text.setAttribute('font-size', Math.min(width, height) * 0.05);
      text.textContent = `${label} = ${angle}°`;
      
      // Add background for better readability
      const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const padding = Math.min(width, height) * 0.02;
      const bbox = { width: Math.min(width, height) * 0.15, height: Math.min(width, height) * 0.06 };
      bg.setAttribute('x', labelX - bbox.width / 2);
      bg.setAttribute('y', labelY - bbox.height / 2);
      bg.setAttribute('width', bbox.width);
      bg.setAttribute('height', bbox.height);
      bg.setAttribute('fill', 'white');
      bg.setAttribute('rx', padding);
      bg.setAttribute('ry', padding);
      
      svg.appendChild(bg);
      svg.appendChild(text);
    };
    
    // Add angle markers
    addAngleMarker(
      adjustedVertices[0], 
      adjustedVertices[1], 
      adjustedVertices[2], 
      angles[0], 
      'α'
    );
    addAngleMarker(
      adjustedVertices[1], 
      adjustedVertices[0], 
      adjustedVertices[2], 
      angles[1], 
      'β'
    );
    addAngleMarker(
      adjustedVertices[2], 
      adjustedVertices[0], 
      adjustedVertices[1], 
      angles[2], 
      'γ'
    );
    
    // Add vertex labels
    const addVertexLabel = (vertex, label) => {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', vertex.x);
      text.setAttribute('y', vertex.y);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('fill', '#1F2937');
      text.setAttribute('font-size', Math.min(width, height) * 0.06);
      text.setAttribute('font-weight', 'bold');
      text.textContent = label;
      
      // Add a white circle background
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', vertex.x);
      circle.setAttribute('cy', vertex.y);
      circle.setAttribute('r', Math.min(width, height) * 0.03);
      circle.setAttribute('fill', 'white');
      circle.setAttribute('stroke', '#3B82F6');
      circle.setAttribute('stroke-width', Math.min(width, height) * 0.005);
      
      svg.appendChild(circle);
      svg.appendChild(text);
    };
    
    // Add vertex labels
    addVertexLabel(adjustedVertices[0], 'A');
    addVertexLabel(adjustedVertices[1], 'B');
    addVertexLabel(adjustedVertices[2], 'C');
  };
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg 
        ref={svgRef} 
        className="w-full h-full max-h-[500px]" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Triangle will be drawn here */}
      </svg>
    </div>
  );
};

export default TriangleDrawing;
