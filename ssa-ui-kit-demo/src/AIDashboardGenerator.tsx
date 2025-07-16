import { useState } from 'react';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';
import { 
  Typography, 
  Card, 
  CardHeader, 
  CardContent,
  TextField,
  Button,
  Icon,
  Form,
  FormGroup
} from '@ssa-ui-kit/core';
import Anthropic from '@anthropic-ai/sdk';

// Component registry - All available SSA UI Kit components
const SSA_UI_KIT_COMPONENTS = {
  // Basic Components
  Avatar: 'Avatar',
  Badge: 'Badge', 
  Button: 'Button',
  Card: 'Card',
  CardContent: 'CardContent',
  CardHeader: 'CardHeader',
  Checkbox: 'Checkbox',
  Icon: 'Icon',
  Input: 'Input',
  Label: 'Label',
  Link: 'Link',
  TextField: 'TextField',
  Typography: 'Typography',
  Wrapper: 'Wrapper',
  
  // Form Components
  Form: 'Form',
  FormGroup: 'FormGroup',
  FormCheckbox: 'FormCheckbox',
  FormRadioGroup: 'FormRadioGroup',
  Radio: 'Radio',
  RadioGroup: 'RadioGroup',
  Switch: 'Switch',
  Textarea: 'Textarea',
  NumberField: 'NumberField',
  
  // Layout Components
  AccordionGroup: 'AccordionGroup',
  CollapsibleNavBar: 'CollapsibleNavBar',
  NavBar: 'NavBar',
  Stepper: 'Stepper',
  Step: 'Step',
  Tab: 'Tab',
  TabBar: 'TabBar',
  
  // Data Display
  Table: 'Table',
  TableBody: 'TableBody',
  TableCell: 'TableCell',
  TableHead: 'TableHead',
  TableRow: 'TableRow',
  Progress: 'Progress',
  ProgressBar: 'ProgressBar',
  ProgressCircle: 'ProgressCircle',
  
  // Charts
  BarGaugeChart: 'BarGaugeChart',
  PieChart: 'PieChart',
  PieChartLegend: 'PieChartLegend',
  SegmentedPieChart: 'SegmentedPieChart',
  BarLineComplexChart: 'BarLineComplexChart',
  TreeMapChart: 'TreeMapChart',
  GaugeChart: 'GaugeChart',
  BigNumberChart: 'BigNumberChart',
  CandlestickChart: 'CandlestickChart',
  
  // Interactive Components
  Dropdown: 'Dropdown',
  MultipleDropdown: 'MultipleDropdown',
  Modal: 'Modal',
  Tooltip: 'Tooltip',
  Popover: 'Popover',
  DatePicker: 'DatePicker',
  DateRangePicker: 'DateRangePicker',
  ColorPicker: 'ColorPicker',
  SearchBox: 'SearchBox',
  
  // Utility Components
  Tag: 'Tag',
  Indicator: 'Indicator',
  ResponsiveImage: 'ResponsiveImage',
  UserProfile: 'UserProfile',
  WidgetCard: 'WidgetCard',
  Pagination: 'Pagination'
};

