import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resourceSchema, ResourceFormValues } from "@/schema/resourceSchema";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";

import { ResourceCategoryType } from "@/types/resourcesTypes";

interface ResourceFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: ResourceFormValues) => void;
    defaultValues?: ResourceFormValues;
}

export default function ResourceFormModal({
    open,
    onOpenChange,
    onSubmit,
    defaultValues,
}: ResourceFormModalProps) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ResourceFormValues>({
        resolver: zodResolver(resourceSchema),
        defaultValues: defaultValues || {
            title: "",
            description: "",
            type: "Article",
        },
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {defaultValues ? "Edit Resource" : "Add New Resource"}
                    </DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit((data) => {
                        onSubmit(data);
                        onOpenChange(false);
                    })}
                    className="space-y-4"
                >
                    <Input placeholder="Title" {...register("title")} />
                    {errors.title && (
                        <p className="text-red-500 text-sm">
                            {errors.title.message}
                        </p>
                    )}

                    <Textarea
                        placeholder="Description"
                        {...register("description")}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">
                            {errors.description.message}
                        </p>
                    )}

                    <Select
                        value={defaultValues?.type || "Article"}
                        onValueChange={(value) =>
                            setValue("type", value as ResourceCategoryType)
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Article">Article</SelectItem>
                            <SelectItem value="Video">Video</SelectItem>
                            <SelectItem value="Tutorial">Tutorial</SelectItem>
                        </SelectContent>
                    </Select>

                    {errors.type && (
                        <p className="text-red-500 text-sm">
                            {errors.type.message}
                        </p>
                    )}

                    <DialogFooter>
                        <Button type="submit">
                            {defaultValues ? "Update" : "Submit"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
