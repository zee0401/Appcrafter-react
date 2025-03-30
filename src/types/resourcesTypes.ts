export type ResourceCategoryType = "Article" | "Video" | "Tutorial";

export interface ResourceType {
    _id?: string;
    title: string;
    description: string;
    type: ResourceCategoryType;
}

// export interface ResourceType extends ResourceFormValues {
//     id: string;
// }