export const AIDashboardGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [claudeResponse, setClaudeResponse] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  // Initialize form with react-hook-form
  const useFormResult = useForm<FieldValues>({
    defaultValues: {
      apiKey: '',
      prompt: ''
    }
  });

  const { handleSubmit } = useFormResult;

  const onSubmit = async (data: FieldValues) => {
    if (!data.prompt?.trim()) {
      alert('Please enter a prompt for the dashboard generation');
      return;
    }

    if (!data.apiKey?.trim()) {
      alert('Please enter your Anthropic API key');
      return;
    }

    setIsLoading(true);
    setClaudeResponse('');
    setGeneratedCode('');

    try {
      const anthropic = new Anthropic({
        apiKey: data.apiKey,
        dangerouslyAllowBrowser: true // Note: In production, API calls should go through a backend
      });

      // Create comprehensive context about available components
      const componentContext = `
Available SSA UI Kit Components:
${Object.entries(SSA_UI_KIT_COMPONENTS).map(([key, value]) => `- ${key}: ${value}`).join('\n')}

Chart Components Details:
- BarGaugeChart: For horizontal/vertical bar charts with gauge-style display
- PieChart: Standard pie charts with customizable colors and legends
- PieChartLegend: Legend component for pie charts
- GaugeChart: Gauge/speedometer style charts
- BigNumberChart: Large number displays with metrics
- TreeMapChart: Hierarchical data visualization
- BarLineComplexChart: Combined bar and line charts

Layout and UI Guidelines:
- Use Card, CardHeader, CardContent for structured layouts
- Use Typography for text with variants: h1, h2, h3, body1, body2
- Use Wrapper for responsive containers
- Use AccordionGroup for collapsible sections
- Use modern gradients and the theme colors
- Make charts responsive with 100% width when possible
- Include proper data-testid attributes for testing
      `;

      const fullPrompt = `
${componentContext}

User Request: ${data.prompt}

Please create a complete React TypeScript component using @ssa-ui-kit/core components that:
1. Creates a modern, responsive dashboard
2. Uses appropriate SSA UI Kit components from the list above
3. Includes sample data that makes sense for the dashboard type
4. Has a beautiful, professional design with gradients and modern styling
5. Includes proper TypeScript types
6. Uses emotion/react for styling
7. Has data-testid attributes for testing
8. Makes charts 100% width and responsive
9. Includes proper error handling and loading states

Also provide:
1. The complete component code
2. Suggested Playwright test cases for the component
3. Any additional files needed (types, utilities, etc.)

Format your response as:
## Component Code
\`\`\`typescript
[Complete component code here]
\`\`\`

## Playwright Tests
\`\`\`typescript
[Test code here]
\`\`\`

## Additional Files (if needed)
\`\`\`typescript
[Any additional utilities or types]
\`\`\`

Please ensure the component is production-ready and follows React best practices.
      `;

      const message = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 8000,
        messages: [
          {
            role: 'user',
            content: fullPrompt
          }
        ]
      });

      const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
      setClaudeResponse(responseText);

      // Extract code blocks from response
      const codeBlocks = responseText.match(/```(?:typescript|tsx?)\n([\s\S]*?)\n```/g);
      if (codeBlocks && codeBlocks.length > 0) {
        const cleanCode = codeBlocks[0].replace(/```(?:typescript|tsx?)\n/, '').replace(/\n```$/, '');
        setGeneratedCode(cleanCode);
      }

    } catch (error) {
      console.error('Error calling Claude API:', error);
      setClaudeResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyCodeToClipboard = async () => {
    if (generatedCode) {
      try {
        await navigator.clipboard.writeText(generatedCode);
        alert('Code copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy code:', error);
        alert('Failed to copy code to clipboard');
      }
    }
  };

  return (
    <FormProvider {...useFormResult}>
      <div style={{
        height: '100%',
        padding: '24px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        overflow: 'auto'
      }}>
        {/* Header */}
        <div style={{
          marginBottom: '32px'
        }}>
          <Typography variant="h1" css={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px',
          }}>
            AI Dashboard Generator
          </Typography>
          <Typography variant="body2" css={{
            color: '#64748b',
            fontSize: '16px',
          }}>
            Generate custom dashboards using Claude Sonnet 4 and SSA UI Kit components
          </Typography>
        </div>

        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Configuration */}
          <Card css={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid rgba(148, 163, 184, 0.1)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
            marginBottom: '24px'
          }}>
            <CardHeader>
              <Typography variant="h3" css={{
                color: '#1e293b',
                marginBottom: '8px',
              }}>
                Configuration
              </Typography>
              <Typography variant="body2" css={{
                color: '#64748b',
              }}>
                Configure your AI dashboard generation settings
              </Typography>
            </CardHeader>
            <CardContent>
              <FormGroup>
                <TextField
                  label="Anthropic API Key"
                  type="password"
                  name="apiKey"
                  placeholder="Enter your Anthropic API key"
                  helperText="Your API key is only used for this session and not stored"
                  register={useFormResult.register}
                  validationSchema={{
                    required: 'API key is required'
                  }}
                  data-testid="api-key-input"
                />
              </FormGroup>
            </CardContent>
          </Card>

          {/* Input Section */}
          <Card css={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid rgba(148, 163, 184, 0.1)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
            marginBottom: '24px'
          }}>
            <CardHeader>
              <Typography variant="h3" css={{
                color: '#1e293b',
                marginBottom: '8px',
              }}>
                Dashboard Request
              </Typography>
              <Typography variant="body2" css={{
                color: '#64748b',
              }}>
                Describe the dashboard you want to generate
              </Typography>
            </CardHeader>
            <CardContent>
              <FormGroup>
                <TextField
                  label="Dashboard Description"
                  name="prompt"
                  placeholder="e.g., Create a dashboard to show staff related data (just few metrics on your choice) with some nice design"
                  helperText="Describe the type of dashboard, metrics, and design preferences you want"
                  multirow
                  rows={4}
                  register={useFormResult.register}
                  validationSchema={{
                    required: 'Description is required',
                    minLength: {
                      value: 10,
                      message: 'Please provide more details'
                    }
                  }}
                  data-testid="dashboard-prompt"
                />
                
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="medium"
                    isDisabled={isLoading}
                    startIcon={isLoading ? <Icon name="minus" size={16} /> : <Icon name="plus" size={16} />}
                    data-testid="generate-button"
                  >
                    {isLoading ? 'Generating...' : 'Generate Dashboard'}
                  </Button>
                </div>
              </FormGroup>
            </CardContent>
          </Card>
        </Form>

      {/* Available Components Info */}
      <Card css={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
        marginBottom: '24px'
      }}>
        <CardHeader>
          <Typography variant="h3" css={{
            color: '#1e293b',
            marginBottom: '8px',
          }}>
            Available SSA UI Kit Components
          </Typography>
          <Typography variant="body2" css={{
            color: '#64748b',
          }}>
            Components that will be available for dashboard generation
          </Typography>
        </CardHeader>
        <CardContent>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '8px'
          }}>
            {Object.keys(SSA_UI_KIT_COMPONENTS).map((component) => (
              <div
                key={component}
                style={{
                  padding: '8px 12px',
                  background: '#f1f5f9',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: '#475569'
                }}
              >
                {component}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Response Section */}
      {claudeResponse && (
        <Card css={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid rgba(148, 163, 184, 0.1)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
          marginBottom: '24px'
        }}>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Typography variant="h3" css={{
                  color: '#1e293b',
                  marginBottom: '8px',
                }}>
                  Claude Sonnet 4 Response
                </Typography>
                <Typography variant="body2" css={{
                  color: '#64748b',
                }}>
                  Generated dashboard code and instructions
                </Typography>
              </div>
              {generatedCode && (
                <Button
                  variant="secondary"
                  size="small"
                  onClick={copyCodeToClipboard}
                  startIcon={<Icon name="copy" size={16} />}
                  data-testid="copy-code-button"
                >
                  Copy Code
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div
              style={{
                background: '#1e293b',
                borderRadius: '8px',
                padding: '16px',
                color: '#f8fafc',
                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                fontSize: '14px',
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap',
                overflow: 'auto',
                maxHeight: '600px'
              }}
              data-testid="claude-response"
            >
              {claudeResponse}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <Card css={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          border: 'none',
          color: 'white',
          textAlign: 'center'
        }}>
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <Icon name="minus" size={20} />
              <Typography variant="h3">
                Generating your dashboard...
              </Typography>
            </div>
            <Typography variant="body2" css={{ marginTop: '8px', opacity: 0.9 }}>
              Claude Sonnet 4 is creating a custom dashboard with SSA UI Kit components
            </Typography>
          </CardContent>
        </Card>
      )}
      </div>
    </FormProvider>
  );
};

export default AIDashboardGenerator;
