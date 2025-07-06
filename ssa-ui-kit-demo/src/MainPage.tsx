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
  FormGroup,
  Button
} from '@ssa-ui-kit/core';

export const MainPage = () => {
  const currentYear = new Date().getFullYear();
  
  // Initialize form with react-hook-form
  const useFormResult = useForm<FieldValues>({
    defaultValues: {
      testDateRangeFrom: '',
      testDateRangeTo: '',
      formField: ''
    }
  });
  
  const handleSubmit = (data: FieldValues) => {
    // Create a summary of the submitted data
    const summary = {
      fullName: data.formField || 'Not provided',
      dateRange: {
        from: data.testDateRangeFrom || 'Not selected',
        to: data.testDateRangeTo || 'Not selected'
      }
    };
    
    console.log('Form submitted successfully:', summary);
    console.log('Complete form data:', data);
    
    alert(`Form submitted successfully! 
    
Full Name: ${summary.fullName}
Date Range: ${summary.dateRange.from} to ${summary.dateRange.to}

Check console for complete data.`);
  };
  
  return (
    <FormProvider {...useFormResult}>
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}>
        {/* Content Area */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '32px',
        }}>
          <Card css={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid rgba(148, 163, 184, 0.1)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
          }}>
            <CardHeader>
              <Typography variant="h1" css={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px',
              }}>
                SSA UI Kit Demo
              </Typography>
              <Typography variant="body2" css={{
                color: '#64748b',
                fontSize: '16px',
                lineHeight: '1.6',
              }}>
                Demonstrating AccordionGroup with TextField and DateRangePicker components
              </Typography>
            </CardHeader>
            <CardContent>
              <Form onSubmit={useFormResult.handleSubmit(handleSubmit)}>
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
                            <div style={{ 
                              padding: '24px',
                              background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                              borderRadius: '12px',
                              margin: '16px 0',
                            }}>
                              <Typography variant="body1" css={{ 
                                marginBottom: '16px',
                                color: '#334155',
                                fontWeight: '500',
                              }}>
                                Please enter your information below:
                              </Typography>
                              <TextField
                                label="Full Name"
                                name="formField"
                                placeholder="Enter your full name"
                                helperText="Please provide your full name"
                                register={useFormResult.register}
                                errors={useFormResult.formState.errors.formField as any}
                                validationSchema={{
                                  required: 'Full name is required',
                                  minLength: {
                                    value: 2,
                                    message: 'Name must be at least 2 characters long'
                                  }
                                }}
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
                            <div style={{ 
                              padding: '24px',
                              background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)',
                              borderRadius: '12px',
                              margin: '16px 0',
                            }}>
                              <Typography variant="body1" css={{ 
                                marginBottom: '16px',
                                color: '#92400e',
                                fontWeight: '500',
                              }}>
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

        {/* Sticky Submit Button Panel */}
        <div style={{
          padding: '24px 32px',
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          borderTop: '1px solid rgba(148, 163, 184, 0.2)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '16px',
          alignItems: 'center',
        }}>
          <Typography variant="body2" css={{
            color: '#cbd5e1',
            fontSize: '14px',
          }}>
            Ready to submit your form?
          </Typography>
          <Button
            variant="primary"
            size="medium"
            onClick={useFormResult.handleSubmit(handleSubmit)}
            css={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              border: 'none',
              padding: '12px 32px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
              }
            }}
          >
            Submit Form
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};