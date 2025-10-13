import { CustomContent } from './CustomContent';
import { HeaderBase, MenusSectionBase, PageSectionBase } from './HeaderBases';
import { HeaderProps } from './types';

export const Header = ({ children }: HeaderProps) => (
  <HeaderBase>
    <PageSectionBase>
      <CustomContent />
    </PageSectionBase>
    <MenusSectionBase>{children}</MenusSectionBase>
  </HeaderBase>
);
