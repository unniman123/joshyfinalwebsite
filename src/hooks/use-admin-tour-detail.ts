// Enhanced admin hooks for tour detail page management
import { useState, useEffect, useCallback } from 'react';
import { Tour, TourSection, ItineraryDay, TourImage } from '@/lib/api';
import { 
  getTourById, 
  updateTour, 
  createTourSection, 
  updateTourSection, 
  deleteTourSection,
  reorderTourSections,
  createItineraryDay,
  updateItineraryDay,
  deleteItineraryDay,
  reorderItineraryDays,
  uploadTourImage,
  deleteTourImage,
  reorderTourImages
} from '@/lib/admin-api';
import { validateTourData } from '@/lib/admin-utils';

export interface AdminTourDetailState {
  tour: Tour | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
  isDirty: boolean;
  lastSaved: Date | null;
}

export interface AdminTourDetailActions {
  // Tour management
  loadTour: (tourId: string) => Promise<void>;
  saveTour: () => Promise<void>;
  updateTourBasicInfo: (updates: Partial<Tour>) => void;
  publishTour: () => Promise<void>;
  unpublishTour: () => Promise<void>;
  
  // Section management
  addSection: (sectionData: Partial<TourSection>) => Promise<void>;
  updateSection: (sectionId: string, updates: Partial<TourSection>) => Promise<void>;
  deleteSection: (sectionId: string) => Promise<void>;
  reorderSections: (sectionIds: string[]) => Promise<void>;
  toggleSectionVisibility: (sectionId: string) => Promise<void>;
  
  // Itinerary management
  addItineraryDay: (dayData: Partial<ItineraryDay>) => Promise<void>;
  updateItineraryDay: (dayId: string, updates: Partial<ItineraryDay>) => Promise<void>;
  deleteItineraryDay: (dayId: string) => Promise<void>;
  reorderItineraryDays: (dayIds: string[]) => Promise<void>;
  
  // Image management
  uploadImage: (file: File, section: string) => Promise<void>;
  deleteImage: (imageId: string) => Promise<void>;
  reorderImages: (section: string, imageIds: string[]) => Promise<void>;
  
  // Utility functions
  resetChanges: () => void;
  validateCurrentTour: () => { isValid: boolean; errors: string[] };
  exportTour: () => Promise<Blob>;
}

