/**
 * enClassname
 * @description
 * Adapt props to be placed in the className of an Component
 */
export function enClassname(props: string[], className?: string) {
  const base = className || "";
  return [base]
    .concat(props.map((value) => (value ? `${value}` : "")))
    .join(" ")
    .trim();
}
