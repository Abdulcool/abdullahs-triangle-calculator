import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">About Triangle Calculator</h1>
        
        {/* How to Use Section */}
        <section className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Use the Calculator</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-primary mb-2">Required Inputs</h3>
              <p className="text-gray-700">
                To calculate a triangle, you need to provide at least 3 values, and at least one of them must be a side length. 
                The calculator supports all standard triangle cases:
              </p>
              <ul className="list-disc list-inside mt-2 ml-4 text-gray-700">
                <li><strong>SSS</strong> - Three sides</li>
                <li><strong>SAS</strong> - Two sides and the included angle</li>
                <li><strong>ASA</strong> - Two angles and the included side</li>
                <li><strong>AAS</strong> - Two angles and a non-included side</li>
                <li><strong>SSA</strong> - Two sides and a non-included angle (may have 0, 1, or 2 solutions)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-primary mb-2">Step-by-Step Instructions</h3>
              <ol className="list-decimal list-inside mt-2 ml-4 text-gray-700">
                <li>Enter the values you know in the corresponding input fields</li>
                <li>The calculator will automatically validate your inputs</li>
                <li>Once you have entered sufficient information, the remaining values will be calculated</li>
                <li>A visual representation of your triangle will be displayed</li>
                <li>You can adjust your inputs to see how the triangle changes</li>
              </ol>
            </div>
          </div>
        </section>
        
        {/* Trigonometry Explanation */}
        <section className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">Understanding the Math</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-primary mb-2">Law of Sines</h3>
              <p className="text-gray-700">
                The Law of Sines states that the ratio of the length of a side to the sine of the opposite angle is constant for all sides and angles in a triangle:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg text-center my-3">
                <span className="text-xl font-medium">a/sin(α) = b/sin(β) = c/sin(γ)</span>
              </div>
              <p className="text-gray-700">
                This law is particularly useful for solving triangles when we know:
              </p>
              <ul className="list-disc list-inside mt-2 ml-4 text-gray-700">
                <li>Two angles and one side (AAS or ASA)</li>
                <li>Two sides and the angle opposite to one of them (SSA)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-primary mb-2">Law of Cosines</h3>
              <p className="text-gray-700">
                The Law of Cosines relates the lengths of the sides of a triangle to the cosine of one of its angles:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg text-center my-3">
                <p className="text-xl font-medium mb-2">c² = a² + b² - 2ab·cos(γ)</p>
                <p className="text-xl font-medium mb-2">b² = a² + c² - 2ac·cos(β)</p>
                <p className="text-xl font-medium">a² = b² + c² - 2bc·cos(α)</p>
              </div>
              <p className="text-gray-700">
                This law is particularly useful for solving triangles when we know:
              </p>
              <ul className="list-disc list-inside mt-2 ml-4 text-gray-700">
                <li>Three sides (SSS)</li>
                <li>Two sides and the included angle (SAS)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-primary mb-2">Area Calculation</h3>
              <p className="text-gray-700">
                The area of a triangle can be calculated using several formulas:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg my-3">
                <p className="text-lg mb-2"><strong>Using base and height:</strong> Area = (1/2) × base × height</p>
                <p className="text-lg mb-2"><strong>Using sides (Heron's formula):</strong> Area = √(s(s-a)(s-b)(s-c)) where s = (a+b+c)/2</p>
                <p className="text-lg"><strong>Using two sides and included angle:</strong> Area = (1/2) × a × b × sin(γ)</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="card">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium text-primary mb-2">Why is my triangle invalid?</h3>
              <p className="text-gray-700">
                A triangle might be invalid for several reasons:
              </p>
              <ul className="list-disc list-inside mt-2 ml-4 text-gray-700">
                <li>The sum of any two sides must be greater than the third side</li>
                <li>The sum of all angles must equal 180 degrees</li>
                <li>All sides must have positive lengths</li>
                <li>All angles must be between 0 and 180 degrees</li>
                <li>In the SSA case, there might be no valid triangle for the given values</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-primary mb-2">What units should I use?</h3>
              <p className="text-gray-700">
                You can use any consistent unit for the sides (e.g., cm, inches, meters). 
                The calculator doesn't enforce specific units, but make sure you use the same unit for all sides.
                Angles should be entered in degrees.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-primary mb-2">How accurate are the calculations?</h3>
              <p className="text-gray-700">
                The calculator uses standard JavaScript math functions and provides results with high precision.
                However, due to the nature of floating-point arithmetic, there might be small rounding errors in some cases.
                For educational and practical purposes, the results are more than accurate enough.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-primary mb-2">Can I calculate obtuse triangles?</h3>
              <p className="text-gray-700">
                Yes, the calculator can handle all types of triangles: acute (all angles less than 90°), 
                right (one angle equals 90°), and obtuse (one angle greater than 90°).
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
