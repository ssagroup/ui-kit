import { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  BarLineComplexChart,
  Button,
  ButtonGroup,
  Wrapper,
} from '@ssa-ui-kit/core';
import { BarLineChartItem } from '@ssa-ui-kit/core';

// Sample data for different scenarios
const generateTimestamps = (months: number) => {
  const timestamps = [];
  const startDate = new Date('2023-01-01');
  for (let i = 0; i < months; i++) {
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + i);
    timestamps.push(date.getTime());
  }
  return timestamps;
};

const timestamps = generateTimestamps(12);

// Sales Performance Data
const salesData: BarLineChartItem[] = [
  {
    x: timestamps,
    y: [120, 135, 148, 162, 155, 178, 195, 188, 172, 165, 182, 198],
    name: 'North Region',
    type: 'bar',
    selected: true,
    marker: { color: '#3b82f6' },
  },
  {
    x: timestamps,
    y: [98, 112, 125, 138, 142, 156, 163, 171, 158, 149, 167, 175],
    name: 'South Region',
    type: 'bar',
    selected: true,
    marker: { color: '#10b981' },
  },
  {
    x: timestamps,
    y: [85, 92, 108, 115, 122, 118, 134, 141, 128, 135, 152, 148],
    name: 'East Region',
    type: 'bar',
    selected: true,
    marker: { color: '#f59e0b' },
  },
  {
    x: timestamps,
    y: [76, 88, 95, 102, 98, 105, 112, 108, 95, 89, 96, 103],
    name: 'West Region',
    type: 'bar',
    selected: false,
    marker: { color: '#ef4444' },
  },
  {
    x: timestamps,
    y: [95, 107, 119, 129, 129, 139, 151, 152, 138, 135, 149, 156],
    name: 'Average Sales',
    type: 'scatter',
    selected: true,
    marker: { color: '#8b5cf6' },
  },
  {
    x: timestamps,
    y: [130, 142, 155, 168, 165, 182, 198, 195, 178, 171, 188, 205],
    name: 'Target',
    type: 'scatter',
    selected: true,
    marker: { color: '#ec4899' },
    line: { dash: 'dash' },
  },
];

// Revenue & Profit Data
const revenueData: BarLineChartItem[] = [
  {
    x: timestamps,
    y: [850, 920, 1050, 1180, 1240, 1380, 1520, 1450, 1320, 1290, 1410, 1580],
    name: 'Revenue',
    type: 'bar',
    selected: true,
    marker: { color: '#059669' },
    valueDimension: 'K',
  },
  {
    x: timestamps,
    y: [680, 750, 840, 920, 980, 1100, 1220, 1150, 1050, 1020, 1130, 1260],
    name: 'Costs',
    type: 'bar',
    selected: true,
    marker: { color: '#dc2626' },
    valueDimension: 'K',
  },
  {
    x: timestamps,
    y: [170, 170, 210, 260, 260, 280, 300, 300, 270, 270, 280, 320],
    name: 'Profit',
    type: 'scatter',
    selected: true,
    marker: { color: '#7c3aed' },
    valueDimension: 'K',
  },
  {
    x: timestamps,
    y: [20, 18.5, 20, 22, 21, 20.3, 19.7, 20.7, 20.5, 20.9, 19.9, 20.3],
    name: 'Profit Margin %',
    type: 'scatter',
    selected: true,
    marker: { color: '#f97316' },
    yaxis: 'y2',
    valueDimension: '%',
  },
];

// Employee Performance Data
const employeeData: BarLineChartItem[] = [
  {
    x: timestamps,
    y: [45, 48, 52, 55, 58, 62, 65, 63, 59, 57, 61, 64],
    name: 'Developers',
    type: 'bar',
    selected: true,
    marker: { color: '#2563eb' },
  },
  {
    x: timestamps,
    y: [15, 16, 18, 19, 20, 22, 24, 23, 21, 20, 22, 25],
    name: 'Designers',
    type: 'bar',
    selected: true,
    marker: { color: '#7c3aed' },
  },
  {
    x: timestamps,
    y: [8, 9, 10, 11, 12, 13, 14, 14, 13, 12, 13, 14],
    name: 'QA Engineers',
    type: 'bar',
    selected: true,
    marker: { color: '#059669' },
  },
  {
    x: timestamps,
    y: [88, 91, 93, 95, 92, 96, 98, 94, 89, 87, 92, 96],
    name: 'Productivity Score',
    type: 'scatter',
    selected: true,
    marker: { color: '#dc2626' },
    valueDimension: '%',
  },
];

