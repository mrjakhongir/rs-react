import './pagination.css';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const getPages = (current: number, total: number) => {
  const delta = 2;
  const range: (number | "...")[] = [];

  for (
    let i = Math.max(1, current - delta);
    i <= Math.min(total, current + delta);
    i++
  ) {
    range.push(i);
  }

  if (range[0] !== 1) {
    range.unshift("...");
    range.unshift(1);
  }

  if (range[range.length - 1] !== total) {
    range.push("...");
    range.push(total);
  }

  return range;
};

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = getPages(currentPage, totalPages);

  return (
    <section className="pagination">
      <button
        className="pagination__btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={i} className="pagination__ellipsis">
            ...
          </span>
        ) : (
          <button
            key={i}
            className={`pagination__number ${
              currentPage === p ? "pagination__number--active" : ""
            }`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ),
      )}

      <button
        className="pagination__btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </section>
  );
};

export default Pagination;
