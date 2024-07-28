import { ReactNode } from "react";
import { Control, ControllerRenderProps, FieldPath, FieldValues, Path } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

interface Props<T extends FieldValues> {
    name: FieldPath<T>;
    label: string;
    placeholder?: string;
    options?: any[];
    description?: string;
    control: Control<T>;
  }
  
  interface ChildrenProps<T extends FieldValues> extends Props<T> {
    children: (field: ControllerRenderProps<T, Path<T>>) => ReactNode;
  }
  
  export function CustomFormField<T extends FieldValues>(
    props: Readonly<ChildrenProps<T>>
  ) {
    const { name, label, description, control, children } = props;
  
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-black">{label}</FormLabel>
            <FormControl>{children(field)}</FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }