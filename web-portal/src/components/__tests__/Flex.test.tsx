import Flex from "~components/Flex";
import { render, screen } from "~utils/test.utils";

test("Flex", () => {
  render(
    <Flex className="test" testId="Test Flex">
      Test Flex
    </Flex>
  );
  const flex = screen.getByTestId("Test Flex");

  expect(flex).toBeInTheDocument();
  expect(flex).toHaveTextContent("Test Flex");
  expect(flex).not.toHaveStyle("width: 10em;");
  expect(flex).toHaveClass("test");
});
