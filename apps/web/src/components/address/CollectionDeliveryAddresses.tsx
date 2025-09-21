"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PostcodeTypeahead from "@/components/address/PostcodeTypeahead";
import AddressInput from "@/components/address/AddressInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MapPin, MoveVertical, Building2 } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/contexts/QuoteContext";
import { Loader2 } from "lucide-react";

export type CollectionDeliveryFormValues = {
  originLine1: string;
  originLine2: string;
  originPostcode: string;
  originCity: string;
  originCounty: string;
  originCountry: string;
  originFloor: string;
  originElevator: boolean;
  destinationLine1: string;
  destinationLine2: string;
  destinationPostcode: string;
  destinationCity: string;
  destinationCounty: string;
  destinationCountry: string;
  destinationFloor: string;
  destinationElevator: boolean;
  
  // Extended Mapbox fields for origin
  originFullAddress?: string;
  originAddressNumber?: string;
  originStreet?: string;
  originNeighborhood?: string;
  originDistrict?: string;
  originRegion?: string;
  originRegionCode?: string;
  originCountryCode?: string;
  originPlaceName?: string;
  originAccuracy?: string;
  originMapboxId?: string;
  originLatitude?: number;
  originLongitude?: number;
  
  // Extended Mapbox fields for destination
  destinationFullAddress?: string;
  destinationAddressNumber?: string;
  destinationStreet?: string;
  destinationNeighborhood?: string;
  destinationDistrict?: string;
  destinationRegion?: string;
  destinationRegionCode?: string;
  destinationCountryCode?: string;
  destinationPlaceName?: string;
  destinationAccuracy?: string;
  destinationMapboxId?: string;
  destinationLatitude?: number;
  destinationLongitude?: number;
};

const FLOOR_OPTIONS = [
  { value: "ground", label: "Ground Floor" },
  { value: "1", label: "1st Floor" },
  { value: "2", label: "2nd Floor" },
  { value: "3", label: "3rd Floor" },
  { value: "4", label: "4th Floor" },
  { value: "5", label: "5th Floor" },
  { value: "6+", label: "6th Floor or Higher" },
] as const;

export function floorValueToNumber(val: string): number {
  if (val === "ground") return 0;
  if (val === "6+") return 6;
  const n = parseInt(val, 10);
  return Number.isFinite(n) ? n : 0;
}

