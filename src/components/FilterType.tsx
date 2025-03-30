import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

type FilterTypeProps = {
    setSelectedType: (type: string) => void;
};

function FilterType({ setSelectedType }: FilterTypeProps) {
    const handleClearFilter = () => {
        setSelectedType("");
    };

    return (
        <div className="flex items-center gap-2">
            <Select onValueChange={setSelectedType}>
                <SelectTrigger className="w-[140px]">
                    <div>
                        <Filter />
                    </div>
                    <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Types</SelectLabel>
                        <SelectItem value="Article">Article</SelectItem>
                        <SelectItem value="Video">Video</SelectItem>
                        <SelectItem value="Tutorial">Tutorial</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <button
                onClick={handleClearFilter}
                className="text-sm text-gray-200 hover:text-gray-500"
            >
                Clear Filter
            </button>
        </div>
    );
}

export default FilterType;
