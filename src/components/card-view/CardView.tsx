import { useState } from "react";
import { Button } from "../ui/button";
import ResourceFormModal from "../form-modal/ResourceForm";
import { ResourceFormValues, ResourceType } from "@/types/resourcesType";

interface ResourceCardProps {
    data: ResourceType[];
    onEdit: (resource: ResourceType) => void;
    onDelete: (id: string) => void;
}

export function CardView({ data, onEdit, onDelete }: ResourceCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingResource, setEditingResource] = useState<ResourceType | null>(
        null
    );

    const handleEditClick = (resource: ResourceType) => {
        setEditingResource(resource);
        setIsModalOpen(true);
    };

    const handleFormSubmit = (formValues: ResourceFormValues) => {
        if (editingResource) {
            onEdit({
                ...formValues,
                _id: editingResource._id,
            });
        }
        setIsModalOpen(false);
    };

    return (
        <div className="p-5 grid gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
            {data &&
                data?.map((resource) => (
                    <div
                        key={resource._id}
                        className="p-4 bg-gray-800 shadow-md rounded-lg border border-gray-600 transition-all duration-200 hover:shadow-lg"
                    >
                        <h3 className="text-lg font-semibold mb-2 text-gray-200">
                            {resource.title}
                        </h3>

                        <p className="text-gray-400 mb-2">
                            {resource.description}
                        </p>
                        <p className="text-sm text-gray-300 mb-4 underline">
                            {resource.type}
                        </p>
                        <div className="mt-4 flex justify-end gap-2 ">
                            <Button
                                className="hover:bg-indigo-100 hover:text-indigo-600 text-indigo-600 border border-indigo-600 rounded-md py-2 px-4 transition-colors"
                                variant="secondary"
                                onClick={() => handleEditClick(resource)}
                            >
                                Edit
                            </Button>
                            <Button
                                className="hover:bg-red-100 hover:text-red-600 text-white border border-red-600 rounded-md py-2 px-4 transition-colors"
                                variant="destructive"
                                onClick={() => onDelete(resource._id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            <ResourceFormModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSubmit={handleFormSubmit}
                defaultValues={editingResource}
            />
        </div>
    );
}
