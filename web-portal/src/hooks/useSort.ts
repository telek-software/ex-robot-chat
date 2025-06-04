"use client";
import React from "react";

import { checkIsString } from "~utils/typeGuard.utils";

/**
 * useSort
 * @hook
 */
function useSort<T extends object>() {
  const [field, setField] = React.useState<keyof T>();
  const [isInversed, setInversedState] = React.useState(false);

  const compare = (a: unknown, b: unknown) => {
    if (checkIsString(a) && checkIsString(b)) return a.localeCompare(b);
    return Number(a) - Number(b);
  };

  const sortByKey = (list: T[], nextField: keyof T) => {
    const needInversing = field === nextField;
    setField(nextField);
    let nextIsInversed = isInversed;
    if (needInversing) nextIsInversed = !isInversed;
    const sortDirection = (a: T, b: T) =>
      nextIsInversed
        ? compare(b[nextField], a[nextField])
        : compare(a[nextField], b[nextField]);
    setInversedState(nextIsInversed);
    return [...list].sort(sortDirection);
  };

  return {
    fieldSorted: field,
    isSortInversed: isInversed,
    sortByKey,
  };
}

export default useSort;
