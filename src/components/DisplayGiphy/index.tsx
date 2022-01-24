import "babel-polyfill";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UseAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import GiphyLoader from "./giphyLoader";
import Paginate from "./paginate";
import { giphySelector } from "../../redux/giphy/giphy.selector";
import { fetchGiphy, searchGiphy, Giphy } from "../../redux/giphy/giphy.reducer";

const GiphyComp = (): JSX.Element => {
  const limit = '100';
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  //page 1 item 1 - item 25
  //page 2 item 26 - item 50
  //page 3 item 51 - item 75
  const dispatch = UseAppDispatch();
  const { error, loading, giphyDetail } = useSelector(
    giphySelector
  );

  const currentItems: any = giphyDetail.slice(indexOfFirstItem, indexOfLastItem);
  
  useEffect(() => {
        dispatch(fetchGiphy(limit));
  }, [dispatch]);

  const renderGifs = () => {
    if (loading) {
      return <GiphyLoader />
    }
    return currentItems.map((el: Giphy) => {
      return (
        <div key={el.id} className="gif">
          <img src={el.images.fixed_height.url} />
        </div>
      );
    });
  };
  const renderError = () => {
    if (error) {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Unable to get Gifs, please try again in a few minutes
        </div>
      );
    }
  };

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    dispatch(searchGiphy({search: search, limit: limit}))
  };

  const pageSelected = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="m-2">
      {renderError()}
      <form className="form-inline justify-content-center m-2">
        <input
          value={search}
          onChange={handleSearchChange}
          type="text"
          placeholder="search"
          className="form-control"
        />
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary mx-2"
        >
          Go
        </button>
      </form>
      <Paginate
        pageSelected={pageSelected}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={giphyDetail.length}
      />
      <div className="container gifs">{renderGifs()}</div>
    </div>
  );
};

export default GiphyComp;