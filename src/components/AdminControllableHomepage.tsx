import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Palette,
  Layout,
  MessageSquare,
  Save,
  Eye,
  Upload,
  ChevronUp,
  ChevronDown,
  Trash2,
  Plus
} from "lucide-react";

// Homepage section configuration interfaces
interface HeroBannerConfig {
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

interface TourOfferConfig {
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

interface DayOutPackageConfig {
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

interface HomepageConfig {
  heroBanner: HeroBannerConfig;
  tourOffers: TourOfferConfig;
  dayOutPackages: DayOutPackageConfig;
  lastUpdated: string;
  isDraft: boolean;
}

interface AdminControllableHomepageProps {
  config?: HomepageConfig;
  onSave?: (config: HomepageConfig) => void;
  onPreview?: () => void;
}

const AdminControllableHomepage = ({
  config: initialConfig,
  onSave,
  onPreview
}: AdminControllableHomepageProps) => {
  // Default configuration based on current implementation
  const defaultConfig: HomepageConfig = {
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
        messagePlaceholder: "Write in short of your requirements to customise a pacakge"
      },
      isVisible: true
    },
    dayOutPackages: {
      sectionTitle: "Day Out Packages",
      packages: [
        {
          id: "1",
          title: "Backwater Day Cruise",
          image: "/assets/kerala-tour-card.jpg",
          showDescription: false,
          showExploreButton: false,
          isActive: true
        },
        {
          id: "2",
          title: "Spice Garden Visit",
          image: "/assets/hero-ayurveda-spa.jpg",
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
    isDraft: true
  };

  const [config, setConfig] = useState<HomepageConfig>(initialConfig || defaultConfig);
  const [activeTab, setActiveTab] = useState("hero");
  const [isDirty, setIsDirty] = useState(false);

  const updateConfig = (section: keyof HomepageConfig, updates: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        ...updates
      },
      lastUpdated: new Date().toISOString()
    }));
    setIsDirty(true);
  };

  const handleSave = () => {
    if (onSave) {
      onSave({ ...config, isDraft: false });
      setIsDirty(false);
    }
  };

  const handlePreview = () => {
    if (onPreview) {
      onPreview();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Admin Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Homepage Configuration
          </h1>
          <p className="text-muted-foreground mt-1">
            Control all homepage sections and their behavior
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isDirty && (
            <Badge variant="outline" className="text-orange-600">
              Unsaved Changes
            </Badge>
          )}
          <Button onClick={handlePreview} variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} disabled={!isDirty}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Configuration Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hero">Hero Banner</TabsTrigger>
          <TabsTrigger value="tours">Tour Offers</TabsTrigger>
          <TabsTrigger value="dayouts">Day Out Packages</TabsTrigger>
        </TabsList>

