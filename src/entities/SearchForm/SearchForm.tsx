import "./SearchForm.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { hideBtn, selectCatalog, setSearch } from "../../features/Catalog/catalogSlice";
import { fetchCatalogThunk } from "../../features/Catalog/fetchCatalogThunk";
import { useState, useEffect } from "react";

export default function SearchForm() {

  const dispatch = useAppDispatch();
  const { search } = useAppSelector(selectCatalog);
  const [data, setData] = useState<{ search: string }>({ search: "" });

  useEffect(() => {
    setData({search: search});
    dispatch(fetchCatalogThunk());
  }, [search]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData);
    const searchWord = data.search as string;
    dispatch(setSearch(searchWord));
    dispatch(fetchCatalogThunk());
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (search) {
      dispatch(hideBtn());
    };
    dispatch(setSearch(""));
  }

  const handleUpdatePostField: React.FormEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    const { name, value } = event.currentTarget;
    setData(data => {
      return {
        ...data,
        [name]: value
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="catalog-search-form form-inline form_search">
      <input name="search" className="form-control" value={data.search ?? ""} placeholder="Поиск" onInput={handleUpdatePostField} required/>
      <button onClick={handleClick} type="reset" className="form-reset-btn">X</button>
    </form>
  );
}