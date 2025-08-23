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
import { AlertCircle, Loader2 } from "lucide-react";
import { useQuoteSession } from '@/hooks/useQuoteSession';
import { API_BASE_URL } from '@/lib/api/config';

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
  const quoteSession = useQuoteSession<any>({ baseUrl: API_BASE_URL });

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
      originPostcode: origin?.postcode || "",
      originFloor:
        (origin?.floor ?? 0) === 0
          ? "ground"
          : (origin?.floor ?? 0) >= 6
          ? "6+"
          : String(origin?.floor ?? "ground"),
      originElevator: origin?.hasElevator ?? true,
      destinationLine1: destination?.line1 || "",
      destinationPostcode: destination?.postcode || "",
      destinationFloor:
        (destination?.floor ?? 0) === 0
          ? "ground"
          : (destination?.floor ?? 0) >= 6
          ? "6+"
          : String(destination?.floor ?? "ground"),
      destinationElevator: destination?.hasElevator ?? true,
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
      line1: form.watch("originLine1") || "",
      postcode: form.watch("originPostcode") || "",
      floor: floorValueToNumber(form.watch("originFloor")),
      hasElevator: !!form.watch("originElevator"),
    };
    setOrigin(origin);
    try {
      quoteSession.setData((prev: any) => ({
        ...(prev ?? {}),
        originDestination: {
          ...(prev?.originDestination ?? {}),
          origin,
          distanceMiles: distanceMiles ?? prev?.originDestination?.distanceMiles,
        },
      }));
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    form.watch("originLine1"),
    form.watch("originPostcode"),
    form.watch("originFloor"),
    form.watch("originElevator"),
  ]);

  // Persist destination fields to context as user edits
  React.useEffect(() => {
    const destination = {
      line1: form.watch("destinationLine1") || "",
      postcode: form.watch("destinationPostcode") || "",
      floor: floorValueToNumber(form.watch("destinationFloor")),
      hasElevator: !!form.watch("destinationElevator"),
    };
    setDestination(destination);
    try {
      quoteSession.setData((prev: any) => ({
        ...(prev ?? {}),
        originDestination: {
          ...(prev?.originDestination ?? {}),
          destination,
          distanceMiles: distanceMiles ?? prev?.originDestination?.distanceMiles,
        },
      }));
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    form.watch("destinationLine1"),
    form.watch("destinationPostcode"),
    form.watch("destinationFloor"),
    form.watch("destinationElevator"),
  ]);

  // Compute and persist distance when both addresses are set
  React.useEffect(() => {
    const oLine = form.watch("originLine1");
    const oPc = form.watch("originPostcode");
    const dLine = form.watch("destinationLine1");
    const dPc = form.watch("destinationPostcode");
    const baseUrl = process.env.NEXT_PUBLIC_ADDRESS_DISTANCE_BASE_URL;

    if (!baseUrl) {
      console.error("❌ NEXT_PUBLIC_ADDRESS_DISTANCE_BASE_URL is not configured!");
      return;
    }

    const hasOrigin = !!oLine && !!oPc;
    const hasDest = !!dLine && !!dPc;

    if (!hasOrigin || !hasDest) {
      return;
    }

    const controller = new AbortController();
    const url = new URL(baseUrl);
    url.searchParams.set("originAddress", `${oLine}`);
    url.searchParams.set("destinationAddress", `${dLine}`);

    fetch(url.toString(), { signal: controller.signal })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(new Error(`HTTP ${res.status}: ${res.statusText}`));
        }
      })
      .then((miles) => {
        const numeric = Number(miles);
        if (!Number.isNaN(numeric) && Number.isFinite(numeric)) {
          setDistanceMiles(numeric);
          try {
            quoteSession.setData((prev: any) => ({
              ...(prev ?? {}),
              originDestination: {
                ...(prev?.originDestination ?? {}),
                distanceMiles: numeric,
              },
            }));
          } catch {}
        }
      })
      .catch((error) => {
        console.error("❌ Distance calculation failed:", error);
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    form.watch("originLine1"),
    form.watch("originPostcode"),
    form.watch("destinationLine1"),
    form.watch("destinationPostcode"),
  ]);

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
      postcode: values.originPostcode,
      floor: floorValueToNumber(values.originFloor),
      hasElevator: values.originElevator,
    });

    setDestination({
      line1: values.destinationLine1,
      postcode: values.destinationPostcode,
      floor: floorValueToNumber(values.destinationFloor),
      hasElevator: values.destinationElevator,
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <CollectionDeliveryAddresses form={form} />
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
                <div className="pt-4 flex justify-end">
                  <Button type="submit" disabled={!isReady}>
                    Next
                  </Button>
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