export default function CollectionDeliveryAddresses({
  form,
  title = "Provide pickup and delivery addresses",
}: {
  form: UseFormReturn<CollectionDeliveryFormValues>;
  title?: string;
}) {
  const { quotes, activeQuoteType, isHydrated } = useQuote();
  const [editingOrigin, setEditingOrigin] = React.useState(false);
  const [editingDestination, setEditingDestination] = React.useState(false);

  // Get origin and destination from active quote
  const activeQuote = activeQuoteType ? quotes[activeQuoteType] : undefined;
  const origin = activeQuote?.origin;
  const destination = activeQuote?.destination;
  const distanceMiles = activeQuote?.distanceMiles;

  // Prevent brief flicker of inputs before we know if captured values exist
  if (!isHydrated) {
    return (
      <Card className="border-primary-200">
        <CardHeader>
          <CardTitle className="text-primary-700 text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-3 py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <div className="text-sm text-muted-foreground">Loading addresses…</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasOriginCaptured = Boolean(
    origin?.line1?.trim() && origin?.postcode?.trim()
  );
  const hasDestinationCaptured = Boolean(
    destination?.line1?.trim() && destination?.postcode?.trim()
  );

  const showOriginInputs = !hasOriginCaptured || editingOrigin;
  const showDestinationInputs = !hasDestinationCaptured || editingDestination;

  return (
    <Card className="border-primary-200">
      <CardHeader>
        <CardTitle className="text-primary-700 text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pickup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-4 w-4 text-emerald-600" />
                Pickup Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {showOriginInputs ? (
                <>
                  <FormField
                    control={form.control}
                    name="originPlaceName"
                    rules={{ required: "Address is required" }}
        render={({ field }) => {
          return (
                        <FormItem>
                          <FormControl>
                <AddressInput
                  value={field.value || ""}
                  onChange={field.onChange}
                  onAddressSelected={(addressData) => {
                    // Update form with all Mapbox data
                    form.setValue('originLine1', addressData.line1);
                    form.setValue('originLine2', addressData.line2);
                    form.setValue('originPostcode', addressData.postcode);
                    form.setValue('originCity', addressData.city);
                    form.setValue('originCounty', addressData.county);
                    form.setValue('originCountry', addressData.country);
                    
                    // Store all extended Mapbox fields
                    form.setValue('originFullAddress', addressData.fullAddress);
                    form.setValue('originAddressNumber', addressData.addressNumber);
                    form.setValue('originStreet', addressData.street);
                    form.setValue('originNeighborhood', addressData.neighborhood);
                    form.setValue('originDistrict', addressData.district);
                    form.setValue('originRegion', addressData.region);
                    form.setValue('originRegionCode', addressData.regionCode);
                    form.setValue('originCountryCode', addressData.countryCode);
                    form.setValue('originPlaceName', addressData.placeName);
                    form.setValue('originAccuracy', addressData.accuracy);
                    form.setValue('originMapboxId', addressData.mapboxId);
                    form.setValue('originLatitude', addressData.latitude);
                    form.setValue('originLongitude', addressData.longitude);
                  }}
                  placeholder="Enter pickup address..."
                  label="Pickup Address"
                  variant="pickup"
                />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  
                  {/* Hidden fields for structured address data - Mapbox will populate these automatically */}
                  <input type="hidden" autoComplete="address-line1" name="originLine1" />
                  <input type="hidden" autoComplete="address-level2" name="originCity" />
                  <input type="hidden" autoComplete="postal-code" name="originPostcode" />
                  <input type="hidden" autoComplete="country" name="originCountry" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="originFloor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2"><Building2 className="h-4 w-4" /> Floor</FormLabel>
                          <FormControl>
                            <Select value={field.value || ""} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Floor" />
                              </SelectTrigger>
                              <SelectContent>
                                {FLOOR_OPTIONS.map((f) => (
                                  <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="originElevator"
                      render={({ field }) => (
                        <FormItem className="flex flex-col justify-end">
                          <div className="flex items-center justify-between gap-3">
                            <FormLabel className="flex items-center gap-2">
                              <MoveVertical className="h-4 w-4" /> Elevator available
                            </FormLabel>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  {hasOriginCaptured && (
                    <div className="flex justify-end">
                      <Button variant="ghost" type="button" onClick={() => setEditingOrigin(false)}>
                        Done
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <ReadonlyAddress
                  addressLine1={origin?.fullAddress || ""}
                  postcode={origin?.postcode || ""}
                  floor={origin?.floor}
                  hasElevator={origin?.hasElevator}
                  onChange={() => setEditingOrigin(true)}
                />
              )}
            </CardContent>
          </Card>

          {/* Delivery */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-4 w-4 text-blue-600" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {showDestinationInputs ? (
                <>
                  <FormField
                    control={form.control}
                    name="destinationPlaceName"
                    rules={{ required: "Address is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                <AddressInput
                  value={field.value || ""}
                  onChange={field.onChange}
                  onAddressSelected={(addressData) => {
                    // Update form with all Mapbox data
                    form.setValue('destinationLine1', addressData.line1);
                    form.setValue('destinationLine2', addressData.line2);
                    form.setValue('destinationPostcode', addressData.postcode);
                    form.setValue('destinationCity', addressData.city);
                    form.setValue('destinationCounty', addressData.county);
                    form.setValue('destinationCountry', addressData.country);
                    
                    // Store all extended Mapbox fields
                    form.setValue('destinationFullAddress', addressData.fullAddress);
                    form.setValue('destinationAddressNumber', addressData.addressNumber);
                    form.setValue('destinationStreet', addressData.street);
                    form.setValue('destinationNeighborhood', addressData.neighborhood);
                    form.setValue('destinationDistrict', addressData.district);
                    form.setValue('destinationRegion', addressData.region);
                    form.setValue('destinationRegionCode', addressData.regionCode);
                    form.setValue('destinationCountryCode', addressData.countryCode);
                    form.setValue('destinationPlaceName', addressData.placeName);
                    form.setValue('destinationAccuracy', addressData.accuracy);
                    form.setValue('destinationMapboxId', addressData.mapboxId);
                    form.setValue('destinationLatitude', addressData.latitude);
                    form.setValue('destinationLongitude', addressData.longitude);
                  }}
                  placeholder="Enter delivery address..."
                  label="Delivery Address"
                  variant="delivery"
                />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Hidden fields for structured address data - Mapbox will populate these automatically */}
                  <input type="hidden" autoComplete="address-line1" name="destinationLine1" />
                  <input type="hidden" autoComplete="address-level2" name="destinationCity" />
                  <input type="hidden" autoComplete="postal-code" name="destinationPlaceName" />
                  <input type="hidden" autoComplete="country" name="destinationCountry" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="destinationFloor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2"><Building2 className="h-4 w-4" /> Floor</FormLabel>
                          <FormControl>
                            <Select value={field.value || ""} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Floor" />
                              </SelectTrigger>
                              <SelectContent>
                                {FLOOR_OPTIONS.map((f) => (
                                  <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="destinationElevator"
                      render={({ field }) => (
                        <FormItem className="flex flex-col justify-end">
                          <div className="flex items-center justify-between gap-3">
                            <FormLabel className="flex items-center gap-2">
                              <MoveVertical className="h-4 w-4" /> Elevator available
                            </FormLabel>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  {hasDestinationCaptured && (
                    <div className="flex justify-end">
                      <Button variant="ghost" type="button" onClick={() => setEditingDestination(false)}>
                        Done
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <ReadonlyAddress
                  addressLine1={destination?.fullAddress || ""}
                  postcode={destination?.postcode || ""}
                  floor={destination?.floor}
                  hasElevator={destination?.hasElevator}
                  onChange={() => setEditingDestination(true)}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}

function ReadonlyAddress({
  addressLine1,
  postcode,
  floor,
  hasElevator,
  onChange,
}: {
  addressLine1: string;
  postcode: string;
  floor?: number;
  hasElevator?: boolean;
  onChange: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="rounded-md border p-3 bg-muted/30">
        <div className="font-medium text-foreground">{addressLine1}</div>
        <div className="text-sm text-muted-foreground">{postcode}</div>
        <div className="text-xs text-muted-foreground mt-1">
          {typeof floor === "number" ? (floor === 0 ? "Ground" : `Floor ${floor}`) : ""}
          {typeof hasElevator === "boolean"
            ? hasElevator
              ? " • Elevator available"
              : " • No elevator"
            : ""}
        </div>
      </div>
      <div>
        <Button variant="outline" size="sm" type="button" onClick={onChange}>
          Change
        </Button>
      </div>
    </div>
  );
}
