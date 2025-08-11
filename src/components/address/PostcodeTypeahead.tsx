"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostcodeTypeaheadProps {
  postcode: string;
  onPostcodeChange: (postcode: string) => void;
  onAddressSelected: (address: string) => void;
  placeholder?: string;
  disabled?: boolean;
  variant?: 'pickup' | 'delivery';
}

// Mock address data matching the mobile app exactly
const MOCK_ADDRESSES: Record<string, string[]> = {
  // Origin addresses (mock-1 to mock-20)
  "NW1 4RT": [
    "12 Acacia Avenue, London, NW1 4RT",
    "34 Maple Road, Manchester, M14 5GH",
    "56 Oak Street, Birmingham, B15 2TT",
    "78 Elm Drive, Liverpool, L18 9SD",
    "90 Willow Close, Leeds, LS6 2AB",
    "101 Sycamore Lane, Bristol, BS7 8PL",
    "23 Chestnut Grove, Sheffield, S10 3QW",
    "45 Poplar Avenue, Newcastle, NE3 4JP",
    "67 Beech Road, Nottingham, NG7 2LT",
    "89 Cedar Crescent, Southampton, SO15 5QF",
    "11 Ashfield Way, Leicester, LE2 1TR",
    "22 Rowan Street, Coventry, CV3 6GH",
    "33 Hawthorn Court, Reading, RG1 8PL",
    "44 Pine Gardens, Derby, DE1 2AB",
    "55 Birch Avenue, Brighton, BN1 6GH",
    "66 Larch Lane, Plymouth, PL4 7TR",
    "77 Spruce Road, Oxford, OX4 2JP",
    "88 Magnolia Close, Cambridge, CB1 3LT",
    "99 Hazel Drive, York, YO10 5QF",
    "100 Holly Avenue, Glasgow, G12 8PL",
  ],
  
  // Destination addresses (mock-21 to mock-40)
  "NW2 3RT": [
    "21 Rosewood Avenue, London, NW2 3RT",
    "32 Lavender Road, Manchester, M15 6GH",
    "43 Jasmine Street, Birmingham, B16 3TT",
    "54 Bluebell Drive, Liverpool, L19 8SD",
    "65 Primrose Close, Leeds, LS7 3AB",
    "76 Foxglove Lane, Bristol, BS8 9PL",
    "87 Buttercup Grove, Sheffield, S11 4QW",
    "98 Clover Avenue, Newcastle, NE4 5JP",
    "109 Daffodil Road, Nottingham, NG8 3LT",
    "120 Sunflower Crescent, Southampton, SO16 6QF",
    "131 Tulip Way, Leicester, LE3 2TR",
    "142 Orchid Street, Coventry, CV4 7GH",
    "153 Peony Court, Reading, RG2 9PL",
    "164 Camellia Gardens, Derby, DE2 3AB",
    "175 Lotus Avenue, Brighton, BN2 7GH",
    "186 Dahlia Lane, Plymouth, PL5 8TR",
    "197 Marigold Road, Oxford, OX5 3JP",
    "208 Azalea Close, Cambridge, CB2 4LT",
    "219 Gardenia Drive, York, YO11 6QF",
    "230 Heather Avenue, Glasgow, G13 9PL",
  ],
  
  // Additional postcodes with their specific addresses
  "M14 5GH": [
    "34 Maple Road, Manchester, M14 5GH",
    "78 Elm Drive, Liverpool, L18 9SD",
    "90 Willow Close, Leeds, LS6 2AB",
  ],
  "B15 2TT": [
    "56 Oak Street, Birmingham, B15 2TT",
    "101 Sycamore Lane, Bristol, BS7 8PL",
    "23 Chestnut Grove, Sheffield, S10 3QW",
  ],
  "L18 9SD": [
    "78 Elm Drive, Liverpool, L18 9SD",
    "45 Poplar Avenue, Newcastle, NE3 4JP",
    "67 Beech Road, Nottingham, NG7 2LT",
  ],
  "LS6 2AB": [
    "90 Willow Close, Leeds, LS6 2AB",
    "89 Cedar Crescent, Southampton, SO15 5QF",
    "11 Ashfield Way, Leicester, LE2 1TR",
  ],
  "BS7 8PL": [
    "101 Sycamore Lane, Bristol, BS7 8PL",
    "22 Rowan Street, Coventry, CV3 6GH",
    "33 Hawthorn Court, Reading, RG1 8PL",
  ],
  "S10 3QW": [
    "23 Chestnut Grove, Sheffield, S10 3QW",
    "44 Pine Gardens, Derby, DE1 2AB",
    "55 Birch Avenue, Brighton, BN1 6GH",
  ],
  "NE3 4JP": [
    "45 Poplar Avenue, Newcastle, NE3 4JP",
    "66 Larch Lane, Plymouth, PL4 7TR",
    "77 Spruce Road, Oxford, OX4 2JP",
  ],
  "NG7 2LT": [
    "67 Beech Road, Nottingham, NG7 2LT",
    "88 Magnolia Close, Cambridge, CB1 3LT",
    "99 Hazel Drive, York, YO10 5QF",
  ],
  "SO15 5QF": [
    "89 Cedar Crescent, Southampton, SO15 5QF",
    "100 Holly Avenue, Glasgow, G12 8PL",
    "21 Rosewood Avenue, London, NW2 3RT",
  ],
  "LE2 1TR": [
    "11 Ashfield Way, Leicester, LE2 1TR",
    "32 Lavender Road, Manchester, M15 6GH",
    "43 Jasmine Street, Birmingham, B16 3TT",
  ],
  "CV3 6GH": [
    "22 Rowan Street, Coventry, CV3 6GH",
    "54 Bluebell Drive, Liverpool, L19 8SD",
    "65 Primrose Close, Leeds, LS7 3AB",
  ],
  "RG1 8PL": [
    "33 Hawthorn Court, Reading, RG1 8PL",
    "76 Foxglove Lane, Bristol, BS8 9PL",
    "87 Buttercup Grove, Sheffield, S11 4QW",
  ],
  "DE1 2AB": [
    "44 Pine Gardens, Derby, DE1 2AB",
    "98 Clover Avenue, Newcastle, NE4 5JP",
    "109 Daffodil Road, Nottingham, NG8 3LT",
  ],
  "BN1 6GH": [
    "55 Birch Avenue, Brighton, BN1 6GH",
    "120 Sunflower Crescent, Southampton, SO16 6QF",
    "131 Tulip Way, Leicester, LE3 2TR",
  ],
  "PL4 7TR": [
    "66 Larch Lane, Plymouth, PL4 7TR",
    "142 Orchid Street, Coventry, CV4 7GH",
    "153 Peony Court, Reading, RG2 9PL",
  ],
  "OX4 2JP": [
    "77 Spruce Road, Oxford, OX4 2JP",
    "164 Camellia Gardens, Derby, DE2 3AB",
    "175 Lotus Avenue, Brighton, BN2 7GH",
  ],
  "CB1 3LT": [
    "88 Magnolia Close, Cambridge, CB1 3LT",
    "186 Dahlia Lane, Plymouth, PL5 8TR",
    "197 Marigold Road, Oxford, OX5 3JP",
  ],
  "YO10 5QF": [
    "99 Hazel Drive, York, YO10 5QF",
    "208 Azalea Close, Cambridge, CB2 4LT",
    "219 Gardenia Drive, York, YO11 6QF",
  ],
  "G12 8PL": [
    "100 Holly Avenue, Glasgow, G12 8PL",
    "230 Heather Avenue, Glasgow, G13 9PL",
    "21 Rosewood Avenue, London, NW2 3RT",
  ],
  "M15 6GH": [
    "32 Lavender Road, Manchester, M15 6GH",
    "54 Bluebell Drive, Liverpool, L19 8SD",
    "65 Primrose Close, Leeds, LS7 3AB",
  ],
  "B16 3TT": [
    "43 Jasmine Street, Birmingham, B16 3TT",
    "76 Foxglove Lane, Bristol, BS8 9PL",
    "87 Buttercup Grove, Sheffield, S11 4QW",
  ],
  "L19 8SD": [
    "54 Bluebell Drive, Liverpool, L19 8SD",
    "98 Clover Avenue, Newcastle, NE4 5JP",
    "109 Daffodil Road, Nottingham, NG8 3LT",
  ],
  "LS7 3AB": [
    "65 Primrose Close, Leeds, LS7 3AB",
    "120 Sunflower Crescent, Southampton, SO16 6QF",
    "131 Tulip Way, Leicester, LE3 2TR",
  ],
  "BS8 9PL": [
    "76 Foxglove Lane, Bristol, BS8 9PL",
    "142 Orchid Street, Coventry, CV4 7GH",
    "153 Peony Court, Reading, RG2 9PL",
  ],
  "S11 4QW": [
    "87 Buttercup Grove, Sheffield, S11 4QW",
    "164 Camellia Gardens, Derby, DE2 3AB",
    "175 Lotus Avenue, Brighton, BN2 7GH",
  ],
  "NE4 5JP": [
    "98 Clover Avenue, Newcastle, NE4 5JP",
    "186 Dahlia Lane, Plymouth, PL5 8TR",
    "197 Marigold Road, Oxford, OX5 3JP",
  ],
  "NG8 3LT": [
    "109 Daffodil Road, Nottingham, NG8 3LT",
    "208 Azalea Close, Cambridge, CB2 4LT",
    "219 Gardenia Drive, York, YO11 6QF",
  ],
  "SO16 6QF": [
    "120 Sunflower Crescent, Southampton, SO16 6QF",
    "230 Heather Avenue, Glasgow, G13 9PL",
    "21 Rosewood Avenue, London, NW2 3RT",
  ],
  "LE3 2TR": [
    "131 Tulip Way, Leicester, LE3 2TR",
    "32 Lavender Road, Manchester, M15 6GH",
    "43 Jasmine Street, Birmingham, B16 3TT",
  ],
  "CV4 7GH": [
    "142 Orchid Street, Coventry, CV4 7GH",
    "54 Bluebell Drive, Liverpool, L19 8SD",
    "65 Primrose Close, Leeds, LS7 3AB",
  ],
  "RG2 9PL": [
    "153 Peony Court, Reading, RG2 9PL",
    "76 Foxglove Lane, Bristol, BS8 9PL",
    "87 Buttercup Grove, Sheffield, S11 4QW",
  ],
  "DE2 3AB": [
    "164 Camellia Gardens, Derby, DE2 3AB",
    "98 Clover Avenue, Newcastle, NE4 5JP",
    "109 Daffodil Road, Nottingham, NG8 3LT",
  ],
  "BN2 7GH": [
    "175 Lotus Avenue, Brighton, BN2 7GH",
    "120 Sunflower Crescent, Southampton, SO16 6QF",
    "131 Tulip Way, Leicester, LE3 2TR",
  ],
  "PL5 8TR": [
    "186 Dahlia Lane, Plymouth, PL5 8TR",
    "142 Orchid Street, Coventry, CV4 7GH",
    "153 Peony Court, Reading, RG2 9PL",
  ],
  "OX5 3JP": [
    "197 Marigold Road, Oxford, OX5 3JP",
    "164 Camellia Gardens, Derby, DE2 3AB",
    "175 Lotus Avenue, Brighton, BN2 7GH",
  ],
  "CB2 4LT": [
    "208 Azalea Close, Cambridge, CB2 4LT",
    "186 Dahlia Lane, Plymouth, PL5 8TR",
    "197 Marigold Road, Oxford, OX5 3JP",
  ],
  "YO11 6QF": [
    "219 Gardenia Drive, York, YO11 6QF",
    "208 Azalea Close, Cambridge, CB2 4LT",
    "219 Gardenia Drive, York, YO11 6QF",
  ],
  "G13 9PL": [
    "230 Heather Avenue, Glasgow, G13 9PL",
    "100 Holly Avenue, Glasgow, G12 8PL",
    "21 Rosewood Avenue, London, NW2 3RT",
  ],
  
  // Special postcodes from the mobile app
  "SW1A 1AA": [
    "10 Downing Street, London, SW1A 1AA",
    "Houses of Parliament, Westminster, London, SW1A 1AA",
    "Westminster Abbey, London, SW1A 1AA",
  ],
  "W1K 1QA": [
    "Claridge's, Brook Street, London, W1K 1QA",
    "Selfridges, Oxford Street, London, W1K 1QA",
    "Bond Street Station, London, W1K 1QA",
  ],
};

