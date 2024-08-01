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
import { getCompanies } from "@/utils/apis/companies/api";
import { addSchedule } from "@/utils/apis/schedule/api";
import { scheduleSchema, ScheduleSchema } from "@/utils/apis/schedule/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AddSchedule() {
  const [date, setDate] = useState<Date | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ScheduleSchema>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      name: "",
      schedule_in: "",
      schedule_out: "",
      break_start: "",
      break_end: "",
      repeat_until: "",
      affective_date: "",
      description: "",
    },
  });

  const fetchData = async () => {
    try {
      const response = await getCompanies();
      // Reset form values after fetching companies data
      reset({
        company_id: response.data.id,
        name: "",
        schedule_in: "",
        schedule_out: "",
        break_start: "",
        break_end: "",
        repeat_until: "",
        affective_date: "",
        description: "",
      });
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function onSubmit(data: ScheduleSchema) {
    setIsLoading(true);
    try {
      const resp = await addSchedule(data);
      console.log(resp);
      navigate("/attendance/settings");
      toast.success(resp.message);
    } catch (error: any) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <MainLayout
      title="Empower HR - Schedule"
      description="Empower HR - Create Schedule"
    >
      <h1 className="text-2xl font-bold">Add schedule</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="py-5">
        <div className="w-full mb-3 space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Headquarter schedule"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="w-full mb-3 space-y-2">
          <Label htmlFor="affective_date">Effective date *</Label>
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
                {date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => {
                  setDate(d as Date);
                  setValue("affective_date", d ? format(d, "dd-MM-yyyy") : "");
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.affective_date && (
            <p className="text-red-500 text-sm">
              {errors.affective_date.message}
            </p>
          )}
        </div>
        <div className="w-full mb-3 space-y-2">
          <Label htmlFor="repeat">Repeat until *</Label>
          <Input
            type="text"
            id="repeat"
            placeholder="29 day"
            {...register("repeat_until")}
          />
          {errors.repeat_until && (
            <p className="text-red-500 text-sm">
              {errors.repeat_until.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div className="space-y-2">
            <Label htmlFor="schedule_in">Schedule In *</Label>
            <Input id="schedule_in" type="time" {...register("schedule_in")} />
            {errors.schedule_in && (
              <p className="text-red-500 text-sm">
                {errors.schedule_in.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="schedule_out">Schedule Out *</Label>
            <Input
              id="schedule_out"
              type="time"
              {...register("schedule_out")}
            />
            {errors.schedule_out && (
              <p className="text-red-500 text-sm">
                {errors.schedule_out.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div className="space-y-2">
            <Label htmlFor="break_start">Break Start *</Label>
            <Input id="break_start" type="time" {...register("break_start")} />
            {errors.break_start && (
              <p className="text-red-500 text-sm">
                {errors.break_start.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="break_end">Break End *</Label>
            <Input id="break_end" type="time" {...register("break_end")} />
            {errors.break_end && (
              <p className="text-red-500 text-sm">{errors.break_end.message}</p>
            )}
          </div>
        </div>
        <div className="w-full mb-3 space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Optional"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        <div className="flex justify-end gap-5 mt-6">
          <Button variant={"link"}>Cancel</Button>
          <Button className="pl-4 pr-4" type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Schedule"}
          </Button>
        </div>
      </form>
    </MainLayout>
  );
}
