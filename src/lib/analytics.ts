/**
 * 🔐 SECURITY: Google Analytics 4 Integration
 * 
 * Implements Google Analytics tracking with security best practices:
 * - Environment-based initialization
 * - Error handling and logging
 * - Privacy-compliant tracking
 * - Development mode detection
 */

import ReactGA from 'react-ga4';

/**
 * Check if we're in development mode
 */
const isDevelopment = import.meta.env.MODE === 'development';

/**
 * Get Google Analytics Measurement ID from environment variables
 */
const getMeasurementId = (): string | undefined => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  if (!measurementId) {
    console.warn('⚠️  Google Analytics: VITE_GA_MEASUREMENT_ID not found in environment variables');
    return undefined;
  }
  
  // Validate format (should start with G-)
  if (!measurementId.startsWith('G-')) {
    console.error('❌ Google Analytics: Invalid Measurement ID format. Should start with "G-"');
    return undefined;
  }
  
  return measurementId;
};

/**
 * Initialize Google Analytics
 * Call this once when the app starts
 */
export const initializeAnalytics = (): boolean => {
  const measurementId = getMeasurementId();
  
  if (!measurementId) {
    console.warn('⚠️  Google Analytics: Initialization skipped - no valid Measurement ID');
    return false;
  }
  
  try {
    ReactGA.initialize(measurementId, {
      testMode: isDevelopment, // Enable test mode in development
      gaOptions: {
        siteSpeedSampleRate: 100, // Track all page load times
      },
    });
    
    console.log(`✅ Google Analytics initialized successfully (${isDevelopment ? 'Development' : 'Production'} mode)`);
    return true;
  } catch (error) {
    console.error('❌ Google Analytics: Initialization failed', error);
    return false;
  }
};

/**
 * Track a page view
 * @param path - The page path (e.g., '/tours/kerala-backwaters')
 * @param title - Optional page title
 */
export const trackPageView = (path: string, title?: string): void => {
  if (!getMeasurementId()) {
    return; // Skip if not initialized
  }
  
  try {
    ReactGA.send({ 
      hitType: 'pageview', 
      page: path,
      title: title || document.title,
    });
    
    if (isDevelopment) {
      console.log(`📊 GA Page View: ${path}`, { title: title || document.title });
    }
  } catch (error) {
    console.error('❌ Google Analytics: Page view tracking failed', error);
  }
};

/**
 * Track a custom event
 * @param category - Event category (e.g., 'User', 'Form', 'Button')
 * @param action - Event action (e.g., 'Click', 'Submit', 'Download')
 * @param label - Optional event label
 * @param value - Optional numeric value
 */
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
): void => {
  if (!getMeasurementId()) {
    return; // Skip if not initialized
  }
  
  try {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
    
    if (isDevelopment) {
      console.log(`📊 GA Event: ${category} - ${action}`, { label, value });
    }
  } catch (error) {
    console.error('❌ Google Analytics: Event tracking failed', error);
  }
};

/**
 * Track form submission
 * @param formName - Name of the form (e.g., 'Contact Form', 'Tour Inquiry')
 * @param tourName - Optional tour name for tour-specific forms
 */
export const trackFormSubmission = (formName: string, tourName?: string): void => {
  trackEvent(
    'Form',
    'Submit',
    tourName ? `${formName} - ${tourName}` : formName
  );
};

/**
 * Track button click
 * @param buttonName - Name/label of the button
 * @param location - Where the button is located (e.g., 'Header', 'Tour Detail')
 */
export const trackButtonClick = (buttonName: string, location?: string): void => {
  trackEvent(
    'Button',
    'Click',
    location ? `${buttonName} - ${location}` : buttonName
  );
};

/**
 * Track tour view
 * @param tourSlug - Tour slug/identifier
 * @param tourTitle - Tour title
 */
export const trackTourView = (tourSlug: string, tourTitle: string): void => {
  trackEvent(
    'Tour',
    'View',
    `${tourTitle} (${tourSlug})`
  );
};

/**
 * Check if Google Analytics is initialized and ready
 */
export const isAnalyticsReady = (): boolean => {
  return !!getMeasurementId();
};

