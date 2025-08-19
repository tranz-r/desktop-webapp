"use client";

import React from "react";
import { StreamlinedHeader } from "@/components/StreamlinedHeader";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import CollectionDeliveryAddresses, {
  CollectionDeliveryFormValues,
  floorValueToNumber,
} from "@/components/address/CollectionDeliveryAddresses";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useBooking } from "@/contexts/BookingContext";
import { AlertCircle } from "lucide-react";
import type { Address } from "@/types/booking";
import PostcodeTypeahead from "@/components/address/PostcodeTypeahead";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function CollectionDeliveryPage() {
  const router = useRouter();
  const { originDestination, isHydrated } = useBooking();

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <StreamlinedHeader />
        <main className="flex-1">
          <section className="pt-32 md:pt-36 lg:pt-44 pb-10 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-gray-900">Loading your booking...</h2>
                  <p className="text-muted-foreground">Please wait while we load your saved information.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const hasOriginComplete = Boolean(
    originDestination?.origin?.line1?.trim() &&
      originDestination?.origin?.postcode?.trim() &&
      typeof originDestination?.origin?.floor === "number" &&
      typeof originDestination?.origin?.hasElevator === "boolean"
  );

  const hasDestinationComplete = Boolean(
    originDestination?.destination?.line1?.trim() &&
      originDestination?.destination?.postcode?.trim() &&
      typeof originDestination?.destination?.floor === "number" &&
      typeof originDestination?.destination?.hasElevator === "boolean"
  );

  const isComplete = hasOriginComplete && hasDestinationComplete;
  const [mode, setMode] = React.useState<
    "collect" | "readonly" | "edit-origin" | "edit-destination"
  >(isComplete ? "readonly" : "collect");

  React.useEffect(() => {
    setMode(isComplete ? "readonly" : "collect");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete, originDestination?.origin, originDestination?.destination]);

  if (mode === "readonly") {
    return (
      <ReadOnlyView
        onChangeOrigin={() => setMode("edit-origin")}
        onChangeDestination={() => setMode("edit-destination")}
        onNext={() => router.push("/inventory")}
      />
    );
  }

  if (mode === "edit-origin" || mode === "edit-destination") {
    return (
      <EditAddressForm
        target={mode === "edit-origin" ? "origin" : "destination"}
        onCancel={() => setMode("readonly")}
        onSaved={() => setMode("readonly")}
      />
    );
  }

  return <CollectAddressesForm onNext={() => router.push("/inventory")} />;
}

function ReadOnlyView({
  onChangeOrigin,
  onChangeDestination,
  onNext,
}: {
  onChangeOrigin: () => void;
  onChangeDestination: () => void;
  onNext: () => void;
}) {
  const { originDestination } = useBooking();
  const origin = originDestination.origin!;
  const destination = originDestination.destination!;
  const distance = originDestination.distanceMiles;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StreamlinedHeader />
      <main className="flex-1">
        <section className="pt-32 md:pt-36 lg:pt-44 pb-10 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-2xl font-bold mb-6">Review your addresses</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ReadonlyCard
                title="Pickup address"
                address={origin}
                onChange={onChangeOrigin}
              />
              <ReadonlyCard
                title="Delivery address"
                address={destination}
                onChange={onChangeDestination}
              />
            </div>

            {typeof distance === "number" && Number.isFinite(distance) && distance > 0 && (
              <div className="text-center mt-8">
                <div className="inline-block bg-muted rounded-full px-6 py-3 text-sm font-semibold">
                  Total distance: {Math.round(distance)} miles
                </div>
              </div>
            )}

            <div className="flex justify-end mt-8">
              <Button onClick={onNext}>Continue</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ReadonlyCard({
  title,
  address,
  onChange,
}: {
  title: string;
  address: Address; // Allow potential undefined props, we render defensively
  onChange?: () => void;
}) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">{title}</h3>
        {onChange && (
          <Button variant="outline" size="sm" onClick={onChange}>
            Change
          </Button>
        )}
      </div>
      <div className="space-y-1 text-sm text-muted-foreground">
        <div className="text-foreground font-medium">{address?.line1 || ""}</div>
        <div>{address?.postcode || ""}</div>
        <div>
          Floor: {typeof address?.floor === "number" ? (address.floor === 0 ? "Ground" : address.floor) : ""}
          {typeof address?.hasElevator === "boolean"
            ? address.hasElevator
              ? " • Elevator available"
              : " • No elevator"
            : ""}
        </div>
      </div>
    </div>
  );
}

