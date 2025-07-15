// CodeSentry MVP - AI Code Review Application

class CodeSentry {
    constructor() {
        this.analyzeBtn = document.getElementById('analyzeBtn');
        this.codeInput = document.getElementById('codeInput');
        this.languageSelect = document.getElementById('language');
        this.resultsSection = document.getElementById('resultsSection');
        this.scoreText = document.getElementById('scoreText');
        this.scoreCircle = document.getElementById('scoreCircle');
        this.scoreDescription = document.getElementById('scoreDescription');
        this.issuesList = document.getElementById('issuesList');
        this.recommendationsList = document.getElementById('recommendationsList');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.analyzeBtn.addEventListener('click', () => this.analyzeCode());
        
        // Add some sample code for different languages
        this.languageSelect.addEventListener('change', (e) => {
            this.updateSampleCode(e.target.value);
        });
    }

    updateSampleCode(language) {
        const sampleCodes = {
            javascript: `function calculateTotal(items) {
    var total = 0;
    for (var i = 0; i < items.length; i++) {
        total += items[i].price;
    }
    return total;
}

// Usage
const items = [{price: 10}, {price: 20}, {price: 30}];
console.log(calculateTotal(items));`,
            python: `def calculate_total(items):
    total = 0
    for item in items:
        total += item['price']
    return total

# Usage
items = [{'price': 10}, {'price': 20}, {'price': 30}]
print(calculate_total(items))`,
            java: `public class Calculator {
    public static int calculateTotal(Item[] items) {
        int total = 0;
        for (int i = 0; i < items.length; i++) {
            total += items[i].getPrice();
        }
        return total;
    }
}`,
            typescript: `interface Item {
    price: number;
}

function calculateTotal(items: Item[]): number {
    let total = 0;
    for (const item of items) {
        total += item.price;
    }
    return total;
}`,
            react: `import React, { useState } from 'react';

function PriceCalculator({ items }) {
    const [total, setTotal] = useState(0);
    
    const calculateTotal = () => {
        let sum = 0;
        for (let i = 0; i < items.length; i++) {
            sum += items[i].price;
        }
        setTotal(sum);
    };

    return (
        <div>
            <button onClick={calculateTotal}>Calculate</button>
            <p>Total: ${total}</p>
        </div>
    );
}`
        };

        if (sampleCodes[language]) {
            this.codeInput.value = sampleCodes[language];
        }
    }

