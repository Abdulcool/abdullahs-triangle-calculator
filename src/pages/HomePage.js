import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">
            Interactive Triangle Calculator
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Calculate triangle properties and visualize them in real-time with our easy-to-use geometry tool.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/calculator" className="btn-primary text-lg px-6 py-3">
              Try Calculator
            </Link>
            <Link to="/about" className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Enter Values</h3>
              <p className="text-gray-600">
                Input any combination of sides and angles (at least 3 values with 1 side).
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Calculate</h3>
              <p className="text-gray-600">
                Our tool automatically calculates all remaining sides, angles, area, and perimeter.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Visualize</h3>
              <p className="text-gray-600">
                See a to-scale drawing of your triangle with labeled sides and angles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl my-8">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to solve triangle problems?</h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Our calculator handles all triangle cases: SSS, SAS, ASA, AAS, and SSA.
          </p>
          <Link to="/calculator" className="bg-white text-primary hover:bg-blue-50 font-medium py-3 px-8 rounded-lg transition-colors text-lg">
            Open Calculator
          </Link>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Perfect For</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card flex items-start">
              <div className="mr-4 mt-1 text-2xl">👨‍🎓</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Students</h3>
                <p className="text-gray-600">
                  Check your homework, understand triangle properties, and visualize geometric concepts.
                </p>
              </div>
            </div>
            
            <div className="card flex items-start">
              <div className="mr-4 mt-1 text-2xl">👩‍🏫</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Teachers</h3>
                <p className="text-gray-600">
                  Demonstrate triangle concepts in class with an interactive visual tool.
                </p>
              </div>
            </div>
            
            <div className="card flex items-start">
              <div className="mr-4 mt-1 text-2xl">👷‍♀️</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Engineers</h3>
                <p className="text-gray-600">
                  Quickly solve triangulation problems for practical applications.
                </p>
              </div>
            </div>
            
            <div className="card flex items-start">
              <div className="mr-4 mt-1 text-2xl">🏠</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">DIY Enthusiasts</h3>
                <p className="text-gray-600">
                  Calculate measurements for home projects involving triangular shapes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
