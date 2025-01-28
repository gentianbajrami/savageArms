import React from 'react';
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
} from 'react-icons/hi';
import {
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import styled from 'styled-components';
const PageBtnContainer = ({
  currentPage,
  numOfPages,
}) => {
  const pages = Array.from(
    { length: numOfPages },
    (item, index) => index + 1
  );

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = page => {
    const searchParams = new URLSearchParams(
      search
    );
    searchParams.set('page', page);
    navigate(
      `${pathname}?${searchParams.toString()}`
    );
  };
  const addPageButton = ({
    pageNumber,
    activeClass,
  }) => {
    return (
      <button
        key={pageNumber}
        className={`btn page-btn ${
          activeClass && 'active'
        }`}
        onClick={() =>
          handlePageChange(pageNumber)
        }
      >
        {pageNumber}
      </button>
    );
  };
  const renderPageButtons = () => {
    const pageButtons = [];

    // first page
    pageButtons.push(
      addPageButton({
        pageNumber: 1,
        activeClass: currentPage === 1,
      })
    );

    if (currentPage > 3) {
      console.log(currentPage);
      console.log(currentPage > 3);
      pageButtons.push(
        <span
          key={'dots-1'}
          className="page-btn dots"
        >
          ...
        </span>
      );
    }

    // one before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage - 1,
          activeClass: false,
        })
      );
    }

    // current page
    if (
      currentPage !== 1 &&
      currentPage !== numOfPages
    ) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage,
          activeClass: true,
        })
      );
    }

    // one after current page
    if (
      currentPage !== numOfPages &&
      currentPage !== numOfPages - 1
    ) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage + 1,
          activeClass: false,
        })
      );
    }

    // dots after
    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span
          key={'dots+1'}
          className="page-btn dots"
        >
          ...
        </span>
      );
    }

    // last page
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );
    return pageButtons;
  };
  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1)
            prevPage = currentPage;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {renderPageButtons()}
      </div>
      <button
        className="btn next-btn"
        onClick={() => {
          let prevPage = currentPage + 1;
          if (prevPage > numOfPages)
            prevPage = currentPage;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 6rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-wrap: wrap;
  gap: 1rem;
  .btn-container {
    background: var(--background-secondary-color);
    border-radius: var(--border-radius);
    display: flex;
  }
  .page-btn {
    background: transparent;
    border-color: transparent;
    width: 50px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--primary-500);
    border-radius: var(--border-radius);
    cursor: pointer;
  }
  .active {
    background: var(--primary-500);
    color: var(--white);
  }
  .prev-btn,
  .next-btn {
    background: var(--background-secondary-color);
    border-color: transparent;
    border-radius: var(--border-radius);

    width: 100px;
    height: 40px;
    color: var(--primary-500);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  .prev-btn:hover,
  .next-btn:hover {
    background: var(--primary-500);
    color: var(--white);
    transition: var(--transition);
  }
  .dots {
    display: grid;
    place-items: center;
    cursor: text;
  }
`;
export default PageBtnContainer;
