/**
 * Color Accessibility Tests
 * Ensures corporate color palette meets WCAG 2.1 AA contrast ratio requirements
 */

describe('Corporate Color Palette - WCAG 2.1 AA Compliance', () => {
  // Corporate color definitions as per specification
  const corporateColors = {
    navy: '#1e3a8a',
    blue: '#1e40af', 
    teal: '#047857', // Darker teal for AA accessibility compliance
    grey: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    }
  };

  /**
   * Calculate luminance of a color
   * @param color - Hex color string
   * @returns Relative luminance value
   */
  function getLuminance(color: string): number {
    const hex = color.replace('#', '');
    const rgb = [
      parseInt(hex.substr(0, 2), 16),
      parseInt(hex.substr(2, 2), 16),
      parseInt(hex.substr(4, 2), 16)
    ];

    // Convert to relative luminance
    rgb.forEach((color, index) => {
      let value = color / 255;
      rgb[index] = value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  }

  /**
   * Calculate contrast ratio between two colors
   * @param color1 - First hex color
   * @param color2 - Second hex color
   * @returns Contrast ratio
   */
  function getContrastRatio(color1: string, color2: string): number {
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  describe('Primary Text Combinations (Normal Text)', () => {
    test('corporate navy on white background meets AA standard', () => {
      const contrastRatio = getContrastRatio(corporateColors.navy, '#ffffff');
      expect(contrastRatio).toBeGreaterThanOrEqual(4.5); // WCAG 2.1 AA normal text
    });

    test('white text on corporate navy background meets AA standard', () => {
      const contrastRatio = getContrastRatio('#ffffff', corporateColors.navy);
      expect(contrastRatio).toBeGreaterThanOrEqual(4.5);
    });

    test('corporate blue on white background meets AA standard', () => {
      const contrastRatio = getContrastRatio(corporateColors.blue, '#ffffff');
      expect(contrastRatio).toBeGreaterThanOrEqual(4.5);
    });

    test('teal on white background meets AA standard', () => {
      const contrastRatio = getContrastRatio(corporateColors.teal, '#ffffff');
      expect(contrastRatio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('Large Text Combinations (18pt+ / 14pt+ bold)', () => {
    test('corporate navy on grey-50 meets large text AA standard', () => {
      const contrastRatio = getContrastRatio(corporateColors.navy, corporateColors.grey[50]);
      expect(contrastRatio).toBeGreaterThanOrEqual(3.0); // WCAG 2.1 AA large text
    });

    test('corporate blue on grey-100 meets large text AA standard', () => {
      const contrastRatio = getContrastRatio(corporateColors.blue, corporateColors.grey[100]);
      expect(contrastRatio).toBeGreaterThanOrEqual(3.0);
    });

    test('teal on grey-200 meets large text AA standard', () => {
      const contrastRatio = getContrastRatio(corporateColors.teal, corporateColors.grey[200]);
      expect(contrastRatio).toBeGreaterThanOrEqual(3.0);
    });
  });

  describe('Semantic Color Mapping Tests', () => {
    test('primary color (navy) provides sufficient contrast on backgrounds', () => {
      // Primary navy should work on light backgrounds
      const lightBackgrounds = [corporateColors.grey[50], corporateColors.grey[100], '#ffffff'];
      
      lightBackgrounds.forEach(bg => {
        const contrastRatio = getContrastRatio(corporateColors.navy, bg);
        expect(contrastRatio).toBeGreaterThanOrEqual(3.0);
      });
    });

    test('accent color (teal) provides sufficient contrast on light backgrounds', () => {
      const lightBackgrounds = [corporateColors.grey[50], corporateColors.grey[100], '#ffffff'];
      
      lightBackgrounds.forEach(bg => {
        const contrastRatio = getContrastRatio(corporateColors.teal, bg);
        expect(contrastRatio).toBeGreaterThanOrEqual(3.0);
      });
    });

    test('grey text provides sufficient contrast on white backgrounds', () => {
      const greyTextColors = [corporateColors.grey[700], corporateColors.grey[800], corporateColors.grey[900]];
      
      greyTextColors.forEach(textColor => {
        const contrastRatio = getContrastRatio(textColor, '#ffffff');
        expect(contrastRatio).toBeGreaterThanOrEqual(4.5);
      });
    });
  });

  describe('Corporate Background Combinations', () => {
    test('grey backgrounds maintain readability with navy text', () => {
      const backgrounds = [corporateColors.grey[50], corporateColors.grey[100]];
      
      backgrounds.forEach(bg => {
        const contrastRatio = getContrastRatio(corporateColors.navy, bg);
        expect(contrastRatio).toBeGreaterThanOrEqual(4.5);
      });
    });

    test('dark backgrounds work with white or light text', () => {
      const darkBackgrounds = [corporateColors.navy, corporateColors.blue, corporateColors.grey[800]];
      const lightText = ['#ffffff', corporateColors.grey[100]];
      
      darkBackgrounds.forEach(bg => {
        lightText.forEach(text => {
          const contrastRatio = getContrastRatio(text, bg);
          expect(contrastRatio).toBeGreaterThanOrEqual(4.5);
        });
      });
    });
  });

  describe('Edge Case Combinations', () => {
    test('grey-400 on white fails AA standard (intentionally low contrast)', () => {
      const contrastRatio = getContrastRatio(corporateColors.grey[400], '#ffffff');
      expect(contrastRatio).toBeLessThan(4.5); // This should fail - documented limitation
    });

    test('grey-300 on white fails AA standard (intentionally low contrast)', () => {
      const contrastRatio = getContrastRatio(corporateColors.grey[300], '#ffffff');
      expect(contrastRatio).toBeLessThan(4.5); // This should fail - documented limitation
    });
  });
});
