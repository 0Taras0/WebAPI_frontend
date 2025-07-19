import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];

        if (currentPage > 2) {
            pages.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className="w-10 h-10 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-base font-medium"
                >
                    1
                </button>
            );

            if (currentPage > 3) {
                pages.push(<span key="start-ellipsis" className="px-3 text-lg">...</span>);
            }
        }

        [-1, 0, 1].forEach(offset => {
            const page = currentPage + offset;
            if (page >= 1 && page <= totalPages) {
                pages.push(
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-base font-medium ${
                            page === currentPage ? 'bg-gray-200 dark:bg-gray-700 font-semibold' : ''
                        }`}
                    >
                        {page}
                    </button>
                );
            }
        });

        if (currentPage < totalPages - 1) {
            if (currentPage < totalPages - 2) {
                pages.push(<span key="end-ellipsis" className="px-3 text-lg">...</span>);
            }

            pages.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className="w-10 h-10 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-base font-medium"
                >
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="flex justify-center mt-8 gap-3 flex-wrap text-base text-gray-700 dark:text-gray-300">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="w-10 h-10 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition text-lg"
            >
                ←
            </button>

            {renderPageNumbers()}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="w-10 h-10 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition text-lg"
            >
                →
            </button>
        </div>
    );
};

export default Pagination;