const tintColorLight = '#8B5CF6'; // Purple theme
const tintColorDark = '#A78BFA'; // Lighter purple for dark mode

export default {
  light: {
    text: '#111827',
    background: '#F9FAFB',
    tint: tintColorLight,
    tabIconDefault: '#9CA3AF',
    tabIconSelected: tintColorLight,
    card: '#FFFFFF',
    border: '#E5E7EB',
    inputBackground: '#F3F4F6',
    placeholder: '#6B7280',
    error: '#EF4444',
    success: '#10B981',
  },
  dark: {
    text: '#F9FAFB',
    background: '#111827',
    tint: tintColorDark,
    tabIconDefault: '#6B7280',
    tabIconSelected: tintColorDark,
    card: '#1F2937',
    border: '#374151',
    inputBackground: '#1F2937',
    placeholder: '#9CA3AF',
    error: '#F87171',
    success: '#34D399',
  },
};