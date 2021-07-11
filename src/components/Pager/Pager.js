import React from 'react';
import './Pager.css';

export default function Pager({pages, currentPage, onPageSelected}) {

    const handleClick = (page) => {

        if(page !== currentPage) {
            onPageSelected(page);
        }
    };

    const PAGE_PAGE = 50;
    const from = currentPage > PAGE_PAGE ? currentPage - PAGE_PAGE : 1;
    const to = from + PAGE_PAGE + 20;
    const last = pages[pages.length - 1];

    return(
        <div className="pagesContainer">
           <div key={0} className={(1 !== currentPage ? "page" : "currentPage")} onClick={() => handleClick(1)}>{1}</div>
           {currentPage > PAGE_PAGE && 
            <>
                ...
            </>} 
           {pages.slice(from,to).filter(p => p !== last).map(page => 
            <div key={page} className={(page !== currentPage ? "page" : "currentPage")} onClick={() => handleClick(page)}>{page}</div>
            )}
            {pages.length > PAGE_PAGE && currentPage + PAGE_PAGE < last && "..."}
            <div key={last} className={(last !== currentPage ? "page" : "currentPage")} onClick={() => handleClick(last)}>{last}</div>
        </div>
    )
}