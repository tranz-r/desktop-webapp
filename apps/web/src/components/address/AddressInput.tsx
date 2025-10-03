"use client";

import React, { useState } from 'react';
import { AddressAutofill } from '@mapbox/search-js-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MapPin, Edit3 } from 'lucide-react';

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  onAddressSelected?: (addressData: {
    line1: string;
    line2: string;
    postcode: string;
    city: string;
    county: string;
    country: string;
    fullAddress: string;
    addressNumber: string;
    street: string;
    neighborhood: string;
    district: string;
    region: string;
    regionCode: string;
    countryCode: string;
    placeName: string;
    accuracy: string;
    mapboxId: string;
    latitude: number;
    longitude: number;
  }) => void;
  placeholder?: string;
  label?: string;
  variant?: 'pickup' | 'delivery';
  className?: string;
  disabled?: boolean;
}

export default function AddressInput({ 
  value, 
  onChange, 
  onAddressSelected,
  placeholder = "Enter address...", 
  label = "Address",
  variant = 'pickup',
  className,
  disabled = false
}: AddressInputProps) {
  // Color scheme based on variant
  const isPickup = variant === 'pickup';
  const focusRingColor = isPickup ? 'focus:ring-emerald-500' : 'focus:ring-blue-500';
  const borderColor = isPickup ? 'border-emerald-300' : 'border-blue-300';
  
  
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  
  // State to track if an address has been selected
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const [selectedAddressData, setSelectedAddressData] = useState<any>(null);
  
  // Handle Mapbox retrieve event - for complete addresses
  const handleAutofillRetrieve = (response: any) => {
    if (response && response.features && response.features.length > 0) {
      const feature = response.features[0];
      const properties = feature.properties;

      console.log("Complete address properties:", properties);
      
      // Extract comprehensive address data from the feature
      const addressData = {
        line1: properties.address_line1 || properties.full_address || '',
        line2: properties.address_line2 || '', // Capture address_line2 (empty if no value)
        postcode: properties.postcode || '',
        city: properties.place || properties.address_level2 || '',
        county: properties.county || properties.address_level1 || '', // Capture county/state
        country: properties.country_code || 'GB',
        fullAddress: properties.full_address || '',
        addressNumber: properties.address_number || '',
        street: properties.street || '',
        neighborhood: properties.neighborhood || '',
        district: properties.district || '',
        region: properties.region || '',
        regionCode: properties.region_code || '',
        countryCode: properties.country_code || 'gb',
        placeName: properties.place_name || '',
        accuracy: properties.accuracy || '',
        mapboxId: properties.mapbox_id || '',
        latitude: feature.geometry?.coordinates?.[1] || 0,
        longitude: feature.geometry?.coordinates?.[0] || 0
      };

      console.log("Complete address captured:", addressData);
      
      // Store the selected address data and mark as selected
      setSelectedAddressData(addressData);
      setIsAddressSelected(true);
      
      // Update the main input with full address for display
      onChange(addressData.fullAddress);
      
      // Call the callback with structured data
      if (onAddressSelected) {
        onAddressSelected(addressData);
      }
    }
  };

  // Handle Mapbox suggest event - for partial addresses
  const handleAutofillSuggest = (response: any) => {
    console.log("Suggest event triggered:", response);
    // This fires when suggestions are shown, but not when selected
    // We can use this to detect when user is typing vs selecting
  };

  // Check if current value looks like a partial address (no postcode)
  const isPartialAddress = value && value.trim().length > 0 && !/\b[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}\b/i.test(value);
  
  // Function to handle changing the address
  const handleChangeAddress = () => {
    setIsAddressSelected(false);
    setSelectedAddressData(null);
    onChange(''); // Clear the input
  };
  
  if (!accessToken) {
    return (
      <div className={cn("space-y-2", className)}>
        {/* <label className="text-sm font-medium text-gray-700">{label}</label> */}
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="address-line1"
          className={cn(
            "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2",
            borderColor,
            focusRingColor,
            disabled && "bg-gray-100 cursor-not-allowed"
          )}
        />
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {/* <label className="text-sm font-medium text-gray-700">{label}</label> */}
      
      {isAddressSelected && selectedAddressData ? (
        // Show selected address with change button
        <div className={cn(
          "p-3 border rounded-md bg-gray-50",
          borderColor
        )}>
          <div className="flex items-start gap-3">
            <MapPin className={cn(
              "h-5 w-5 mt-0.5 flex-shrink-0",
              isPickup ? "text-emerald-600" : "text-blue-600"
            )} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 break-words">
                {selectedAddressData.fullAddress}
              </p>
              {/* <p className="text-xs text-gray-500 mt-1">
                {selectedAddressData.line1}, {selectedAddressData.postcode}
              </p> */}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleChangeAddress}
              className="flex-shrink-0 h-8 px-2"
            >
              <Edit3 className="h-4 w-4 mr-1" />
              Change
            </Button>
          </div>
        </div>
      ) : (
        // Show Mapbox input field
        React.createElement(AddressAutofill as any, {
          accessToken: accessToken,
          onRetrieve: handleAutofillRetrieve,
          onSuggest: handleAutofillSuggest,
          options: {
            // Bias toward addresses with house numbers and postcodes
            proximity: undefined, // Could add user's location here if available
            country: 'GB',
            // Limit number of results for better focus
            limit: 5,
            // Enable streets to get more complete address results
            streets: true,
            // Set language for consistent results
            language: 'en'
          }
        }, [
          React.createElement('input', {
            key: 'main-input',
            type: 'text',
            value: value || "",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              onChange(e.target.value);
            },
            placeholder: placeholder,
            disabled: disabled,
            autoComplete: 'address-line1',
            className: cn(
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2",
              borderColor,
              focusRingColor,
              disabled && "bg-gray-100 cursor-not-allowed"
            )
          }),
          // Hidden fields for structured address data - Mapbox will populate these automatically
          React.createElement('input', {
            key: 'address-line2',
            type: 'hidden',
            autoComplete: 'address-line2',
            name: 'address-line2'
          }),
          React.createElement('input', {
            key: 'city',
            type: 'hidden',
            autoComplete: 'address-level2',
            name: 'city'
          }),
          React.createElement('input', {
            key: 'postcode',
            type: 'hidden',
            autoComplete: 'postal-code',
            name: 'postcode'
          }),
          React.createElement('input', {
            key: 'country',
            type: 'hidden',
            autoComplete: 'country',
            name: 'country'
          })
        ])
      )}
      
      {/* Show helpful message for partial addresses */}
      {isPartialAddress && !isAddressSelected && (
        <div className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded p-2 mt-1">
          💡 <strong>Tip:</strong> Start typing your full address and select a complete address with postcode for better service accuracy
        </div>
      )}
    </div>
  );
}
