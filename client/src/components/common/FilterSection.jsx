import React, { Fragment, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Button from './Button';
import { getColorClass } from '@/constant/constant';
import CloseIcon from '../icons/CloseIcon';

// interface FilterSectionProps {
//     filters: FilterGroup[];
//     activeFilters: Record<string, string[]>;
//     toggleFilter: (group: string, value: string) => void;
// }
export const ActiveFilters = ({ activeFilters, toggleFilter, clearAllFilters }) => {
    return (
        <div className='flex flex-col'>
            {Object.keys(activeFilters)?.length !== 0 && <Button onClick={clearAllFilters} className="border-0 text-left !p-0 underline text-[13px] text-primary mb-4">Remove all</Button>}
            <div className="flex flex-wrap gap-2 mb-3">
                {Object.entries(activeFilters).map(([group, values]) =>
                    values.map((value) => (
                        <Button
                            key={`${group}-${value}`}
                            onClick={() => toggleFilter(group, value)}
                            className="relative flex text-[13px] font-light !px-3 mb-4 !rounded text-primary border border-[#DADBDB] hover:border-primary/50"
                        >
                            <span className="mr-1 tracking-[1px] capitalize !font-light">{group?.charAt(0)?.toUpperCase() + group?.slice(1)?.toLowerCase()}: {value}</span>
                            <span className="bg-primary rounded-full p-[1px] absolute top-[-5px] right-[-4px] text-white"><CloseIcon /></span>
                        </Button>
                    ))
                )}
            </div>
        </div>
    );
};

const FilterSection = ({
    filters,
    activeFilters,
    toggleFilter
}) => {
    const [expandedSections, setExpandedSections] = useState(
        filters.reduce((acc, filter) => ({ ...acc, [filter.name]: true }), {})
    );

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="">
            {filters.map((filter) => (
                <div key={filter.name} className="border-b border-[#DADBDB] pb-4">
                    <Button
                        className="w-full flex items-center border-0 hover:underline hover:text-primary text-sm !px-0 py-4 justify-between text-left font-bold text-icon focus:outline-none"
                        onClick={() => toggleSection(filter.name)}
                        aria-expanded={expandedSections[filter.name]}
                    >
                        <span className="uppercase tracking-wide text-sm">{filter.name}</span>
                        {expandedSections[filter.name] ?
                            <ChevronUp size={16} className="text-icon" /> :
                            <ChevronDown size={16} className="text-icon" />
                        }
                    </Button>

                    <div
                        className={`mt-2 md:block hidden space-y-2 transition-all duration-300 overflow-auto ${expandedSections[filter.name] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        {filter.options.map((option) => (
                            <label
                                key={option.value}
                                className="flex items-center cursor-pointer group"
                            >
                                {
                                    filter?.name === 'COLOR' ?
                                        <span className={`${getColorClass(option.slug)} size-3`} onClick={() => toggleFilter(filter.name, option.slug)}></span>
                                        :
                                        <Fragment>
                                            <input
                                                type="checkbox"
                                                className="form-checkbox cursor-pointer h-3 w-3 border-gray-300 rounded"
                                                checked={activeFilters[filter.name]?.includes(option.slug) || false}
                                                onChange={() => toggleFilter(filter.name, option.slug)}
                                            />
                                        </Fragment>
                                }
                                <span className="ml-2 text-[13px] text-primary group-hover:text-gray-900 transition-colors">
                                    {option.value}
                                    {option.count > 0 && (
                                        <span className="text-primary ml-1">({option.count})</span>
                                    )}
                                </span>
                            </label>
                        ))}
                    </div>
                    <div
                        className={`mt-2 space-y-2 grid grid-cols-2 md:hidden transition-all duration-300 overflow-auto ${expandedSections[filter.name] ? ' opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        {filter.options.map((option) => (
                            <label
                                key={option.value}
                                className="flex items-center cursor-pointer group"
                            >
                                {
                                    filter?.name === 'COLOR' ?
                                        <span className={`${getColorClass(option.value)} size-3`} onClick={() => toggleFilter(filter.name, option.slug)}></span>
                                        :
                                        <Fragment>
                                            <input
                                                type="checkbox"
                                                className="form-checkbox cursor-pointer h-3 w-3 border-gray-300 rounded"
                                                checked={activeFilters[filter.name]?.includes(option.value) || false}
                                                onChange={() => toggleFilter(filter.name, option.slug)}
                                            />
                                        </Fragment>
                                }
                                <span className="ml-2 text-[13px] text-primary group-hover:text-gray-900 transition-colors">
                                    {option.label}
                                    {option.count > 0 && (
                                        <span className="text-primary ml-1">({option.count})</span>
                                    )}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FilterSection;