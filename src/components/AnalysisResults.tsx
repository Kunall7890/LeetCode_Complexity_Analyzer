import React from 'react';
import { Clock, Database, TrendingUp } from 'lucide-react';
import { ComplexityResult } from '../App';

interface AnalysisResultsProps {
  result: ComplexityResult;
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const getComplexityColor = (complexity: string) => {
    const colorMap: { [key: string]: string } = {
      'O(1)': 'text-green-600 bg-green-50 border-green-200',
      'O(log n)': 'text-cyan-600 bg-cyan-50 border-cyan-200',
      'O(n)': 'text-blue-600 bg-blue-50 border-blue-200',
      'O(n log n)': 'text-purple-600 bg-purple-50 border-purple-200',
      'O(n²)': 'text-yellow-600 bg-yellow-50 border-yellow-200',
      'O(n³)': 'text-orange-600 bg-orange-50 border-orange-200',
      'O(2ⁿ)': 'text-red-600 bg-red-50 border-red-200',
    };
    return colorMap[complexity] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Analysis Results
      </h3>

      <div className="space-y-6">
        {/* Time Complexity */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h4 className="font-semibold text-gray-900">Time Complexity:</h4>
              <span className={`px-3 py-1 rounded-full text-sm font-mono font-semibold border ${getComplexityColor(result.timeComplexity)}`}>
                {result.timeComplexity}
              </span>
            </div>
          </div>
        </div>

        {/* Space Complexity */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 p-2 bg-purple-100 rounded-lg">
            <Database className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h4 className="font-semibold text-gray-900">Space Complexity:</h4>
              <span className={`px-3 py-1 rounded-full text-sm font-mono font-semibold border ${getComplexityColor(result.spaceComplexity)}`}>
                {result.spaceComplexity}
              </span>
            </div>
          </div>
        </div>

        {/* Confidence */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h4 className="font-semibold text-gray-900">Confidence:</h4>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getConfidenceColor(result.confidence)}`}>
                {result.confidence}%
              </span>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-gray-900 mb-3">Explanation:</h4>
          <div className="prose prose-sm text-gray-600 leading-relaxed">
            {result.explanation.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-3 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}