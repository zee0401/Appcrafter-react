import ResourceFormModal from "@/components/form-modal/ResourceForm";
import ResourceTable from "@/components/table-view/ResourceTable";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { ResourceType } from "@/types/resourcesType";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CardView } from "@/components/card-view/CardView";
import {
    createResource,
    deleteResource,
    getAllResources,
    updateResource,
} from "@/api/api";

import FilterType from "@/components/FilterType";
import TableSkeleton from "@/components/loading-skeleton/TableSkeleton";
import CardViewSkeleton from "@/components/loading-skeleton/CardViewSkeleton";
import { toast } from "sonner";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resources, setResources] = useState<ResourceType[]>([]);

    const [isChecked, setIsChecked] = useState(true);
    const [loading, setLoading] = useState(false);
    const [selectedType, setSelectedType] = useState<string>("");

    const [filteredResources, setFilteredResources] = useState<ResourceType[]>(
        []
    );

    const handleAddResource = async (formValues: ResourceType) => {
        try {
            setLoading(true);
            await createResource(formValues);
            setResources([...resources, formValues]);
            toast.success("Resource added successfully!");
            setLoading(false);
        } catch (e) {
            console.log(e);
            toast.error("Error adding resource");
        }
        setIsModalOpen(false);
    };

    const handleEditResource = async (updatedResource: ResourceType) => {
        try {
            await updateResource(updatedResource._id, updatedResource);
            toast.success("Resource updated successfully!");
            fetchResources();
        } catch (error) {
            toast.error("Error updating resource");
            console.error("Error updating resource:", error);
        }
    };

    const handleDeleteResource = async (id: string) => {
        try {
            await deleteResource(id);
            setResources(resources.filter((res) => res._id !== id));
            toast.success("Resource deleted successfully!");
        } catch (error) {
            console.error("Error deleting resource:", error);
            toast.error("Error deleting resource");
        }
    };

    const fetchResources = async () => {
        try {
            setLoading(true);
            const response = await getAllResources();
            setResources(response);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchResources();
    }, []);

    useEffect(() => {
        if (selectedType) {
            const filtered = resources.filter(
                (resource) => resource.type === selectedType
            );
            setFilteredResources(filtered);
        } else {
            setFilteredResources(resources);
        }
    }, [selectedType, resources]);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="my-6 font-bold text-xl">Resource List</div>
            <div className="flex items-center gap-2">
                <Switch
                    id="toggle-mode"
                    checked={isChecked}
                    onCheckedChange={setIsChecked}
                />
                <Label htmlFor="toggle-mode">
                    {isChecked ? "Table-View" : "Card-View"}
                </Label>
            </div>

            <div className="flex justify-between md:w-196 xl:w-196 w-full p-4">
                <Button
                    className="mr-2 bg-sky-300 text-gray-800 hover:bg-sky-500 hover:cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Resource
                </Button>
                <FilterType setSelectedType={setSelectedType} />
            </div>
            {isChecked ? (
                loading ? (
                    <TableSkeleton />
                ) : (
                    <ResourceTable
                        data={filteredResources}
                        onEdit={handleEditResource}
                        onDelete={handleDeleteResource}
                    />
                )
            ) : loading ? (
                <CardViewSkeleton />
            ) : (
                <CardView
                    data={filteredResources}
                    onEdit={handleEditResource}
                    onDelete={handleDeleteResource}
                />
            )}

            <ResourceFormModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSubmit={handleAddResource}
            />
        </div>
    );
};

export default Home;
