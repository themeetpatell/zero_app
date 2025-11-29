// 1. Color System
// -----------------------------------------------------------------------------
// Defines color palettes for both light and dark themes based on the provided
// design instructions, high-level design system, and globals.css.
export const colors = {
  light: {
    bg: {
      base: '#F7F5F3',      // Cream/beige
      elevated: '#FFFFFF',  // White
    },
    border: {
      base: '#E5E5E5',       // Light gray
    },
    text: {
      foreground: '#2B2B2B', // Dark gray
      quiet: '#6B7280',      // Medium gray
      quieter: '#9CA3AF',    // Light gray
    },
    accent: {
      super: '#20B8CD',      // Teal
    },
  },
  dark: { // Primary source of truth from globals.css & high_level_design
    bg: {
      underlay: '#191a1a',
      base: '#202222',
      raised: '#2c2e2e',
      offset: '#252727',
      subtle: 'rgba(255, 255, 255, 0.08)',
      subtler: 'rgba(255, 255, 255, 0.04)',
    },
    border: {
      subtlest: 'rgba(255, 255, 255, 0.08)',
      subtle: 'rgba(255, 255, 255, 0.12)',
      subtler: 'rgba(255, 255, 255, 0.06)',
    },
    text: {
      foreground: '#ececec',
      quiet: 'rgba(255, 255, 255, 0.55)',
      quieter: 'rgba(255, 255, 255, 0.35)',
      inverse: '#ffffff',
    },
    accent: {
      super: '#20b5a7',
      superHover: 'rgba(32, 181, 167, 0.8)',
      superBg: 'rgba(32, 181, 167, 0.1)',
    },
    selection: {
      bg: 'rgba(32, 181, 167, 0.1)',
    },
    ring: 'rgba(32, 181, 167, 0.5)',
  }
};

// 2. Spacing Scale
// -----------------------------------------------------------------------------
// Based on the high-level design system's spacing tokens.
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
  'two': '8px', // alias for sm
  'headerHeight': '56px',
};

// 3. Border Radius
// -----------------------------------------------------------------------------
// Based on globals.css for pixel-perfect accuracy.
export const borderRadius = {
  sm: '8px',   // 0.5rem
  md: '10px',  // 0.625rem
  lg: '12px',  // 0.75rem
  xl: '16px',
  '2xl': '24px',
  full: '9999px',
};

// 4. Shadow Levels
// -----------------------------------------------------------------------------
// Based on the high-level design system.
export const shadows = {
  // Teal-tinted shadows
  super: '0 1px 3px 0 rgba(32, 181, 167, 0.3)',
  // Used for dark mode cards, combining depth and border
  cardDark: '0 1px 3px 0 rgba(32, 181, 167, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.08)',
  // Focus ring around inputs
  inputFocus: '0 0 0 1px rgba(32, 181, 167, 0.5)',
  // Standard subtle black shadow for popups
  popup: '0 4px 12px rgba(0, 0, 0, 0.2)',
};

// 5. Transitions & Animations
// -----------------------------------------------------------------------------
// Durations and easing curves for smooth UI interactions.
export const transitions = {
  duration: {
    '150': '150ms',
    '200': '200ms',
    '300': '300ms',
  },
  easing: {
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'ease-in-cubic': 'cubic-bezier(0.32, 0, 0.67, 0)',
    'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
};

// 6. Z-Index Layers
// -----------------------------------------------------------------------------
// Defines the stacking order of UI elements.
export const zIndex = {
  base: 0,
  content: 1,
  header: 10,
  sidebar: 20,
  popover: 30,
  tooltip: 40,
  modal: 50,
};

// 7. Complete Theme Configuration
// -----------------------------------------------------------------------------
// A single object containing all design tokens for easy import.
export const themeConfig = {
  colors,
  spacing,
  borderRadius,
  shadows,
  transitions,
  zIndex,
};

export default themeConfig;