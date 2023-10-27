import { MouseEventHandler, useEffect, useState } from 'react';
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
import { TableBotItem } from '@components/TableBots/types';
import { actionsIcons } from './consts';

export const ActionRun = ({ row }: { row: TableBotItem }) => {
  const { status, isDisabled } = row;
  const ActionIcon = actionsIcons[status];

  const [open, setOpen] = useState(false);
  const { register, handleSubmit, resetField } = useForm<FieldValues>();

  // const onSubmit = handleSubmit((data) => {
  //   alert('Submitting... ' + JSON.stringify(data));
  //   setOpen(false);
  // });

  const onOpenChange = (open: boolean) => {
    if (['pending', 'liquidation'].includes(status)) {
      setOpen(open);
    }
  };
  const actionRunHandler: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
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
        css={{
          marginLeft: 10,
          padding: '0 10px',
          cursor: isDisabled ? 'default' : 'pointer',
          backgroundColor: 'unset',
          '& > span': {
            height: '100%',
            alignItems: 'center',
          },
        }}
        startIcon={<ActionIcon />}
        onClick={actionRunHandler}
      />
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
            <form
              onSubmit={(event) => {
                event.stopPropagation();
                handleSubmit((data) => {
                  alert('Submitting... ' + JSON.stringify(data));
                  console.log('Submitting... ' + JSON.stringify(data));
                })(event);
                setOpen(false);
                resetField('reason');
              }}>
              <Typography
                variant="h6"
                css={{
                  marginBottom: 6,
                  lineHeight: '18px',
                  textIndent: 4,
                }}>
                Run Reason
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
                  Run
                </Button>
              </Wrapper>
            </form>
          </Wrapper>
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
};
