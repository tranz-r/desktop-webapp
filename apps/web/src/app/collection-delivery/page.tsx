"use client";

export const dynamic = 'force-dynamic';

import React from "react";
import { StreamlinedHeader } from "@/components/StreamlinedHeader";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import CollectionDeliveryAddresses, { CollectionDeliveryFormValues, floorValueToNumber } from "@/components/address/CollectionDeliveryAddresses";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useQuote } from "@/contexts/QuoteContext";
import { AlertCircle, Loader2, ChevronLeft } from "lucide-react";
// Note: Removed unused imports - now using QuoteContext only
import { QuoteReferenceBanner } from '@/components/QuoteReferenceBanner';
import MapboxMap from '@/components/MapboxMap';
import { useMemo } from 'react';

export default function CollectionDeliveryPage() {
  const router = useRouter();
  const { 
    activeQuoteType,
    quotes,
    updateQuote,
    isHydrated 
  } = useQuote();
  
  // Get origin and destination from active quote
  const activeQuote = activeQuoteType ? quotes[activeQuoteType] : undefined;
  const origin = activeQuote?.origin;
  const destination = activeQuote?.destination;
  const distanceMiles = activeQuote?.distanceMiles;
  // Note: Removed quoteSession - now using QuoteContext only

  // Helper functions to update quote data
  const setOrigin = (originData: any) => {
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { origin: originData });
    }
  };

  const setDestination = (destinationData: any) => {
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { destination: destinationData });
    }
  };

  const setDistanceMiles = (miles: number) => {
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { distanceMiles: miles });
    }
  };

  // Prevent initial flicker by showing a modern loading state until hydrated
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <StreamlinedHeader />
        <main className="flex-1">
          <section className="pt-32 md:pt-36 lg:pt-44 pb-10 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center justify-center gap-4 py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <div className="space-y-1 text-center">
                  <h2 className="text-xl font-semibold text-foreground">Getting your details ready...</h2>
                  <p className="text-sm text-muted-foreground">Loading your saved pickup and delivery details.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const form = useForm<CollectionDeliveryFormValues>({
    defaultValues: {
      originLine1: origin?.line1 || "",
      originLine2: origin?.line2 || "",
      originPostcode: origin?.postcode || "",
      originCity: origin?.city || "",
      originCounty: origin?.county || "",
      originCountry: origin?.country || "GB",
      originFloor:
        (origin?.floor ?? 0) === 0
          ? "ground"
          : (origin?.floor ?? 0) >= 6
          ? "6+"
          : String(origin?.floor ?? "ground"),
      originElevator: origin?.hasElevator ?? true,
      destinationLine1: destination?.line1 || "",
      destinationLine2: destination?.line2 || "",
      destinationPostcode: destination?.postcode || "",
      destinationCity: destination?.city || "",
      destinationCounty: destination?.county || "",
      destinationCountry: destination?.country || "GB",
      destinationFloor:
        (destination?.floor ?? 0) === 0
          ? "ground"
          : (destination?.floor ?? 0) >= 6
          ? "6+"
          : String(destination?.floor ?? "ground"),
      destinationElevator: destination?.hasElevator ?? true,
      
      // Extended Mapbox fields for origin
      originFullAddress: origin?.fullAddress || "",
      originAddressNumber: origin?.addressNumber || "",
      originStreet: origin?.street || "",
      originNeighborhood: origin?.neighborhood || "",
      originDistrict: origin?.district || "",
      originRegion: origin?.region || "",
      originRegionCode: origin?.regionCode || "",
      originCountryCode: origin?.countryCode || "gb",
      originPlaceName: origin?.placeName || "",
      originAccuracy: origin?.accuracy || "",
      originMapboxId: origin?.mapboxId || "",
      originLatitude: origin?.latitude || 0,
      originLongitude: origin?.longitude || 0,
      
      // Extended Mapbox fields for destination
      destinationFullAddress: destination?.fullAddress || "",
      destinationAddressNumber: destination?.addressNumber || "",
      destinationStreet: destination?.street || "",
      destinationNeighborhood: destination?.neighborhood || "",
      destinationDistrict: destination?.district || "",
      destinationRegion: destination?.region || "",
      destinationRegionCode: destination?.regionCode || "",
      destinationCountryCode: destination?.countryCode || "gb",
      destinationPlaceName: destination?.placeName || "",
      destinationAccuracy: destination?.accuracy || "",
      destinationMapboxId: destination?.mapboxId || "",
      destinationLatitude: destination?.latitude || 0,
      destinationLongitude: destination?.longitude || 0,
    },
    mode: "onChange",
  });

  const isReady =
    form.watch("originLine1").trim().length > 0 &&
    form.watch("originPostcode").trim().length > 0 &&
    form.watch("destinationLine1").trim().length > 0 &&
    form.watch("destinationPostcode").trim().length > 0;

  // Memoize addresses to prevent unnecessary re-renders of MapboxMap
  const addresses = useMemo(() => {
    const originLine1 = form.watch("originLine1");
    const originPostcode = form.watch("originPostcode");
    const destinationLine1 = form.watch("destinationLine1");
    const destinationPostcode = form.watch("destinationPostcode");
    
    // Only create addresses if all fields are filled and trimmed
    if (originLine1?.trim() && originPostcode?.trim() && destinationLine1?.trim() && destinationPostcode?.trim()) {
      return {
        originAddress: `${originLine1.trim()}, ${originPostcode.trim()}`,
        destinationAddress: `${destinationLine1.trim()}, ${destinationPostcode.trim()}`
      };
    }
    return null;
  }, [form.watch("originLine1"), form.watch("originPostcode"), form.watch("destinationLine1"), form.watch("destinationPostcode")]);

  // Note: Removed automatic origin sync useEffect to prevent infinite loops
  // Origin is now updated only when form is submitted

  // Note: Removed automatic destination sync useEffect to prevent infinite loops
  // Destination is now updated only when form is submitted

  // Note: Distance calculation removed - now handled by MapboxMap component via /api/v1/map/route

  // Rehydrate form values from saved context once hydrated
  React.useEffect(() => {
    if (!isHydrated) return;
    const o = origin;
    const d = destination;
    if (o) {
      if (o.line1) form.setValue("originLine1", o.line1, { shouldDirty: false });
      if (o.postcode) form.setValue("originPostcode", o.postcode, { shouldDirty: false });
      if (typeof o.floor === "number") {
        form.setValue(
          "originFloor",
          o.floor === 0 ? "ground" : o.floor >= 6 ? "6+" : String(o.floor),
          { shouldDirty: false }
        );
      }
      if (typeof o.hasElevator === "boolean") form.setValue("originElevator", o.hasElevator, { shouldDirty: false });
    }
    if (d) {
      if (d.line1) form.setValue("destinationLine1", d.line1, { shouldDirty: false });
      if (d.postcode) form.setValue("destinationPostcode", d.postcode, { shouldDirty: false });
      if (typeof d.floor === "number") {
        form.setValue(
          "destinationFloor",
          d.floor === 0 ? "ground" : d.floor >= 6 ? "6+" : String(d.floor),
          { shouldDirty: false }
        );
      }
      if (typeof d.hasElevator === "boolean")
        form.setValue("destinationElevator", d.hasElevator, { shouldDirty: false });
    }
  }, [isHydrated]);

  function onSubmit(values: CollectionDeliveryFormValues) {
    // Preserve the distance that was calculated during address entry
    const preservedDistance = distanceMiles;

    setOrigin({
      line1: values.originLine1,
      line2: values.originLine2,
      postcode: values.originPostcode,
      city: values.originCity,
      county: values.originCounty,
      country: values.originCountry,
      floor: floorValueToNumber(values.originFloor),
      hasElevator: values.originElevator,
      
      // Extended Mapbox fields
      fullAddress: values.originFullAddress,
      addressNumber: values.originAddressNumber,
      street: values.originStreet,
      neighborhood: values.originNeighborhood,
      district: values.originDistrict,
      region: values.originRegion,
      regionCode: values.originRegionCode,
      countryCode: values.originCountryCode,
      placeName: values.originPlaceName,
      accuracy: values.originAccuracy,
      mapboxId: values.originMapboxId,
      latitude: values.originLatitude,
      longitude: values.originLongitude,
    });

    setDestination({
      line1: values.destinationLine1,
      line2: values.destinationLine2,
      postcode: values.destinationPostcode,
      city: values.destinationCity,
      county: values.destinationCounty,
      country: values.destinationCountry,
      floor: floorValueToNumber(values.destinationFloor),
      hasElevator: values.destinationElevator,
      
      // Extended Mapbox fields
      fullAddress: values.destinationFullAddress,
      addressNumber: values.destinationAddressNumber,
      street: values.destinationStreet,
      neighborhood: values.destinationNeighborhood,
      district: values.destinationDistrict,
      region: values.destinationRegion,
      regionCode: values.destinationRegionCode,
      countryCode: values.destinationCountryCode,
      placeName: values.destinationPlaceName,
      accuracy: values.destinationAccuracy,
      mapboxId: values.destinationMapboxId,
      latitude: values.destinationLatitude,
      longitude: values.destinationLongitude,
    });

    if (preservedDistance) {
      setDistanceMiles(preservedDistance);
    }

    // Proceed to inventory step
    router.push("/inventory");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StreamlinedHeader />
      <main className="flex-1">
        <section className="pt-32 md:pt-36 lg:pt-44 pb-10 bg-white">
          <div className="container mx-auto px-4">
            {/* Quote Reference Banner - Subtle display */}
            <div className="mb-6 flex justify-center">
              {/* <QuoteReferenceBanner variant="subtle" /> */}
              <QuoteReferenceBanner variant="minimal" />
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <CollectionDeliveryAddresses form={form} />
                
                {/* Interactive Map - Show when both addresses are available */}
                {addresses && (
                  <div className="mt-6">
                    <MapboxMap 
                      originAddress={addresses.originAddress}
                      destinationAddress={addresses.destinationAddress}
                      className="w-full"
                      onDistanceUpdate={setDistanceMiles}
                    />
                  </div>
                )}
                
                {/* Extra-cost notice similar to origin-destination */}
                {((!form.watch("originElevator") && floorValueToNumber(form.watch("originFloor")) > 0) ||
                  (!form.watch("destinationElevator") && floorValueToNumber(form.watch("destinationFloor")) > 0)) && (
                  <div className="flex items-start gap-3 rounded-md border border-amber-300 bg-amber-50 p-3 text-amber-800">
                    <AlertCircle className="h-5 w-5" />
                    <div className="text-sm">
                      Additional charges may apply for floors above ground without elevator access.
                    </div>
                  </div>
                )}
                {typeof distanceMiles === "number" &&
                  Number.isFinite(distanceMiles) &&
                  distanceMiles > 0 && (
                    <div className="w-full text-center text-lg text-muted-foreground font-extrabold">
                      Total distance: {Math.round(distanceMiles)} miles
                    </div>
                  )}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push('/quote-option')}
                      className="px-6 py-2 text-base"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    
                    <Button type="submit" disabled={!isReady}>
                      Next
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
