import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { requestLeaves } from "@/utils/apis/leaves/api";
import { leavesSchema, LeavesSchema } from "@/utils/apis/leaves/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { id } from "date-fns/locale";

export default function RequestLeaves() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LeavesSchema>({
    resolver: zodResolver(leavesSchema),
    defaultValues: {
      start_date: undefined,
      end_date: undefined,
      reason: "",
    },
  });

  const onSubmit = async (data: LeavesSchema) => {
    setIsLoading(true);
    try {
      const formattedData = {
        start_date: startDate
          ? format(startDate, "d MMMM yyyy", { locale: id })
          : "",
        end_date: endDate ? format(endDate, "d MMMM yyyy", { locale: id }) : "",
        reason: data.reason || "",
      };

      if (!formattedData.start_date || !formattedData.end_date) {
        toast.error("Please select both start and end dates.");
        return;
      }

      const resp = await requestLeaves(formattedData);
      navigate("/leaves-user");
      toast.success(resp.message);
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout title="Request Leaves" description="">
      <h1 className="text-2xl font-bold">Request Leaves</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-4">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      format(startDate, "d MMMM yyyy", { locale: id })
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => {
                      setStartDate(date);
                      if (date) {
                        setValue("start_date", format(date, "yyyy-MM-dd"));
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date">End date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? (
                      format(endDate, "d MMMM yyyy", { locale: id })
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => {
                      setEndDate(date);
                      if (date) {
                        setValue("end_date", format(date, "yyyy-MM-dd"));
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="w-full mb-3 space-y-2">
            <Label htmlFor="reason">Reason *</Label>
            <Textarea
              id="reason"
              placeholder="Reason for leave"
              {...register("reason", { required: true })}
            />
            {errors.reason && (
              <p className="text-red-500 text-sm">{errors.reason.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-5 mt-6">
            <Button
              variant={"outline"}
              onClick={() => navigate("/leaves-user")}
            >
              Cancel
            </Button>
            <Button type="submit" className="pl-4 pr-4" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </MainLayout>
  );
}
