import { useState, useEffect, useCallback } from 'react';

// Homepage configuration types
export interface HeroBannerConfig {
  searchButtonColor: {
    primary: string;
    hover: string;
  };
  contentPosition: {
    paddingTop: string;
  };
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  isVisible: boolean;
}

export interface TourOfferConfig {
  sectionTitle: string;
  showEnquiryForm: boolean;
  formTitle: string;
  formFields: {
    showMessage: boolean;
    showDate: boolean;
    showDestination: boolean;
    messagePlaceholder: string;
  };
  isVisible: boolean;
}

export interface DayOutPackageConfig {
  sectionTitle: string;
  packages: Array<{
    id: string;
    title: string;
    image: string;
    showDescription: boolean;
    showExploreButton: boolean;
    isActive: boolean;
  }>;
  formConfig: {
    phoneFieldPlaceholder: string;
    destinationFieldLabel: string;
  };
  isVisible: boolean;
}

export interface HomepageConfig {
  heroBanner: HeroBannerConfig;
  tourOffers: TourOfferConfig;
  dayOutPackages: DayOutPackageConfig;
  lastUpdated: string;
  isDraft: boolean;
}

// Hook for managing homepage admin configuration
export const useAdminHomepage = () => {
  const [config, setConfig] = useState<HomepageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  // Default configuration reflecting current implementation
  const getDefaultConfig = (): HomepageConfig => ({
    heroBanner: {
      searchButtonColor: {
        primary: "bg-blue-600",
        hover: "hover:bg-blue-700"
      },
      contentPosition: {
        paddingTop: "pt-8"
      },
      title: "",
      subtitle: "Explore the best travel experiences across India and beyond",
      searchPlaceholder: "Search destinations, tours, or activities...",
      isVisible: true
    },
    tourOffers: {
      sectionTitle: "Our Top Selling Packages",
      showEnquiryForm: true,
      formTitle: "Quick Enquiry",
      formFields: {
        showMessage: true,
        showDate: false,
        showDestination: false,
        messagePlaceholder: "Write us in short of your requirements to customise a package"
      },
      isVisible: true
    },
    dayOutPackages: {
      sectionTitle: "Kerala Day Out Packages",
      packages: [
        {
          id: "backwater-cruise",
          title: "Backwater Day Cruise",
          image: "/assets/kerala-tour-card.jpg",
          showDescription: false,
          showExploreButton: false,
          isActive: true
        },
        {
          id: "spice-garden",
          title: "Spice Garden Visit",
          image: "/assets/hero-ayurveda-spa.jpg",
          showDescription: false,
          showExploreButton: false,
          isActive: true
        },
        {
          id: "beach-experience",
          title: "Beach Day Experience",
          image: "/assets/hero-rajasthan-palace.jpg",
          showDescription: false,
          showExploreButton: false,
          isActive: true
        },
        {
          id: "hill-station",
          title: "Hill Station Escape",
          image: "/assets/tour-golden-triangle.jpg",
          showDescription: false,
          showExploreButton: false,
          isActive: true
        },
        {
          id: "cultural-village",
          title: "Cultural Village Tour",
          image: "/assets/kerala-tour-card.jpg",
          showDescription: false,
          showExploreButton: false,
          isActive: true
        }
      ],
      formConfig: {
        phoneFieldPlaceholder: "",
        destinationFieldLabel: "Destination"
      },
      isVisible: true
    },
    lastUpdated: new Date().toISOString(),
    isDraft: false
  });

  // Load homepage configuration
  const loadHomepageConfig = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // For now, use default configuration or localStorage
      const savedConfig = localStorage.getItem('homepage-admin-config');
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
      } else {
        const defaultConfig = getDefaultConfig();
        setConfig(defaultConfig);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load homepage configuration');
    } finally {
      setLoading(false);
    }
  }, []);

  // Save homepage configuration
  const saveHomepageConfig = useCallback(async (newConfig: HomepageConfig) => {
    try {
      setSaving(true);
      setError(null);

      // TODO: Replace with actual API call to admin-api.ts
      // For now, save to localStorage
      const configToSave = {
        ...newConfig,
        lastUpdated: new Date().toISOString(),
        isDraft: false
      };

      localStorage.setItem('homepage-admin-config', JSON.stringify(configToSave));
      setConfig(configToSave);
      setIsDirty(false);

      return configToSave;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save homepage configuration');
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  // Update specific section of configuration
  const updateSection = useCallback(<T extends keyof HomepageConfig>(
    section: T,
    updates: Partial<HomepageConfig[T]>
  ) => {
    if (!config) return;

    const updatedConfig = {
      ...config,
      [section]: {
        ...(config[section] as any),
        ...updates
      },
      lastUpdated: new Date().toISOString()
    };

    setConfig(updatedConfig);
    setIsDirty(true);
  }, [config]);

  // Save draft
  const saveDraft = useCallback(async () => {
    if (!config) return;

    try {
      const draftConfig = {
        ...config,
        isDraft: true,
        lastUpdated: new Date().toISOString()
      };

      localStorage.setItem('homepage-admin-config-draft', JSON.stringify(draftConfig));
      setConfig(draftConfig);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save draft');
    }
  }, [config]);

  // Publish configuration
  const publishConfig = useCallback(async () => {
    if (!config) return;

    return await saveHomepageConfig(config);
  }, [config, saveHomepageConfig]);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    const defaultConfig = getDefaultConfig();
    setConfig(defaultConfig);
    setIsDirty(true);
  }, []);

  // Validate configuration
  const validateConfig = useCallback((configToValidate: HomepageConfig) => {
    const errors: string[] = [];

    // Validate hero banner
    if (!configToValidate.heroBanner.title.trim()) {
      errors.push('Hero banner title is required');
    }

    if (!configToValidate.heroBanner.searchButtonColor.primary) {
      errors.push('Search button primary color is required');
    }

    // Validate tour offers
    if (configToValidate.tourOffers.isVisible && !configToValidate.tourOffers.sectionTitle.trim()) {
      errors.push('Tour offers section title is required');
    }

    // Validate day out packages
    if (configToValidate.dayOutPackages.isVisible) {
      if (!configToValidate.dayOutPackages.sectionTitle.trim()) {
        errors.push('Day out packages section title is required');
      }

      const activePackages = configToValidate.dayOutPackages.packages.filter(p => p.isActive);
      if (activePackages.length === 0) {
        errors.push('At least one day out package must be active');
      }

      // Validate package titles
      const emptyTitles = configToValidate.dayOutPackages.packages.filter(p => p.isActive && !p.title.trim());
      if (emptyTitles.length > 0) {
        errors.push('All active packages must have titles');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }, []);

  // Export configuration for backup
  const exportConfig = useCallback(() => {
    if (!config) return null;

    const exportData = {
      ...config,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    return new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
  }, [config]);

  // Import configuration from file
  const importConfig = useCallback(async (file: File) => {
    try {
      const text = await file.text();
      const importedConfig = JSON.parse(text);

      // Basic validation
      if (!importedConfig.heroBanner || !importedConfig.tourOffers || !importedConfig.dayOutPackages) {
        throw new Error('Invalid configuration file format');
      }

      // Set as draft for review
      const configToImport = {
        ...importedConfig,
        isDraft: true,
        lastUpdated: new Date().toISOString(),
        importedAt: new Date().toISOString()
      };

      setConfig(configToImport);
      setIsDirty(true);

      return configToImport;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import configuration');
      throw err;
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    loadHomepageConfig();
  }, [loadHomepageConfig]);

  return {
    // State
    config,
    loading,
    saving,
    error,
    isDirty,

    // Actions
    loadHomepageConfig,
    saveHomepageConfig,
    updateSection,
    saveDraft,
    publishConfig,
    resetToDefaults,
    validateConfig,
    exportConfig,
    importConfig,

    // Computed values
    isValid: config ? validateConfig(config).isValid : false,
    validationErrors: config ? validateConfig(config).errors : [],
    hasUnsavedChanges: isDirty
  };
};

export default useAdminHomepage;