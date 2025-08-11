"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { StreamlinedHeader } from "@/components/StreamlinedHeader";
import Footer from "@/components/Footer";
import { useBooking } from "@/contexts/BookingContext";
import { Address } from "@/types/booking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PostcodeTypeahead from "@/components/address/PostcodeTypeahead";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { AlertCircle, Building2, MapPin, Navigation } from "lucide-react";

type FormValues = {
  originLine1: string;
  originPostcode: string;
  originFloor: string; // "ground" | "1" | "2" | "3" | "4" | "5" | "6+"
  originElevator: boolean;
  sameAsBilling: boolean;
  destinationLine1: string;
  destinationPostcode: string;
  destinationFloor: string;
  destinationElevator: boolean;
  // New: Customer details
  fullName: string;
  email: string;
  phone: string;
  billingLine1: string;
  billingPostcode: string;
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

function floorValueToNumber(val: string): number {
  if (val === "ground") return 0;
  if (val === "6+") return 6;
  const n = parseInt(val, 10);
  return Number.isFinite(n) ? n : 0;
}

export default function OriginDestinationPage() {
  const router = useRouter();
  const booking = useBooking();
  const { isHydrated, vehicle, originDestination, updateOriginDestination } = booking;
  const selectedVan = vehicle.selectedVan;
  const setOrigin = (addr: Address) => updateOriginDestination({ origin: addr });
  const setDestination = (addr: Address) => updateOriginDestination({ destination: addr });
  const setDistanceMiles = (miles: number) => updateOriginDestination({ distanceMiles: Math.max(0, Number(miles) || 0) });

  const form = useForm<FormValues>({
    defaultValues: {
  originLine1: originDestination?.origin?.line1 || "",
  originPostcode: originDestination?.origin?.postcode || "",
      originFloor: "ground",
      originElevator: true,
  sameAsBilling: false,
  destinationLine1: originDestination?.destination?.line1 || "",
  destinationPostcode: originDestination?.destination?.postcode || "",
      destinationFloor: "ground",
      destinationElevator: true,
  fullName: originDestination?.fullName || "",
  email: originDestination?.email || "",
  phone: originDestination?.phone || "",
  billingLine1: originDestination?.billingAddress?.line1 || "",
  billingPostcode: originDestination?.billingAddress?.postcode || "",
    },
    mode: "onChange",
  });

  const watchOriginFloor = form.watch("originFloor");
  const watchDestinationFloor = form.watch("destinationFloor");
  const watchOriginElevator = form.watch("originElevator");
  const watchDestinationElevator = form.watch("destinationElevator");

  const showExtraCost =
    (!watchOriginElevator && floorValueToNumber(watchOriginFloor) > 0) ||
    (!watchDestinationElevator && floorValueToNumber(watchDestinationFloor) > 0);

  // Watch customer billing for readiness checks
  const watchBillingLine1 = form.watch("billingLine1");
  const watchBillingPostcode = form.watch("billingPostcode");
  const watchSameAsBilling = form.watch("sameAsBilling");
  const watchFullName = form.watch("fullName");
  const watchEmail = form.watch("email");
  const watchPhone = form.watch("phone");

  // Keep origin in sync with billing when "Same as billing" is checked
  React.useEffect(() => {
    if (watchSameAsBilling) {
      const b1 = watchBillingLine1 || "";
      const bp = watchBillingPostcode || "";
      if (form.getValues("originLine1") !== b1) {
        form.setValue("originLine1", b1, { shouldDirty: true, shouldTouch: true, shouldValidate: false });
      }
      if (form.getValues("originPostcode") !== bp) {
        form.setValue("originPostcode", bp, { shouldDirty: true, shouldTouch: true, shouldValidate: false });
      }
    }
  }, [watchSameAsBilling, watchBillingLine1, watchBillingPostcode]);

  function onSubmit(values: FormValues) {
    const origin: Address = {
      line1: values.originLine1,
      postcode: values.originPostcode,
      floor: floorValueToNumber(values.originFloor),
      hasElevator: values.originElevator,
    };
    const destination: Address = {
      line1: values.destinationLine1,
      postcode: values.destinationPostcode,
      floor: floorValueToNumber(values.destinationFloor),
      hasElevator: values.destinationElevator,
    };
    updateOriginDestination({
      origin,
      destination,
      distanceMiles: originDestination?.distanceMiles ?? 0,
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      billingAddress: { line1: values.billingLine1, postcode: values.billingPostcode },
    });

    // Ensure flow: must have selected a van before pricing per rules
    if (!selectedVan) {
      router.push("/van-selection");
      return;
    }
    router.push("/pricing");
  }

  const hasAddressSelections =
    form.watch("originPostcode").trim().length > 0 &&
    form.watch("destinationPostcode").trim().length > 0 &&
    form.watch("originLine1").trim().length > 0 &&
    form.watch("destinationLine1").trim().length > 0 &&
    (watchBillingPostcode?.trim().length ?? 0) > 0 &&
    (watchBillingLine1?.trim().length ?? 0) > 0;

  // Explicit validation for customer details to avoid edge cases where formState.isValid lags
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const ukPhoneRegex = /^(?:\+44\s?\d{3,4}[\s-]?\d{3}[\s-]?\d{3,4}|0\s?\d{3,4}[\s-]?\d{3}[\s-]?\d{3,4})$/;
  const isCustomerValid =
    (watchFullName?.trim().length ?? 0) >= 2 &&
    (!!watchEmail && emailRegex.test(watchEmail)) &&
    (!!watchPhone && ukPhoneRegex.test(watchPhone));
  
  const isReady = hasAddressSelections && isCustomerValid;

  // Fetch distance in miles when both addresses are available
  React.useEffect(() => {
    const oLine = form.watch('originLine1');
    const oPc = form.watch('originPostcode');
    const dLine = form.watch('destinationLine1');
    const dPc = form.watch('destinationPostcode');
    const baseUrl = process.env.NEXT_PUBLIC_ADDRESS_DISTANCE_BASE_URL;
    if (!baseUrl) return;
    const hasOrigin = !!oLine && !!oPc;
    const hasDest = !!dLine && !!dPc;
    if (!hasOrigin || !hasDest) return;

    const controller = new AbortController();
    const url = new URL(baseUrl);

    // url.searchParams.set('originAddress', `${oLine}, ${oPc}`);
    // url.searchParams.set('destinationAddress', `${dLine}, ${dPc}`);

    url.searchParams.set('originAddress', `${oLine}`);
    url.searchParams.set('destinationAddress', `${dLine}`);

    fetch(url.toString(), { signal: controller.signal })
      .then(res => res.ok ? res.json() : Promise.reject(new Error('Failed to fetch distance')))
      .then((miles) => {
        const numeric = Number(miles);
        if (!Number.isNaN(numeric) && Number.isFinite(numeric)) {
          setDistanceMiles(numeric);
        }
      })
      .catch(() => {})
    return () => controller.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('originLine1'), form.watch('originPostcode'), form.watch('destinationLine1'), form.watch('destinationPostcode')]);

  // When hydrated, rehydrate form fields for floors/elevators from saved state if present
  React.useEffect(() => {
    if (!isHydrated || !originDestination) return;
    const o = originDestination.origin;
    const d = originDestination.destination;
    if (o?.floor !== undefined) {
      form.setValue('originFloor', o.floor === 0 ? 'ground' : (o.floor >= 6 ? '6+' : String(o.floor)));
    }
    if (typeof o?.hasElevator === 'boolean') {
      form.setValue('originElevator', o.hasElevator);
    }
    if (d?.floor !== undefined) {
      form.setValue('destinationFloor', d.floor === 0 ? 'ground' : (d.floor >= 6 ? '6+' : String(d.floor)));
    }
    if (typeof d?.hasElevator === 'boolean') {
      form.setValue('destinationElevator', d.hasElevator);
    }
  }, [isHydrated, originDestination]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StreamlinedHeader />

      <main className="flex-1">
      <section className="pt-32 md:pt-36 lg:pt-44 pb-10 bg-white">
        <div className="container mx-auto px-4 space-y-6">
          {/* Flow guard: if booking hasn't hydrated yet, avoid premature redirects; if no van selected, direct user */}
          {isHydrated && !selectedVan && (
            <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-amber-800 text-sm">
              Please select a van first to continue. You'll be redirected to van selection if you proceed.
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Customer Details */}
          <Card className="border-primary-200">
            <CardHeader>
              <CardTitle className="text-primary-700 text-base">Customer Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      rules={{ required: "Full name is required", minLength: { value: 2, message: "Name is too short" } }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. John Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="e.g. john.smith@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      rules={{
                        required: "Phone number is required",
                        pattern: {
                          // Accepts UK numbers in formats like 07123 456789, 020 7946 0018, +44 7123 456789
                          value: /^(?:\+44\s?\d{3,4}[\s-]?\d{3}[\s-]?\d{3,4}|0\s?\d{3,4}[\s-]?\d{3}[\s-]?\d{3,4})$/,
                          message: "Enter a valid UK phone number",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (UK)</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="e.g. 07123 456789" {...field} />
                          </FormControl>
                          <FormDescription>Include country code or leading 0</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Billing Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {watchBillingLine1 ? (
                      <div className="rounded-md border p-3 bg-muted/30">
                        <div className="text-sm font-medium text-gray-900">{watchBillingLine1}</div>
                        {watchBillingPostcode && (
                          <div className="text-xs text-gray-600 mt-1">{watchBillingPostcode}</div>
                        )}
                        <div className="mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={() => {
                              form.setValue("billingLine1", "");
                              form.setValue("billingPostcode", "");
                            }}
                          >
                            Change
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <FormField
                        control={form.control}
                        name="billingPostcode"
                        rules={{ required: "Postcode is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postcode</FormLabel>
                            <FormControl>
                              <PostcodeTypeahead
                                postcode={field.value}
                                onPostcodeChange={field.onChange}
                                onAddressSelected={(addr) => {
                                  form.setValue("billingLine1", addr);
                                }}
                                placeholder="e.g. EC1A 1BB"
                                variant="pickup"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

    <Card className="border-primary-200">
            <CardHeader>
              <CardTitle className="text-primary-700 text-base">
                Provide pickup and delivery addresses
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Removed header arrow and badge per request */}

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
                        <FormField
                          control={form.control}
                          name="sameAsBilling"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Same as billing address</FormLabel>
                                <FormDescription>Use the billing address for pickup</FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        {form.watch("originLine1") ? (
                          <div className="rounded-md border p-3 bg-muted/30">
                            <div className="text-sm font-medium text-gray-900">{form.watch("originLine1")}</div>
                            {form.watch("originPostcode") && (
                              <div className="text-xs text-gray-600 mt-1">{form.watch("originPostcode")}</div>
                            )}
                            <div className="mt-2">
                              {!watchSameAsBilling && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  type="button"
                                  onClick={() => {
                                    form.setValue("originLine1", "");
                                    form.setValue("originPostcode", "");
                                  }}
                                >
                                  Change
                                </Button>
                              )}
                            </div>
                          </div>
                        ) : (
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
                                    onAddressSelected={(addr) => {
                                      form.setValue("originLine1", addr);
                                    }}
                                    placeholder="e.g. SW1A 1AA"
                                    variant="pickup"
                                    disabled={watchSameAsBilling}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="originFloor"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Floor</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select floor" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {FLOOR_OPTIONS.map((f) => (
                                      <SelectItem key={f.value} value={f.value}>
                                        {f.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormDescription className="flex items-center gap-2">
                                  <Building2 className="h-3.5 w-3.5" /> Select building floor
                                </FormDescription>
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
                                <FormDescription>Toggle if elevator is available</FormDescription>
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Delivery */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                          <Navigation className="h-4 w-4 text-red-600" />
                          Delivery Address
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {form.watch("destinationLine1") ? (
                          <div className="rounded-md border p-3 bg-muted/30">
                            <div className="text-sm font-medium text-gray-900">{form.watch("destinationLine1")}</div>
                            {form.watch("destinationPostcode") && (
                              <div className="text-xs text-gray-600 mt-1">{form.watch("destinationPostcode")}</div>
                            )}
                            <div className="mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                type="button"
                                onClick={() => {
                                  form.setValue("destinationLine1", "");
                                  form.setValue("destinationPostcode", "");
                                }}
                              >
                                Change
                              </Button>
                            </div>
                          </div>
                        ) : (
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
                                    onAddressSelected={(addr) => {
                                      form.setValue("destinationLine1", addr);
                                    }}
                                    placeholder="e.g. W1K 1QA"
                                    variant="delivery"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="destinationFloor"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Floor</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select floor" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {FLOOR_OPTIONS.map((f) => (
                                      <SelectItem key={f.value} value={f.value}>
                                        {f.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormDescription className="flex items-center gap-2">
                                  <Building2 className="h-3.5 w-3.5" /> Select building floor
                                </FormDescription>
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
                                <FormDescription>Toggle if elevator is available</FormDescription>
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {showExtraCost && (
                    <div className="flex items-start gap-3 rounded-md border border-amber-300 bg-amber-50 p-3 text-amber-800">
                      <AlertCircle className="h-5 w-5" />
                      <div className="text-sm">
                        Additional charges may apply for floors above ground without elevator access.
                      </div>
                    </div>
                  )}

                  {/* Plain text total distance at the bottom */}
                  {typeof originDestination?.distanceMiles === 'number' && Number.isFinite(originDestination.distanceMiles!) && originDestination.distanceMiles! > 0 && (
                    <div className="mt-4 w-full text-center text-lg text-muted-foreground font-extrabold">
                      Total distance: {Math.round(originDestination.distanceMiles!)} miles
                    </div>
                  )}
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button type="submit" disabled={!isReady}>
              Next: Pricing
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

 
