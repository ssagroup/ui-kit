import { useTheme } from '@emotion/react';
import { useMatches, useNavigate, useLocation } from 'react-router-dom';
import { Button, Icon, Wrapper } from '@ssa-ui-kit/core';
import { useTranslation } from '@contexts';
import { PathHandle, CrumbContent } from '@trading/types';
import { BreadcrumbsBase, PageName } from './BreadcrumbsBases';
import { CustomBreadcrumbContent } from '../CustomBreadcrumbContent';

export const Breadcrumbs = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const matches = useMatches();
  const navigate = useNavigate();
  const location = useLocation();

  const matchesWithCrumbs = matches.filter((match) =>
    Boolean((match.handle as unknown as PathHandle)?.crumb),
  );

  if (matchesWithCrumbs.length == 0) {
    return null;
  }

  const { handle, data } = matchesWithCrumbs[matchesWithCrumbs.length - 1];
  const crumb = (handle as unknown as PathHandle).crumb;

  let goBack = null;
  let pageName = null;

  const getPageName = (crumbContent: CrumbContent) =>
    typeof crumbContent === 'string' ? t(crumbContent) : crumbContent(data);

  if (typeof crumb === 'object') {
    goBack = () => crumb.goBack(navigate);
    pageName = getPageName(crumb.content);
  } else {
    goBack = () => {
      const path = location.pathname.split('/');
      path.pop();
      navigate(path.join('/'));
    };
    pageName = getPageName(crumb);
  }

  return (
    <BreadcrumbsBase>
      <Wrapper>
        {matchesWithCrumbs.length > 1 ? (
          <Button
            onClick={goBack}
            variant="tertiary"
            startIcon={
              <Icon
                name="carrot-left"
                color={theme.colors.greyDropdownFocused}
                size={15}
              />
            }
            css={{ marginRight: '9px', padding: 0 }}
          />
        ) : null}
        <PageName variant="h1">{pageName}</PageName>
      </Wrapper>
      <CustomBreadcrumbContent />
    </BreadcrumbsBase>
  );
};
