import React, { useState } from 'react';
import { LanguageSelector } from './components/LanguageSelector';
import { CodeEditor } from './components/CodeEditor';
import { ComplexityGraph } from './components/ComplexityGraph';
import { AnalysisResults } from './components/AnalysisResults';
import { analyzeComplexity } from './utils/complexityAnalyzer';

export interface ComplexityResult {
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
  confidence: number;
}

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [analysisResult, setAnalysisResult] = useState<ComplexityResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const result = analyzeComplexity(code, selectedLanguage);
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            LeetCode Complexity Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Analyze the time and space complexity of your algorithms with detailed explanations and visual representations
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Code Input */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Code Analysis
                </h2>
                <LanguageSelector
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={setSelectedLanguage}
                />
              </div>
              <div className="p-6">
                <CodeEditor
                  code={code}
                  onCodeChange={setCode}
                  language={selectedLanguage}
                />
                <button
                  onClick={handleAnalyze}
                  disabled={!code.trim() || isAnalyzing}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <span>Analyze Complexity</span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="space-y-6">
            <ComplexityGraph />
            {analysisResult && (
              <AnalysisResults result={analysisResult} />
            )}
            {!analysisResult && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Ready to Analyze
                </h3>
                <p className="text-gray-500">
                  Paste your code and click "Analyze Complexity" to get detailed time and space complexity analysis
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;