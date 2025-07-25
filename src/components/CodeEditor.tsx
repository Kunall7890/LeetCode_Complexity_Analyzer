import React from 'react';

interface CodeEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
  language: string;
}

export function CodeEditor({ code, onCodeChange, language }: CodeEditorProps) {
  const getPlaceholder = (lang: string) => {
    const placeholders = {
      javascript: `// Example: Two Sum problem
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
      python: `# Example: Two Sum problem
def two_sum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`,
      java: `// Example: Two Sum problem
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }
}`,
      cpp: `// Example: Two Sum problem
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (map.find(complement) != map.end()) {
                return {map[complement], i};
            }
            map[nums[i]] = i;
        }
        return {};
    }
};`
    };
    
    return placeholders[lang as keyof typeof placeholders] || placeholders.javascript;
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Code:
      </label>
      <textarea
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        placeholder={getPlaceholder(language)}
        className="w-full h-80 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm bg-gray-50 resize-none"
        spellCheck={false}
      />
    </div>
  );
}