import CloseIcon from "../icons/CloseIcon";
import ModalCloseIcon from "../icons/ModalCloseIcon";
import Button from "./Button";

export default function FilterModal({ isOpen, onClose, children, handleClearAll, activeFilters, toggleFilter }) {
    if (!isOpen) return null;

    return (
        <div className="fixed bg-white inset-0 z-[70] flex bg-opacity-50 py-4 pl-4">
            <div className="rounded-lg w-full relative">
                <div className="flex justify-between">
                    <h2 className="text-xl text-primary font-seasons my-4">Filters</h2>
                    <button
                        onClick={onClose}
                        className="pr-8"
                    >
                        <ModalCloseIcon />
                    </button>

                </div>
                <div className="h-96 overflow-auto pr-7">
                    {
                        Object.keys(activeFilters).length !== 0 &&
                        <div className="flex flex-wrap gap-3 mt-3">
                            {Object.entries(activeFilters).map(([group, values]) =>
                                values.map((value) => (
                                    <Button
                                        key={`${group}-${value}`}
                                        onClick={() => toggleFilter(group, value)}
                                        className="relative flex text-[13px] font-light !px-3 mb-4 bg-[#F3F0ED] !rounded text-primary border border-[#DADBDB] hover:border-primary/50"
                                    >
                                        <span className="mr-1 tracking-[1px] capitalize !font-light">{group?.charAt(0)?.toUpperCase() + group?.slice(1)?.toLowerCase()}: {value}</span>
                                        <span className="bg-primary rounded-full p-[1px] absolute top-[-5px] right-[-4px] text-white"><CloseIcon /></span>
                                    </Button>
                                ))
                            )}
                        </div>
                    }
                    {children}
                </div>
                <div className="grid grid-cols-2 gap-2 mt-10 p-4 ps-0">
                    <Button onClick={handleClearAll} className={"w-full uppercase text-sm py-3 border-primary/30 bg-[#F3F0ED] text-primary tracking-[1px] !rounded"}>Clear All</Button>
                    <Button onClick={onClose} className={"w-full uppercase bg-primary border-primary py-3 text-secondry tracking-[1px] !rounded text-sm"}>Show Results</Button>
                </div>
            </div>
        </div>
    );
}