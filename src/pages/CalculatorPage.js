import React, { useState, useEffect } from 'react';
import { calculateTriangle, validateInput, hasEnoughInformation } from '../utils/triangleCalculations';
import TriangleDrawing from '../components/TriangleDrawing';

const CalculatorPage = () => {
  // State for sides and angles
  const [sides, setSides] = useState([null, null, null]);
  const [angles, setAngles] = useState([null, null, null]);
  
  // State for input validation
  const [inputErrors, setInputErrors] = useState({
    sideA: null, sideB: null, sideC: null,
    angleA: null, angleB: null, angleC: null
  });
  
  // State for calculation results
  const [results, setResults] = useState(null);
  
  // Effect to calculate triangle when inputs change
  useEffect(() => {
    if (hasEnoughInformation(sides, angles)) {
      const calculationResults = calculateTriangle(sides, angles);
      setResults(calculationResults);
    } else {
      setResults(null);
    }
  }, [sides, angles]);
  
  // Handle input changes
  const handleInputChange = (type, index, value) => {
    const isAngle = type === 'angle';
    const validation = validateInput(value, isAngle);
    
    // Update validation errors
    setInputErrors(prev => ({
      ...prev,
      [`${type === 'side' ? 'side' : 'angle'}${['A', 'B', 'C'][index]}`]: 
        validation && !validation.isValid ? validation.error : null
    }));
    
    // Update state if valid or empty
    if (!value) {
      if (type === 'side') {
        setSides(prev => {
          const newSides = [...prev];
          newSides[index] = null;
          return newSides;
        });
      } else {
        setAngles(prev => {
          const newAngles = [...prev];
          newAngles[index] = null;
          return newAngles;
        });
      }
    } else if (validation && validation.isValid) {
      if (type === 'side') {
        setSides(prev => {
          const newSides = [...prev];
          newSides[index] = validation.value;
          return newSides;
        });
      } else {
        setAngles(prev => {
          const newAngles = [...prev];
          newAngles[index] = validation.value;
          return newAngles;
        });
      }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Triangle Calculator</h1>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div>
            <div className="card mb-6">
              <h2 className="text-xl font-semibold mb-4">Enter Triangle Values</h2>
              <p className="text-gray-600 mb-4">
                Enter at least 3 values (including at least one side) to calculate the triangle.
              </p>
              
              {/* Sides Inputs */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-primary mb-3">Sides</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Side A */}
                  <div className="card bg-blue-50 p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Side a
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        className={`input-field ${inputErrors.sideA ? 'border-red-500' : ''}`}
                        placeholder="Enter length"
                        value={sides[0] === null ? '' : sides[0]}
                        onChange={(e) => handleInputChange('side', 0, e.target.value)}
                        min="0"
                        step="any"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500">units</span>
                      </div>
                    </div>
                    {inputErrors.sideA && (
                      <p className="mt-1 text-sm text-red-600">{inputErrors.sideA}</p>
                    )}
                  </div>
                  
                  {/* Side B */}
                  <div className="card bg-blue-50 p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Side b
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        className={`input-field ${inputErrors.sideB ? 'border-red-500' : ''}`}
                        placeholder="Enter length"
                        value={sides[1] === null ? '' : sides[1]}
                        onChange={(e) => handleInputChange('side', 1, e.target.value)}
                        min="0"
                        step="any"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500">units</span>
                      </div>
                    </div>
                    {inputErrors.sideB && (
                      <p className="mt-1 text-sm text-red-600">{inputErrors.sideB}</p>
                    )}
                  </div>
                  
                  {/* Side C */}
                  <div className="card bg-blue-50 p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Side c
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        className={`input-field ${inputErrors.sideC ? 'border-red-500' : ''}`}
                        placeholder="Enter length"
                        value={sides[2] === null ? '' : sides[2]}
                        onChange={(e) => handleInputChange('side', 2, e.target.value)}
                        min="0"
                        step="any"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500">units</span>
                      </div>
                    </div>
                    {inputErrors.sideC && (
                      <p className="mt-1 text-sm text-red-600">{inputErrors.sideC}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Angles Inputs */}
              <div>
                <h3 className="text-lg font-medium text-primary mb-3">Angles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Angle A */}
                  <div className="card bg-purple-50 p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Angle α
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        className={`input-field ${inputErrors.angleA ? 'border-red-500' : ''}`}
                        placeholder="Enter angle"
                        value={angles[0] === null ? '' : angles[0]}
                        onChange={(e) => handleInputChange('angle', 0, e.target.value)}
                        min="0"
                        max="179.99"
                        step="any"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500">°</span>
                      </div>
                    </div>
                    {inputErrors.angleA && (
                      <p className="mt-1 text-sm text-red-600">{inputErrors.angleA}</p>
                    )}
                  </div>
                  
                  {/* Angle B */}
                  <div className="card bg-purple-50 p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Angle β
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        className={`input-field ${inputErrors.angleB ? 'border-red-500' : ''}`}
                        placeholder="Enter angle"
                        value={angles[1] === null ? '' : angles[1]}
                        onChange={(e) => handleInputChange('angle', 1, e.target.value)}
                        min="0"
                        max="179.99"
                        step="any"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500">°</span>
                      </div>
                    </div>
                    {inputErrors.angleB && (
                      <p className="mt-1 text-sm text-red-600">{inputErrors.angleB}</p>
                    )}
                  </div>
                  
                  {/* Angle C */}
                  <div className="card bg-purple-50 p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Angle γ
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        className={`input-field ${inputErrors.angleC ? 'border-red-500' : ''}`}
                        placeholder="Enter angle"
                        value={angles[2] === null ? '' : angles[2]}
                        onChange={(e) => handleInputChange('angle', 2, e.target.value)}
                        min="0"
                        max="179.99"
                        step="any"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500">°</span>
                      </div>
                    </div>
                    {inputErrors.angleC && (
                      <p className="mt-1 text-sm text-red-600">{inputErrors.angleC}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Results Section */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Results</h2>
              
              {!hasEnoughInformation(sides, angles) ? (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Please enter at least 3 values, including at least one side.
                      </p>
                    </div>
                  </div>
                </div>
              ) : results && !results.isValid ? (
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">
                        {results.error}
                      </p>
                    </div>
                  </div>
                </div>
              ) : results && results.isValid ? (
                <div className="space-y-6">
                  {/* Sides Results */}
                  <div>
                    <h3 className="text-lg font-medium text-primary mb-2">Sides</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <span className="block text-sm text-gray-500">Side a</span>
                        <span className="text-lg font-medium">{results.sides[0]}</span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <span className="block text-sm text-gray-500">Side b</span>
                        <span className="text-lg font-medium">{results.sides[1]}</span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <span className="block text-sm text-gray-500">Side c</span>
                        <span className="text-lg font-medium">{results.sides[2]}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Angles Results */}
                  <div>
                    <h3 className="text-lg font-medium text-primary mb-2">Angles</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <span className="block text-sm text-gray-500">Angle α</span>
                        <span className="text-lg font-medium">{results.angles[0]}°</span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <span className="block text-sm text-gray-500">Angle β</span>
                        <span className="text-lg font-medium">{results.angles[1]}°</span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <span className="block text-sm text-gray-500">Angle γ</span>
                        <span className="text-lg font-medium">{results.angles[2]}°</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Properties */}
                  <div>
                    <h3 className="text-lg font-medium text-primary mb-2">Properties</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <span className="block text-sm text-gray-500">Triangle Type</span>
                        <span className="text-lg font-medium">{results.triangleType}</span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <span className="block text-sm text-gray-500">Area</span>
                        <span className="text-lg font-medium">{results.area}</span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <span className="block text-sm text-gray-500">Perimeter</span>
                        <span className="text-lg font-medium">{results.perimeter}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          
          {/* Triangle Visualization */}
          <div className="card h-full flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Triangle Visualization</h2>
            
            <div className="flex-grow flex items-center justify-center bg-gray-50 rounded-xl p-4">
              {results && results.isValid ? (
                <TriangleDrawing 
                  sides={results.sides} 
                  angles={results.angles} 
                />
              ) : (
                <div className="text-center text-gray-500">
                  <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="mt-4">Enter valid triangle values to see visualization</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
