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
import { ResourceType } from "@/types/resourcesTypes";

interface ResourceTableProps {
    data: ResourceType[];
    onEdit: (resource: ResourceType) => void;
    onDelete: (id: ResourceType["_id"]) => void;
}

const ResourceTable = ({ data, onEdit, onDelete }: ResourceTableProps) => {
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
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className="hover:cursor-pointer"
                                        variant={"destructive"}
                                        onClick={() => onDelete(resource._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ResourceTable;
