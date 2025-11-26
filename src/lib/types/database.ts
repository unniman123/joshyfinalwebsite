/**
 * Database Type Definitions
 * 
 * These types mirror the Supabase database schema as defined in:
 * - admin panel and db infra/database document
 * 
 * Generated based on verified schema structure from Supabase MCP.
 */

// Core domain types matching database tables

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TourImage {
  id: string;
  tour_id: string;
  image_url: string;
  alt_text: string | null;
  caption: string | null;
  display_order: number;
  section: string | null;
  created_at: string;
  updated_at: string;
}

export interface TourSection {
  id: string;
  tour_id: string;
  section_type: string;
  title: string;
  content: Record<string, any>; // JSONB
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Tour {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  featured_image_url: string | null;
  price: number | null;
  duration_days: number | null;
  location: string | null;
  category_id: string | null;
  is_published: boolean;
  is_featured: boolean;
  is_day_out_package: boolean;
  display_order: number;
  rating: number | null;
  review_count: number | null;
  created_at: string;
  updated_at: string;
}

// View types for frontend consumption

export interface TourImageView {
  image_url: string;
  alt_text: string | null;
  caption: string | null;
  display_order: number;
  section: string | null;
}

export interface TourSectionView {
  section_type: string;
  title: string;
  content: Record<string, any>;
  display_order: number;
}

/**
 * vw_published_tours view
 * Used for listing pages, category pages, featured tours
 */
export interface TourSummary {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  featured_image_url: string | null;
  price: number | null;
  duration_days: number | null;
  display_order: number;
  is_featured: boolean;
  is_day_out_package: boolean;
  rating: number | null;
  review_count: number | null;
  location: string | null;
  category_id: string | null;
  category_name: string | null;
  category_slug: string | null;
  images: TourImageView[];
}

/**
 * vw_tour_by_slug view
 * Used for tour detail pages
 */
export interface TourDetail {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  featured_image_url: string | null;
  price: number | null;
  duration_days: number | null;
  display_order: number;
  is_featured: boolean;
  is_day_out_package: boolean;
  rating: number | null;
  review_count: number | null;
  location: string | null;
  category_id: string | null;
  category_name: string | null;
  category_slug: string | null;
  images: TourImageView[];
  sections: TourSectionView[];
  overview_content: string | null; // Pre-selected HTML from overview section
  itinerary: Record<string, any> | null; // Pre-selected JSONB from itinerary section
}

// Inquiry form types

export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: string;
  submitted_at?: string;
}

export interface TourInquiry {
  id?: string;
  tour_id?: string | null;
  name: string;
  email: string;
  contact_number?: string | null;
  message?: string | null;
  status?: string;
  admin_notes?: string | null;
  created_at?: string;
  updated_at?: string;
  nationality?: string | null;
  date_of_travel?: string | null;
  number_of_people?: string | null;
  number_of_kids?: string | null;
  number_of_rooms?: number | null;
  hotel_category?: string | null;
  submitted_at?: string | null;
}

export interface DayOutInquiry {
  id?: string;
  package_id: string;
  name: string;
  mobile_no: string;
  preferred_date: string;
  number_of_people: number;
  destination: string | null;
  special_comments: string | null;
  status?: string;
  submitted_at?: string;
}

export interface QuickEnquiry {
  id?: string;
  name: string;
  mobile_no: string;
  preferred_date?: string | null;
  number_of_people?: number | null;
  destination?: string | null;
  special_comments?: string | null;
  status?: string;
  submitted_at?: string;
}

// Homepage settings (for admin-controlled content)

/**
 * CropData interface for image cropping information
 * Stores the cropped area coordinates and dimensions from admin panel
 */
export interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
  aspectRatio: number;
}

/**
 * HeroImage interface for homepage hero banner images
 * Supports optional cropData for displaying cropped images
 */
export interface HeroImage {
  url: string;
  order: number;
  section?: string;
  cropData?: CropData;
}

export interface HomepageSettings {
  id: string;
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_image_url: string | null;
  featured_section_title: string | null;
  testimonial_section_enabled: boolean;
  day_out_section_enabled: boolean;
  updated_at: string;
}

export interface SiteContent {
  id: string;
  key: string;
  content: Record<string, any>; // JSONB
  updated_at: string;
}

// Supabase Database type for typed client
export interface Database {
  public: {
    Tables: {
      tours: {
        Row: Tour;
        Insert: Omit<Tour, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Tour, 'id' | 'created_at' | 'updated_at'>>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>;
      };
      tour_images: {
        Row: TourImage;
        Insert: Omit<TourImage, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<TourImage, 'id' | 'created_at' | 'updated_at'>>;
      };
      tour_sections: {
        Row: TourSection;
        Insert: Omit<TourSection, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<TourSection, 'id' | 'created_at' | 'updated_at'>>;
      };
      inquiries: {
        Row: TourInquiry;
        Insert: Omit<TourInquiry, 'id' | 'created_at' | 'updated_at' | 'submitted_at'>;
        Update: Partial<Omit<TourInquiry, 'id' | 'created_at' | 'updated_at' | 'submitted_at'>>;
      };
      contact_inquiry: {
        Row: ContactInquiry;
        Insert: Omit<ContactInquiry, 'id' | 'created_at'>;
        Update: Partial<Omit<ContactInquiry, 'id' | 'created_at'>>;
      };
      day_out_inquiry: {
        Row: DayOutInquiry;
        Insert: Omit<DayOutInquiry, 'id' | 'status' | 'submitted_at'>;
        Update: Partial<Omit<DayOutInquiry, 'id' | 'status' | 'submitted_at'>>;
      };
      quick_enquiries: {
        Row: QuickEnquiry;
        Insert: Omit<QuickEnquiry, 'id' | 'status' | 'submitted_at'>;
        Update: Partial<Omit<QuickEnquiry, 'id' | 'status' | 'submitted_at'>>;
      };
      homepage_settings: {
        Row: HomepageSettings;
        Insert: Omit<HomepageSettings, 'id' | 'updated_at'>;
        Update: Partial<Omit<HomepageSettings, 'id' | 'updated_at'>>;
      };
      site_content: {
        Row: SiteContent;
        Insert: Omit<SiteContent, 'id' | 'updated_at'>;
        Update: Partial<Omit<SiteContent, 'id' | 'updated_at'>>;
      };
    };
    Views: {
      vw_published_tours: {
        Row: TourSummary;
      };
      vw_tour_by_slug: {
        Row: TourDetail;
      };
    };
    Functions: {
      check_tour_slug_availability: {
        Args: { slug_to_check: string };
        Returns: boolean;
      };
    };
  };
}


