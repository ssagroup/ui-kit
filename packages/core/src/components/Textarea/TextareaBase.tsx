import styled from '@emotion/styled';
import type { Theme } from '@emotion/react';

type TextareaStatus = 'basic' | 'error' | 'success' | 'custom';

const statusToPalette = (status: TextareaStatus) =>
  status === 'custom' ? 'basic' : status;

type BoxShadowState = 'rest' | 'hover' | 'focus';

function getStatusBoxShadow(
  theme: Theme,
  status: TextareaStatus,
  state: BoxShadowState,
): string {
  const palette = statusToPalette(status);

  const colorMap: Record<string, Record<BoxShadowState, string>> = {
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
      hover: theme.colors.greyDarker60 ?? theme.colors.grey ?? '',
      focus: theme.palette.primary.main ?? theme.colors.grey ?? '',
    },
  };

  const colors = colorMap[palette] ?? colorMap.default;
  const color = colors[state];

  return `inset 0 0 1.5px 0 ${color}`;
}

export const TextareaBase = styled('textarea', {
  shouldForwardProp: (prop: string) => prop !== 'status',
})<{ status?: TextareaStatus }>`
  flex: 1 100%;

  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  background-origin: border-box;
  background-clip: padding-box, border-box;

  border: none;
  box-shadow: ${({ theme, status = 'basic' }) =>
    getStatusBoxShadow(theme, status, 'rest')};

  color: ${({ theme }) => theme.colors.greyDarker};

  width: 100%;
  max-width: 100%;
  max-height: 100%;
  box-sizing: border-box;
  min-height: 114px;
  padding: 14px;

  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.greyDarker60};
  }

  /* no hover/focus border change when read-only; no pointer cursor */
  &[readonly] {
    cursor: default;
  }

  &:disabled {
    color: ${({ theme }) => `${theme.colors.grey}`};
    box-shadow: ${({ theme }) => `inset 0 0 1.5px 0 ${theme.colors.grey}`};
    background: ${({ theme }) => theme.colors.greyLighter};
    resize: none;

    &::placeholder {
      color: ${({ theme }) => theme.colors.grey};
    }
  }

  &:hover:not(:disabled, [readonly]) {
    box-shadow: ${({ theme, status = 'basic' }) =>
      getStatusBoxShadow(theme, status, 'hover')};
  }

  /* same specificity as :hover so focus wins when both apply (stay blue/green/red on hover) */
  &:focus:not(:disabled, [readonly]) {
    box-shadow: ${({ theme, status = 'basic' }) =>
      getStatusBoxShadow(theme, status, 'focus')};
  }
`;
