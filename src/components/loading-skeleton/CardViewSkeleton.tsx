import { Skeleton } from "@/components/ui/skeleton";

export default function CardViewSkeleton() {
    return (
        <div className="p-5 grid gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
                <div
                    key={index}
                    className="p-4 bg-gray-800 shadow-md rounded-lg border border-gray-600 transition-all duration-200 hover:shadow-lg"
                >
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />{" "}
                    <Skeleton className="h-4 w-5/6 mb-2" />{" "}
                    <Skeleton className="h-4 w-1/3 mb-4" />
                    <div className="mt-4 flex justify-end gap-2">
                        <Skeleton className="h-10 w-20 rounded-md" />{" "}
                        <Skeleton className="h-10 w-20 rounded-md" />{" "}
                    </div>
                </div>
            ))}
        </div>
    );
}
