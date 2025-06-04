import { PageContainer } from "~containers";
import * as InformationModule from "~modules/InformationModule";

export default function Page() {
  return (
    <PageContainer>
      <InformationModule.AIDetails />
    </PageContainer>
  );
}
