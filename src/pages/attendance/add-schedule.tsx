import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";

export default function AddSchedule() {
  const [date, setDate] = React.useState<Date>();
  return (
    <MainLayout title="" description="">
      <h1 className="text-2xl font-bold">Add schedule</h1>
      <div className="py-5">
        <div className="w-full mb-3 space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" placeholder="Headquarter schedule" />
        </div>
        <div className="w-full mb-3 space-y-2">
          <Label htmlFor="name">Effective date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-full mb-3 space-y-2">
          <Label htmlFor="repeat">Repeat until *</Label>
          <Input type="text" id="repeat" placeholder="29 day" />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div className="space-y-2">
            <Label htmlFor="schedule-in">Schedule In *</Label>
            <Input id="schedule-in" type="time" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="schedule-out">Schedule Out *</Label>
            <Input id="schedule-out" type="time" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div className="space-y-2">
            <Label htmlFor="break-start">Break Start *</Label>
            <Input id="break-start" type="time" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="break-end">Break End *</Label>
            <Input id="break-end" type="time" />
          </div>
        </div>
        <div className="w-full mb-3 space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Optional" />
        </div>
        <div className="flex justify-end gap-5 mt-6">
          <Button variant={"link"}>Cancel</Button>
          <Button className="pl-4 pr-4">Save Schedule</Button>
        </div>
      </div>
    </MainLayout>
  );
}
