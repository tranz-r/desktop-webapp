"use client";

import React from "react";
import { StreamlinedHeader } from "@/components/StreamlinedHeader";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import CollectionDeliveryAddresses, { CollectionDeliveryFormValues, floorValueToNumber } from "@/components/address/CollectionDeliveryAddresses";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useBooking } from "@/contexts/BookingContext";
import { AlertCircle } from "lucide-react";

export default function CollectionDeliveryPage() {
  const router = useRouter();
  const booking = useBooking();
  const { originDestination, updateOriginDestination, isHydrated, customer } = booking;

  const form = useForm<CollectionDeliveryFormValues>({
    defaultValues: {
      originLine1: originDestination?.origin?.line1 || "",
      originPostcode: originDestination?.origin?.postcode || "",
      originFloor: (originDestination?.origin?.floor ?? 0) === 0
        ? "ground"
        : (originDestination?.origin?.floor ?? 0) >= 6
        ? "6+"
        : String(originDestination?.origin?.floor ?? "ground"),
      originElevator: originDestination?.origin?.hasElevator ?? true,
      destinationLine1: originDestination?.destination?.line1 || "",
      destinationPostcode: originDestination?.destination?.postcode || "",
      destinationFloor: (originDestination?.destination?.floor ?? 0) === 0
        ? "ground"
        : (originDestination?.destination?.floor ?? 0) >= 6
        ? "6+"
        : String(originDestination?.destination?.floor ?? "ground"),
      destinationElevator: originDestination?.destination?.hasElevator ?? true,
    },
    mode: "onChange",
  });

  const isReady =
    form.watch("originLine1").trim().length > 0 &&
    form.watch("originPostcode").trim().length > 0 &&
    form.watch("destinationLine1").trim().length > 0 &&
    form.watch("destinationPostcode").trim().length > 0;

  // Persist origin fields to context as user edits
  React.useEffect(() => {
    const origin = {
      line1: form.watch('originLine1') || '',
      postcode: form.watch('originPostcode') || '',
      floor: floorValueToNumber(form.watch('originFloor')),
      hasElevator: !!form.watch('originElevator'),
    };
    updateOriginDestination({ origin });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    form.watch('originLine1'),
    form.watch('originPostcode'),
    form.watch('originFloor'),
    form.watch('originElevator'),
  ]);

  // Persist destination fields to context as user edits
  React.useEffect(() => {
    const destination = {
      line1: form.watch('destinationLine1') || '',
      postcode: form.watch('destinationPostcode') || '',
      floor: floorValueToNumber(form.watch('destinationFloor')),
      hasElevator: !!form.watch('destinationElevator'),
    };
    updateOriginDestination({ destination });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    form.watch('destinationLine1'),
    form.watch('destinationPostcode'),
    form.watch('destinationFloor'),
    form.watch('destinationElevator'),
  ]);

  // Compute and persist distance when both addresses are set
  React.useEffect(() => {
    const oLine = form.watch('originLine1');
    const oPc = form.watch('originPostcode');
    const dLine = form.watch('destinationLine1');
    const dPc = form.watch('destinationPostcode');
    const baseUrl = process.env.NEXT_PUBLIC_ADDRESS_DISTANCE_BASE_URL;
    
    console.log('=== DISTANCE CALCULATION DEBUG ===');
    console.log('Environment variable NEXT_PUBLIC_ADDRESS_DISTANCE_BASE_URL:', baseUrl);
    console.log('Origin:', { line: oLine, postcode: oPc });
    console.log('Destination:', { line: dLine, postcode: dPc });
    
    if (!baseUrl) {
      console.error('❌ NEXT_PUBLIC_ADDRESS_DISTANCE_BASE_URL is not configured!');
      return;
    }
    
    const hasOrigin = !!oLine && !!oPc;
    const hasDest = !!dLine && !!dPc;
    
    console.log('Address validation:', { hasOrigin, hasDest });
    
    if (!hasOrigin || !hasDest) {
      console.log('⏳ Waiting for both addresses to be complete');
      return;
    }

    console.log('🚀 Starting distance calculation...');
    const controller = new AbortController();
    const url = new URL(baseUrl);
    url.searchParams.set('originAddress', `${oLine}`);
    url.searchParams.set('destinationAddress', `${dLine}`);
    
    console.log('📡 API URL:', url.toString());

    fetch(url.toString(), { signal: controller.signal })
      .then(res => {
        console.log('📥 API Response status:', res.status, res.statusText);
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(new Error(`HTTP ${res.status}: ${res.statusText}`));
        }
      })
      .then((miles) => {
        console.log('📊 Raw API response:', miles);
        const numeric = Number(miles);
        console.log('🔢 Parsed numeric value:', numeric);
        console.log('✅ Is valid number?', !Number.isNaN(numeric) && Number.isFinite(numeric));
        
        if (!Number.isNaN(numeric) && Number.isFinite(numeric)) {
          console.log('💾 Storing distance in context:', numeric);
          updateOriginDestination({ distanceMiles: numeric });
          console.log('✅ Distance successfully stored');
        } else {
          console.error('❌ Invalid distance value received:', miles);
        }
      })
      .catch((error) => {
        console.error('❌ Distance calculation failed:', error);
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      })
    return () => controller.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('originLine1'), form.watch('originPostcode'), form.watch('destinationLine1'), form.watch('destinationPostcode')]);

  // Rehydrate form values from saved context once hydrated
  React.useEffect(() => {
    if (!isHydrated) return;
    const o = originDestination?.origin;
    const d = originDestination?.destination;
    if (o) {
      if (o.line1) form.setValue('originLine1', o.line1, { shouldDirty: false });
      if (o.postcode) form.setValue('originPostcode', o.postcode, { shouldDirty: false });
      if (typeof o.floor === 'number') {
        form.setValue('originFloor', o.floor === 0 ? 'ground' : (o.floor >= 6 ? '6+' : String(o.floor)), { shouldDirty: false });
      }
      if (typeof o.hasElevator === 'boolean') form.setValue('originElevator', o.hasElevator, { shouldDirty: false });
    }
    if (d) {
      if (d.line1) form.setValue('destinationLine1', d.line1, { shouldDirty: false });
      if (d.postcode) form.setValue('destinationPostcode', d.postcode, { shouldDirty: false });
      if (typeof d.floor === 'number') {
        form.setValue('destinationFloor', d.floor === 0 ? 'ground' : (d.floor >= 6 ? '6+' : String(d.floor)), { shouldDirty: false });
      }
      if (typeof d.hasElevator === 'boolean') form.setValue('destinationElevator', d.hasElevator, { shouldDirty: false });
    }
  }, [isHydrated]);

  function onSubmit(values: CollectionDeliveryFormValues) {
    // Preserve the distance that was calculated during address entry
    const preservedDistance = customer?.distanceMiles || originDestination?.distanceMiles;
    
    updateOriginDestination({
      origin: {
        line1: values.originLine1,
        postcode: values.originPostcode,
        floor: floorValueToNumber(values.originFloor),
        hasElevator: values.originElevator,
      },
      destination: {
        line1: values.destinationLine1,
        postcode: values.destinationPostcode,
        floor: floorValueToNumber(values.destinationFloor),
        hasElevator: values.destinationElevator,
      },
      // Preserve the calculated distance
      distanceMiles: preservedDistance,
    });
    
    // Proceed to inventory step
    router.push("/inventory");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StreamlinedHeader />
      <main className="flex-1">
        <section className="pt-32 md:pt-36 lg:pt-44 pb-10 bg-white">
          <div className="container mx-auto px-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <CollectionDeliveryAddresses form={form} />
                {/* Extra-cost notice similar to origin-destination */}
                {((!form.watch('originElevator') && floorValueToNumber(form.watch('originFloor')) > 0) || (!form.watch('destinationElevator') && floorValueToNumber(form.watch('destinationFloor')) > 0)) && (
                  <div className="flex items-start gap-3 rounded-md border border-amber-300 bg-amber-50 p-3 text-amber-800">
                    <AlertCircle className="h-5 w-5" />
                    <div className="text-sm">
                      Additional charges may apply for floors above ground without elevator access.
                    </div>
                  </div>
                )}
                {typeof originDestination?.distanceMiles === 'number' && Number.isFinite(originDestination.distanceMiles!) && originDestination.distanceMiles! > 0 && (
                  <div className="w-full text-center text-lg text-muted-foreground font-extrabold">
                    Total distance: {Math.round(originDestination.distanceMiles!)} miles
                  </div>
                )}
                <div className="pt-4 flex justify-end">
                  <Button type="submit" disabled={!isReady}>Next</Button>
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
