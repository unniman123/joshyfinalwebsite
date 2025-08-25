// Admin Tour Editor Component - Demonstrates full admin control capabilities
// This component shows how every element of the tour detail page can be controlled

import { useState } from "react";
import { Tour, TourSection, ItineraryDay, TourImage } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Save,
  Upload,
  Settings
} from "lucide-react";

interface AdminTourEditorProps {
  tour: Tour;
  onSave: (tour: Tour) => void;
}

const AdminTourEditor = ({ tour, onSave }: AdminTourEditorProps) => {
  const [editingTour, setEditingTour] = useState<Tour>(tour);
  const [activeTab, setActiveTab] = useState<'basic' | 'sections' | 'itinerary' | 'images' | 'seo'>('basic');

  // Basic Tour Information Editor
  const renderBasicEditor = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Title</label>
          <Input
            value={editingTour.title}
            onChange={(e) => setEditingTour({ ...editingTour, title: e.target.value })}
            placeholder="Tour title"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Slug</label>
          <Input
            value={editingTour.slug}
            onChange={(e) => setEditingTour({ ...editingTour, slug: e.target.value })}
            placeholder="tour-slug"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={editingTour.description}
          onChange={(e) => setEditingTour({ ...editingTour, description: e.target.value })}
          placeholder="Tour description"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium">Category</label>
          <Input
            value={editingTour.category}
            onChange={(e) => setEditingTour({ ...editingTour, category: e.target.value })}
            placeholder="Tour category"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Duration (days)</label>
          <Input
            type="number"
            value={editingTour.duration}
            onChange={(e) => setEditingTour({ ...editingTour, duration: parseInt(e.target.value) })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Price</label>
          <Input
            value={editingTour.price || ''}
            onChange={(e) => setEditingTour({ ...editingTour, price: e.target.value })}
            placeholder="₹45,000"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={editingTour.isPublished}
            onCheckedChange={(checked) => setEditingTour({ ...editingTour, isPublished: checked })}
          />
          <label className="text-sm font-medium">Published</label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={editingTour.adminSettings?.featuredTour || false}
            onCheckedChange={(checked) => setEditingTour({
              ...editingTour,
              adminSettings: { ...editingTour.adminSettings, featuredTour: checked }
            })}
          />
          <label className="text-sm font-medium">Featured Tour</label>
        </div>
      </div>
    </div>
  );

  // Sections Editor
  const renderSectionsEditor = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Content Sections</h3>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Section
        </Button>
      </div>

      {editingTour.sections?.map((section, index) => (
        <Card key={section.id} className="border-l-4 border-l-golden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant={section.isVisible ? "default" : "secondary"}>
                  {section.type}
                </Badge>
                <span className="font-medium">{section.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost">
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  {section.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
                <Button size="sm" variant="ghost">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={section.content || ''}
              onChange={(e) => {
                const updatedSections = editingTour.sections?.map(s =>
                  s.id === section.id ? { ...s, content: e.target.value } : s
                );
                setEditingTour({ ...editingTour, sections: updatedSections });
              }}
              placeholder="Section content (HTML supported)"
              rows={4}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Itinerary Editor
  const renderItineraryEditor = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Itinerary Days</h3>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Day
        </Button>
      </div>

      {editingTour.itineraryDays?.map((day, index) => (
        <Card key={day.id} className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge>Day {day.dayNumber}</Badge>
                <span className="font-medium">{day.title}</span>
                {day.difficulty && (
                  <Badge variant="outline">{day.difficulty}</Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost">
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={day.description || ''}
              placeholder="Day description"
              rows={2}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Location" value={day.location || ''} />
              <Input placeholder="Duration" value={day.duration || ''} />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Activities</label>
                <Button size="sm" variant="outline" className="gap-1">
                  <Plus className="h-3 w-3" />
                  Add Activity
                </Button>
              </div>
              {day.activities.map((activity, actIndex) => (
                <div key={activity.id} className="flex items-center gap-2 mb-2 p-2 bg-muted/50 rounded">
                  <Input
                    value={activity.title}
                    placeholder="Activity title"
                    className="flex-1"
                  />
                  <Input
                    value={activity.duration || ''}
                    placeholder="Duration"
                    className="w-24"
                  />
                  <Button size="sm" variant="ghost" className="text-red-500">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Images Editor
  const renderImagesEditor = () => (
    <div className="space-y-6">
      {['overview', 'itinerary', 'gallery'].map(section => (
        <div key={section} className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold capitalize">{section} Images</h3>
            <Button size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Images
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {editingTour.images
              ?.filter(img => img.section === section)
              ?.map((image, index) => (
                <Card key={image.id} className="relative group">
                  <div className="aspect-square relative overflow-hidden rounded-t-lg">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-2">
                    <Input
                      value={image.alt}
                      placeholder="Alt text"
                      className="text-xs"
                    />
                    <Input
                      value={image.caption || ''}
                      placeholder="Caption"
                      className="text-xs mt-1"
                    />
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );

  // SEO Editor
  const renderSEOEditor = () => (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium">SEO Title</label>
        <Input
          value={editingTour.seoTitle || ''}
          onChange={(e) => setEditingTour({ ...editingTour, seoTitle: e.target.value })}
          placeholder="SEO optimized title"
        />
      </div>

      <div>
        <label className="text-sm font-medium">SEO Description</label>
        <Textarea
          value={editingTour.seoDescription || ''}
          onChange={(e) => setEditingTour({ ...editingTour, seoDescription: e.target.value })}
          placeholder="SEO meta description"
          rows={3}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Keywords</label>
        <Input
          value={editingTour.seoKeywords?.join(', ') || ''}
          onChange={(e) => setEditingTour({
            ...editingTour,
            seoKeywords: e.target.value.split(',').map(k => k.trim())
          })}
          placeholder="keyword1, keyword2, keyword3"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={editingTour.adminSettings?.allowPublicBooking || false}
            onCheckedChange={(checked) => setEditingTour({
              ...editingTour,
              adminSettings: { ...editingTour.adminSettings, allowPublicBooking: checked }
            })}
          />
          <label className="text-sm font-medium">Allow Public Booking</label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={editingTour.adminSettings?.showPricing || false}
            onCheckedChange={(checked) => setEditingTour({
              ...editingTour,
              adminSettings: { ...editingTour.adminSettings, showPricing: checked }
            })}
          />
          <label className="text-sm font-medium">Show Pricing</label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tour Editor: {editingTour.title}</h1>
        <div className="flex gap-2">
          <Button variant="outline">Preview</Button>
          <Button onClick={() => onSave(editingTour)} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {[
          { id: 'basic', label: 'Basic Info' },
          { id: 'sections', label: 'Content Sections' },
          { id: 'itinerary', label: 'Itinerary' },
          { id: 'images', label: 'Images' },
          { id: 'seo', label: 'SEO & Settings' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <Card>
        <CardContent className="p-6">
          {activeTab === 'basic' && renderBasicEditor()}
          {activeTab === 'sections' && renderSectionsEditor()}
          {activeTab === 'itinerary' && renderItineraryEditor()}
          {activeTab === 'images' && renderImagesEditor()}
          {activeTab === 'seo' && renderSEOEditor()}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTourEditor;