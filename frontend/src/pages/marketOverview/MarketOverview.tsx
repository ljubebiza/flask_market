import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { getProducts } from "../../api/getProducts";
import ItemList, { Item } from "../../componets/ItemList";
import OrderedItemsList from "../../componets/OrderItemsList";

interface LoaderData {
  items: Item[];
}

const MarketPage = () => {
  const { items } = useLoaderData() as LoaderData;

  return (
    <Fragment>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={items} errorElement={<p>Failed to load items.</p>}>
          {(items) => <ItemList items={items} />}
        </Await>
      </Suspense>
      <OrderedItemsList />
    </Fragment>
  );
};

export default MarketPage;

export const loader = () => {
  return defer({
    items: getProducts(),
  });
};
