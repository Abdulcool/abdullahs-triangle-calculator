import React, { useState, useEffect } from 'react';

// Triangle calculation utility functions
const degreesToRadians = (degrees) => degrees * Math.PI / 180;
const radiansToDegrees = (radians) => radians * 180 / Math.PI;

// Round to 4 decimal places for display
const round = (value) => {
  return Math.round(value * 10000) / 10000;
};

// Calculate triangle properties based on input values
export const calculateTriangle = (sides, angles) => {
  // Make copies to avoid modifying the original arrays
  const s = [...sides];
  const a = [...angles];
  
  // Check if we have enough information
  const sideCount = s.filter(side => side !== null && side > 0).length;
  const angleCount = a.filter(angle => angle !== null && angle > 0).length;
  
  if (sideCount + angleCount < 3 || sideCount === 0) {
    return {
      sides: s,
      angles: a,
      isValid: false,
      error: "Please enter at least 3 values, including at least one side."
    };
  }
  
  // Convert angles to radians for calculations
  const anglesRad = a.map(angle => angle !== null ? degreesToRadians(angle) : null);
  
  // Case: Three sides (SSS)
  if (sideCount === 3) {
    // Check triangle inequality
    if (s[0] + s[1] <= s[2] || s[0] + s[2] <= s[1] || s[1] + s[2] <= s[0]) {
      return {
        sides: s,
        angles: a,
        isValid: false,
        error: "Invalid triangle: The sum of any two sides must be greater than the third side."
      };
    }
    
    // Calculate angles using Law of Cosines
    anglesRad[0] = Math.acos((s[1]**2 + s[2]**2 - s[0]**2) / (2 * s[1] * s[2]));
    anglesRad[1] = Math.acos((s[0]**2 + s[2]**2 - s[1]**2) / (2 * s[0] * s[2]));
    anglesRad[2] = Math.acos((s[0]**2 + s[1]**2 - s[2]**2) / (2 * s[0] * s[1]));
    
    // Convert back to degrees
    a[0] = radiansToDegrees(anglesRad[0]);
    a[1] = radiansToDegrees(anglesRad[1]);
    a[2] = radiansToDegrees(anglesRad[2]);
  }
  // Case: Two sides and included angle (SAS)
  else if (
    (s[0] !== null && s[1] !== null && a[2] !== null) ||
    (s[1] !== null && s[2] !== null && a[0] !== null) ||
    (s[0] !== null && s[2] !== null && a[1] !== null)
  ) {
    let idx1, idx2, idxAngle;
    
    if (s[0] !== null && s[1] !== null && a[2] !== null) {
      idx1 = 0; idx2 = 1; idxAngle = 2;
    } else if (s[1] !== null && s[2] !== null && a[0] !== null) {
      idx1 = 1; idx2 = 2; idxAngle = 0;
    } else {
      idx1 = 0; idx2 = 2; idxAngle = 1;
    }
    
    // Calculate third side using Law of Cosines
    const angleRad = degreesToRadians(a[idxAngle]);
    const idx3 = 3 - idx1 - idx2; // Index of the unknown side
    
    s[idx3] = Math.sqrt(s[idx1]**2 + s[idx2]**2 - 2 * s[idx1] * s[idx2] * Math.cos(angleRad));
    
    // Calculate remaining angles using Law of Sines
    const sinAngle = Math.sin(angleRad);
    anglesRad[idx1] = Math.asin((s[idx1] * sinAngle) / s[idx3]);
    anglesRad[idx2] = Math.asin((s[idx2] * sinAngle) / s[idx3]);
    
    // Convert to degrees
    a[idx1] = radiansToDegrees(anglesRad[idx1]);
    a[idx2] = radiansToDegrees(anglesRad[idx2]);
    
    // Check if the sum of angles is close to 180 degrees
    const angleSum = a[0] + a[1] + a[2];
    if (Math.abs(angleSum - 180) > 0.01) {
      return {
        sides: s,
        angles: a,
        isValid: false,
        error: "Invalid triangle: The calculated angles don't sum to 180 degrees."
      };
    }
  }
  // Case: Two angles and included side (ASA)
  else if (
    (a[0] !== null && a[1] !== null && s[2] !== null) ||
    (a[1] !== null && a[2] !== null && s[0] !== null) ||
    (a[0] !== null && a[2] !== null && s[1] !== null)
  ) {
    let idxSide, idx1, idx2;
    
    if (a[0] !== null && a[1] !== null && s[2] !== null) {
      idx1 = 0; idx2 = 1; idxSide = 2;
    } else if (a[1] !== null && a[2] !== null && s[0] !== null) {
      idx1 = 1; idx2 = 2; idxSide = 0;
    } else {
      idx1 = 0; idx2 = 2; idxSide = 1;
    }
    
    // Calculate third angle
    const idx3 = 3 - idx1 - idx2; // Index of the unknown angle
    a[idx3] = 180 - a[idx1] - a[idx2];
    
    if (a[idx3] <= 0) {
      return {
        sides: s,
        angles: a,
        isValid: false,
        error: "Invalid triangle: The sum of the two given angles must be less than 180 degrees."
      };
    }
    
    // Convert all angles to radians
    anglesRad[0] = degreesToRadians(a[0]);
    anglesRad[1] = degreesToRadians(a[1]);
    anglesRad[2] = degreesToRadians(a[2]);
    
    // Calculate remaining sides using Law of Sines
    const ratio = s[idxSide] / Math.sin(anglesRad[idxSide]);
    s[idx1] = ratio * Math.sin(anglesRad[idx1]);
    s[idx2] = ratio * Math.sin(anglesRad[idx2]);
  }
  // Case: Two angles and non-included side (AAS)
  else if (
    (a[0] !== null && a[1] !== null && s[0] !== null) ||
    (a[1] !== null && a[2] !== null && s[1] !== null) ||
    (a[0] !== null && a[2] !== null && s[2] !== null)
  ) {
    let idxSide, idx1, idx2;
    
    if (a[0] !== null && a[1] !== null && s[0] !== null) {
      idxSide = 0; idx1 = 0; idx2 = 1;
    } else if (a[1] !== null && a[2] !== null && s[1] !== null) {
      idxSide = 1; idx1 = 1; idx2 = 2;
    } else {
      idxSide = 2; idx1 = 0; idx2 = 2;
    }
    
    // Calculate third angle
    const idx3 = 3 - idx1 - idx2; // Index of the unknown angle
    a[idx3] = 180 - a[idx1] - a[idx2];
    
    if (a[idx3] <= 0) {
      return {
        sides: s,
        angles: a,
        isValid: false,
        error: "Invalid triangle: The sum of the two given angles must be less than 180 degrees."
      };
    }
    
    // Convert all angles to radians
    anglesRad[0] = degreesToRadians(a[0]);
    anglesRad[1] = degreesToRadians(a[1]);
    anglesRad[2] = degreesToRadians(a[2]);
    
    // Calculate remaining sides using Law of Sines
    const ratio = s[idxSide] / Math.sin(anglesRad[idxSide]);
    
    const idx1Side = (idxSide + 1) % 3;
    const idx2Side = (idxSide + 2) % 3;
    
    s[idx1Side] = ratio * Math.sin(anglesRad[idx1Side]);
    s[idx2Side] = ratio * Math.sin(anglesRad[idx2Side]);
  }
  // Case: Two sides and non-included angle (SSA) - ambiguous case
  else if (
    (s[0] !== null && s[1] !== null && a[0] !== null) ||
    (s[1] !== null && s[2] !== null && a[1] !== null) ||
    (s[0] !== null && s[2] !== null && a[2] !== null)
  ) {
    let idxAngle, idxOpp, idxAdj;
    
    if (s[0] !== null && s[1] !== null && a[0] !== null) {
      idxAngle = 0; idxOpp = 0; idxAdj = 1;
    } else if (s[1] !== null && s[2] !== null && a[1] !== null) {
      idxAngle = 1; idxOpp = 1; idxAdj = 2;
    } else {
      idxAngle = 2; idxOpp = 2; idxAdj = 0;
    }
    
    // Convert angle to radians
    const angleRad = degreesToRadians(a[idxAngle]);
    
    // Calculate height
    const h = s[idxAdj] * Math.sin(angleRad);
    
    // Check if triangle is possible
    if (h > s[idxOpp]) {
      return {
        sides: s,
        angles: a,
        isValid: false,
        error: "Invalid triangle: No solution exists for the given values."
      };
    }
    
    // Calculate the third side
    const idx3 = 3 - idxOpp - idxAdj;
    
    // Calculate the other angles
    const angleB = Math.asin(h / s[idxOpp]);
    
    // Two possible solutions in ambiguous case
    if (Math.abs(h - s[idxOpp]) < 0.0001) {
      // One solution (right triangle)
      anglesRad[idxOpp] = Math.PI / 2;
      anglesRad[idx3] = Math.PI - angleRad - anglesRad[idxOpp];
      
      // Calculate the third side
      s[idx3] = Math.sqrt(s[idxOpp]**2 + s[idxAdj]**2 - 2 * s[idxOpp] * s[idxAdj] * Math.cos(anglesRad[idx3]));
    } else if (h < s[idxOpp]) {
      // Two solutions, we'll take the first one
      anglesRad[idxOpp] = angleB;
      anglesRad[idx3] = Math.PI - angleRad - anglesRad[idxOpp];
      
      // Calculate the third side
      s[idx3] = Math.sqrt(s[idxOpp]**2 + s[idxAdj]**2 - 2 * s[idxOpp] * s[idxAdj] * Math.cos(anglesRad[idx3]));
      
      // Note: There's a second solution we're not calculating here
    }
    
    // Convert angles back to degrees
    a[idxOpp] = radiansToDegrees(anglesRad[idxOpp]);
    a[idx3] = radiansToDegrees(anglesRad[idx3]);
  } else {
    return {
      sides: s,
      angles: a,
      isValid: false,
      error: "Insufficient information: Please provide at least 3 values, including at least one side."
    };
  }
  
  // Calculate area and perimeter
  const semiPerimeter = (s[0] + s[1] + s[2]) / 2;
  const area = Math.sqrt(semiPerimeter * (semiPerimeter - s[0]) * (semiPerimeter - s[1]) * (semiPerimeter - s[2]));
  const perimeter = s[0] + s[1] + s[2];
  
  // Determine triangle type
  let triangleType = "Scalene"; // Default
  
  if (Math.abs(s[0] - s[1]) < 0.0001 && Math.abs(s[1] - s[2]) < 0.0001) {
    triangleType = "Equilateral";
  } else if (
    Math.abs(s[0] - s[1]) < 0.0001 || 
    Math.abs(s[1] - s[2]) < 0.0001 || 
    Math.abs(s[0] - s[2]) < 0.0001
  ) {
    triangleType = "Isosceles";
  }
  
  // Round values for display
  const roundedSides = s.map(side => round(side));
  const roundedAngles = a.map(angle => round(angle));
  
  return {
    sides: roundedSides,
    angles: roundedAngles,
    area: round(area),
    perimeter: round(perimeter),
    triangleType,
    isValid: true
  };
};

// Determine if we have enough information to calculate
export const hasEnoughInformation = (sides, angles) => {
  const sideCount = sides.filter(side => side !== null && side > 0).length;
  const angleCount = angles.filter(angle => angle !== null && angle > 0).length;
  
  return sideCount + angleCount >= 3 && sideCount >= 1;
};

// Validate individual inputs
export const validateInput = (value, isAngle = false) => {
  if (value === null || value === '') return null;
  
  const numValue = parseFloat(value);
  
  if (isNaN(numValue) || numValue <= 0) {
    return {
      isValid: false,
      error: "Please enter a positive number."
    };
  }
  
  if (isAngle && numValue >= 180) {
    return {
      isValid: false,
      error: "Angle must be less than 180 degrees."
    };
  }
  
  return {
    isValid: true,
    value: numValue
  };
};
