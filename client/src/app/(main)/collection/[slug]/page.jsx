"use client";

import React, { useState , useEffect } from 'react';
import Breadcrumb from '@/components/common/Breadcrumb';
import FilterSection, { ActiveFilters } from '@/components/common/FilterSection';
import ProductGrid from '@/components/ProductGrid';
import { useFilters } from '@/hooks/useFilters';
import ReadMore from '@/components/common/ReadMore';
import Button from '@/components/common/Button';
import FilterIcon from '@/components/icons/FilterIcon';
import FilterModal from '@/components/common/FilterModal';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollection } from '../../../../store/slice/collectionSlice';

const ManPage = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    
    const dispatch = useDispatch();
    const { data , filter, loading, error } = useSelector((state) => state.collection);
    const [sortOption, setSortOption] = useState('sortBy');
    const {
        filters,
        activeFilters,
        toggleFilter,
        clearAllFilters
    } = useFilters(filter);
  

    const handleClearAll = () => {
        clearAllFilters();
        setIsOpenModal(false)
    }

    const [slug, setSlug] = useState('');
    
    const params = useParams();
    const currentSlug = params?.slug;

   
    useEffect(() => {
        if (currentSlug !== slug) {
            setSlug(currentSlug);
        }
    }, [currentSlug]);

   
    useEffect(() => {
        const fetchData = async () => {
            if (slug) {
              
                const params = new URLSearchParams();
                

                Object.entries(activeFilters).forEach(([filterType, values]) => {
                   
                    const paramKey = filterType.toLowerCase().replace(/\s+/g, '-');
                    
                    
                    params.append(paramKey, values.join(','));
                });
                
                // Add sort option
                if (sortOption && sortOption !== 'featured') {
                    params.append('sort', sortOption);
                }
                
                console.log('Request params:', params.toString());
                
                // Dispatch with properly formatted filters
                dispatch(fetchCollection({
                    slug,
                    filters: params.toString()
                }));
            }
        };
    
        fetchData();
    }, [slug, activeFilters, sortOption, dispatch]);


    
    if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

    return (
        <div className='bg-[#F3F0ED]'>
            <Breadcrumb />
            <div className="w-full max-w-[1500px] mx-auto md:px-12 px-2">
                <div className="flex flex-col justify-between md:flex-row lg:gap-14 gap-6 px-2">
                    <div className="w-full max-w-[220px] hidden md:block">
                        <ActiveFilters
                            activeFilters={activeFilters}
                            toggleFilter={toggleFilter}
                            clearAllFilters={clearAllFilters}
                        />
                        <FilterSection
                            filters={filters}
                            activeFilters={activeFilters}
                            toggleFilter={toggleFilter}
                        />
                    </div>

                    <div className="w-full">
                        <div className="md:flex hidden items-center justify-between mb-4 pb-4 border-b border-primary">
                            <h1 className="text-sm text-primary">
                                {slug}  |  {
                                    data?.length === data?.length ?
                                        <span>
                                            {data?.length} Results
                                        </span>
                                        :
                                        <span>
                                            {data?.length} of {data?.length} Results
                                        </span>
                                }
                            </h1>

                            <div className="flex items-center">
                                <div className="relative">
                                    <select
                                        id="sort"
                                        value={sortOption}
                                        onChange={(e) => setSortOption(e.target.value)}
                                        className="appearance-none truncate  font-futura border-0 w-full max-w-20 rounded-md text-sm px-2 focus:outline-none"
                                    >
                                        <option value="sortBy">Sort By</option>
                                        <option value="featured">Featured</option>
                                        <option value="best-selling">Best selling</option>
                                        <option value="name-asc">Alphabetically, A-Z</option>
                                        <option value="name-desc">Alphabetically, Z-A</option>
                                        <option value="price-asc">Price, low to high</option>
                                        <option value="price-desc">Price, high to low</option>
                                        <option value="date-asc"> Date, old to new</option>
                                        <option value="date-desc">Date, new to old</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='md:hidden flex flex-col mb-4'>
                            <h1 className="text-sm text-primary">
                                {slug}  |  {
                                    data?.length === data?.length ?
                                        <span>
                                            {data?.length} Results
                                        </span>
                                        :
                                        <span>
                                            {data?.length} of {data?.length} Results
                                        </span>
                                }
                            </h1>
                            <div className='flex gap-3 mt-4'>
                                <Button onClick={() => setIsOpenModal(true)} className="w-1/2 text-[13px] !rounded flex justify-center items-center gap-1 font-medium"><FilterIcon /> Filter</Button>
                                {/* Filter Modal for mobile screen */}
                                <FilterModal
                                    handleClearAll={handleClearAll}
                                    isOpen={isOpenModal}
                                    onClose={() => setIsOpenModal(false)}
                                    activeFilters={activeFilters}
                                    toggleFilter={toggleFilter}
                                >
                                    <FilterSection
                                        filters={filters}
                                        activeFilters={activeFilters}
                                        toggleFilter={toggleFilter}
                                    />
                                </FilterModal>
                                {/* Sort by Button for mobile screen */}
                                <Button className="w-1/2 text-[13px] !rounded">
                                    <div className="flex items-center justify-center">
                                        <div className="relative">
                                            <select
                                                id="sort"
                                                value={sortOption}
                                                onChange={(e) => setSortOption(e.target.value)}
                                                className="appearance-none font-futura border-0 w-full max-w-20 rounded-md text-sm px-2 focus:outline-none"
                                            >
                                                <option value="date-desc">Sort By</option>
                                                <option value="featured">Featured</option>
                                                <option value="bestseller">Best selling</option>
                                                <option value="alphabetical-asc"> Alphabetically, A-Z</option>
                                                <option value="alphabetical-desc"> Alphabetically, Z-A</option>
                                                <option value="price"> Price, low to high</option>
                                                <option value="price-desc">  Price, high to low</option>
                                                <option value="date-asc"> Date, old to new</option>
                                                <option value="date-desc">Date, new to old</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center px-2 text-primary">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Button>
                            </div>
                        </div>
                        <ProductGrid products={data} />
                    </div>
                </div>
            </div>
            <ReadMore />
        </div>
    );
};

export default ManPage;