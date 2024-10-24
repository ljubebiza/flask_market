import { json } from "react-router-dom";
import { ACTIONS } from "../reducers/actions";

type ItemActions = "sell" | "buy";
type MarketPayload = {
  formData: FormData;
  dispatch: Function;
};

export const itemActions = async ({
  request,
  dispatch,
}: {
  request: Request;
  dispatch: Function;
}) => {
  const formData = await request.formData();
  const intent = formData.get("intent") as ItemActions;
  const actions = { buy: buyItem, sell: sellItem };

  if (!intent) {
    throw json({ message: "Invalid intent" }, { status: 400 });
  }
  return actions[intent]({ formData, dispatch });
};

const buyItem = async ({ formData, dispatch }: MarketPayload) => {
  const id = formData.get("id");
  const quantity = formData.get("quantity");
  const url = `${process.env.REACT_APP_BASE_API_URL}/market/purchase`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ id, quantity }),
  });

  if (!response.ok) {
    // Handle error case
    const errorData = await response.json();
    console.error("Error purchasing item:", errorData);
    return errorData;
  }

  const responseData = await response.json();
  const {
    item: { price },
  } = responseData;

  dispatch(ACTIONS.REMOVE_FROM_BALANCE, (Number(quantity) ?? 0) * price);

  return responseData;
};

const sellItem = async ({ formData, dispatch }: MarketPayload) => {
  const id = formData.get("id");
  const quantity = formData.get("quantity");
  const url = `${process.env.REACT_APP_BASE_API_URL}/market/sell`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ id, quantity }),
  });

  if (!response.ok) {
    // Handle error case
    const errorData = await response.json();
    console.error("Error purchasing item:", errorData);
    return errorData;
  }

  const responseData = await response.json();
  const {
    item: { price },
  } = responseData;

  dispatch(ACTIONS.ADD_TO_BALANCE, (Number(quantity) ?? 0) * price);

  return responseData;
};
