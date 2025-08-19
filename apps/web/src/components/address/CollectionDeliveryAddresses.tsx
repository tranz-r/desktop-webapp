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
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
