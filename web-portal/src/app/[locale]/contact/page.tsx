import { PageContainer } from "~containers";
import * as ContactModule from "~modules/ContactModule";

export default function Page() {
  return (
    <PageContainer>
      <ContactModule.TryForm />
    </PageContainer>
  );
}
