import Input from "~components/Input";
import { fireEvent, render, screen } from "~utils/test.utils";

test("render Input", () => {
  const onChange = jest.fn();
  render(<Input placeholder="input" onChange={onChange} value="Test Input" />);
  const input = screen.getByPlaceholderText("input");
  expect(input).toBeInTheDocument();
  expect(onChange).not.toHaveBeenCalled();
  fireEvent.change(input, { target: { value: "new value" } });
  expect(onChange).toHaveBeenCalledWith("new value");
});
