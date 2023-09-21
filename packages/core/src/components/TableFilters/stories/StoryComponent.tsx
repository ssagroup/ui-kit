import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
} from '@components/Popover';
import {
  AccordionTitle,
  AccordionGroup,
  AccordionGroupContextProvider,
} from '@components/AccordionGroup';
import { TableFiltersAccordion } from './TableFiltersAccordion';
import { TableFiltersAccordionContent } from './TableFiltersAccordionContent';
import { TableFiltersButtons } from './TableFiltersButtons';
import { TableFilterTrigger } from './TableFilterTrigger';
import {
  tableFilterDividerStyles,
  tableFilterPopoverContentStyles,
} from '../styles';
import { TableFilterCheckbox } from './TableFilterCheckbox';

// type CheckboxControllerType = Omit<
//   Parameters<typeof Controller>[0] & {
//     control: Control<FieldValues, any>;
//     text: string;
//     externalState?: boolean;
//   },
//   'render'
// >;

// const CheckboxController = (props: CheckboxControllerType) => {
//   return (
//     <Controller
//       defaultValue={false}
//       render={({ field }) => (
//         <TableFilterCheckbox
//           {...field}
//           name={props.name}
//           text={props.text}
//           externalState={props.externalState}
//         />
//       )}
//       {...props}
//     />
//   );
// };

type KeysNames =
  | 'checkbox1'
  | 'checkbox2'
  | 'checkbox3'
  | 'checkbox4'
  | 'checkbox5';

const initialState: Record<
  'strategy' | 'status' | 'pairs' | 'exchange',
  Partial<Record<KeysNames, boolean>>
> = {
  strategy: {
    checkbox1: true,
    checkbox4: true,
  },
  status: {
    checkbox2: true,
    checkbox3: true,
  },
  pairs: {
    checkbox1: true,
    checkbox5: true,
  },
  exchange: {
    checkbox1: true,
    checkbox3: true,
    checkbox5: true,
  },
};

