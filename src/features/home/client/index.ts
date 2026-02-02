// Home page client components
// Following barrel export pattern for clean imports
// Note: Static components (AboutSection, BlogSection, CTASection, HowItWorks)
// have been moved to /server for SSR optimization
// ExpertHelpCTA is now a canonical component in @/components/ui

// Client components requiring interactivity
export { HeroSection } from './HeroSection';
export { ServicesSection } from './ServicesSection';
export { ContactSection } from './ContactSection';
