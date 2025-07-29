# Cursor Rules Guide - TRANZR MOVES

## 🎯 Cursor Behavior Standards

### **Interactive Elements (cursor-pointer)**
- **Buttons**: All buttons use `cursor-pointer`
- **Select Triggers**: Dropdown triggers use `cursor-pointer`
- **Select Items**: Dropdown options use `cursor-pointer`
- **Links**: All clickable links use `cursor-pointer`
- **Interactive Cards**: Cards with click handlers use `cursor-pointer`

### **Text Input Elements (cursor-text)**
- **Input Fields**: All text inputs use `cursor-text`
- **Textareas**: Multi-line text inputs use `cursor-text`
- **Search Fields**: Search inputs use `cursor-text`

### **Static Elements (cursor-default)**
- **Cards**: Static content cards use `cursor-default`
- **Labels**: Form labels use `cursor-default`
- **Descriptions**: Static text use `cursor-default`
- **Icons**: Decorative icons use `cursor-default`

### **Disabled Elements (cursor-not-allowed)**
- **Disabled Buttons**: Use `cursor-not-allowed`
- **Disabled Inputs**: Use `cursor-not-allowed`
- **Disabled Selects**: Use `cursor-not-allowed`

## 🎨 Complementary Color Palette Usage

### **Secondary Colors (Main Button Background)**
- **Secondary-400**: `#a695b5` - Main button background (ALL PAGES) - BRIGHTER
- **Secondary-500**: `#9180a2` - Hover states (ALL PAGES) - BRIGHTER
- **Secondary-600**: `#7c6b8f` - Active states (ALL PAGES)

### **Accent Colors (Secondary Buttons)**
- **Accent-400**: `#7db8c2` - Secondary buttons (when multiple buttons) - BRIGHTER
- **Accent-500**: `#5aa5b3` - Accent hover states - BRIGHTER
- **Accent-600**: `#4a8a9a` - Accent active states

### **Primary Colors (Reserved for Special Use)**
- **Primary-600**: `#7a5294` - Reserved for special elements
- **Primary-700**: `#654378` - Primary hover states
- **Primary-800**: `#533963` - Primary active states

### **No Black Usage**
- ❌ **Black buttons**: Replaced with secondary-400 (brighter)
- ❌ **Black backgrounds**: Only footer uses black
- ✅ **White text**: Used on dark backgrounds
- ✅ **Dark grays**: Used for text and borders

## 📋 Component Standards

### **Button Variants (Complementary Colors)**
```tsx
// Default (Secondary) - Main buttons
<Button variant="default" className="bg-secondary-400 hover:bg-secondary-500">

// Secondary (Accent) - When multiple buttons on page
<Button variant="secondary" className="bg-accent-400 hover:bg-accent-500">

// Outline (Accent border)
<Button variant="outline" className="border-accent-400 text-accent-600">

// Ghost
<Button variant="ghost" className="hover:bg-accent">
```

### **Button Sizing (Increased Padding)**
```tsx
// Default: Bigger buttons with more padding
default: "h-14 px-8 py-4"

// Small: Medium size
sm: "h-11 rounded-md px-6 py-3 text-sm"

// Large: Extra big buttons
lg: "h-16 rounded-md px-10 py-5 text-base"

// Icon: Square buttons
icon: "h-14 w-14"
```

### **Input Standards**
```tsx
// All inputs use consistent styling
<Input className="h-12 px-4 py-3 border-2 cursor-text" />
```

### **Select Standards**
```tsx
// Select triggers use pointer cursor
<SelectTrigger className="cursor-pointer" />

// Select items use pointer cursor
<SelectItem className="cursor-pointer" />
```

## 🔄 Consistency Rules

1. **Main buttons** use `bg-secondary-400 hover:bg-secondary-500`
2. **Secondary buttons** (when multiple on page) use `bg-accent-400 hover:bg-accent-500`
3. **No black** should be used except for footer background
4. **All interactive elements** must have appropriate cursor states
5. **All form elements** must have consistent padding and sizing
6. **All hover states** must use darker variants of base colors
7. **All active states** must use the darkest variants
8. **White text on dark backgrounds** must have proper contrast
9. **Buttons have increased padding** for better visual presence
10. **Brighter colors** for better visibility and modern appearance

## 📱 Responsive Considerations

- **Mobile**: Maintain cursor behavior on touch devices
- **Tablet**: Ensure touch targets are appropriately sized
- **Desktop**: Provide hover states for all interactive elements

## ♿ Accessibility

- **Focus indicators**: All interactive elements must have visible focus states
- **Keyboard navigation**: All interactive elements must be keyboard accessible
- **Screen readers**: Proper ARIA labels and roles for all interactive elements 