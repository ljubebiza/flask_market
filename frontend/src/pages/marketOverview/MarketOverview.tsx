import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { getProducts } from "../../api/getProducts";
import ItemList, { Item } from "../../componets/ItemList";
import OrderedItemsList from "../../componets/OrderItemsList";

interface LoaderData {
  items: Item[];
  ownedItems?: Item[];
}

const MarketPage = () => {
  const { items, ownedItems } = useLoaderData() as LoaderData;

  return (
    <Fragment>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={items} errorElement={<p>Failed to load items.</p>}>
          {(items) => <ItemList items={items} />}
        </Await>
      </Suspense>
      <Suspense
        fallback={
          <p>
            <h1>Loading...</h1>
          </p>
        }
      >
        <Await
          resolve={ownedItems}
          errorElement={<p>Failed to load owned items</p>}
        >
          {(ownedItems) => <OrderedItemsList ownedItems={ownedItems} />}
        </Await>
      </Suspense>
    </Fragment>
  );
};

export default MarketPage;

export const loader = async () => {
  const { items, ownedItems } = await getProducts();

  return defer({
    items,
    ownedItems,
  });
};
