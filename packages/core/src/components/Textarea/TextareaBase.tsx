import styled from '@emotion/styled';
import type { Theme } from '@emotion/react';

type TextareaStatus = 'basic' | 'error' | 'success' | 'custom';

const statusToPalette = (status: TextareaStatus) =>
  status === 'custom' ? 'basic' : status;

type BorderState = 'rest' | 'hover' | 'focus';

function getStatusBorderColor(
  theme: Theme,
  status: TextareaStatus,
  state: BorderState,
): string {
  const palette = statusToPalette(status);

  const colorMap: Record<string, Record<BorderState, string>> = {
    error: {
      rest: theme.palette.error.light,
      hover: theme.palette.error.main,
      focus: theme.palette.error.dark ?? theme.palette.error.main,
    },
    success: {
      rest: theme.palette.success.light,
      hover: theme.palette.success.main,
      focus: theme.palette.success.dark ?? theme.palette.success.main,
    },
    default: {
      rest: theme.colors.grey ?? '',
      hover: theme.colors.greyDarker80 ?? theme.colors.grey ?? '',
      focus: theme.palette.primary.light ?? theme.colors.grey ?? '',
    },
  };

  const colors = colorMap[palette] ?? colorMap.default;

  return colors[state];
}

export const TextareaBase = styled('textarea', {
  shouldForwardProp: (prop: string) => prop !== 'status',
})<{ status?: TextareaStatus }>`
  flex: 1 100%;

  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  background-origin: border-box;
  background-clip: padding-box, border-box;

  border: ${({ theme, status = 'basic' }) =>
    `1px solid ${getStatusBorderColor(theme, status, 'rest')}`};

  color: ${({ theme }) => theme.colors.greyDarker};

  width: 100%;
  max-width: 100%;
  max-height: 100%;
  box-sizing: border-box;
  min-height: 114px;
  padding: 14px;

  font-weight: 500;
  font-size: 0.875rem;
  line-height: 18px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.greyDarker80};
  }

  /* no hover/focus border change when read-only; no pointer cursor */
  &[readonly] {
    cursor: default;
  }

  &:disabled {
    color: ${({ theme }) => `${theme.colors.grey}`};
    border: ${({ theme }) => `1px solid ${theme.colors.grey}`};
    background: ${({ theme }) => theme.palette.secondary.light};
    resize: none;

    &::placeholder {
      color: ${({ theme }) => theme.colors.grey};
    }
  }

  &:hover:not(:disabled, [readonly]) {
    border-color: ${({ theme, status = 'basic' }) =>
      getStatusBorderColor(theme, status, 'hover')};
  }

  /* same specificity as :hover so focus wins when both apply (stay blue/green/red on hover) */
  &:focus:not(:disabled, [readonly]) {
    border-color: ${({ theme, status = 'basic' }) =>
      getStatusBorderColor(theme, status, 'focus')};
  }
`;
