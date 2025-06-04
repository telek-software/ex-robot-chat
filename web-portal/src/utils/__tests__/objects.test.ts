import {
  displayValue,
  keysToString,
  mergeDeepPartial,
} from "~utils/object.utils";

test("keysToString", () => {
  const param = { key1: "test", key2: false, key3: true };
  const expected = "key1 key3";
  const result = keysToString(param);
  expect(result).toEqual(expected);
});

test("displayValue", () => {
  const paramString = { key1: "test" };
  const paramNumber = { key1: 55 };
  const paramBoolean = { key1: "Yes" };
  expect(displayValue(paramString, "key1")).toEqual("test");
  expect(displayValue(paramNumber, "key1")).toEqual(55);
  expect(displayValue(paramBoolean, "key1")).toEqual("Yes");
});

test("mergeDeepPartial", () => {
  const obj1 = { a: "test", b: "test", c: "", d: { a: "test", b: "test2" } };
  const obj2 = { a: "test2", c: "test2", d: { b: "test2" } };
  const merge = mergeDeepPartial(obj1, obj2);
  expect(merge).toEqual(
    expect.objectContaining({
      a: "test2",
      b: "test",
      c: "test2",
      d: { a: "test", bb: "test2" },
    })
  );
});
