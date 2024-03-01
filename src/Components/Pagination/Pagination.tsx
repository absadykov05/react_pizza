import *as React from 'react';
import ReactPaginate from 'react-paginate';
import {useDispatch, useSelector} from "react-redux";
import {homeSelector, setPagination} from "../../Redux/homeReducer";
/*import style from './Pagination.module.scss';*/


const Pagination = () => {
    const {pagination} = useSelector(homeSelector);
    const dispatch = useDispatch();
    return (
        <div>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={(event) => {
                    dispatch(setPagination(event));
                }}
                pageRangeDisplayed={4}
                pageCount={3}
                previousLabel="<"
                renderOnZeroPageCount={undefined}
            />
        </div>
    );
};

export default Pagination;

{/*className={style.root}*/
}
