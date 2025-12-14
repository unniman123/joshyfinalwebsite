import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Filter, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface CategoryFilterProps {
  onFiltersChange?: (filters: FilterState) => void;
}

interface FilterState {
  destinations: string[];
  categories: string[];
  duration: string;
  budget: string;
}

const CategoryFilter = ({ onFiltersChange }: CategoryFilterProps) => {
  const [filters, setFilters] = useState<FilterState>({
    destinations: [],
    categories: [],
    duration: "",
    budget: ""
  });

  // TODO: Fetch these from Supabase tours table
  const destinations = [
    "Kerala",
    "Rajasthan", 
    "Goa",
    "Himachal Pradesh",
    "Tamil Nadu",
    "Karnataka"
  ];

  const categories = [
    "Kerala Travels",
    "Discover India",
    "Ayurveda", 
    "Heritage Tours",
    "Global Holidays"
  ];

  const durations = [
    { label: "1-3 days", value: "1-3" },
    { label: "4-7 days", value: "4-7" },
    { label: "8-14 days", value: "8-14" },
    { label: "15+ days", value: "15+" }
  ];

  const budgets = [
    { label: "Under ₹25,000", value: "under-25k" },
    { label: "₹25,000 - ₹50,000", value: "25k-50k" },
    { label: "₹50,000 - ₹1,00,000", value: "50k-100k" },
    { label: "Above ₹1,00,000", value: "above-100k" }
  ];

  const handleDestinationChange = (destination: string, checked: boolean) => {
    const newDestinations = checked 
      ? [...filters.destinations, destination]
      : filters.destinations.filter(d => d !== destination);
    
    // Track filter usage in Google Analytics
    trackEvent('Filter', checked ? 'Select Destination' : 'Deselect Destination', destination);
    
    const newFilters = { ...filters, destinations: newDestinations };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    
    // Track filter usage in Google Analytics
    trackEvent('Filter', checked ? 'Select Category' : 'Deselect Category', category);
    
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleDurationChange = (duration: string) => {
    const newFilters = { ...filters, duration };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleBudgetChange = (budget: string) => {
    const newFilters = { ...filters, budget };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearAllFilters = () => {
    // Track clear all filters action
    trackEvent('Filter', 'Clear All Filters', 'User Action');
    
    const clearedFilters = {
      destinations: [],
      categories: [],
      duration: "",
      budget: ""
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const hasActiveFilters = filters.destinations.length > 0 || 
                          filters.categories.length > 0 || 
                          filters.duration || 
                          filters.budget;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filter Tours
        </CardTitle>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="self-start text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Destinations */}
        <div>
          <h4 className="font-medium mb-3">Destination</h4>
          <div className="space-y-2">
            {destinations.map((destination) => (
              <div key={destination} className="flex items-center space-x-2">
                <Checkbox
                  id={`dest-${destination}`}
                  checked={filters.destinations.includes(destination)}
                  onCheckedChange={(checked) => 
                    handleDestinationChange(destination, checked as boolean)
                  }
                />
                <label 
                  htmlFor={`dest-${destination}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {destination}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Categories */}
        <div>
          <h4 className="font-medium mb-3">Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) => 
                    handleCategoryChange(category, checked as boolean)
                  }
                />
                <label 
                  htmlFor={`cat-${category}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Duration */}
        <div>
          <h4 className="font-medium mb-3">Duration</h4>
          <div className="space-y-2">
            {durations.map((duration) => (
              <div key={duration.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`dur-${duration.value}`}
                  checked={filters.duration === duration.value}
                  onCheckedChange={(checked) => 
                    handleDurationChange(checked ? duration.value : "")
                  }
                />
                <label 
                  htmlFor={`dur-${duration.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {duration.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Budget */}
        <div>
          <h4 className="font-medium mb-3">Budget</h4>
          <div className="space-y-2">
            {budgets.map((budget) => (
              <div key={budget.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`budget-${budget.value}`}
                  checked={filters.budget === budget.value}
                  onCheckedChange={(checked) => 
                    handleBudgetChange(checked ? budget.value : "")
                  }
                />
                <label 
                  htmlFor={`budget-${budget.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {budget.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* TODO: Wire filters to tour query params (future) */}
      </CardContent>
    </Card>
  );
};

export default CategoryFilter;