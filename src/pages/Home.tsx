import ResourceFormModal from "@/components/form-modal/ResourceForm";
import ResourceTable from "@/components/table-view/ResourceTable";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ResourceFormValues } from "@/schema/resourceSchema";
import { ResourceType } from "@/types/resourcesTypes";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CardView } from "@/components/card-view/CardView";
import {
    createResource,
    deleteResource,
    getAllResources,
    updateResource,
} from "@/api/api";
import TableSkeleton from "@/components/loading-skeleton/TableSkeleton";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resources, setResources] = useState<ResourceType[]>([]);

    const [isChecked, setIsChecked] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleAddResource = async (formValues: ResourceType) => {
        try {
            setLoading(true);
            await createResource(formValues);
            setResources([...resources, formValues]);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
        setIsModalOpen(false);
    };

    const handleEditResource = async (id: string, formValues: ResourceType) => {
        try {
            setLoading(true);
            await updateResource(id, formValues);
            setResources(
                resources.map((resource) =>
                    resource._id === id ? formValues : resource
                )
            );
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    const handleDeleteResource = async (id: string) => {
        try {
            await deleteResource(id);
            setResources(resources.filter((res) => res._id !== id));
        } catch (error) {
            console.error("Error deleting resource:", error);
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
            </div>
            {isChecked ? (
                loading ? (
                    <TableSkeleton />
                ) : (
                    <ResourceTable
                        data={resources}
                        // onEdit={handleEditResource}
                        onDelete={handleDeleteResource}
                    />
                )
            ) : (
                <CardView />
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