export const useAdminTourDetail = (initialTourId?: string): AdminTourDetailState & AdminTourDetailActions => {
  const [state, setState] = useState<AdminTourDetailState>({
    tour: null,
    loading: false,
    saving: false,
    error: null,
    isDirty: false,
    lastSaved: null
  });

  const [originalTour, setOriginalTour] = useState<Tour | null>(null);

  // Load tour data
  const loadTour = useCallback(async (tourId: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const tour = await getTourById(tourId);
      if (!tour) {
        throw new Error('Tour not found');
      }
      
      setState(prev => ({ ...prev, tour, loading: false, isDirty: false }));
      setOriginalTour(tour);
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to load tour' 
      }));
    }
  }, []);

  // Save tour changes
  const saveTour = useCallback(async () => {
    if (!state.tour) return;
    
    setState(prev => ({ ...prev, saving: true, error: null }));
    
    try {
      const validation = validateTourData(state.tour);
      if (!validation.isValid) {
        throw new Error(`Validation errors: ${validation.errors.join(', ')}`);
      }
      
      const updatedTour = await updateTour(state.tour.id, state.tour);
      
      setState(prev => ({ 
        ...prev, 
        tour: updatedTour, 
        saving: false, 
        isDirty: false,
        lastSaved: new Date()
      }));
      setOriginalTour(updatedTour);
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        saving: false, 
        error: error instanceof Error ? error.message : 'Failed to save tour' 
      }));
    }
  }, [state.tour]);

  // Update tour basic information
  const updateTourBasicInfo = useCallback((updates: Partial<Tour>) => {
    setState(prev => ({
      ...prev,
      tour: prev.tour ? { ...prev.tour, ...updates } : null,
      isDirty: true
    }));
  }, []);

  // Publish/Unpublish tour
  const publishTour = useCallback(async () => {
    if (!state.tour) return;
    updateTourBasicInfo({ isPublished: true, publishedAt: new Date().toISOString() });
    await saveTour();
  }, [state.tour, updateTourBasicInfo, saveTour]);

  const unpublishTour = useCallback(async () => {
    if (!state.tour) return;
    updateTourBasicInfo({ isPublished: false });
    await saveTour();
  }, [state.tour, updateTourBasicInfo, saveTour]);

  // Section management
  const addSection = useCallback(async (sectionData: Partial<TourSection>) => {
    if (!state.tour) return;
    
    try {
      const newSection = await createTourSection(state.tour.id, sectionData);
      setState(prev => ({
        ...prev,
        tour: prev.tour ? {
          ...prev.tour,
          sections: [...prev.tour.sections, newSection]
        } : null,
        isDirty: true
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to add section' 
      }));
    }
  }, [state.tour]);

  const updateSection = useCallback(async (sectionId: string, updates: Partial<TourSection>) => {
    if (!state.tour) return;
    
    try {
      await updateTourSection(sectionId, updates);
      setState(prev => ({
        ...prev,
        tour: prev.tour ? {
          ...prev.tour,
          sections: prev.tour.sections.map(section =>
            section.id === sectionId ? { ...section, ...updates } : section
          )
        } : null,
        isDirty: true
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to update section' 
      }));
    }
  }, [state.tour]);

  const deleteSection = useCallback(async (sectionId: string) => {
    if (!state.tour) return;
    
    try {
      await deleteTourSection(sectionId);
      setState(prev => ({
        ...prev,
        tour: prev.tour ? {
          ...prev.tour,
          sections: prev.tour.sections.filter(section => section.id !== sectionId)
        } : null,
        isDirty: true
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to delete section' 
      }));
    }
  }, [state.tour]);

  const reorderSections = useCallback(async (sectionIds: string[]) => {
    if (!state.tour) return;
    
    try {
      await reorderTourSections(state.tour.id, sectionIds);
      setState(prev => ({
        ...prev,
        tour: prev.tour ? {
          ...prev.tour,
          sections: sectionIds.map((id, index) => {
            const section = prev.tour!.sections.find(s => s.id === id)!;
            return { ...section, order: index };
          })
        } : null,
        isDirty: true
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to reorder sections' 
      }));
    }
  }, [state.tour]);

  const toggleSectionVisibility = useCallback(async (sectionId: string) => {
    if (!state.tour) return;
    
    const section = state.tour.sections.find(s => s.id === sectionId);
    if (!section) return;
    
    await updateSection(sectionId, { isVisible: !section.isVisible });
  }, [state.tour, updateSection]);

  // Itinerary management
  const addItineraryDay = useCallback(async (dayData: Partial<ItineraryDay>) => {
    if (!state.tour) return;
    
    try {
      const newDay = await createItineraryDay(state.tour.id, dayData);
      setState(prev => ({
        ...prev,
        tour: prev.tour ? {
          ...prev.tour,
          itineraryDays: [...prev.tour.itineraryDays, newDay]
        } : null,
        isDirty: true
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to add itinerary day' 
      }));
    }
  }, [state.tour]);

  const updateItineraryDay = useCallback(async (dayId: string, updates: Partial<ItineraryDay>) => {
    if (!state.tour) return;
    
    try {
      await updateItineraryDay(dayId, updates);
      setState(prev => ({
        ...prev,
        tour: prev.tour ? {
          ...prev.tour,
          itineraryDays: prev.tour.itineraryDays.map(day =>
            day.id === dayId ? { ...day, ...updates } : day
          )
        } : null,
        isDirty: true
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to update itinerary day' 
      }));
    }
  }, [state.tour]);

  const deleteItineraryDay = useCallback(async (dayId: string) => {
    if (!state.tour) return;
    
    try {
      await deleteItineraryDay(dayId);
      setState(prev => ({
        ...prev,
        tour: prev.tour ? {
          ...prev.tour,
          itineraryDays: prev.tour.itineraryDays.filter(day => day.id !== dayId)
        } : null,
        isDirty: true
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to delete itinerary day' 
      }));
    }
  }, [state.tour]);

  const reorderItineraryDays = useCallback(async (dayIds: string[]) => {
    if (!state.tour) return;
    
    try {
      await reorderItineraryDays(dayIds);
      setState(prev => ({
        ...prev,
        tour: prev.tour ? {
          ...prev.tour,
          itineraryDays: dayIds.map((id, index) => {
            const day = prev.tour!.itineraryDays.find(d => d.id === id)!;
            return { ...day, order: index };
          })
        } : null,
        isDirty: true
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to reorder itinerary days' 
      }));
    }
  }, [state.tour]);

  // Image management
  const uploadImage = useCallback(async (file: File, section: string) => {
    if (!state.tour) return;
    
    try {
      const newImage = await uploadTourImage(state.tour.id, file, section);
      setState(prev => ({
        ...prev,
        tour: prev.tour ? {
          ...prev.tour,
          images: [...prev.tour.images, newImage]
        } : null,
        isDirty: true
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to upload image' 
      }));
    }
  }, [state.tour]);

  const deleteImage = useCallback(async (imageId: string) => {
    if (!state.tour) return;
    
    try {
      await deleteTourImage(imageId);
      setState(prev => ({
        ...prev,
        tour: prev.tour ? {
          ...prev.tour,
          images: prev.tour.images.filter(img => img.id !== imageId)
        } : null,
        isDirty: true
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to delete image' 
      }));
    }
  }, [state.tour]);

  const reorderImages = useCallback(async (section: string, imageIds: string[]) => {
    if (!state.tour) return;
    
    try {
      await reorderTourImages(state.tour.id, section, imageIds);
      setState(prev => ({
        ...prev,
        tour: prev.tour ? {
          ...prev.tour,
          images: prev.tour.images.map(img => {
            const newOrder = imageIds.indexOf(img.id);
            return newOrder >= 0 ? { ...img, order: newOrder } : img;
          })
        } : null,
        isDirty: true
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to reorder images' 
      }));
    }
  }, [state.tour]);

  // Utility functions
  const resetChanges = useCallback(() => {
    if (originalTour) {
      setState(prev => ({ ...prev, tour: originalTour, isDirty: false }));
    }
  }, [originalTour]);

  const validateCurrentTour = useCallback(() => {
    if (!state.tour) return { isValid: false, errors: ['No tour loaded'] };
    return validateTourData(state.tour);
  }, [state.tour]);

  const exportTour = useCallback(async (): Promise<Blob> => {
    if (!state.tour) throw new Error('No tour to export');
    
    const tourData = JSON.stringify(state.tour, null, 2);
    return new Blob([tourData], { type: 'application/json' });
  }, [state.tour]);

  // Load initial tour if provided
  useEffect(() => {
    if (initialTourId) {
      loadTour(initialTourId);
    }
  }, [initialTourId, loadTour]);

  return {
    ...state,
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
  };
};

export default useAdminTourDetail;