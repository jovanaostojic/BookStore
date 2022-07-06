const Pagination = ({ perPage, total, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <section>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link page">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Pagination;
