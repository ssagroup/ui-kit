import { FormEvent, MouseEventHandler, useEffect, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTrigger,
  Typography,
  Wrapper,
} from '@ssa-ui-kit/core';
import { useTranslation } from '@contexts';
import {
  useBotStopMutation,
  useBotStartMutation,
} from '@fintech/pages/BotsPage/mutations';
import { ActionsProps } from './types';

export const ActionRun = ({
  row,
  startIcon,
  endIcon,
  className,
  children,
}: ActionsProps) => {
  const { t } = useTranslation();
  const { isRunning } = row;

  const botStopMutation = useBotStopMutation(row.id);
  const botStartMutation = useBotStartMutation(row.id);
  const isDisabled = false;

  const [open, setOpen] = useState(false);
  const { register, handleSubmit, resetField } = useForm<FieldValues>();

  const onOpenChange = (open: boolean) => {
    if (!isRunning) {
      setOpen(open);
    }
  };
  const actionRunHandler: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
    if (isRunning) {
      botStopMutation.mutate();
    }
  };
  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    handleSubmit(() => {
      botStartMutation.mutate();
    })(event);
    setOpen(false);
    resetField('reason');
  };

  useEffect(() => {
    return () => {
      resetField('reason');
    };
  }, []);

  return (
    <Popover
      floatingOptions={{
        onOpenChange,
        open,
      }}
      placement="top-start">
      <PopoverTrigger
        variant="custom"
        isDisabled={isDisabled}
        dataTestId="run-reason-trigger-button"
        css={{
          marginLeft: 10,
          padding: '0 10px',
          cursor: isDisabled ? 'default' : 'pointer',
          backgroundColor: 'unset',
          ':disabled': {
            filter: 'grayscale(1)',
          },
          '& > span': {
            height: '100%',
            alignItems: 'center',
          },
        }}
        className={className}
        startIcon={startIcon}
        endIcon={endIcon}
        onClick={actionRunHandler}>
        {children}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverDescription>
          <Wrapper
            css={{
              width: 307,
              height: 85,
              borderRadius: 6,
              padding: 10,
              background: '#fff',
              boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.10)',
            }}
            onClick={(event) => event.stopPropagation()}>
            <form onSubmit={formSubmitHandler}>
              <Typography
                variant="h6"
                css={{
                  marginBottom: 6,
                  lineHeight: '18px',
                  textIndent: 4,
                }}>
                {t('pages.bots.runReason')}
              </Typography>
              <Wrapper
                css={{
                  gap: 7,
                }}>
                <Input
                  name="reason"
                  register={register}
                  placeholder="Enter"
                  css={{
                    borderRadius: 6,
                    '&:hover': {
                      margin: '-0.4px',
                    },
                    '&:focus': {
                      margin: '-1px',
                    },
                  }}
                />
                <Button
                  variant="info"
                  type="submit"
                  css={{
                    width: 90,
                    height: 40,
                    padding: '0 14px',
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 700,
                    justifyContent: 'center',
                    background:
                      'linear-gradient(247deg, #7599DE 14.71%, #4178E1 85.29%)',
                  }}>
                  {t('pages.bots.run')}
                </Button>
              </Wrapper>
            </form>
          </Wrapper>
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
};
