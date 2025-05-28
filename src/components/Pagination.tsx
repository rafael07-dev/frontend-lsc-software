
interface PropsPagination {
    pages: number | undefined;
    currentPage: number;
    goToPage: (e: number) => void
}

const Pagination = ({pages, currentPage, goToPage} : PropsPagination) => {

    if (!pages) {
        return null;
    }

    const buttons = []

    for (let i = 0; i < pages; i++) {
        buttons.push(i)
    }

    return (
        <div className="mt-4 flex justify-center">
            {
                buttons.map(b => (
                    <button
                        onClick={() => goToPage(b)}
                        key={b}
                        className={`px-3 py-1 rounded-full border text-sm font-medium mx-1 
                        ${b === currentPage ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
                        focus:outline-none focus:ring-2 focus:ring-blue-300`}
                    >
                        {b + 1}
                    </button>
                ))
            }
        </div>
    )
}

export default Pagination;