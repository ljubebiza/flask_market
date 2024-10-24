import classes from "./Counter.module.css";
interface QtyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onDecrement: () => void;
  onIncrement: () => void;
  onChangeValue: (value: number) => void;
  value: number;
  label?: string;
}

const FormCounter = ({
  onChangeValue,
  onIncrement,
  onDecrement,
  id,
  label,
  ...rest
}: QtyInputProps) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChangeValue(Number(value));
  };

  return (
    <div
      className={`d-flex w-50 border rounded overflow-hidden text-dark ${classes["qty-wrapper"]}`}
      style={{ maxWidth: "105px" }}
    >
      <span
        role="button"
        onClick={onDecrement}
        className="bg-white rounded-left d-flex align-items-center justify-content-center"
      >
        -
      </span>
      <div className="flex-grow-1">
        {label ? (
          <label htmlFor={id} className="d-none">
            {label}
          </label>
        ) : null}
        <input
          {...rest}
          type="number"
          name="quantity"
          onChange={onChangeHandler}
          className="w-100 border-0 rounded-0 text-center"
        />
      </div>
      <span
        role="button"
        onClick={onIncrement}
        className="bg-white rounded-right d-flex align-items-center justify-content-center"
      >
        +
      </span>
    </div>
  );
};
export default FormCounter;
