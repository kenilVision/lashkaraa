'use client';

import { useState, useEffect, useMemo } from 'react';

/**
 * Custom hook to calculate masonry layout
 */
export default function useMasonryLayout(images) {
    const [columns, setColumns] = useState(4);

    // Update columns based on screen size
    useEffect(() => {
        const updateColumns = () => {
            const width = window.innerWidth;
            if (width >= 1280) {
                setColumns(6); // Desktop
            } else if (width >= 1024) {
                setColumns(5); // Large
            } else if (width >= 768) {
                setColumns(4); // Medium
            } else {
                setColumns(2); // Small
            }
        };

        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    // Distribute images into columns for masonry layout
    const masonryColumns = useMemo(() => {
        const result = Array.from({ length: columns }, () => []);

        // Distribute images by their aspect ratio to optimize layout
        const sortedImages = [...images].sort((a, b) => {
            // Sort by aspect ratio (height/width) to optimize column heights
            const aRatio = a.height / a.width;
            const bRatio = b.height / b.width;
            return aRatio - bRatio;
        });

        // Calculate column heights (start with 0)
        const columnHeights = Array(columns).fill(0);

        // Distribute images to the shortest column
        sortedImages.forEach(image => {
            // Find the column with the smallest height
            const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));

            // Add image to the shortest column
            result[shortestColumnIndex].push(image);

            // Update column height (add image height)
            const aspectRatio = image.width / image.height;
            const relativeHeight = 1 / aspectRatio;
            columnHeights[shortestColumnIndex] += relativeHeight;
        });

        return result;
    }, [images, columns]);

    return { columns, masonryColumns };
}