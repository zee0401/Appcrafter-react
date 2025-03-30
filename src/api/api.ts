import api from "./axios";
import { ResourceType } from "@/types/resourcesType";

export const getAllResources = async (): Promise<ResourceType[]> => {
    const response = await api.get("/all-resources");
    return response.data.resources;
};

export const getResourceById = async (id: string) => {
    const response = await api.get(`/resources/${id}`);
    return response.data.resources;
};

export const createResource = async (
    resource: ResourceType
): Promise<ResourceType> => {
    const response = await api.post("/add-resources", resource);
    return response?.data?.resources;
};

export const updateResource = async (
    id: string,
    resource: Partial<ResourceType>
): Promise<ResourceType> => {
    const response = await api.put(`/update-resources/${id}`, resource);
    return response.data;
};

export const deleteResource = async (id: string): Promise<void> => {
    const response = await api.delete(`/delete-resources/${id}`);
    return response.data;
};
