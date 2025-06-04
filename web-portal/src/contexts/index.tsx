import { DefaultProps } from "~utils/type.utils";

import AppProvider from "./AppContext";
import AuthProvider from "./AuthContext";
import ErrorProvider from "./ErrorContext";

/**
 * Contexts
 * @context
 */
function Contexts(props: DefaultProps) {
  const { children } = props;
  return (
    <ErrorProvider>
      <AuthProvider>
        <AppProvider>{children} </AppProvider>
      </AuthProvider>
    </ErrorProvider>
  );
}

export default Contexts;

export const withContext = (component: JSX.Element) => (
  <Contexts>{component}</Contexts>
);
