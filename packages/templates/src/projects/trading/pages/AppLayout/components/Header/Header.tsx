import { HeaderBase, MenusSectionBase, PageSectionBase } from './HeaderBases';
import { Breadcrumbs } from './Breadcrumbs';
import { CustomContent } from './CustomContent';

import { HeaderProps } from './types';

export const Header = ({ children }: HeaderProps) => (
  <HeaderBase>
    <PageSectionBase>
      <Breadcrumbs />
      <CustomContent />
    </PageSectionBase>
    <MenusSectionBase>{children}</MenusSectionBase>
  </HeaderBase>
);
