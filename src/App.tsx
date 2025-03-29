import Home from "./pages/Home";

function App() {
    return (
        <>
            <div className="display-flex flex-col items-center justify-center  bg-black text-white ">
                <div className="font-bold text-center text-5xl text-sky-500 pt-10">
                    Appcrafter
                </div>
                <Home />
            </div>
        </>
    );
}

export default App;
