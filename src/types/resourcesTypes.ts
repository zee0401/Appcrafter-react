export type ResourceCategoryType = "Article" | "Video" | "Tutorial";

export interface ResourceFormValues {
    title: string;
    description: string;
    type: ResourceCategoryType;
}

export interface ResourceType extends ResourceFormValues {
    id: string;
}
