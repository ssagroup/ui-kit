import { useForm, FormProvider, FieldValues } from 'react-hook-form';
import { 
  Typography, 
  Card, 
  CardHeader, 
  CardContent, 
  TextField,
  AccordionGroupContextProvider,
  AccordionGroup,
  Accordion,
  AccordionTitle,
  AccordionContent,
  DateRangePicker,
  Form,
  FormGroup
} from '@ssa-ui-kit/core';

export const MainPage = () => {
  const currentYear = new Date().getFullYear();
  
  // Initialize form with react-hook-form
  const useFormResult = useForm<FieldValues>({
    defaultValues: {
      testDateRangeFrom: '',
      testDateRangeTo: '',
      accordionField: '',
      formField: ''
    }
  });
  
  return (
    <FormProvider {...useFormResult}>
      <div style={{
        minHeight: '100vh',
        background: '#f0f0f0',
        padding: '40px 20px',
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          <Card>
            <CardHeader>
              <Typography variant="h1">SSA UI Kit Demo</Typography>
              <Typography variant="body2">
                Demonstrating AccordionGroup with TextField and DateRangePicker components
              </Typography>
            </CardHeader>
            <CardContent>
              <Form onSubmit={useFormResult.handleSubmit((data) => {
                console.log('Form submitted:', data);
              })}>
                <FormGroup>
                  <AccordionGroupContextProvider>
                    <AccordionGroup size="medium">
                      
                      {/* First Accordion: Label and Text Field */}
                      <Accordion
                        id="form-accordion"
                        title="User Information"
                        ariaControls="form-accordion-panel"
                        isOpened={true}
                        renderTitle={(titleProps) => (
                          <AccordionTitle {...titleProps} />
                        )}
                        renderContent={(contentProps) => (
                          <AccordionContent {...contentProps}>
                            <div style={{ padding: '20px' }}>
                              <Typography variant="body1" css={{ marginBottom: '12px' }}>
                                Please enter your information below:
                              </Typography>
                              <TextField
                                label="Full Name"
                                name="formField"
                                placeholder="Enter your full name"
                                helperText="This field is required"
                              />
                            </div>
                          </AccordionContent>
                        )}
                      />

                      {/* Second Accordion: Date Range Picker */}
                      <Accordion
                        id="date-accordion"
                        title="Date Selection"
                        ariaControls="date-accordion-panel"
                        isOpened={false}
                        renderTitle={(titleProps) => (
                          <AccordionTitle {...titleProps} />
                        )}
                        renderContent={(contentProps) => (
                          <AccordionContent {...contentProps}>
                            <div style={{ padding: '20px' }}>
                              <Typography variant="body1" css={{ marginBottom: '12px' }}>
                                Select a date range within {currentYear}:
                              </Typography>
                              <DateRangePicker
                                label="Date Range"
                                name="testDateRange"
                                openCalendarMode="both"
                                dateMin={`01/01/${currentYear}`}
                                dateMax={`12/31/${currentYear}`}
                                messages={{
                                  description: `Please select dates within ${currentYear}`
                                }}
                                onChange={(dates) => {
                                  console.log('Date range selected:', dates);
                                }}
                              />
                            </div>
                          </AccordionContent>
                        )}
                      />
                      
                    </AccordionGroup>
                  </AccordionGroupContextProvider>
                </FormGroup>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </FormProvider>
  );
};