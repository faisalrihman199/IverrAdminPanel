import { useState, useMemo, useEffect } from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { useAPP } from '../../contexts/Appcontext';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { BeatLoader } from 'react-spinners';

const DataTable = ({ headers = [], data = [] }) => {
    // Table states
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [isLoadingImages, setIsLoadingImages] = useState(false);
    const { theme } = useAPP();

    // Theme configurations
    const bgColor = theme === 'dark' ? 'main-dark' : 'bg-white';
    const headerColor = theme === 'dark' ? 'dark-bg' : 'bg-gray-50';
    const hoverRow = theme === 'dark' ? 'hover:bg-gray-900' : 'hover:bg-gray-50';

    // Filtering logic
    const filteredData = useMemo(() => {
        const dynamicKeys = headers.map(header => header.key);
        return data.filter(item => {
            const lowerSearchTerm = searchTerm.toLowerCase();
            const idMatch = item.id.toString().toLowerCase().includes(lowerSearchTerm);
            const statusMatch = item.status.toLowerCase().includes(lowerSearchTerm);
            const dynamicMatches = dynamicKeys.some(key => {
                const value = item[key]?.toString().toLowerCase() || '';
                return value.includes(lowerSearchTerm);
            });
            return idMatch || statusMatch || dynamicMatches;
        });
    }, [data, searchTerm, headers]);

    // Sorting logic
    const sortedData = useMemo(() => {
        const sorted = [...filteredData];
        if (!sortConfig.key) return sorted;

        sorted.sort((a, b) => {
            let valA = a[sortConfig.key];
            let valB = b[sortConfig.key];

            if (typeof valA === 'number') {
                return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
            }

            if (typeof valA === 'string') {
                valA = valA.toLowerCase();
                valB = valB.toLowerCase();
            }

            if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [filteredData, sortConfig]);

    // Pagination
    const totalPages = Math.ceil(sortedData.length / entriesPerPage);
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = sortedData.slice(indexOfFirstEntry, indexOfLastEntry);

    // Image loading effect
    useEffect(() => {
        let isMounted = true;
        const imageHeaders = headers.filter(header => header.isImage);
        
        if (imageHeaders.length === 0) {
            setIsLoadingImages(false);
            return;
        }

        setIsLoadingImages(true);
        const imagePromises = [];

        currentEntries.forEach(entry => {
            imageHeaders.forEach(header => {
                const src = entry[header.key];
                if (src) {
                    const img = new Image();
                    const promise = new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    });
                    img.src = src;
                    imagePromises.push(promise);
                }
            });
        });

        if (imagePromises.length === 0) {
            if (isMounted) setIsLoadingImages(false);
            return;
        }

        Promise.all(imagePromises).finally(() => {
            if (isMounted) setIsLoadingImages(false);
        });

        return () => {
            isMounted = false;
        };
    }, [currentEntries, headers]);

    // Handlers
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const goToPage = (pageNumber) => setCurrentPage(pageNumber);
    const previousPage = () => setCurrentPage(Math.max(1, currentPage - 1));
    const nextPage = () => setCurrentPage(Math.min(totalPages, currentPage + 1));

    const visiblePages = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);
    for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
    }

    return (
        <>
        
        <div className={`p-6 ${bgColor} rounded-lg shadow-sm relative`} style={{ maxWidth: '89vw', width: '100%', overflowX: 'auto' }}>
            {/* Loading overlay */}
            {isLoadingImages && (
                <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
                    <BeatLoader color="#3c74d5" />
                </div>
            )}

            {/* Table Controls */}
            <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
                <div className="flex items-center">
                    <span className="mr-2 text-sm">Show</span>
                    <select
                        value={entriesPerPage}
                        onChange={(e) => {
                            setEntriesPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className={`${headerColor} ${theme !== 'dark' && 'border'} rounded px-2 py-1 text-sm`}
                    >
                        {[5,10, 25, 50, 100].map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    <span className="ml-2 text-sm">entries</span>
                </div>

                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className={`${headerColor} ${theme !== 'dark' && 'border'} rounded px-3 py-1 w-full sm:w-64 text-sm`}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg" style={{ border: theme === 'dark' ? '1px solid gray' : '' }}>
                <table className="min-w-full text-sm text-gray-600">
                    <thead className={`${headerColor} py-3 text-gray-700 uppercase text-xs`}>
                        <tr>
                            <th
                                onClick={() => requestSort('id')}
                                className="px-6 py-3 cursor-pointer text-left"
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Sr No.</span>
                                    {sortConfig.key === 'id' && (
                                        <span>{sortConfig.direction === 'asc' ? <BsArrowUp /> : <BsArrowDown />}</span>
                                    )}
                                </div>
                            </th>

                            {headers.map(header => (
                                <th
                                    key={header.key}
                                    onClick={() => header.sortable && requestSort(header.key)}
                                    className={`px-6 py-3 ${header.sortable ? 'cursor-pointer' : ''} text-left`}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>{header.label}</span>
                                        {header.sortable && sortConfig.key === header.key && (
                                            <span>{sortConfig.direction === 'asc' ? <BsArrowUp /> : <BsArrowDown />}</span>
                                        )}
                                    </div>
                                </th>
                            ))}

                            <th
                                onClick={() => requestSort('status')}
                                className="px-6 py-3 cursor-pointer text-left"
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Status</span>
                                    {sortConfig.key === 'status' && (
                                        <span>{sortConfig.direction === 'asc' ? <BsArrowUp /> : <BsArrowDown />}</span>
                                    )}
                                </div>
                            </th>

                            <th className="px-6 py-3 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentEntries.map((item) => (
                            <tr key={item.id} className={`border-b last:border-b-0 ${hoverRow}`}>
                                <td className="px-6 py-4">{item.id}</td>

                                {headers.map(header => (
                                    <td key={header.key} className="px-6 py-4">
                                        {header.isImage ? (
                                            <img
                                                src={item[header.key]}
                                                alt={header.label}
                                                className="h-12 w-20 object-cover rounded"
                                            />
                                        ) : (
                                            item[header.key]
                                        )}
                                    </td>
                                ))}

                                <td className="px-6 py-4">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'publish'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <FaRegEdit className="w-4 h-4" />
                                        </button>
                                        <button className="text-red-600 hover:text-red-800">
                                            <FaTrashAlt className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {currentEntries.length === 0 && (
                            <tr>
                                <td colSpan={headers.length + 3} className="text-center py-4 text-gray-500">
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-4">
                <div className="text-sm text-gray-700 mb-2 sm:mb-0">
                    Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, sortedData.length)} of {sortedData.length} entries
                </div>
                <div className="flex gap-1 items-center">
                    <button
                        onClick={() => goToPage(1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 mx-2 border rounded disabled:opacity-50"
                        title="First Page"
                    >
                        <FiChevronsLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={previousPage}
                        disabled={currentPage === 1}
                        className="px-3 py-2  border rounded disabled:opacity-50"
                        title="Previous Page"
                    >
                        <MdOutlineKeyboardArrowLeft />
                    </button>
                    {visiblePages.map((page) => (
                        <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`px-3 py-1 border rounded ${currentPage === page ? 'bg-blue-500 text-white' : ''}`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="px-3 py-2 border rounded disabled:opacity-50"
                        title="Next Page"
                    >
                        <MdOutlineKeyboardArrowRight />
                    </button>
                    <button
                        onClick={() => goToPage(totalPages)}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="px-3 py-2 mx-2  border rounded disabled:opacity-50"
                        title="Last Page"
                    >
                        <FiChevronsRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};

export default DataTable;