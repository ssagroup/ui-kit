import { Pagination } from '@ssa-ui-kit/core';
import { RowsPerPageDropdown } from '@fintech/components';
import { useTranslation } from '@contexts';
import { FooterProps } from './types';
import { PaginationWrapper } from './PaginationWrapper';
import { ControlsWrapper } from './ControlsWrapper';
import { ReadAllButton } from '../';

export const Footer = ({
  isHidden,
  isReadAllDisabled,
  onReadAllClick,
  onRowsPerPageChange,
  isPaginationDisabled,
  pagesCount,
}: FooterProps) => {
  const { t } = useTranslation();
  return (
    <ControlsWrapper css={{ visibility: isHidden ? 'hidden' : 'visible' }}>
      <ReadAllButton
        onClick={onReadAllClick}
        text={t('pages.notifications.readAllBtnText')}
        isDisabled={isReadAllDisabled}
      />
      <PaginationWrapper>
        <RowsPerPageDropdown
          onChange={({ value }) => onRowsPerPageChange(value as number)}
        />
        {pagesCount > 0 && (
          <Pagination
            pagesCount={pagesCount}
            isDisabled={isPaginationDisabled}
          />
        )}
      </PaginationWrapper>
    </ControlsWrapper>
  );
};
