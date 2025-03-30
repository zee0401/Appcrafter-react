export type ResourceCategoryType = "Article" | "Video" | "Tutorial";

export interface ResourcesType {
    _id?: string;
    title: string;
    description: string;
    type: ResourceCategoryType;
}