    async analyzeCode() {
        const code = this.codeInput.value.trim();
        const language = this.languageSelect.value;

        if (!code) {
            alert('Please enter some code to analyze');
            return;
        }

        // Show loading state
        this.analyzeBtn.disabled = true;
        this.analyzeBtn.innerHTML = `
            <svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
        `;

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Mock AI analysis results
            const analysis = this.generateMockAnalysis(code, language);
            this.displayResults(analysis);
            
        } catch (error) {
            console.error('Analysis failed:', error);
            alert('Analysis failed. Please try again.');
        } finally {
            // Reset button state
            this.analyzeBtn.disabled = false;
            this.analyzeBtn.innerHTML = `
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Analyze Code
            `;
        }
    }

    generateMockAnalysis(code, language) {
        // Mock AI analysis logic
        const codeLength = code.length;
        const complexity = this.calculateComplexity(code);
        const issues = this.detectIssues(code, language);
        const recommendations = this.generateRecommendations(code, language, issues);
        
        // Calculate quality score (0-100)
        let score = 85;
        score -= issues.length * 10;
        score -= complexity * 5;
        score = Math.max(20, Math.min(100, score));

        return {
            score,
            complexity,
            issues,
            recommendations,
            language
        };
    }

    calculateComplexity(code) {
        // Simple complexity calculation
        const loops = (code.match(/for\s*\(|while\s*\(|forEach/g) || []).length;
        const conditions = (code.match(/if\s*\(|else\s*if/g) || []).length;
        const functions = (code.match(/function\s+\w+|=>\s*{|def\s+\w+/g) || []).length;
        
        return Math.min(10, loops + conditions + functions);
    }

    detectIssues(code, language) {
        const issues = [];

        // Check for var usage in JavaScript
        if (language === 'javascript' && code.includes('var ')) {
            issues.push({
                type: 'warning',
                title: 'Use of var keyword',
                description: 'Consider using let or const instead of var for better scoping',
                line: this.findLineNumber(code, 'var'),
                severity: 'medium'
            });
        }

        // Check for console.log
        if (code.includes('console.log')) {
            issues.push({
                type: 'info',
                title: 'Console logging detected',
                description: 'Remove console.log statements before production',
                line: this.findLineNumber(code, 'console.log'),
                severity: 'low'
            });
        }

        // Check for C-style loops
        if (code.includes('for (')) {
            issues.push({
                type: 'suggestion',
                title: 'Consider modern iteration methods',
                description: 'Use forEach, map, or for...of loops for better readability',
                line: this.findLineNumber(code, 'for ('),
                severity: 'low'
            });
        }

        // Check for missing error handling
        if (!code.includes('try') && !code.includes('catch') && code.length > 200) {
            issues.push({
                type: 'warning',
                title: 'Missing error handling',
                description: 'Consider adding try-catch blocks for better error handling',
                line: 1,
                severity: 'medium'
            });
        }

        // Check for long functions
        const lines = code.split('\n');
        if (lines.length > 20) {
            issues.push({
                type: 'warning',
                title: 'Function too long',
                description: 'Consider breaking this function into smaller, more focused functions',
                line: 1,
                severity: 'medium'
            });
        }

        return issues;
    }

    findLineNumber(code, searchTerm) {
        const lines = code.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(searchTerm)) {
                return i + 1;
            }
        }
        return 1;
    }

    generateRecommendations(code, language, issues) {
        const recommendations = [];

        if (language === 'javascript') {
            recommendations.push({
                title: 'Use modern ES6+ features',
                description: 'Consider using arrow functions, destructuring, and template literals',
                priority: 'medium',
                example: 'const sum = arr.reduce((acc, curr) => acc + curr, 0);'
            });
        }

        if (issues.some(issue => issue.title.includes('var'))) {
            recommendations.push({
                title: 'Replace var with let/const',
                description: 'Use const for values that don\'t change, let for variables that do',
                priority: 'high',
                example: 'const total = 0; // for constants\nlet counter = 0; // for variables'
            });
        }

        recommendations.push({
            title: 'Add type annotations',
            description: 'Consider using TypeScript or JSDoc for better type safety',
            priority: 'medium',
            example: '/**\n * @param {Array<Object>} items\n * @returns {number}\n */'
        });

        recommendations.push({
            title: 'Implement input validation',
            description: 'Add validation to ensure inputs are correct type and format',
            priority: 'high',
            example: 'if (!Array.isArray(items)) throw new Error("Items must be an array");'
        });

        return recommendations;
    }

    displayResults(analysis) {
        // Show results section
        this.resultsSection.classList.remove('hidden');
        
        // Update quality score
        this.updateQualityScore(analysis.score);
        
        // Display issues
        this.displayIssues(analysis.issues);
        
        // Display recommendations
        this.displayRecommendations(analysis.recommendations);
        
        // Scroll to results
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    updateQualityScore(score) {
        this.scoreText.textContent = score;
        
        // Update circle progress
        const circumference = 2 * Math.PI * 15.9155;
        const progress = (score / 100) * circumference;
        this.scoreCircle.style.strokeDasharray = circumference;
        this.scoreCircle.style.strokeDashoffset = circumference - progress;
        
        // Update color based on score
        if (score >= 80) {
            this.scoreCircle.style.stroke = '#10b981'; // green
            this.scoreDescription.textContent = 'Excellent code quality';
        } else if (score >= 60) {
            this.scoreCircle.style.stroke = '#f59e0b'; // yellow
            this.scoreDescription.textContent = 'Good code quality';
        } else {
            this.scoreCircle.style.stroke = '#ef4444'; // red
            this.scoreDescription.textContent = 'Needs improvement';
        }
    }

    displayIssues(issues) {
        if (issues.length === 0) {
            this.issuesList.innerHTML = '<p class="text-gray-500 text-center py-4">No issues found! Great job!</p>';
            return;
        }

        this.issuesList.innerHTML = issues.map(issue => `
            <div class="border-l-4 ${this.getIssueColor(issue.severity)} bg-gray-50 p-4 rounded-r-lg">
                <div class="flex items-start">
                    <div class="flex-shrink-0 mr-3">
                        ${this.getIssueIcon(issue.type)}
                    </div>
                    <div class="flex-grow">
                        <h4 class="font-medium text-gray-900">${issue.title}</h4>
                        <p class="text-sm text-gray-600 mt-1">${issue.description}</p>
                        <div class="mt-2 flex items-center text-xs text-gray-500">
                            <span>Line ${issue.line}</span>
                            <span class="ml-4 px-2 py-1 bg-gray-200 rounded">${issue.severity}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    displayRecommendations(recommendations) {
        this.recommendationsList.innerHTML = recommendations.map(rec => `
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div class="flex items-start">
                    <div class="flex-shrink-0 mr-3">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                    </div>
                    <div class="flex-grow">
                        <h4 class="font-medium text-gray-900">${rec.title}</h4>
                        <p class="text-sm text-gray-600 mt-1">${rec.description}</p>
                        <div class="mt-2">
                            <span class="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                ${rec.priority} priority
                            </span>
                        </div>
                        ${rec.example ? `
                            <details class="mt-2">
                                <summary class="cursor-pointer text-sm text-blue-600 hover:underline">Show example</summary>
                                <pre class="mt-2 text-xs bg-gray-100 p-2 rounded overflow-x-auto"><code>${rec.example}</code></pre>
                            </details>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    getIssueColor(severity) {
        switch(severity) {
            case 'high': return 'border-red-500';
            case 'medium': return 'border-yellow-500';
            case 'low': return 'border-blue-500';
            default: return 'border-gray-500';
        }
    }

    getIssueIcon(type) {
        switch(type) {
            case 'warning':
                return `<svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>`;
            case 'info':
                return `<svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>`;
            default:
                return `<svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>`;
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new CodeSentry();
});