        {/* Hero Banner Configuration */}
        <TabsContent value="hero" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Hero Banner Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Visibility Toggle */}
              <div className="flex items-center space-x-2">
                <Switch
                  checked={config.heroBanner.isVisible}
                  onCheckedChange={(checked) =>
                    updateConfig('heroBanner', { isVisible: checked })
                  }
                />
                <Label>Show Hero Banner</Label>
              </div>

              {/* Content Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hero-title">Main Title</Label>
                  <Input
                    id="hero-title"
                    value={config.heroBanner.title}
                    onChange={(e) =>
                      updateConfig('heroBanner', { title: e.target.value })
                    }
                    placeholder="Enter banner title (optional)"
                  />
                </div>
                <div>
                  <Label htmlFor="search-placeholder">Search Placeholder</Label>
                  <Input
                    id="search-placeholder"
                    value={config.heroBanner.searchPlaceholder}
                    onChange={(e) =>
                      updateConfig('heroBanner', { searchPlaceholder: e.target.value })
                    }
                    placeholder="Search destinations..."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="hero-subtitle">Subtitle</Label>
                <Textarea
                  id="hero-subtitle"
                  value={config.heroBanner.subtitle}
                  onChange={(e) =>
                    updateConfig('heroBanner', { subtitle: e.target.value })
                  }
                  placeholder="Explore the best travel experiences..."
                  rows={3}
                />
              </div>

              {/* Search Button Color Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium">Search Button Styling</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="button-primary">Primary Color Class</Label>
                    <Input
                      id="button-primary"
                      value={config.heroBanner.searchButtonColor.primary}
                      onChange={(e) =>
                        updateConfig('heroBanner', {
                          searchButtonColor: {
                            ...config.heroBanner.searchButtonColor,
                            primary: e.target.value
                          }
                        })
                      }
                      placeholder="bg-blue-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="button-hover">Hover Color Class</Label>
                    <Input
                      id="button-hover"
                      value={config.heroBanner.searchButtonColor.hover}
                      onChange={(e) =>
                        updateConfig('heroBanner', {
                          searchButtonColor: {
                            ...config.heroBanner.searchButtonColor,
                            hover: e.target.value
                          }
                        })
                      }
                      placeholder="hover:bg-blue-700"
                    />
                  </div>
                </div>
              </div>

              {/* Position Configuration */}
              <div>
                <Label htmlFor="content-position">Content Position Class</Label>
                <Input
                  id="content-position"
                  value={config.heroBanner.contentPosition.paddingTop}
                  onChange={(e) =>
                    updateConfig('heroBanner', {
                      contentPosition: { paddingTop: e.target.value }
                    })
                  }
                  placeholder="pt-8"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Controls vertical positioning of search bar and button
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tour Offers Configuration */}
        <TabsContent value="tours" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="h-5 w-5" />
                Tour Offers Section
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Visibility Toggle */}
              <div className="flex items-center space-x-2">
                <Switch
                  checked={config.tourOffers.isVisible}
                  onCheckedChange={(checked) =>
                    updateConfig('tourOffers', { isVisible: checked })
                  }
                />
                <Label>Show Tour Offers Section</Label>
              </div>

              <div>
                <Label htmlFor="tour-section-title">Section Title</Label>
                <Input
                  id="tour-section-title"
                  value={config.tourOffers.sectionTitle}
                  onChange={(e) =>
                    updateConfig('tourOffers', { sectionTitle: e.target.value })
                  }
                  placeholder="Our Top Selling Packages"
                />
              </div>

              {/* Enquiry Form Configuration */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={config.tourOffers.showEnquiryForm}
                    onCheckedChange={(checked) =>
                      updateConfig('tourOffers', { showEnquiryForm: checked })
                    }
                  />
                  <Label>Show Enquiry Form</Label>
                </div>

                {config.tourOffers.showEnquiryForm && (
                  <div className="space-y-4 ml-6 p-4 border rounded-lg">
                    <h4 className="font-medium">Form Configuration</h4>

                    <div>
                      <Label htmlFor="form-title">Form Title</Label>
                      <Input
                        id="form-title"
                        value={config.tourOffers.formTitle}
                        onChange={(e) =>
                          updateConfig('tourOffers', { formTitle: e.target.value })
                        }
                        placeholder="Quick Enquiry"
                      />
                    </div>

                    <div className="space-y-3">
                      <h5 className="text-sm font-medium">Form Fields</h5>

                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={config.tourOffers.formFields.showMessage}
                          onCheckedChange={(checked) =>
                            updateConfig('tourOffers', {
                              formFields: {
                                ...config.tourOffers.formFields,
                                showMessage: checked
                              }
                            })
                          }
                        />
                        <Label>Show Message Field</Label>
                      </div>

                      {config.tourOffers.formFields.showMessage && (
                        <div className="ml-6">
                          <Label htmlFor="message-placeholder">Message Placeholder</Label>
                          <Input
                            id="message-placeholder"
                            value={config.tourOffers.formFields.messagePlaceholder}
                            onChange={(e) =>
                              updateConfig('tourOffers', {
                                formFields: {
                                  ...config.tourOffers.formFields,
                                  messagePlaceholder: e.target.value
                                }
                              })
                            }
                            placeholder="Write in short of your requirements to customise a pacakge"
                          />
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={config.tourOffers.formFields.showDate}
                          onCheckedChange={(checked) =>
                            updateConfig('tourOffers', {
                              formFields: {
                                ...config.tourOffers.formFields,
                                showDate: checked
                              }
                            })
                          }
                        />
                        <Label>Show Date Field</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={config.tourOffers.formFields.showDestination}
                          onCheckedChange={(checked) =>
                            updateConfig('tourOffers', {
                              formFields: {
                                ...config.tourOffers.formFields,
                                showDestination: checked
                              }
                            })
                          }
                        />
                        <Label>Show Destination Field</Label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Day Out Packages Configuration */}
        <TabsContent value="dayouts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Day Out Packages Section
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Visibility Toggle */}
              <div className="flex items-center space-x-2">
                <Switch
                  checked={config.dayOutPackages.isVisible}
                  onCheckedChange={(checked) =>
                    updateConfig('dayOutPackages', { isVisible: checked })
                  }
                />
                <Label>Show Day Out Packages Section</Label>
              </div>

              <div>
                <Label htmlFor="dayout-section-title">Section Title</Label>
                <Input
                  id="dayout-section-title"
                  value={config.dayOutPackages.sectionTitle}
                  onChange={(e) =>
                    updateConfig('dayOutPackages', { sectionTitle: e.target.value })
                  }
                  placeholder="Day Out Packages"
                />
              </div>

              {/* Form Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium">Enquiry Form Settings</h4>

                <div>
                  <Label htmlFor="phone-placeholder">Phone Field Placeholder</Label>
                  <Input
                    id="phone-placeholder"
                    value={config.dayOutPackages.formConfig.phoneFieldPlaceholder}
                    onChange={(e) =>
                      updateConfig('dayOutPackages', {
                        formConfig: {
                          ...config.dayOutPackages.formConfig,
                          phoneFieldPlaceholder: e.target.value
                        }
                      })
                    }
                    placeholder="Leave empty for no placeholder"
                  />
                </div>

                <div>
                  <Label htmlFor="destination-label">Destination Field Label</Label>
                  <Input
                    id="destination-label"
                    value={config.dayOutPackages.formConfig.destinationFieldLabel}
                    onChange={(e) =>
                      updateConfig('dayOutPackages', {
                        formConfig: {
                          ...config.dayOutPackages.formConfig,
                          destinationFieldLabel: e.target.value
                        }
                      })
                    }
                    placeholder="Destination"
                  />
                </div>
              </div>

              {/* Package Management */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Package Configuration</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newPackage = {
                        id: Date.now().toString(),
                        title: "New Package",
                        image: "",
                        showDescription: false,
                        showExploreButton: false,
                        isActive: true
                      };
                      updateConfig('dayOutPackages', {
                        packages: [...config.dayOutPackages.packages, newPackage]
                      });
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Package
                  </Button>
                </div>

                {config.dayOutPackages.packages.map((pkg, index) => (
                  <Card key={pkg.id} className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">Package {index + 1}</h5>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const updatedPackages = config.dayOutPackages.packages.filter(p => p.id !== pkg.id);
                              updateConfig('dayOutPackages', { packages: updatedPackages });
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label>Package Title</Label>
                          <Input
                            value={pkg.title}
                            onChange={(e) => {
                              const updatedPackages = config.dayOutPackages.packages.map(p =>
                                p.id === pkg.id ? { ...p, title: e.target.value } : p
                              );
                              updateConfig('dayOutPackages', { packages: updatedPackages });
                            }}
                            placeholder="Package Title"
                          />
                        </div>
                        <div>
                          <Label>Image URL</Label>
                          <Input
                            value={pkg.image}
                            onChange={(e) => {
                              const updatedPackages = config.dayOutPackages.packages.map(p =>
                                p.id === pkg.id ? { ...p, image: e.target.value } : p
                              );
                              updateConfig('dayOutPackages', { packages: updatedPackages });
                            }}
                            placeholder="Image URL"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={pkg.showDescription}
                            onCheckedChange={(checked) => {
                              const updatedPackages = config.dayOutPackages.packages.map(p =>
                                p.id === pkg.id ? { ...p, showDescription: checked } : p
                              );
                              updateConfig('dayOutPackages', { packages: updatedPackages });
                            }}
                          />
                          <Label>Show Description</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={pkg.showExploreButton}
                            onCheckedChange={(checked) => {
                              const updatedPackages = config.dayOutPackages.packages.map(p =>
                                p.id === pkg.id ? { ...p, showExploreButton: checked } : p
                              );
                              updateConfig('dayOutPackages', { packages: updatedPackages });
                            }}
                          />
                          <Label>Show Explore Button</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={pkg.isActive}
                            onCheckedChange={(checked) => {
                              const updatedPackages = config.dayOutPackages.packages.map(p =>
                                p.id === pkg.id ? { ...p, isActive: checked } : p
                              );
                              updateConfig('dayOutPackages', { packages: updatedPackages });
                            }}
                          />
                          <Label>Active</Label>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Configuration Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuration Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>Last Updated:</strong> {new Date(config.lastUpdated).toLocaleString()}</p>
            <p><strong>Status:</strong> {config.isDraft ? "Draft" : "Published"}</p>
            <p><strong>Active Sections:</strong> {
              [
                config.heroBanner.isVisible && "Hero Banner",
                config.tourOffers.isVisible && "Tour Offers",
                config.dayOutPackages.isVisible && "Day Out Packages"
              ].filter(Boolean).join(", ")
            }</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminControllableHomepage;