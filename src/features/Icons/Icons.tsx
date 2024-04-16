import { useState, useRef } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setSearch } from "../Catalog/catalogSlice";
import { useNavigate } from "react-router-dom";

export default function Icons() {

  const formRef = useRef(null);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [visibility, setVisibility] = useState<boolean>(false);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setVisibility(!visibility);
    if (visibility) {
      if (formRef.current) {
        const form = formRef.current as HTMLFormElement;
        processForm(form);
      }
    }
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    processForm(form);
  }

  const processForm = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const searchWord = data.search as string;
    if (searchWord) {
      dispatch(setSearch(searchWord));
      navigate("/catalog.html");
      form.reset();
      setVisibility(false);
    }
  }

  return (
    <>
      <div className="header-controls-pics">
        <div onClick={handleClick} data-id="search-expander" className="header-controls-pic header-controls-search"></div>
        <div className="header-controls-pic header-controls-cart">
          <div className="header-controls-cart-full">1</div>
          <div className="header-controls-cart-menu"></div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        data-id="search-form"
        className={"header-controls-search-form form-inline" + (visibility ? "" : " invisible")}
        ref={formRef}
      >
        <input name="search" className="form-control" placeholder="Поиск" />
      </form>
    </>
  );
}