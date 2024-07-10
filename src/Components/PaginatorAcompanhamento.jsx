import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Detalhes from './Detalhes';

export default function PaginatorAcompanhamento(props){

    const {data} = props;
    const {competencia} = props;

    const [currentItems, setCurrentItens] = useState(['']);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage =15;

    const [salarios,setSalario] = useState(['']);

    useEffect(()=> {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItens(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
        // setPageCount(Math)
        // currentItems = items.slice(itemOffset, endOffset);
    },[itemOffset, itemsPerPage,data])

        
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  const returnCidade =  (val , index) =>{
    return(
      <tr key={index}>
        <td>{val['cd_chamado']}</td>
        <td>{val['cd_situacao']}</td>
        <td>{val['tipo_chamado']}</td>
        <td>{val['desc_caso']}</td>
        <td>{val['dt_create']}</td>
        <td><Detalhes chamado={val['cd_chamado']}/></td>
      </tr>
    )}

  return (
    <>
    <tbody>
        {currentItems > [''] && currentItems.map(returnCidade) }
    </tbody>

    <div className="paginator">
    <ReactPaginate
        breakLabel="..."
        nextLabel=""
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel=""
        renderOnZeroPageCount={null}
        containerClassName = "pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName='active'
        />
    </div>
    </>
  );
}