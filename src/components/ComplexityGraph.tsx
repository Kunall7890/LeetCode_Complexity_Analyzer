import React, { useState } from 'react';

export function ComplexityGraph() {
  const [hoveredComplexity, setHoveredComplexity] = useState<string | null>(null);

  const complexities = [
    { 
      name: 'O(1)', 
      color: '#10b981', 
      description: 'Constant',
      performance: 'Excellent',
      examples: 'Array access, hash table lookup'
    },
    { 
      name: 'O(log n)', 
      color: '#06b6d4', 
      description: 'Logarithmic',
      performance: 'Very Good',
      examples: 'Binary search, balanced tree operations'
    },
    { 
      name: 'O(n)', 
      color: '#3b82f6', 
      description: 'Linear',
      performance: 'Good',
      examples: 'Array traversal, simple search'
    },
    { 
      name: 'O(n log n)', 
      color: '#8b5cf6', 
      description: 'Linearithmic',
      performance: 'Fair',
      examples: 'Merge sort, heap sort'
    },
    { 
      name: 'O(n²)', 
      color: '#f59e0b', 
      description: 'Quadratic',
      performance: 'Poor',
      examples: 'Bubble sort, nested loops'
    },
    { 
      name: 'O(n³)', 
      color: '#f97316', 
      description: 'Cubic',
      performance: 'Very Poor',
      examples: 'Triple nested loops'
    },
    { 
      name: 'O(2ⁿ)', 
      color: '#ef4444', 
      description: 'Exponential',
      performance: 'Terrible',
      examples: 'Recursive fibonacci, subset generation'
    },
  ];

  const generatePath = (complexity: string, width: number, height: number) => {
    const points = [];
    const steps = 50;
    
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * width;
      const n = (i / steps) * 10 + 1; // Input size from 1 to 11
      let y;
      
      switch (complexity) {
        case 'O(1)':
          y = height * 0.9; // Constant line near bottom
          break;
        case 'O(log n)':
          y = height * (0.9 - 0.3 * Math.log2(n) / Math.log2(11));
          break;
        case 'O(n)':
          y = height * (0.9 - 0.7 * (n - 1) / 10);
          break;
        case 'O(n log n)':
          y = height * (0.9 - 0.75 * (n * Math.log2(n)) / (11 * Math.log2(11)));
          break;
        case 'O(n²)':
          y = height * (0.9 - 0.8 * Math.pow(n - 1, 2) / Math.pow(10, 2));
          break;
        case 'O(n³)':
          y = height * (0.9 - 0.85 * Math.pow(n - 1, 3) / Math.pow(10, 3));
          break;
        case 'O(2ⁿ)':
          const exponential = Math.pow(2, (n - 1) / 2);
          y = height * (0.9 - 0.88 * exponential / Math.pow(2, 5));
          break;
        default:
          y = height * 0.5;
      }
      
      points.push(`${x},${Math.max(0, Math.min(height, y))}`);
    }
    
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Big O Complexity Chart
      </h3>
      
      {/* Interactive Graph */}
      <div className="relative h-80 mb-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg border border-gray-200 overflow-hidden">
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="40" height="32" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 32" fill="none" stroke="#94a3b8" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Axis labels */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-600 bg-white px-2 py-1 rounded shadow-sm">
          Input Size (n)
        </div>
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-gray-600 bg-white px-2 py-1 rounded shadow-sm">
          Operations
        </div>
        
        {/* Performance zones */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-red-100/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-green-100/50 to-transparent"></div>
        </div>

        {/* Complexity curves */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 240">
          {complexities.map((complexity, index) => (
            <g key={complexity.name}>
              <path
                d={generatePath(complexity.name, 320, 240)}
                stroke={complexity.color}
                strokeWidth={hoveredComplexity === complexity.name ? "4" : "3"}
                fill="none"
                className="transition-all duration-200 drop-shadow-sm"
                style={{
                  filter: hoveredComplexity && hoveredComplexity !== complexity.name 
                    ? 'opacity(0.3)' 
                    : 'opacity(1)',
                }}
              />
              {/* Curve label */}
              <text
                x={280}
                y={20 + index * 25}
                fill={complexity.color}
                fontSize="12"
                fontWeight="600"
                className="font-mono"
              >
                {complexity.name}
              </text>
            </g>
          ))}
        </svg>

        {/* Performance indicators */}
        <div className="absolute top-4 right-4 text-xs text-gray-500 space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-200 rounded-full"></div>
            <span>Poor Performance</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-200 rounded-full"></div>
            <span>Good Performance</span>
          </div>
        </div>
      </div>

      {/* Interactive Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {complexities.map((complexity) => (
          <div 
            key={complexity.name} 
            className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
              hoveredComplexity === complexity.name 
                ? 'border-current shadow-lg scale-105' 
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
            style={{ 
              borderColor: hoveredComplexity === complexity.name ? complexity.color : undefined,
              backgroundColor: hoveredComplexity === complexity.name ? `${complexity.color}08` : undefined
            }}
            onMouseEnter={() => setHoveredComplexity(complexity.name)}
            onMouseLeave={() => setHoveredComplexity(null)}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div 
                className="w-4 h-4 rounded-full shadow-sm"
                style={{ backgroundColor: complexity.color }}
              />
              <div className="font-mono text-sm font-bold text-gray-900">
                {complexity.name}
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                complexity.performance === 'Excellent' ? 'bg-green-100 text-green-800' :
                complexity.performance === 'Very Good' ? 'bg-blue-100 text-blue-800' :
                complexity.performance === 'Good' ? 'bg-cyan-100 text-cyan-800' :
                complexity.performance === 'Fair' ? 'bg-purple-100 text-purple-800' :
                complexity.performance === 'Poor' ? 'bg-yellow-100 text-yellow-800' :
                complexity.performance === 'Very Poor' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {complexity.performance}
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1 font-medium">
              {complexity.description}
            </div>
            <div className="text-xs text-gray-500 leading-relaxed">
              {complexity.examples}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
            <span className="text-white text-xs font-bold">i</span>
          </div>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Understanding Big O Notation</p>
            <p className="text-blue-700">
              Big O describes the worst-case time complexity as input size grows. 
              Lower curves indicate better performance for large datasets.
              {hoveredComplexity && (
                <span className="font-medium"> Currently viewing: {hoveredComplexity}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}