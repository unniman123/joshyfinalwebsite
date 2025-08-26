// Admin Tour Detail Page Management Component
// This component demonstrates the admin infrastructure capabilities for tour detail page management

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Save,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Upload,
  Download,
  Settings,
  ChevronUp,
  ChevronDown,
  Edit3,
  Globe,
  GlobeLock
} from 'lucide-react';
import { useAdminTourDetail } from '@/hooks/use-admin-tour-detail';
import { TourSection, ItineraryDay, TourImage } from '@/lib/api';

interface AdminTourDetailPageProps {
  tourId: string;
}

/**
 * AdminTourDetailPage - Comprehensive admin interface for tour detail page management
 * 
 * This component provides full CRUD operations for:
 * 1. Tour basic information (title, description, etc.)
 * 2. Tour sections (overview, itinerary, custom sections)
 * 3. Itinerary days management
 * 4. Image management by sections
 * 5. Publishing controls
 * 6. Preview and export functionality
 * 
 * Note: This is infrastructure demonstration - actual admin panel would have
 * dedicated routes, authentication, and enhanced UI/UX
 */
const AdminTourDetailPage: React.FC<AdminTourDetailPageProps> = ({ tourId }) => {
  const {
    tour,
    loading,
    saving,
    error,
    isDirty,
    lastSaved,
    loadTour,
    saveTour,
    updateTourBasicInfo,
    publishTour,
    unpublishTour,
    addSection,
    updateSection,
    deleteSection,
    reorderSections,
    toggleSectionVisibility,
    addItineraryDay,
    updateItineraryDay,
    deleteItineraryDay,
    reorderItineraryDays,
    uploadImage,
    deleteImage,
    reorderImages,
    resetChanges,
    validateCurrentTour,
    exportTour
  } = useAdminTourDetail(tourId);

  const [activeTab, setActiveTab] = useState('basic');
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editingDay, setEditingDay] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4\"></div>
          <p className="text-muted-foreground\">Loading tour for editing...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive\">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4\">{error}</p>
            <Button onClick={() => loadTour(tourId)} variant="outline">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Tour Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground\">The tour could not be loaded for editing.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const validation = validateCurrentTour();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Admin Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Edit Tour: {tour.title}
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage all aspects of this tour's detail page
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={tour.isPublished ? "default" : "secondary"}>
                {tour.isPublished ? (
                  <>
                    <Globe className="h-3 w-3 mr-1" />
                    Published
                  </>
                ) : (
                  <>
                    <GlobeLock className="h-3 w-3 mr-1" />
                    Draft
                  </>
                )}
              </Badge>
              {isDirty && (
                <Badge variant="outline" className="text-orange-600">
                  Unsaved Changes
                </Badge>
              )}
              {lastSaved && (
                <p className="text-xs text-muted-foreground">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>

          {/* Admin Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <Button
              onClick={saveTour}
              disabled={saving || !validation.isValid}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>

            {tour.isPublished ? (
              <Button onClick={unpublishTour} variant="outline">
                <EyeOff className="h-4 w-4 mr-2" />
                Unpublish
              </Button>
            ) : (
              <Button onClick={publishTour} variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Publish
              </Button>
            )}

            <Button onClick={resetChanges} variant="outline" disabled={!isDirty}>
              Reset Changes
            </Button>

            <Button
              onClick={async () => {
                const blob = await exportTour();
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${tour.slug}-export.json`;
                a.click();
              }}
              variant="outline"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>

            <Button
              onClick={() => window.open(`/tours/${tour.slug}`, '_blank')}
              variant="outline"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>

          {/* Validation Errors */}
          {!validation.isValid && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <h4 className="font-semibold text-destructive mb-2">Validation Errors:</h4>
              <ul className="list-disc list-inside space-y-1">
                {validation.errors.map((error, index) => (
                  <li key={index} className="text-sm text-destructive">{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Admin Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Tour Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Tour Title</Label>
                    <Input
                      id="title"
                      value={tour.title}
                      onChange={(e) => updateTourBasicInfo({ title: e.target.value })}
                      placeholder="Enter tour title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={tour.category}
                      onChange={(e) => updateTourBasicInfo({ category: e.target.value })}
                      placeholder="Tour category"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (days)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={tour.duration}
                      onChange={(e) => updateTourBasicInfo({ duration: parseInt(e.target.value) })}
                      min="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      value={tour.price || ''}
                      onChange={(e) => updateTourBasicInfo({ price: e.target.value })}
                      placeholder="₹45,000"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={tour.description}
                    onChange={(e) => updateTourBasicInfo({ description: e.target.value })}
                    placeholder="Brief tour description"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="detailedContent">Detailed Content</Label>
                  <Textarea
                    id="detailedContent"
                    value={tour.detailedContent}
                    onChange={(e) => updateTourBasicInfo({ detailedContent: e.target.value })}
                    placeholder="Detailed tour description for overview section"
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sections Management Tab */}
          <TabsContent value="sections" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold\">Tour Sections</h3>
              <Button onClick={() => addSection({
                type: 'overview',
                title: 'New Section',
                content: '',
                isVisible: true,
                order: tour.sections.length
              })}>
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </div>

            {tour.sections
              .sort((a, b) => a.order - b.order)
              .map((section) => (
                <Card key={section.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-lg\">{section.title}</CardTitle>
                        <Badge variant={section.type === 'overview' ? 'default' : 'secondary'}>
                          {section.type}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={section.isVisible}
                            onCheckedChange={() => toggleSectionVisibility(section.id)}
                          />
                          <Label className="text-sm\">{section.isVisible ? 'Visible' : 'Hidden'}</Label>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingSection(editingSection === section.id ? null : section.id)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteSection(section.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {editingSection === section.id && (
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Section Title</Label>
                        <Input
                          value={section.title}
                          onChange={(e) => updateSection(section.id, { title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Content</Label>
                        <Textarea
                          value={section.content || ''}
                          onChange={(e) => updateSection(section.id, { content: e.target.value })}
                          rows={6}
                        />
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
          </TabsContent>

          {/* Itinerary Management Tab */}
          <TabsContent value="itinerary" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Itinerary Days</h3>
              <Button onClick={() => addItineraryDay({
                dayNumber: tour.itineraryDays.length + 1,
                title: `Day ${tour.itineraryDays.length + 1}`,
                description: '',
                activities: [],
                highlights: [],
                meals: [],
                images: [],
                isActive: true,
                order: tour.itineraryDays.length
              })}>
                <Plus className="h-4 w-4 mr-2" />
                Add Day
              </Button>
            </div>

            {tour.itineraryDays
              .sort((a, b) => a.order - b.order)
              .map((day) => (
                <Card key={day.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Day {day.dayNumber}: {day.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingDay(editingDay === day.id ? null : day.id)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteItineraryDay(day.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {editingDay === day.id && (
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Day Title</Label>
                          <Input
                            value={day.title}
                            onChange={(e) => updateItineraryDay(day.id, { title: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Day Number</Label>
                          <Input
                            type="number"
                            value={day.dayNumber}
                            onChange={(e) => updateItineraryDay(day.id, { dayNumber: parseInt(e.target.value) })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={day.description || ''}
                          onChange={(e) => updateItineraryDay(day.id, { description: e.target.value })}
                          rows={4}
                        />
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
          </TabsContent>

          {/* Images Management Tab */}
          <TabsContent value="images" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['banner', 'overview', 'itinerary', 'gallery'].map((section) => (
                <Card key={section}>
                  <CardHeader>
                    <CardTitle className="capitalize">{section} Images</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.multiple = true;
                          input.onchange = (e) => {
                            const files = (e.target as HTMLInputElement).files;
                            if (files) {
                              Array.from(files).forEach(file => uploadImage(file, section));
                            }
                          };
                          input.click();
                        }}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Images
                      </Button>

                      {tour.images
                        .filter(img => img.section === section)
                        .sort((a, b) => a.order - b.order)
                        .map((image) => (
                          <div key={image.id} className="relative group">
                            <img
                              src={image.url}
                              alt={image.alt}
                              className="w-full h-24 object-cover rounded border"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => deleteImage(image.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Settings className="h-5 w-5 mr-2 inline" />
                  Tour Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h4 className="font-semibold mb-2">Advanced Settings</h4>
                  <p className="text-muted-foreground">
                    SEO settings, pricing, booking controls, and other advanced configurations
                    would be available here in the full admin panel.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminTourDetailPage;