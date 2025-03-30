import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton() {
    return (
        <div className="w-full md:w-196 xl:w-196">
            <div className="flex items-center justify-between border-b pb-3">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-20" />
            </div>

            <div className="space-y-3 mt-4">
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between border-b pb-3"
                    >
                        <Skeleton className="h-5 w-1/3" />
                        <Skeleton className="h-5 w-1/4" />
                        <Skeleton className="h-5 w-1/6" />
                    </div>
                ))}
            </div>
        </div>
    );
}
