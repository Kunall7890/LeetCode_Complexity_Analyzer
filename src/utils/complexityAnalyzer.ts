import { ComplexityResult } from '../App';

export function analyzeComplexity(code: string, language: string): ComplexityResult {
  // This is a simplified complexity analyzer for demonstration
  // In a real implementation, you would use AST parsing and more sophisticated analysis
  
  const codeLines = code.toLowerCase().trim().split('\n');
  const codeText = codeLines.join(' ');
  
  let timeComplexity = 'O(n)';
  let spaceComplexity = 'O(1)';
  let explanation = '';
  let confidence = 85;

  // Detect nested loops
  const forLoopCount = (codeText.match(/for\s*\(/g) || []).length;
  const whileLoopCount = (codeText.match(/while\s*\(/g) || []).length;
  const totalLoops = forLoopCount + whileLoopCount;

  // Detect data structures
  const hasHashMap = /map|dict|hashmap|hash|set/.test(codeText);
  const hasArray = /array|list|\[\]|vector/.test(codeText);
  const hasRecursion = /recursive|recursion/.test(codeText) || 
                      codeText.includes('return') && codeText.includes('(');

  // Analyze time complexity
  if (totalLoops >= 3) {
    timeComplexity = 'O(n³)';
    explanation = 'The algorithm contains three or more nested loops, resulting in cubic time complexity. ';
    confidence = 90;
  } else if (totalLoops === 2) {
    timeComplexity = 'O(n²)';
    explanation = 'The algorithm contains two nested loops, resulting in quadratic time complexity. ';
    confidence = 92;
  } else if (totalLoops === 1) {
    if (/sort|sorted/.test(codeText)) {
      timeComplexity = 'O(n log n)';
      explanation = 'The algorithm uses sorting which typically has O(n log n) complexity, combined with a single loop. ';
      confidence = 88;
    } else {
      timeComplexity = 'O(n)';
      explanation = 'The algorithm contains a single loop that iterates through the input, resulting in linear time complexity. ';
      confidence = 90;
    }
  } else if (hasRecursion && /binary|divide|split/.test(codeText)) {
    timeComplexity = 'O(log n)';
    explanation = 'The algorithm uses divide-and-conquer approach with binary search-like behavior, resulting in logarithmic time complexity. ';
    confidence = 85;
  } else if (hasRecursion) {
    timeComplexity = 'O(2ⁿ)';
    explanation = 'The algorithm uses recursion without memoization, likely resulting in exponential time complexity. ';
    confidence = 80;
  } else if (hasHashMap && totalLoops <= 1) {
    timeComplexity = 'O(n)';
    explanation = 'The algorithm uses hash-based lookups with a single pass through the data, resulting in linear time complexity. ';
    confidence = 88;
  } else {
    timeComplexity = 'O(1)';
    explanation = 'The algorithm performs constant-time operations without loops or recursion, resulting in constant time complexity. ';
    confidence = 85;
  }

  // Analyze space complexity
  if (hasRecursion) {
    if (/binary|divide|split/.test(codeText)) {
      spaceComplexity = 'O(log n)';
      explanation += 'The space complexity is O(log n) due to the recursion call stack in the divide-and-conquer approach.';
    } else {
      spaceComplexity = 'O(n)';
      explanation += 'The space complexity is O(n) due to the recursion call stack that can grow up to the input size.';
    }
  } else if (hasHashMap || hasArray) {
    if (/map|dict|hashmap|hash|set/.test(codeText) && /\.put|\.set|\.add|\[.*\]\s*=/.test(codeText)) {
      spaceComplexity = 'O(n)';
      explanation += 'The space complexity is O(n) due to additional data structures (hash map/set) that store up to n elements.';
    } else {
      spaceComplexity = 'O(1)';
      explanation += 'The space complexity is O(1) as only a constant amount of extra space is used.';
    }
  } else {
    spaceComplexity = 'O(1)';
    explanation += 'The space complexity is O(1) as the algorithm uses only a constant amount of extra space.';
  }

  // Special cases based on common patterns
  if (codeText.includes('two sum') || codeText.includes('twosum')) {
    timeComplexity = 'O(n)';
    spaceComplexity = 'O(n)';
    explanation = 'This is a Two Sum problem implementation. The time complexity is O(n) because we iterate through the array once, using a hash map for O(1) lookups. The space complexity is O(n) for storing up to n elements in the hash map.';
    confidence = 95;
  }

  return {
    timeComplexity,
    spaceComplexity,
    explanation,
    confidence
  };
}