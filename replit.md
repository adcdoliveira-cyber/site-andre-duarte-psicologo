# Site André Duarte - Psicólogo Clínico

## Overview

A professional website for André Duarte, a clinical psychologist specializing in trauma, anxiety, and emotional regulation. The site is built as a modern React single-page application with a calming, humanistic design philosophy aimed at creating a welcoming digital space for potential clients seeking psychological services in Rio de Janeiro, Brazil.

The application includes:
- Main landing page with service information and contact details
- Emotional diary feature for clients to track their emotions privately (localStorage-based)
- Blog section for mental health articles
- Responsive design optimized for both desktop and mobile

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom plugins for JSX location tracking and Manus runtime
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS v4 with custom theme variables defined in CSS
- **UI Components**: shadcn/ui component library (New York style variant)
- **Animations**: Framer Motion for smooth page transitions
- **State Management**: React Context (ThemeContext) and local component state

### Component Organization
```
client/src/
├── components/
│   ├── common/     # Shared components (ErrorBoundary, Map, ManusDialog)
│   ├── layout/     # Page structure (Header, Footer)
│   └── ui/         # shadcn/ui primitives
├── contexts/       # React contexts (ThemeContext)
├── hooks/          # Custom hooks (useMobile, useComposition, usePersistFn)
├── pages/          # Route components (Home, Blog, EmotionalDiary, NotFound)
└── lib/            # Utilities (cn helper for classnames)
```

### Design System
- **Typography**: Playfair Display (serif, headings) + Nunito Sans (body text)
- **Color Palette**: Warm, calming tones - Bege Areia (#E8D5C4), Azul Profundo (#4A5168), Lilás Suave (#8B7E9B)
- **Design Philosophy**: "Minimalismo Humanista" - generous whitespace, organic shapes, slow deliberate interactions to create a calming experience

### Backend Architecture
- **Server**: Express.js serving static files
- **Purpose**: Minimal server for production deployment - serves built frontend assets and handles client-side routing fallback
- **No database**: The emotional diary feature uses browser localStorage for privacy

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets` → `attached_assets/`

## External Dependencies

### UI Framework & Components
- Radix UI primitives (accordion, dialog, dropdown, etc.)
- shadcn/ui component system
- Lucide React icons
- Embla Carousel for carousels
- Vaul for drawer components
- CMDK for command palette

### Form & Validation
- React Hook Form with resolvers
- Zod (implied by hookform/resolvers)

### Animation & Styling
- Framer Motion
- Tailwind CSS with tw-animate-css
- class-variance-authority (CVA) for variant management
- clsx + tailwind-merge for class composition

### Development Tools
- TypeScript with strict mode
- Prettier with Tailwind plugin
- ESBuild for server bundling

### Third-Party Integrations
- Google Fonts (Playfair Display, Nunito Sans)
- Google Maps API (Map component prepared for integration)
- WhatsApp contact links for client communication