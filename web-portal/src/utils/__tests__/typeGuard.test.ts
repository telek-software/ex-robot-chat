import { checkIsBoolean, checkIsKeyof } from "~utils/typeGuard.utils";

test("checkIsKeyof", () => {
  const params = { key1: "test1" };
  expect(checkIsKeyof(params, "key1")).toBeTruthy();
  expect(checkIsKeyof(params, "key2")).toBeFalsy();
});

test("checkIsBoolean", () => {
  const param = {
    failed1: 1,
    failed2: null,
    failed3: undefined,
    failed4: [],
    succeeded: false,
  };
  expect(checkIsBoolean(param.failed1)).toBeFalsy();
  expect(checkIsBoolean(param.failed2)).toBeFalsy();
  expect(checkIsBoolean(param.failed3)).toBeFalsy();
  expect(checkIsBoolean(param.failed4)).toBeFalsy();
  expect(checkIsBoolean(param.succeeded)).toBeTruthy();
});