function CollectAddressesForm({ onNext }: { onNext: () => void }) {
  const { originDestination, updateOriginDestination } = useBooking();
  const form = useForm<CollectionDeliveryFormValues>({
    defaultValues: {
      originLine1: originDestination?.origin?.line1 || "",
      originPostcode: originDestination?.origin?.postcode || "",
      originFloor:
        (originDestination?.origin?.floor ?? 0) === 0
          ? "ground"
          : (originDestination?.origin?.floor ?? 0) >= 6
          ? "6+"
          : String(originDestination?.origin?.floor ?? "ground"),
      originElevator: originDestination?.origin?.hasElevator ?? true,
      destinationLine1: originDestination?.destination?.line1 || "",
      destinationPostcode: originDestination?.destination?.postcode || "",
      destinationFloor:
        (originDestination?.destination?.floor ?? 0) === 0
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

  async function computeAndStoreDistance(originLine: string, destLine: string) {
    const baseUrl = process.env.NEXT_PUBLIC_ADDRESS_DISTANCE_BASE_URL;
    if (!baseUrl) return;
    const url = new URL(baseUrl);
    url.searchParams.set("originAddress", originLine);
    url.searchParams.set("destinationAddress", destLine);
    try {
      const res = await fetch(url.toString());
      if (!res.ok) return;
      const miles = await res.json();
      const numeric = Number(miles);
      if (!Number.isNaN(numeric) && Number.isFinite(numeric)) {
        updateOriginDestination({ distanceMiles: numeric });
      }
    } catch {}
  }

  function onSubmit(values: CollectionDeliveryFormValues) {
    const origin = buildAddress(values.originLine1, values.originPostcode, values.originFloor, values.originElevator);
    const destination = buildAddress(
      values.destinationLine1,
      values.destinationPostcode,
      values.destinationFloor,
      values.destinationElevator
    );

    if (origin && destination) {
      updateOriginDestination({ origin, destination });
      computeAndStoreDistance(values.originLine1.trim(), values.destinationLine1.trim());
      onNext();
      return;
    }
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

                {((!form.watch("originElevator") && floorValueToNumber(form.watch("originFloor")) > 0) ||
                  (!form.watch("destinationElevator") && floorValueToNumber(form.watch("destinationFloor")) > 0)) && (
                  <div className="flex items-start gap-3 rounded-md border border-amber-300 bg-amber-50 p-3 text-amber-800">
                    <AlertCircle className="h-5 w-5" />
                    <div className="text-sm">
                      Additional charges may apply for floors above ground without elevator access.
                    </div>
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

function EditAddressForm({
  target,
  onCancel,
  onSaved,
}: {
  target: "origin" | "destination";
  onCancel: () => void;
  onSaved: () => void;
}) {
  const { originDestination, updateOriginDestination } = useBooking();
  const seed = target === "origin" ? originDestination.origin : originDestination.destination;
  const form = useForm<CollectionDeliveryFormValues>({
    defaultValues: {
      originLine1: target === "origin" ? (seed?.line1 || "") : (originDestination.origin?.line1 || ""),
      originPostcode: target === "origin" ? (seed?.postcode || "") : (originDestination.origin?.postcode || ""),
      originFloor:
        ((target === "origin" ? seed?.floor : originDestination.origin?.floor) ?? 0) === 0
          ? "ground"
          : (((target === "origin" ? seed?.floor : originDestination.origin?.floor) ?? 0) >= 6
            ? "6+"
            : String((target === "origin" ? seed?.floor : originDestination.origin?.floor) ?? "ground")),
      originElevator: target === "origin" ? (seed?.hasElevator ?? true) : (originDestination.origin?.hasElevator ?? true),
      destinationLine1:
        target === "destination" ? (seed?.line1 || "") : (originDestination.destination?.line1 || ""),
      destinationPostcode:
        target === "destination" ? (seed?.postcode || "") : (originDestination.destination?.postcode || ""),
      destinationFloor:
        ((target === "destination" ? seed?.floor : originDestination.destination?.floor) ?? 0) === 0
          ? "ground"
          : (((target === "destination" ? seed?.floor : originDestination.destination?.floor) ?? 0) >= 6
            ? "6+"
            : String((target === "destination" ? seed?.floor : originDestination.destination?.floor) ?? "ground")),
      destinationElevator:
        target === "destination"
          ? (seed?.hasElevator ?? true)
          : (originDestination.destination?.hasElevator ?? true),
    },
    mode: "onChange",
  });

  const isOrigin = target === "origin";

  async function computeAndStoreDistanceIfComplete(updatedLine1?: string) {
    const baseUrl = process.env.NEXT_PUBLIC_ADDRESS_DISTANCE_BASE_URL;
    if (!baseUrl) return;
    const o = isOrigin ? updatedLine1 ?? originDestination.origin?.line1 : originDestination.origin?.line1;
    const d = !isOrigin ? updatedLine1 ?? originDestination.destination?.line1 : originDestination.destination?.line1;
    if (!o?.trim() || !d?.trim()) return;

    const url = new URL(baseUrl);
    url.searchParams.set("originAddress", o.trim());
    url.searchParams.set("destinationAddress", d.trim());
    try {
      const res = await fetch(url.toString());
      if (!res.ok) return;
      const miles = await res.json();
      const numeric = Number(miles);
      if (!Number.isNaN(numeric) && Number.isFinite(numeric)) {
        updateOriginDestination({ distanceMiles: numeric });
      }
    } catch {}
  }

  function onSubmit(values: CollectionDeliveryFormValues) {
    if (isOrigin) {
      const origin = buildAddress(values.originLine1, values.originPostcode, values.originFloor, values.originElevator);
      if (origin) {
        updateOriginDestination({ origin });
        computeAndStoreDistanceIfComplete(values.originLine1);
        onSaved();
      }
      return;
    }

    const destination = buildAddress(
      values.destinationLine1,
      values.destinationPostcode,
      values.destinationFloor,
      values.destinationElevator
    );
    if (destination) {
      updateOriginDestination({ destination });
      computeAndStoreDistanceIfComplete(values.destinationLine1);
      onSaved();
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StreamlinedHeader />
      <main className="flex-1">
        <section className="pt-32 md:pt-36 lg:pt-44 pb-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {isOrigin ? (
                <>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Edit pickup address</h3>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="originPostcode"
                          rules={{ required: "Postcode is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postcode</FormLabel>
                              <FormControl>
                                <PostcodeTypeahead
                                  postcode={field.value}
                                  onPostcodeChange={field.onChange}
                                  onAddressSelected={(addr) => form.setValue("originLine1", addr)}
                                  placeholder="e.g. EC1A 1BB"
                                  variant="pickup"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="originFloor"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Floor</FormLabel>
                                <FormControl>
                                  <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Floor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="ground">Ground Floor</SelectItem>
                                      <SelectItem value="1">1st Floor</SelectItem>
                                      <SelectItem value="2">2nd Floor</SelectItem>
                                      <SelectItem value="3">3rd Floor</SelectItem>
                                      <SelectItem value="4">4th Floor</SelectItem>
                                      <SelectItem value="5">5th Floor</SelectItem>
                                      <SelectItem value="6+">6th Floor or Higher</SelectItem>
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
                                  <FormLabel>Elevator available</FormLabel>
                                  <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                          <Button type="submit">Save</Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                  <div>
                    <ReadonlyCard
                      title="Delivery address"
                      address={(originDestination.destination as Address)}
                      onChange={undefined}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <ReadonlyCard
                      title="Pickup address"
                      address={(originDestination.origin as Address)}
                      onChange={undefined}
                    />
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Edit delivery address</h3>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="destinationPostcode"
                          rules={{ required: "Postcode is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postcode</FormLabel>
                              <FormControl>
                                <PostcodeTypeahead
                                  postcode={field.value}
                                  onPostcodeChange={field.onChange}
                                  onAddressSelected={(addr) => form.setValue("destinationLine1", addr)}
                                  placeholder="e.g. SW1A 1AA"
                                  variant="delivery"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="destinationFloor"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Floor</FormLabel>
                                <FormControl>
                                  <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Floor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="ground">Ground Floor</SelectItem>
                                      <SelectItem value="1">1st Floor</SelectItem>
                                      <SelectItem value="2">2nd Floor</SelectItem>
                                      <SelectItem value="3">3rd Floor</SelectItem>
                                      <SelectItem value="4">4th Floor</SelectItem>
                                      <SelectItem value="5">5th Floor</SelectItem>
                                      <SelectItem value="6+">6th Floor or Higher</SelectItem>
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
                                  <FormLabel>Elevator available</FormLabel>
                                  <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                          <Button type="submit">Save</Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function buildAddress(
  line1: string,
  postcode: string,
  floor: string,
  hasElevator: boolean
): { line1: string; postcode: string; floor: number; hasElevator: boolean } | undefined {
  const l = line1.trim();
  const p = postcode.trim();
  if (!l || !p) return undefined;
  const f = floorValueToNumber(floor);
  const elev = Boolean(hasElevator);
  return { line1: l, postcode: p, floor: f, hasElevator: elev };
}
