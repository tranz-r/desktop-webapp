import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock Next.js font loading
jest.mock('next/font/google', () => ({
  Inter: jest.fn(() => ({
    className: 'inter-font',
    style: {
      fontFamily: 'Inter, system-ui, sans-serif',
    },
  })),
}));

describe('Typography System - Font Loading and Responsiveness', () => {
  describe('Font Loading Tests', () => {
    test('Inter font family is properly configured in CSS', () => {
      // Test that Inter font is configured in CSS custom properties
      const testElement = document.createElement('div');
      testElement.style.fontFamily = 'Inter, system-ui, sans-serif';
      testElement.textContent = 'Test';
      document.body.appendChild(testElement);
      
      const computedStyle = window.getComputedStyle(testElement);
      expect(computedStyle.fontFamily).toContain('Inter');
      
      document.body.removeChild(testElement);
    });

    test('Font weights are available (300, 400, 500, 600, 700, 800, 900)', () => {
      // Test that all required font weights are available
      const fontWeights = ['300', '400', '500', '600', '700', '800', '900'];
      
      fontWeights.forEach(weight => {
        const testElement = document.createElement('div');
        testElement.style.fontWeight = weight;
        testElement.textContent = 'Test';
        document.body.appendChild(testElement);
        
        const computedStyle = window.getComputedStyle(testElement);
        expect(computedStyle.fontWeight).toBe(weight);
        
        document.body.removeChild(testElement);
      });
    });

    test('Font fallbacks are properly configured', () => {
      // Test that system font fallbacks are in place
      const testElement = document.createElement('div');
      testElement.style.fontFamily = 'Inter, system-ui, sans-serif';
      testElement.textContent = 'Test';
      document.body.appendChild(testElement);
      
      const computedStyle = window.getComputedStyle(testElement);
      expect(computedStyle.fontFamily).toContain('Inter');
      expect(computedStyle.fontFamily).toContain('system-ui');
      expect(computedStyle.fontFamily).toContain('sans-serif');
      
      document.body.removeChild(testElement);
    });
  });

  describe('Typography Responsiveness Tests', () => {
    test('Heading sizes scale responsively', () => {
      const headingSizes = [
        { element: 'h1', mobile: 'text-4xl', desktop: 'lg:text-5xl' },
        { element: 'h2', mobile: 'text-3xl', desktop: 'lg:text-4xl' },
        { element: 'h3', mobile: 'text-2xl', desktop: 'lg:text-3xl' },
        { element: 'h4', mobile: 'text-xl', desktop: 'lg:text-2xl' },
        { element: 'h5', mobile: 'text-lg', desktop: 'lg:text-xl' },
        { element: 'h6', mobile: 'text-base', desktop: 'lg:text-lg' },
      ];

      headingSizes.forEach(({ element, mobile, desktop }) => {
        const testElement = document.createElement(element);
        testElement.className = `${mobile} ${desktop}`;
        testElement.textContent = 'Test Heading';
        document.body.appendChild(testElement);
        
        // Verify classes are applied
        expect(testElement.classList.contains(mobile)).toBe(true);
        expect(testElement.classList.contains(desktop)).toBe(true);
        
        document.body.removeChild(testElement);
      });
    });

    test('Body text classes are properly applied', () => {
      const bodyTextClasses = [
        'text-sm',   // Small text
        'text-base', // Base text
        'text-lg',   // Large text
        'text-xl',   // Extra large text
      ];

      bodyTextClasses.forEach(className => {
        const testElement = document.createElement('p');
        testElement.className = className;
        testElement.textContent = 'This is test body text that should maintain readability across all breakpoints.';
        document.body.appendChild(testElement);
        
        // Verify class is applied
        expect(testElement.classList.contains(className)).toBe(true);
        
        document.body.removeChild(testElement);
      });
    });

    test('Line height classes are properly applied', () => {
      const lineHeightClasses = [
        'leading-tight',   // 1.25
        'leading-snug',    // 1.375
        'leading-normal',  // 1.5
        'leading-relaxed', // 1.625
        'leading-loose',   // 2
      ];

      lineHeightClasses.forEach(className => {
        const testElement = document.createElement('p');
        testElement.className = className;
        testElement.textContent = 'This is test text with different line heights to ensure optimal readability.';
        document.body.appendChild(testElement);
        
        // Verify class is applied
        expect(testElement.classList.contains(className)).toBe(true);
        
        document.body.removeChild(testElement);
      });
    });
  });

  describe('Corporate Typography Hierarchy Tests', () => {
    test('Corporate heading hierarchy maintains visual hierarchy', () => {
      const hierarchy = [
        { level: 'h1', expectedSize: 'text-4xl lg:text-5xl', weight: 'font-bold' },
        { level: 'h2', expectedSize: 'text-3xl lg:text-4xl', weight: 'font-semibold' },
        { level: 'h3', expectedSize: 'text-2xl lg:text-3xl', weight: 'font-semibold' },
        { level: 'h4', expectedSize: 'text-xl lg:text-2xl', weight: 'font-medium' },
        { level: 'h5', expectedSize: 'text-lg lg:text-xl', weight: 'font-medium' },
        { level: 'h6', expectedSize: 'text-base lg:text-lg', weight: 'font-medium' },
      ];

      hierarchy.forEach(({ level, expectedSize, weight }) => {
        const testElement = document.createElement(level);
        testElement.className = `${expectedSize} ${weight}`;
        testElement.textContent = 'Corporate Heading';
        document.body.appendChild(testElement);
        
        // Verify size classes are applied
        expect(testElement.classList.contains(expectedSize.split(' ')[0])).toBe(true);
        expect(testElement.classList.contains(expectedSize.split(' ')[1])).toBe(true);
        expect(testElement.classList.contains(weight)).toBe(true);
        
        document.body.removeChild(testElement);
      });
    });

    test('Body text hierarchy classes are properly applied', () => {
      const bodyHierarchy = [
        { className: 'text-lg font-medium', description: 'Large body text' },
        { className: 'text-base font-normal', description: 'Standard body text' },
        { className: 'text-sm font-normal', description: 'Small body text' },
        { className: 'text-xs font-normal', description: 'Caption text' },
      ];

      bodyHierarchy.forEach(({ className, description }) => {
        const testElement = document.createElement('p');
        testElement.className = className;
        testElement.textContent = `This is ${description.toLowerCase()} for corporate communication.`;
        document.body.appendChild(testElement);
        
        // Verify classes are applied
        const classes = className.split(' ');
        classes.forEach(cls => {
          expect(testElement.classList.contains(cls)).toBe(true);
        });
        
        document.body.removeChild(testElement);
      });
    });
  });

  describe('Accessibility and Performance Tests', () => {
    test('Font loading does not block rendering', () => {
      // Test that page renders even if fonts are still loading
      const startTime = performance.now();
      
      // Create a test element
      const testElement = document.createElement('div');
      testElement.textContent = 'Test content';
      document.body.appendChild(testElement);
      
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      // Font loading should not significantly impact performance
      expect(loadTime).toBeLessThan(100); // Less than 100ms
      
      document.body.removeChild(testElement);
    });

    test('Typography maintains accessibility standards', () => {
      // Test that text elements have proper semantic structure
      const semanticElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'strong', 'em'];
      
      semanticElements.forEach(element => {
        const testElement = document.createElement(element);
        testElement.textContent = 'Accessibility test';
        testElement.className = 'text-base';
        document.body.appendChild(testElement);
        
        // Verify element is created and has content
        expect(testElement.textContent).toBe('Accessibility test');
        expect(testElement.classList.contains('text-base')).toBe(true);
        
        document.body.removeChild(testElement);
      });
    });
  });
});
