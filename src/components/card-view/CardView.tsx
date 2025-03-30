import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ResourceFormModal from "../form-modal/ResourceForm";
import { ResourceFormValues, ResourceType } from "@/types/resourcesType";
import {
    createResource,
    deleteResource,
    getAllResources,
    updateResource,
} from "@/api/api";
import TableSkeleton from "@/components/loading-skeleton/TableSkeleton";

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

    // useEffect(() => {
    //     fetchResources();
    // }, []);

    // const fetchResources = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await getAllResources();
    //         setResources(response);
    //         setLoading(false);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // const handleAddResource = async (newResource: ResourceType) => {
    //     try {
    //         setLoading(true);
    //         await createResource(newResource);
    //         fetchResources();
    //     } catch (e) {
    //         console.log(e);
    //     }
    //     setIsModalOpen(false);
    // };

    // const handleEditResource = async (updatedResource: ResourceType) => {
    //     try {
    //         await updateResource(updatedResource._id, updatedResource);
    //         fetchResources();
    //     } catch (error) {
    //         console.error("Error updating resource:", error);
    //     }
    // };

    // const handleDeleteResource = async (id: string) => {
    //     try {
    //         await deleteResource(id);
    //         setResources(resources.filter((resource) => resource._id !== id));
    //     } catch (error) {
    //         console.error("Error deleting resource:", error);
    //     }
    // };

    return (
        <div className="p-5 grid gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
            {data &&
                data?.map((resource) => (
                    <div
                        key={resource._id}
                        className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
                    >
                        <h3 className="text-lg font-bold mb-2 text-black">
                            {resource.title}
                        </h3>
                        <p className="text-gray-600 mb-2">
                            {resource.description}
                        </p>
                        <p className="text-gray-600 mb-2">{resource.type}</p>
                        <div className="mt-4 flex justify-end gap-2">
                            <Button
                                className="hover:cursor-pointer"
                                variant="secondary"
                                onClick={() => handleEditClick(resource)}
                            >
                                Edit
                            </Button>
                            <Button
                                className="hover:cursor-pointer"
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
