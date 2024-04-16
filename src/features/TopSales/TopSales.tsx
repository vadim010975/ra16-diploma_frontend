import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectTopSales, fetchTopSales } from "./topSalesSlice";
import Card from "../../entities/Card/Card";


export default function TopSales() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector(selectTopSales);

  useEffect(() => {
    dispatch(fetchTopSales());
  }, []);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <div className="row">
        {loading && <div>...loading</div>}
        {!loading && items.map(item => (
          <Card item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}