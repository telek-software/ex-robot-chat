import Fieldset from "~components/Fieldset";
import { render, screen } from "~utils/test.utils";

test("Fieldset", () => {
  const { rerender } = render(<Fieldset>Test fieldset</Fieldset>);
  const fieldset = screen.getByText("Test fieldset");

  expect(fieldset).toBeInTheDocument();

  expect(fieldset).toHaveClass("fieldset-content");
  expect(fieldset.parentNode).toHaveClass("left", "column");
  expect(fieldset.parentNode?.firstChild).toHaveClass("fieldset-content");

  rerender(<Fieldset legend="legend">Test fieldset</Fieldset>);
  expect(fieldset.parentNode?.firstChild).toHaveClass("legend");

  rerender(
    <Fieldset legend="TestLegend" position="right">
      Test fieldset
    </Fieldset>
  );
  expect(screen.getByText("TestLegend")).toBeInTheDocument();
  expect(fieldset.parentNode).toHaveClass("right", "column");
});
