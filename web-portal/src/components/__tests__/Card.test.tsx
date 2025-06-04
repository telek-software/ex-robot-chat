import Card from "~components/Card";
import { render, screen } from "~utils/test.utils";

test("Card", () => {
  render(<Card>Test Card</Card>);
  const card = screen.getByText("Test Card");
  expect(card).toBeInTheDocument();
});
