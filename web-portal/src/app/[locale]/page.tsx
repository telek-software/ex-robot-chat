import { useTranslations } from "next-intl";

import { PageContainer } from "~containers";
import * as TeaserModule from "~modules/TeaserModule";

export default function Page() {
  const t = useTranslations();

  return (
    <PageContainer>
      <TeaserModule.Intro />
      <TeaserModule.Presenting />
      <TeaserModule.Example />
    </PageContainer>
  );
}
