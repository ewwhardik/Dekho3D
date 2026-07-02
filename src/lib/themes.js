/**
 * Self-contained lighting/background presets — a lightweight version of
 * Blender's "World" tab. No HDR downloads, just tuned colors + intensities,
 * so switching themes is instant and works offline.
 */
export const THEMES = {
  studio: {
    label: 'Studio',
    bg: '#0b0c0f',
    fog: ['#0b0c0f', 22, 48],
    ambient: 0.55,
    hemi: ['#7c8cff', '#0b0c0f', 0.35],
    dirColor: '#ffffff',
    dirIntensity: 1.4,
    rimColor: '#7c5cff',
    rimIntensity: 0.3,
    gridCell: '#2a2f3b',
    gridSection: '#454b5c'
  },
  sunset: {
    label: 'Sunset',
    bg: '#1a0f12',
    fog: ['#1a0f12', 20, 46],
    ambient: 0.5,
    hemi: ['#ff9d6c', '#1a0f12', 0.4],
    dirColor: '#ffb27a',
    dirIntensity: 1.55,
    rimColor: '#ff5c72',
    rimIntensity: 0.35,
    gridCell: '#3a2622',
    gridSection: '#5c3c34'
  },
  night: {
    label: 'Night',
    bg: '#05060a',
    fog: ['#05060a', 16, 42],
    ambient: 0.32,
    hemi: ['#3752ff', '#05060a', 0.3],
    dirColor: '#7ea2ff',
    dirIntensity: 0.9,
    rimColor: '#33dba0',
    rimIntensity: 0.28,
    gridCell: '#151a2b',
    gridSection: '#243055'
  },
  void: {
    label: 'Void',
    bg: '#000000',
    fog: ['#000000', 26, 60],
    ambient: 0.4,
    hemi: ['#404040', '#000000', 0.2],
    dirColor: '#ffffff',
    dirIntensity: 1.2,
    rimColor: '#ffffff',
    rimIntensity: 0.12,
    gridCell: '#1c1c1c',
    gridSection: '#333333'
  }
};

export const THEME_ORDER = ['studio', 'sunset', 'night', 'void'];
