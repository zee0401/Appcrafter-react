import ResourceFormModal from "@/components/form-modal/ResourceForm";
import ResourceTable from "@/components/table/ResourceTable";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ResourceFormValues } from "@/schema/resourceSchema";
import { ResourceType } from "@/types/resourcesTypes";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resources, setResources] = useState<ResourceType[]>([]);

    const handleAddResource = (newResource: ResourceFormValues) => {
        setResources([
            ...resources,
            { ...newResource, id: crypto.randomUUID() },
        ]);
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="my-6 font-bold text-xl">Resource List</div>

            <div className="flex justify-between md:w-196 xl:w-196 w-full p-4">
                <Button
                    className="mr-2 bg-sky-300 text-gray-800 hover:bg-sky-500 hover:cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Resource
                </Button>
            </div>
            <ResourceTable />
            <ResourceFormModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSubmit={handleAddResource}
            />
        </div>
    );
};

export default Home;
