import Home from "./pages/Home";
import { Toaster } from "sonner";

function App() {
    return (
        <>
            <div className="display-flex flex-col items-center justify-center  bg-black text-white ">
                <div className="font-bold text-center text-5xl text-sky-500 pt-10">
                    Appcrafter
                </div>
                <Home />
                <Toaster position="bottom-right" />
            </div>
        </>
    );
}

export default App;
