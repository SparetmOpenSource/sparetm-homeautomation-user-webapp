import React, { useEffect, useState } from 'react';
import './Pagination.css';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    darkTheme: any;
    resetTriggerForSection: any;
    resetTriggerForPlaylistSongs: any;
}

const Pagination: React.FC<PaginationProps> = ({
    totalItems,
    itemsPerPage,
    onPageChange,
    darkTheme,
    resetTriggerForSection,
    resetTriggerForPlaylistSongs,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const [color, setColor] = useState<any>(light_colors);

    useEffect(() => {
        setCurrentPage(1);
    }, [resetTriggerForSection, resetTriggerForPlaylistSongs]);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        onPageChange(page);
    };

    const renderPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 9; // Limit to 9 pages
        let startPage = 1;
        let endPage = totalPages;

        if (totalPages > maxPagesToShow) {
            // Calculate the range of pages to show
            const pagesToShowOnEachSide = 2; // Show 2 pages on each side of the current page
            startPage = Math.max(currentPage - pagesToShowOnEachSide, 1);
            endPage = Math.min(currentPage + pagesToShowOnEachSide, totalPages);

            // Adjust startPage and endPage if they are at the extremes
            if (startPage === 1) {
                endPage = maxPagesToShow;
            } else if (endPage === totalPages) {
                startPage = totalPages - maxPagesToShow + 1;
            }
        }

        // Add the first page and ellipsis if needed
        if (startPage > 1) {
            pages.push(
                <li
                    key={1}
                    className={`spotify-pagination-page-item ${
                        currentPage === 1 ? 'active' : ''
                    }`}
                    onClick={() => handlePageChange(1)}
                >
                    <span
                        className="spotify-pagination-page-link"
                        style={{
                            color: color?.text,
                            border: `1px solid ${color?.success}`,
                        }}
                    >
                        1
                    </span>
                </li>,
            );
            if (startPage > 2) {
                pages.push(
                    <li
                        key="ellipsis-start"
                        className="spotify-pagination-page-item disabled"
                    >
                        <span
                            className="spotify-pagination-page-link"
                            style={{
                                color: color?.text,
                            }}
                        >
                            ...
                        </span>
                    </li>,
                );
            }
        }

        // Add the pages in the current range
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <li
                    key={i}
                    className={`spotify-pagination-page-item ${
                        currentPage === i ? 'active' : ''
                    }`}
                    onClick={() => handlePageChange(i)}
                >
                    <span
                        className="spotify-pagination-page-link"
                        style={{
                            color: color?.text,
                            border: `1px solid ${color?.success}`,
                        }}
                    >
                        {i}
                    </span>
                </li>,
            );
        }

        // Add ellipsis and the last page if needed
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <li
                        key="ellipsis-end"
                        className="spotify-pagination-page-item disabled"
                    >
                        <span
                            className="spotify-pagination-page-link"
                            style={{
                                color: color?.text,
                            }}
                        >
                            ...
                        </span>
                    </li>,
                );
            }
            pages.push(
                <li
                    key={totalPages}
                    className={`spotify-pagination-page-item ${
                        currentPage === totalPages ? 'active' : ''
                    }`}
                    onClick={() => handlePageChange(totalPages)}
                >
                    <span
                        className="spotify-pagination-page-link"
                        style={{
                            color: color?.text,
                            border: `1px solid ${color?.success}`,
                        }}
                    >
                        {totalPages}
                    </span>
                </li>,
            );
        }

        return pages;
    };

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <nav>
            <ul className="spotify-pagination">
                <li
                    className={`spotify-pagination-page-item ${
                        currentPage === 1 ? 'disabled' : ''
                    }`}
                >
                    <span
                        className="spotify-pagination-page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        style={{
                            color: color?.text,
                        }}
                    >
                        Previous
                    </span>
                </li>
                {renderPageNumbers()}
                <li
                    className={`spotify-pagination-page-item ${
                        currentPage === totalPages ? 'disabled' : ''
                    }`}
                >
                    <span
                        className="spotify-pagination-page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        style={{
                            color: color?.text,
                        }}
                    >
                        Next
                    </span>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
