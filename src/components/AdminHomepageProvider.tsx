import React, { createContext, useContext, ReactNode } from 'react';
import { getCurrentHomepageConfig, HomepageAdminConfig } from '@/lib/admin-utils';

// Context for homepage admin configuration
interface HomepageAdminContextType {
  config: HomepageAdminConfig;
  isAdminMode: boolean;
  updateConfig?: (updates: Partial<HomepageAdminConfig>) => void;
}

const HomepageAdminContext = createContext<HomepageAdminContextType>({
  config: getCurrentHomepageConfig(),
  isAdminMode: false
});

// Provider component
interface HomepageAdminProviderProps {
  children: ReactNode;
  config?: HomepageAdminConfig;
  isAdminMode?: boolean;
  onConfigUpdate?: (updates: Partial<HomepageAdminConfig>) => void;
}

export const HomepageAdminProvider: React.FC<HomepageAdminProviderProps> = ({
  children,
  config: providedConfig,
  isAdminMode = false,
  onConfigUpdate
}) => {
  const config = providedConfig || getCurrentHomepageConfig();

  const contextValue: HomepageAdminContextType = {
    config,
    isAdminMode,
    updateConfig: onConfigUpdate
  };

  return (
    <HomepageAdminContext.Provider value={contextValue}>
      {children}
    </HomepageAdminContext.Provider>
  );
};

// Hook to use homepage admin context
export const useHomepageAdmin = () => {
  const context = useContext(HomepageAdminContext);
  if (!context) {
    throw new Error('useHomepageAdmin must be used within HomepageAdminProvider');
  }
  return context;
};

// HOC to make components admin-controllable
export function withHomepageAdmin<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  sectionKey?: keyof HomepageAdminConfig
) {
  const AdminControllableComponent = (props: P) => {
    const { config, isAdminMode } = useHomepageAdmin();

    // If section key is provided and section is not visible, don't render
    if (sectionKey && config[sectionKey] && 'isVisible' in config[sectionKey]) {
      const section = config[sectionKey] as any;
      if (!section.isVisible && !isAdminMode) {
        return null;
      }
    }

    // Pass admin config as props
    const adminProps = {
      ...props,
      adminConfig: config,
      isAdminMode
    };

    return <WrappedComponent {...adminProps} />;
  };

  AdminControllableComponent.displayName = `withHomepageAdmin(${WrappedComponent.displayName || WrappedComponent.name})`;

  return AdminControllableComponent;
}

// Specific HOCs for homepage sections
export const withHeroBannerAdmin = <P extends object>(
  Component: React.ComponentType<P & { adminConfig?: HomepageAdminConfig }>
) => withHomepageAdmin(Component, 'heroBanner');

export const withTourOffersAdmin = <P extends object>(
  Component: React.ComponentType<P & { adminConfig?: HomepageAdminConfig }>
) => withHomepageAdmin(Component, 'tourOffers');

export const withDayOutPackagesAdmin = <P extends object>(
  Component: React.ComponentType<P & { adminConfig?: HomepageAdminConfig }>
) => withHomepageAdmin(Component, 'dayOutPackages');

// Admin panel component wrapper
interface AdminPanelWrapperProps {
  children: ReactNode;
  sectionTitle: string;
  isVisible: boolean;
  onToggleVisibility?: (visible: boolean) => void;
  onEdit?: () => void;
}

export const AdminPanelWrapper: React.FC<AdminPanelWrapperProps> = ({
  children,
  sectionTitle,
  isVisible,
  onToggleVisibility,
  onEdit
}) => {
  const { isAdminMode } = useHomepageAdmin();

  if (!isAdminMode) {
    return <>{children}</>;
  }

  return (
    <div className="relative group">
      {/* Admin overlay */}
      <div className="absolute top-0 right-0 z-50 p-2 bg-black/80 text-white text-xs rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2">
          <span>{sectionTitle}</span>
          {onToggleVisibility && (
            <button
              onClick={() => onToggleVisibility(!isVisible)}
              className={`px-2 py-1 rounded text-xs ${isVisible
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
                }`}
              title={isVisible ? 'Hide section' : 'Show section'}
            >
              {isVisible ? 'Hide' : 'Show'}
            </button>
          )}
          {onEdit && (
            <button
              onClick={onEdit}
              className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs"
              title="Edit section"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Content with admin border */}
      <div className={`${isAdminMode ? 'border-2 border-dashed border-blue-500/50' : ''}`}>
        {children}
      </div>
    </div>
  );
};

// Admin-controllable section component
interface AdminControllableSectionProps {
  sectionKey: keyof HomepageAdminConfig;
  title: string;
  children: ReactNode;
  className?: string;
}

export const AdminControllableSection: React.FC<AdminControllableSectionProps> = ({
  sectionKey,
  title,
  children,
  className = ''
}) => {
  const { config, isAdminMode, updateConfig } = useHomepageAdmin();

  const sectionConfig = config[sectionKey] as any;
  const isVisible = sectionConfig?.isVisible !== false;

  const handleToggleVisibility = (visible: boolean) => {
    if (updateConfig) {
      updateConfig({
        [sectionKey]: {
          ...sectionConfig,
          isVisible: visible
        }
      });
    }
  };

  const handleEdit = () => {
    // This would open an edit modal or redirect to admin panel
    console.log(`Edit ${title} section`);
  };

  // Don't render if not visible and not in admin mode
  if (!isVisible && !isAdminMode) {
    return null;
  }

  return (
    <AdminPanelWrapper
      sectionTitle={title}
      isVisible={isVisible}
      onToggleVisibility={handleToggleVisibility}
      onEdit={handleEdit}
    >
      <div className={`${className} ${!isVisible && isAdminMode ? 'opacity-50' : ''}`}>
        {children}
      </div>
    </AdminPanelWrapper>
  );
};

// Utility function to apply admin configuration to existing components
export const applyAdminConfig = {
  // HeroBanner configuration application
  heroBanner: (config: HomepageAdminConfig['heroBanner']) => ({
    title: config.title,
    subtitle: config.subtitle,
    searchPlaceholder: config.searchPlaceholder,
    searchButtonClassName: `px-6 py-3 ${config.searchButtonColor.primary} ${config.searchButtonColor.hover} text-white font-medium rounded-lg transition-colors`,
    overlayClassName: `relative z-20 h-full flex flex-col justify-center items-center px-4 ${config.contentPosition.paddingTop}`
  }),

  // TourOffers configuration application
  tourOffers: (config: HomepageAdminConfig['tourOffers']) => ({
    sectionTitle: config.sectionTitle,
    showEnquiryForm: config.showEnquiryForm,
    formConfig: {
      title: config.formTitle,
      fields: config.formFields
    }
  }),

  // DayOutPackages configuration application
  dayOutPackages: (config: HomepageAdminConfig['dayOutPackages']) => ({
    sectionTitle: config.sectionTitle,
    packages: config.packages.filter(p => p.isActive).map(pkg => ({
      id: parseInt(pkg.id) || 0,
      title: pkg.title,
      image: pkg.image,
      slug: pkg.title.toLowerCase().replace(/\s+/g, '-'),
      description: `Experience the beauty of ${pkg.title}`,
      showDescription: pkg.showDescription,
      showExploreButton: pkg.showExploreButton
    })),
    formConfig: config.formConfig
  })
};

export default HomepageAdminProvider;