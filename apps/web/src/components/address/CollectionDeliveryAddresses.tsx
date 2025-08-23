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
  originPostcode: string;
  originFloor: string;
  originElevator: boolean;
  destinationLine1: string;
  destinationPostcode: string;
  destinationFloor: string;
  destinationElevator: boolean;
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
                          <FormLabel className="flex items-center gap-2"><Building2 className="h-4 w-4" /> Floor</FormLabel>
                          <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
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
                  addressLine1={origin?.line1 || ""}
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
                          <FormLabel className="flex items-center gap-2"><Building2 className="h-4 w-4" /> Floor</FormLabel>
                          <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
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
                  addressLine1={destination?.line1 || ""}
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
