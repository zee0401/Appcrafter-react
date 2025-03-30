"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resourceSchema, ResourceFormValues } from "@/schema/resourceSchema";
import { ResourceCategoryType, ResourceType } from "@/types/resourcesType";
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
import { useEffect } from "react";

interface ResourceFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: ResourceType) => void;
    defaultValues?: ResourceType | null;
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
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ResourceFormValues>({
        resolver: zodResolver(resourceSchema),
        defaultValues: {
            title: "",
            description: "",
            type: "Article",
        },
    });

    useEffect(() => {
        if (open) {
            reset(
                defaultValues || {
                    title: "",
                    description: "",
                    type: "Article",
                }
            );
        }
    }, [open, defaultValues, reset]);

    const handleFormSubmit = (data: ResourceType) => {
        onSubmit(data);
        reset();
        onOpenChange(false);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    reset();
                }
                onOpenChange(isOpen);
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {defaultValues ? "Edit Resource" : "Add New Resource"}
                    </DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="space-y-4"
                >
                    <div>
                        <Input
                            placeholder="Title"
                            {...register("title")}
                            disabled={isSubmitting}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Textarea
                            placeholder="Description"
                            {...register("description")}
                            disabled={isSubmitting}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-2 items-center">
                        <p>Select type:</p>
                        <Select
                            value={watch("type")}
                            onValueChange={(value) =>
                                setValue("type", value as ResourceCategoryType)
                            }
                            disabled={isSubmitting}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Article">Article</SelectItem>
                                <SelectItem value="Video">Video</SelectItem>
                                <SelectItem value="Tutorial">
                                    Tutorial
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.type && (
                            <p className="text-red-500 text-sm">
                                {errors.type.message}
                            </p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting
                                ? defaultValues
                                    ? "Updating..."
                                    : "Creating..."
                                : defaultValues
                                ? "Update"
                                : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
