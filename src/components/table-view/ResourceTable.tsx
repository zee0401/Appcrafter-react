import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { ResourceType } from "@/types/resourcesType";
import ResourceFormModal from "../form-modal/ResourceForm";
import { useState } from "react";

interface ResourceTableProps {
    data: ResourceType[];
    onEdit: (resource: ResourceType) => void;
    onDelete: (id: string) => void;
}

const ResourceTable = ({ data, onEdit, onDelete }: ResourceTableProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingResource, setEditingResource] = useState<ResourceType | null>(
        null
    );

    const handleEditClick = (resource: ResourceType) => {
        setEditingResource(resource);
        setIsModalOpen(true);
    };

    const handleFormSubmit = (formValues: ResourceType) => {
        if (editingResource) {
            onEdit({
                ...formValues,
                _id: editingResource._id,
            });
        }
        setIsModalOpen(false);
    };

    return (
        <div className="p-5 w-full md:w-196 xl:w-196">
            <Table className="rounded-2xl border-2 border-zinc-800 shadow-md">
                <TableCaption>A list of your Resources.</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-300 ">
                        <TableHead className="w-[100px]">Sr no</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right pr-20">Type</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data &&
                        data?.map((resource, i) => (
                            <TableRow
                                className="hover:bg-zinc-800"
                                key={resource?._id}
                            >
                                <TableCell className="font-medium">
                                    {i + 1}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {resource.title}
                                </TableCell>
                                <TableCell>{resource.description}</TableCell>
                                <TableCell>{resource.type}</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        className="mr-2 hover:cursor-pointer"
                                        variant={"secondary"}
                                        onClick={() =>
                                            handleEditClick(resource)
                                        }
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className="hover:cursor-pointer"
                                        variant={"destructive"}
                                        onClick={() => onDelete(resource?._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <ResourceFormModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSubmit={handleFormSubmit}
                defaultValues={editingResource}
            />
        </div>
    );
};

export default ResourceTable;