type DatasetType = 'sales' | 'revenue' | 'employee';
type LineShapeType = 'linear' | 'spline';
type FeatureType = 'filtering' | 'fullscreenMode' | 'header';

export const BarLineComplexChartDemo = () => {
  const [selectedDataset, setSelectedDataset] = useState<DatasetType>('sales');
  const [lineShape, setLineShape] = useState<LineShapeType>('linear');
  const [features, setFeatures] = useState<FeatureType[]>(['filtering', 'fullscreenMode']);

  const getDataset = () => {
    switch (selectedDataset) {
      case 'sales':
        return salesData;
      case 'revenue':
        return revenueData;
      case 'employee':
        return employeeData;
      default:
        return salesData;
    }
  };

  const getTitle = () => {
    switch (selectedDataset) {
      case 'sales':
        return 'Sales Performance Dashboard';
      case 'revenue':
        return 'Revenue & Profit Analysis';
      case 'employee':
        return 'Employee Performance Metrics';
      default:
        return 'Bar & Line Complex Chart';
    }
  };

  const handleDatasetChange = (dataset: DatasetType) => {
    setSelectedDataset(dataset);
  };

  const handleLineShapeChange = (shape: 'linear' | 'spline') => {
    setLineShape(shape);
  };

  const handleFeatureToggle = (feature: FeatureType) => {
    setFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  return (
    <div style={{
      height: '100%',
      padding: '24px',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      overflow: 'auto'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <Typography variant="h1" css={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
        }}>
          BarLineComplexChart Demo
        </Typography>
        <Typography variant="body2" css={{
          color: '#64748b',
          fontSize: '16px',
        }}>
          Explore the powerful BarLineComplexChart component with different datasets and configurations
        </Typography>
      </div>

      {/* Controls */}
      <Card css={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
        marginBottom: '24px'
      }}>
        <CardHeader>
          <Typography variant="h3" css={{ color: '#1e293b' }}>
            Chart Configuration
          </Typography>
        </CardHeader>
        <CardContent>
          <Wrapper direction="column" css={{ gap: '20px' }}>
            {/* Dataset Selection */}
            <div>
              <Typography variant="body2" css={{ 
                marginBottom: '12px', 
                fontWeight: 'bold',
                color: '#374151'
              }}>
                Select Dataset:
              </Typography>
              <ButtonGroup
                items={[
                  { id: 'sales', text: 'Sales Performance', isDisabled: false },
                  { id: 'revenue', text: 'Revenue & Profit', isDisabled: false },
                  { id: 'employee', text: 'Employee Metrics', isDisabled: false },
                ]}
                selectedItem={{ id: selectedDataset, text: '', isDisabled: false }}
                onClick={(item) => handleDatasetChange(item.id as DatasetType)}
              />
            </div>

            {/* Line Shape Selection */}
            <div>
              <Typography variant="body2" css={{ 
                marginBottom: '12px', 
                fontWeight: 'bold',
                color: '#374151'
              }}>
                Line Shape:
              </Typography>
              <ButtonGroup
                items={[
                  { id: 'linear', text: 'Linear', isDisabled: false },
                  { id: 'spline', text: 'Spline', isDisabled: false },
                ]}
                selectedItem={{ id: lineShape, text: '', isDisabled: false }}
                onClick={(item) => handleLineShapeChange(item.id as LineShapeType)}
              />
            </div>

            {/* Features Toggle */}
            <div>
              <Typography variant="body2" css={{ 
                marginBottom: '12px', 
                fontWeight: 'bold',
                color: '#374151'
              }}>
                Features:
              </Typography>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Button
                  variant={features.includes('filtering') ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => handleFeatureToggle('filtering')}
                  data-testid="filtering-feature-btn"
                >
                  Filtering
                </Button>
                <Button
                  variant={features.includes('fullscreenMode') ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => handleFeatureToggle('fullscreenMode')}
                  data-testid="fullscreen-feature-btn"
                >
                  Fullscreen Mode
                </Button>
                <Button
                  variant={features.includes('header') ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => handleFeatureToggle('header')}
                  data-testid="header-feature-btn"
                >
                  Header
                </Button>
              </div>
            </div>
          </Wrapper>
        </CardContent>
      </Card>

      {/* Chart Display */}
      <Card css={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
        marginBottom: '24px'
      }}>
        <CardContent css={{ padding: '20px' }}>
          <BarLineComplexChart
            data={getDataset()}
            width="100%"
            height="400px"
            lineShape={lineShape}
            features={features}
            cardProps={{
              title: getTitle(),
            }}
            maxVisibleBars={5}
            maxVisibleLines={3}
            onChange={(name, isSelected) => {
              console.log(`${name} is now ${isSelected ? 'selected' : 'deselected'}`);
            }}
            onFullscreenModeChange={(isFullscreen) => {
              console.log(`Fullscreen mode: ${isFullscreen}`);
            }}
            data-testid="barline-complex-chart"
          />
        </CardContent>
      </Card>

      {/* Information Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '24px'
      }}>
        <Card css={{
          background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
        }}>
          <CardHeader>
            <Typography variant="h4" css={{ color: '#1e40af' }}>
              Features Overview
            </Typography>
          </CardHeader>
          <CardContent>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#1e40af' }}>
              <li><strong>Filtering:</strong> Toggle data series visibility</li>
              <li><strong>Fullscreen Mode:</strong> Expand chart for detailed view</li>
              <li><strong>Interactive Tooltips:</strong> Hover for data details</li>
              <li><strong>Mixed Chart Types:</strong> Bars and lines in one chart</li>
              <li><strong>Dual Y-Axis:</strong> Support for different scales</li>
            </ul>
          </CardContent>
        </Card>

        <Card css={{
          background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
        }}>
          <CardHeader>
            <Typography variant="h4" css={{ color: '#065f46' }}>
              Data Structure
            </Typography>
          </CardHeader>
          <CardContent>
            <Typography variant="body2" css={{ color: '#065f46', marginBottom: '8px' }}>
              Each data item supports:
            </Typography>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#065f46' }}>
              <li><code>type</code>: 'bar' or 'scatter'</li>
              <li><code>selected</code>: Initial visibility</li>
              <li><code>marker.color</code>: Custom colors</li>
              <li><code>valueDimension</code>: Units (K, %, etc.)</li>
              <li><code>yaxis</code>: 'y' or 'y2' for dual axis</li>
            </ul>
          </CardContent>
        </Card>

        <Card css={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          border: '1px solid rgba(245, 158, 11, 0.2)',
        }}>
          <CardHeader>
            <Typography variant="h4" css={{ color: '#92400e' }}>
              Use Cases
            </Typography>
          </CardHeader>
          <CardContent>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#92400e' }}>
              <li>Financial dashboards</li>
              <li>Performance analytics</li>
              <li>Sales reporting</li>
              <li>KPI monitoring</li>
              <li>Comparative analysis</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Code Example */}
      <Card css={{
        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
        border: '1px solid rgba(107, 114, 128, 0.2)',
      }}>
        <CardHeader>
          <Typography variant="h4" css={{ color: '#374151' }}>
            Code Example
          </Typography>
        </CardHeader>
        <CardContent>
          <pre style={{
            background: '#1f2937',
            color: '#f9fafb',
            padding: '16px',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
{`import { BarLineComplexChart } from '@ssa-ui-kit/core';

const data = [
  {
    x: [timestamps],
    y: [values],
    name: 'Sales',
    type: 'bar',
    selected: true,
    marker: { color: '#3b82f6' },
  },
  {
    x: [timestamps],
    y: [values],
    name: 'Target',
    type: 'scatter',
    selected: true,
    marker: { color: '#ef4444' },
    valueDimension: 'K',
  },
];

<BarLineComplexChart
  data={data}
  width="100%"
  height="400px"
  lineShape="spline"
  features={['filtering', 'fullscreenMode']}
  cardProps={{ title: 'My Chart' }}
  onChange={(name, isSelected) => console.log(name, isSelected)}
/>`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default BarLineComplexChartDemo;
