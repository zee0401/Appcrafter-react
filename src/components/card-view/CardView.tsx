import { useState } from "react";
import { Button } from "../ui/button";
import ResourceFormModal from "../form-modal/ResourceForm";
import { ResourceType } from "@/types/resourcesType";

export function CardView() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resources, setResources] = useState<ResourceType[]>([]);
    const [editingResource, setEditingResource] = useState<ResourceType | null>(
        null
    );

    const invoices = [
        {
            invoice: "INV001",
            paymentStatus: "Paid",
            totalAmount: "$250.00",
            paymentMethod: "Credit Card",
        },
        {
            invoice: "INV002",
            paymentStatus: "Pending",
            totalAmount: "$150.00",
            paymentMethod: "PayPal",
        },
        {
            invoice: "INV003",
            paymentStatus: "Unpaid",
            totalAmount: "$350.00",
            paymentMethod: "Bank Transfer",
        },
        {
            invoice: "INV004",
            paymentStatus: "Paid",
            totalAmount: "$450.00",
            paymentMethod: "Credit Card",
        },
        {
            invoice: "INV005",
            paymentStatus: "Paid",
            totalAmount: "$550.00",
            paymentMethod: "PayPal",
        },
        {
            invoice: "INV006",
            paymentStatus: "Pending",
            totalAmount: "$200.00",
            paymentMethod: "Bank Transfer",
        },
        {
            invoice: "INV007",
            paymentStatus: "Unpaid",
            totalAmount: "$300.00",
            paymentMethod: "Credit Card",
        },
    ];

    const handleAddResource = (newResource: ResourceType) => {
        setResources([
            ...resources,
            { ...newResource, id: crypto.randomUUID() },
        ]);
        setIsModalOpen(false);
    };

    const handleEditResource = (resource: ResourceType) => {
        setEditingResource(resource);
        setIsModalOpen(true);
    };

    const handleDeleteResource = (id: string) => {
        setResources(resources.filter((resource) => resource.id !== id));
    };

    return (
        <div className="p-5 grid gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
            {invoices.map((resource) => (
                <div
                    key={resource.paymentStatus}
                    className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
                >
                    <h3 className="text-lg font-bold mb-2">
                        {resource.paymentMethod}
                    </h3>
                    <p className="text-gray-600 mb-2">
                        {resource.paymentMethod}
                    </p>
                    <span className="text-sm text-blue-500">
                        {resource.totalAmount}
                    </span>
                    <div className="mt-4 flex justify-end gap-2">
                        <Button
                            className="hover:cursor-pointer"
                            variant="secondary"
                            onClick={() => handleEditResource(resource)}
                        >
                            Edit
                        </Button>
                        <Button
                            className="hover:cursor-pointer"
                            variant="destructive"
                            onClick={() => handleDeleteResource(resource.id)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            ))}
            <ResourceFormModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSubmit={handleAddResource}
                defaultValues={editingResource || undefined}
            />
        </div>
    );
}