export const StoryComponent = () => {
  const { handleSubmit, setValue, reset, control } = useForm({
    defaultValues: initialState,
  });
  const onSubmit: SubmitHandler<Record<string, any>> = (data) => {
    console.log('>>>onSubmit', data);
  };
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Popover>
        <TableFilterTrigger>More</TableFilterTrigger>
        <PopoverContent
          className="popover"
          css={tableFilterPopoverContentStyles}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <PopoverDescription variant="body1">
              <AccordionGroupContextProvider>
                <AccordionGroup size="medium">
                  <TableFiltersAccordion
                    id="strategy"
                    title="Strategy"
                    isOpened
                    ariaControls="strategy-panel"
                    renderContent={(props) => (
                      <TableFiltersAccordionContent {...props}>
                        <Controller
                          control={control}
                          defaultValue={initialState.strategy.checkbox1}
                          name={'strategy.checkbox1'}
                          render={({ field }) => (
                            <TableFilterCheckbox {...field} text="checkbox1" />
                          )}
                        />
                        <Controller
                          control={control}
                          defaultValue={initialState.strategy.checkbox2}
                          name={'strategy.checkbox2'}
                          render={({ field }) => (
                            <TableFilterCheckbox {...field} text="checkbox2" />
                          )}
                        />
                        <Controller
                          control={control}
                          defaultValue={initialState.strategy.checkbox3}
                          name={'strategy.checkbox3'}
                          render={({ field }) => (
                            <TableFilterCheckbox {...field} text="checkbox3" />
                          )}
                        />
                        <Controller
                          control={control}
                          defaultValue={initialState.strategy.checkbox4}
                          name={'strategy.checkbox4'}
                          render={({ field }) => (
                            <TableFilterCheckbox {...field} text="checkbox4" />
                          )}
                        />
                        <Controller
                          control={control}
                          defaultValue={initialState.strategy.checkbox5}
                          name={'strategy.checkbox5'}
                          render={({ field }) => (
                            <TableFilterCheckbox {...field} text="checkbox5" />
                          )}
                        />
                      </TableFiltersAccordionContent>
                    )}
                    renderTitle={AccordionTitle}
                  />
                  <TableFiltersAccordion
                    id="status"
                    title="Status"
                    ariaControls="status-panel"
                    renderContent={(props) => (
                      <TableFiltersAccordionContent {...props}>
                        <TableFilterCheckbox
                          onChange={(newState) =>
                            setValue('status.checkbox1', newState)
                          }
                          text="checkbox1"
                          externalState={initialState.status.checkbox1}
                        />
                        <TableFilterCheckbox
                          onChange={(newState) =>
                            setValue('status.checkbox2', newState)
                          }
                          text="checkbox2"
                          externalState={initialState.status.checkbox2}
                        />
                        <TableFilterCheckbox
                          onChange={(newState) =>
                            setValue('status.checkbox3', newState)
                          }
                          text="checkbox3"
                          externalState={initialState.status.checkbox3}
                        />
                        <TableFilterCheckbox
                          onChange={(newState) =>
                            setValue('status.checkbox4', newState)
                          }
                          text="checkbox4"
                          externalState={initialState.status.checkbox4}
                        />
                        <TableFilterCheckbox
                          onChange={(newState) =>
                            setValue('status.checkbox5', newState)
                          }
                          text="checkbox5"
                          externalState={initialState.status.checkbox5}
                        />
                      </TableFiltersAccordionContent>
                    )}
                    renderTitle={AccordionTitle}
                  />
                  <TableFiltersAccordion
                    id="pairs"
                    title="Pairs"
                    ariaControls="pairs-panel"
                    renderContent={(props) => (
                      <TableFiltersAccordionContent {...props}>
                        <TableFilterCheckbox
                          onChange={(newState) =>
                            setValue('pairs.checkbox1', newState)
                          }
                          text="checkbox1"
                          externalState={initialState.pairs.checkbox1}
                        />
                        <TableFilterCheckbox
                          onChange={(newState) =>
                            setValue('pairs.checkbox2', newState)
                          }
                          text="checkbox2"
                          externalState={initialState.pairs.checkbox2}
                        />
                        <TableFilterCheckbox
                          onChange={(newState) =>
                            setValue('pairs.checkbox3', newState)
                          }
                          text="checkbox3"
                          externalState={initialState.pairs.checkbox3}
                        />
                        <TableFilterCheckbox
                          onChange={(newState) =>
                            setValue('pairs.checkbox4', newState)
                          }
                          text="checkbox4"
                          externalState={initialState.pairs.checkbox4}
                        />
                        <TableFilterCheckbox
                          onChange={(newState) =>
                            setValue('pairs.checkbox5', newState)
                          }
                          text="checkbox5"
                          externalState={initialState.pairs.checkbox5}
                        />
                      </TableFiltersAccordionContent>
                    )}
                    renderTitle={AccordionTitle}
                  />
                  <TableFiltersAccordion
                    id="exchange"
                    title="Exchange"
                    ariaControls="exchange-panel"
                    renderContent={(props) => (
                      <TableFiltersAccordionContent {...props}>
                        <TableFilterCheckbox
                          onChange={(newState) =>
                            setValue('exchange.checkbox1', newState)
                          }
                          text="checkbox1"
                          externalState={initialState.exchange.checkbox1}
                        />
                        <TableFilterCheckbox
                          onChange={(newState) =>
                            setValue('exchange.checkbox2', newState)
                          }
                          text="checkbox2"
                          externalState={initialState.exchange.checkbox2}
                        />
                        <TableFilterCheckbox
                          onChange={(newState) =>
                            setValue('exchange.checkbox3', newState)
                          }
                          text="checkbox3"
                          externalState={initialState.exchange.checkbox3}
                        />
                        <TableFilterCheckbox
                          onChange={(newState) =>
                            setValue('exchange.checkbox4', newState)
                          }
                          text="checkbox4"
                          externalState={initialState.exchange.checkbox4}
                        />
                        <TableFilterCheckbox
                          onChange={(newState) =>
                            setValue('exchange.checkbox5', newState)
                          }
                          text="checkbox5"
                          externalState={initialState.exchange.checkbox5}
                        />
                      </TableFiltersAccordionContent>
                    )}
                    renderTitle={AccordionTitle}
                  />
                </AccordionGroup>
              </AccordionGroupContextProvider>
            </PopoverDescription>
            <hr css={tableFilterDividerStyles} />
            <TableFiltersButtons onReset={reset as any} />
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
};
