import useEnsafe from "~hooks/useEnsafe";
import { act, renderHook } from "~utils/test.utils";

test("useEnsafe", () => {
  const { result: ensafeHook } = renderHook(useEnsafe);
  const { ensafe } = ensafeHook.current;

  act(() => {
    const onChange = jest.fn();
    const handler = ensafe(onChange);
    expect(onChange).not.toHaveBeenCalled();
    handler();
    expect(onChange).toHaveBeenCalled();
    expect(onChange).not.toThrowError();
  });

  act(() => {
    const onChange = jest.fn().mockImplementation(() => {
      throw new Error("callback failed");
    });
    const faillingHandler = ensafe(onChange);
    expect(onChange).not.toHaveBeenCalled();
    faillingHandler();
    expect(onChange).toThrowError();
  });
});
