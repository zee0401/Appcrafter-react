import { Button } from "@/components/ui/button";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="my-6 font-bold text-xl">Resource List</div>

            <div className="flex justify-between md:w-196 xl:w-196 w-full p-4">
                <Button className="mr-2 bg-sky-300 text-gray-800 hover:bg-sky-500 hover:cursor-pointer">
                    Add Resource
                </Button>
            </div>
        </div>
    );
};

export default Home;