export default function PostcodeTypeahead({
  postcode,
  onPostcodeChange,
  onAddressSelected,
  placeholder = "Enter postcode...",
  disabled = false,
  variant = 'pickup'
}: PostcodeTypeaheadProps) {
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postcodeSuggestions, setPostcodeSuggestions] = useState<string[]>([]);
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch postcode suggestions
  useEffect(() => {
    if (!focused || postcode.length < 2) {
      setPostcodeSuggestions([]);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setLoading(true);
      fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}/autocomplete?limit=10`)
        .then((res) => res.json())
        .then((data) => {
          setPostcodeSuggestions(Array.isArray(data.result) ? data.result : []);
        })
        .catch(() => {
          setPostcodeSuggestions([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 300);
  }, [postcode, focused]);

  const handlePostcodeSelect = (selectedPostcode: string) => {
    onPostcodeChange(selectedPostcode);
    setPostcodeSuggestions([]);
    setFocused(false);
    
    // Load address suggestions for this postcode
    setAddressLoading(true);
    setShowAddressDropdown(true);
    
    setTimeout(() => {
      // Use the comprehensive mock data for any postcode
      const addresses = MOCK_ADDRESSES[selectedPostcode.toUpperCase()] || [
        // Fallback addresses for any postcode not in our mock data
        "Buckingham Palace, London, SW1A 1AA",
        "10 Downing Street, London, SW1A 2AA",
        "Palace of Westminster, London, SW1A 0AA",
        "The British Museum, London, WC1B 3DG",
        "Natural History Museum, London, SW7 5BD",
        "Tower of London, London, EC3N 4AB",
        "The Shard, 32 London Bridge Street, London, SE1 9SG",
        "30 St Mary Axe, London, EC3A 8EP",
        "St Paul's Cathedral, London, EC4M 8AD",
        "Old Trafford, Sir Matt Busby Way, Manchester, M16 0RA",
        "Anfield, Anfield Road, Liverpool, L4 0TH",
        "Edinburgh Castle, The Esplanade, Edinburgh, EH1 2NG",
        "Cardiff Castle, Castle Street, Cardiff, CF10 3RB",
        "Clifton Suspension Bridge, Bridge Road, Bristol, BS8 3PA",
        "Bodleian Library, Broad Street, Oxford, OX1 3BG",
        "York Minster, Deangate, York, YO1 7HH",
        "Giant's Causeway Visitor Centre, 44 Causeway Road, Bushmills, BT57 8SU",
        "Library of Birmingham, Centenary Square, Broad Street, Birmingham, B1 2ND",
        "Manchester Town Hall, Albert Square, Manchester, M2 5DB",
        "King's College, King's Parade, Cambridge, CB2 1ST"
      ];
      setAddressSuggestions(addresses);
      setAddressLoading(false);
    }, 600);
  };

  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address);
    setShowAddressDropdown(false);
    setAddressSuggestions([]);
    onAddressSelected(address);
  };

  const handleReset = () => {
    setSelectedAddress(null);
    setShowAddressDropdown(false);
    setAddressSuggestions([]);
    setPostcodeSuggestions([]);
    onPostcodeChange("");
    setFocused(false);
  };

  const isPickup = variant === 'pickup';
  const borderColor = isPickup ? 'border-emerald-300' : 'border-red-300';
  const bgColor = isPickup ? 'bg-emerald-50' : 'bg-red-50';
  const iconColor = isPickup ? 'text-emerald-600' : 'text-red-600';
  const selectedBgColor = isPickup ? 'bg-emerald-50' : 'bg-red-50';
  const selectedBorderColor = isPickup ? 'border-emerald-100' : 'border-red-100';
  const selectedTextColor = isPickup ? 'text-emerald-700' : 'text-red-700';
  const selectedIconBg = isPickup ? 'bg-emerald-100' : 'bg-red-100';
  const selectedBadgeBg = isPickup ? 'bg-emerald-100' : 'bg-red-100';
  const selectedBadgeText = isPickup ? 'text-emerald-700' : 'text-red-700';

  if (selectedAddress) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={cn("p-2 rounded-full mr-3", selectedIconBg)}>
              <MapPin size={16} className={iconColor} />
            </div>
            <span className={cn("text-base font-bold", selectedTextColor)}>
              Selected {isPickup ? 'Pickup' : 'Delivery'} Address
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <X size={16} className="text-gray-600" />
          </Button>
        </div>
        <div className={cn("rounded-lg p-3 border", selectedBgColor, selectedBorderColor)}>
          <div className="text-gray-800 text-sm leading-relaxed">
            {selectedAddress}
          </div>
          <div className="flex items-center mt-2 pt-2 border-t border-gray-200">
            <span className={cn("font-semibold text-sm", selectedTextColor)}>
              {postcode}
            </span>
            <Badge className={cn("ml-auto", selectedBadgeBg, selectedBadgeText)}>
              ✓ Confirmed
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-gray-700 mb-2">
        Enter postcode to find address
      </div>
      
      <div className={cn("flex items-center border rounded-lg px-3 py-2", borderColor, bgColor)}>
        <MapPin size={18} className={iconColor} />
        <Input
          value={postcode}
          onChange={(e) => {
            onPostcodeChange(e.target.value);
            if (!focused) setFocused(true);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 ml-2 text-sm font-medium border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 uppercase"
          autoCapitalize="characters"
          maxLength={8}
        />
      </div>

      {/* Postcode Suggestions */}
      {focused && postcode.length > 1 && (postcodeSuggestions.length > 0 || loading) && (
        <div className="mt-3">
          <div className="text-xs text-gray-500 mb-2">Select postcode:</div>
          <Card className="max-h-[150px] overflow-hidden">
            <CardContent className="p-0">
              <div className="max-h-[150px] overflow-y-auto">
                {postcodeSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handlePostcodeSelect(suggestion)}
                    className="w-full p-3 border-b border-gray-100 last:border-b-0 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-sm text-gray-800">{suggestion}</div>
                  </button>
                ))}
                {loading && (
                  <div className="p-3 text-center">
                    <div className="text-gray-400 text-sm flex items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Loading...
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Address Suggestions */}
      {showAddressDropdown && addressSuggestions.length > 0 && (
        <div className="mt-3">
          <div className="text-xs text-gray-500 mb-2">Select your address:</div>
          <Card className="max-h-[200px] overflow-hidden">
            <CardContent className="p-0">
              <div className="max-h-[200px] overflow-y-auto">
                {addressSuggestions.map((address, index) => (
                  <button
                    key={index}
                    onClick={() => handleAddressSelect(address)}
                    className="w-full p-3 border-b border-gray-100 last:border-b-0 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-sm text-gray-800 leading-relaxed">{address}</div>
                  </button>
                ))}
                {addressLoading && (
                  <div className="p-3 text-center">
                    <div className="text-gray-500 text-xs flex items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Loading address details...
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}


