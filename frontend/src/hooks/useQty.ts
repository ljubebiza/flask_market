import { useState } from "react";

export const useQty = (initialValue: { value?: number; min?: number }) => {
  const { value, min } = initialValue;

  const [count, setCount] = useState(value || 0);

  const onIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const onDecrement = () => {
    if (min && min === count) {
      return;
    }
    setCount((prev) => prev - 1);
  };

  const onChange = (value: number) => {
    setCount(value);
  };

  return { onChangeValue: onChange, onIncrement, onDecrement, value: count };
};
