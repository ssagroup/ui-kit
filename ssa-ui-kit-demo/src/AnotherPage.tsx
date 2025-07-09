import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  BarGaugeChart,
  PieChart,
  PieChartLegend,
  Wrapper,
  Button,
  Icon,
} from '@ssa-ui-kit/core';
import { useTheme, css } from '@emotion/react';

export const StaffDashboard = () => {
  const theme = useTheme();

  // Mock staff data
  const departmentEfficiency = [
    {
      value: 85,
      title: 'Engineering',
      thresholds: [
        { value: 60, color: theme.colors.yellow || '#FDD835' },
        { value: 80, color: theme.colors.yellowWarm || '#FF8A65' },
      ],
      valueFormatter: (v: number, color: string) => (
        <div
          data-testid={`efficiency-engineering-value`}
          style={{ color, fontWeight: 'bold', fontSize: '16px' }}>
          {v}%
        </div>
      ),
    },
    {
      value: 92,
      title: 'Marketing',
      thresholds: [
        { value: 60, color: theme.colors.yellow || '#FDD835' },
        { value: 80, color: theme.colors.yellowWarm || '#FF8A65' },
      ],
      valueFormatter: (v: number, color: string) => (
        <div
          data-testid={`efficiency-marketing-value`}
          style={{ color, fontWeight: 'bold', fontSize: '16px' }}>
          {v}%
        </div>
      ),
    },
    {
      value: 78,
      title: 'Sales',
      thresholds: [
        { value: 60, color: theme.colors.yellow || '#FDD835' },
        { value: 80, color: theme.colors.yellowWarm || '#FF8A65' },
      ],
      valueFormatter: (v: number, color: string) => (
        <div
          data-testid={`efficiency-sales-value`}
          style={{ color, fontWeight: 'bold', fontSize: '16px' }}>
          {v}%
        </div>
      ),
    },
    {
      value: 96,
      title: 'HR',
      thresholds: [
        { value: 60, color: theme.colors.yellow || '#FDD835' },
        { value: 80, color: theme.colors.yellowWarm || '#FF8A65' },
      ],
      valueFormatter: (v: number, color: string) => (
        <div
          data-testid={`efficiency-hr-value`}
          style={{ color, fontWeight: 'bold', fontSize: '16px' }}>
          {v}%
        </div>
      ),
    },
  ];

  const skillCompetency = [
    {
      value: 88,
      title: 'React/TypeScript',
      thresholds: [
        { value: 50, color: theme.colors.red || '#F44336' },
        { value: 75, color: theme.colors.yellow || '#FDD835' },
      ],
      valueFormatter: (v: number, color: string) => (
        <div
          data-testid={`skill-react-value`}
          style={{ color, fontWeight: 'bold', fontSize: '16px' }}>
          {v}%
        </div>
      ),
    },
    {
      value: 82,
      title: 'Node.js/Backend',
      thresholds: [
        { value: 50, color: theme.colors.red || '#F44336' },
        { value: 75, color: theme.colors.yellow || '#FDD835' },
      ],
      valueFormatter: (v: number, color: string) => (
        <div
          data-testid={`skill-nodejs-value`}
          style={{ color, fontWeight: 'bold', fontSize: '16px' }}>
          {v}%
        </div>
      ),
    },
    {
      value: 75,
      title: 'DevOps/Cloud',
      thresholds: [
        { value: 50, color: theme.colors.red || '#F44336' },
        { value: 75, color: theme.colors.yellow || '#FDD835' },
      ],
      valueFormatter: (v: number, color: string) => (
        <div
          data-testid={`skill-devops-value`}
          style={{ color, fontWeight: 'bold', fontSize: '16px' }}>
          {v}%
        </div>
      ),
    },
    {
      value: 90,
      title: 'UI/UX Design',
      thresholds: [
        { value: 50, color: theme.colors.red || '#F44336' },
        { value: 75, color: theme.colors.yellow || '#FDD835' },
      ],
      valueFormatter: (v: number, color: string) => (
        <div
          data-testid={`skill-design-value`}
          style={{ color, fontWeight: 'bold', fontSize: '16px' }}>
          {v}%
        </div>
      ),
    },
  ];

  const workloadData = [
    {
      value: 70,
      title: 'Q1 Projects',
      thresholds: [
        { value: 40, color: theme.colors.green || '#4CAF50' },
        { value: 80, color: theme.colors.yellow || '#FDD835' },
      ],
      valueFormatter: (v: number, color: string) => (
        <div
          data-testid={`workload-q1-value`}
          style={{ color, fontWeight: 'bold', fontSize: '16px' }}>
          {v}%
        </div>
      ),
    },
    {
      value: 85,
      title: 'Q2 Projects',
      thresholds: [
        { value: 40, color: theme.colors.green || '#4CAF50' },
        { value: 80, color: theme.colors.yellow || '#FDD835' },
      ],
      valueFormatter: (v: number, color: string) => (
        <div
          data-testid={`workload-q2-value`}
          style={{ color, fontWeight: 'bold', fontSize: '16px' }}>
          {v}%
        </div>
      ),
    },
    {
      value: 92,
      title: 'Q3 Projects',
      thresholds: [
        { value: 40, color: theme.colors.green || '#4CAF50' },
        { value: 80, color: theme.colors.yellow || '#FDD835' },
      ],
      valueFormatter: (v: number, color: string) => (
        <div
          data-testid={`workload-q3-value`}
          style={{ color, fontWeight: 'bold', fontSize: '16px' }}>
          {v}%
        </div>
      ),
    },
  ];

  // Pie chart data for team distribution
  const teamDistribution = [
    {
      id: 'Frontend',
      label: 'Frontend',
      value: 12,
      color: theme.colors.blue || '#2196F3',
    },
    {
      id: 'Backend',
      label: 'Backend',
      value: 8,
      color: theme.colors.green || '#4CAF50',
    },
    {
      id: 'DevOps',
      label: 'DevOps',
      value: 4,
      color: theme.colors.yellowWarm || '#FF9800',
    },
    {
      id: 'Design',
      label: 'Design',
      value: 6,
      color: theme.colors.purple || '#9C27B0',
    },
  ];

  const handleExportReport = () => {
    console.log('Exporting staff report...');
    alert('Staff report export feature would be implemented here');
  };

  const handleRefreshData = () => {
    console.log('Refreshing dashboard data...');
    alert('Data refresh completed!');
  };

  return (
    <div
      style={{
        height: '100%',
        padding: '24px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        overflow: 'auto',
      }}>
      {/* Header Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
        }}>
        <div>
          <Typography
            variant="h1"
            css={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '8px',
            }}>
            Staff Performance Dashboard
          </Typography>
          <Typography
            variant="body2"
            css={{
              color: '#64748b',
              fontSize: '16px',
            }}>
            Real-time insights into team efficiency, skills, and workload
            distribution
          </Typography>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button
            variant="secondary"
            size="medium"
            onClick={handleRefreshData}
            data-testid="refresh-button"
            startIcon={<Icon name="circular" size={16} />}>
            Refresh
          </Button>
          <Button
            variant="primary"
            size="medium"
            onClick={handleExportReport}
            data-testid="export-button"
            startIcon={<Icon name="excel-download" size={16} />}>
            Export Report
          </Button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '24px',
          marginBottom: '24px',
        }}>
        {/* Department Efficiency Card */}
        <Card
          css={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid rgba(148, 163, 184, 0.1)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
            minHeight: '400px',
          }}>
          <CardHeader>
            <Typography
              variant="h3"
              css={{
                color: '#1e293b',
                marginBottom: '8px',
              }}>
              Department Efficiency
            </Typography>
            <Typography
              variant="body2"
              css={{
                color: '#64748b',
              }}>
              Performance metrics across different departments
            </Typography>
          </CardHeader>
          <CardContent css={{ width: '100%' }}>
            <div
              data-testid="department-efficiency-chart"
              css={{
                height: '300px',
                width: '100%',
                '& .bar-gauge-chart': {
                  width: '100% !important',
                },
                '& .bar-gauge-chart > *': {
                  width: '100% !important',
                },
              }}>
              <BarGaugeChart
                title=""
                bars={departmentEfficiency}
                features={['fullscreenMode']}
                wrapperProps={{
                  direction: 'column',
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Skill Competency Card */}
        <Card
          css={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid rgba(148, 163, 184, 0.1)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
            minHeight: '400px',
          }}>
          <CardHeader>
            <Typography
              variant="h3"
              css={{
                color: '#1e293b',
                marginBottom: '8px',
              }}>
              Technical Skill Competency
            </Typography>
            <Typography
              variant="body2"
              css={{
                color: '#64748b',
              }}>
              Average skill levels across key technologies
            </Typography>
          </CardHeader>{' '}
          <CardContent css={{ width: '100%' }}>
            <div
              data-testid="skill-competency-chart"
              css={{
                height: '300px',
                width: '100%',
                '& .bar-gauge-chart': {
                  width: '100% !important',
                },
                '& .bar-gauge-chart > *': {
                  width: '100% !important',
                },
              }}>
              <BarGaugeChart
                title=""
                bars={skillCompetency}
                features={['fullscreenMode']}
                wrapperProps={{
                  direction: 'column',
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Project Workload Card */}
        <Card
          css={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid rgba(148, 163, 184, 0.1)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
            minHeight: '400px',
          }}>
          <CardHeader>
            <Typography
              variant="h3"
              css={{
                color: '#1e293b',
                marginBottom: '8px',
              }}>
              Quarterly Workload
            </Typography>
            <Typography
              variant="body2"
              css={{
                color: '#64748b',
              }}>
              Resource allocation and capacity planning
            </Typography>
          </CardHeader>{' '}
          <CardContent css={{ width: '100%' }}>
            <div
              data-testid="workload-chart"
              css={{
                height: '300px',
                width: '100%',
                '& .bar-gauge-chart': {
                  width: '100% !important',
                },
                '& .bar-gauge-chart > *': {
                  width: '100% !important',
                },
              }}>
              <BarGaugeChart
                title=""
                bars={workloadData}
                features={['fullscreenMode']}
                wrapperProps={{
                  direction: 'column',
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Team Distribution Card */}
        <Card
          css={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid rgba(148, 163, 184, 0.1)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
            minHeight: '400px',
          }}>
          <CardHeader>
            <Typography
              variant="h3"
              css={{
                color: '#1e293b',
                marginBottom: '8px',
              }}>
              Team Distribution
            </Typography>
            <Typography
              variant="body2"
              css={{
                color: '#64748b',
              }}>
              Current team composition by specialization
            </Typography>
          </CardHeader>
          <CardContent css={{ width: '100%' }}>
            <div
              data-testid="team-distribution-chart"
              style={{ height: '300px', width: '100%' }}>
              <PieChart
                data={teamDistribution}
                features={['header', 'fullscreenMode']}
                colors={teamDistribution.map((item) => item.color)}
                tooltipProps={{
                  isEnabled: true,
                  outputType: 'value+percentage',
                }}
                css={{
                  width: '100%',
                  '& > .pie-chart-wrapper': {
                    width: '100%',
                    height: '250px',
                  },
                }}>
                <PieChartLegend
                  data={teamDistribution}
                  colors={teamDistribution.map((item) => item.color)}
                  markerStyles={css`
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                  `}
                  labelListStyles={css`
                    gap: 8px;
                    h6 {
                      font-weight: 600;
                      font-size: 14px;
                    }
                  `}
                  valueListStyles={css`
                    gap: 8px;
                    h6 {
                      color: #64748b;
                      font-size: 13px;
                    }
                  `}
                />
              </PieChart>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <Card
        css={{
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          color: 'white',
        }}>
        <CardContent css={{ width: '100%' }}>
          <Wrapper
            css={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              textAlign: 'center',
              width: '100%',
            }}>
            <div data-testid="total-employees">
              <Typography
                variant="h2"
                css={{ color: '#3b82f6', marginBottom: '8px' }}>
                30
              </Typography>
              <Typography variant="body2" css={{ color: '#cbd5e1' }}>
                Total Employees
              </Typography>
            </div>
            <div data-testid="avg-efficiency">
              <Typography
                variant="h2"
                css={{ color: '#10b981', marginBottom: '8px' }}>
                87.8%
              </Typography>
              <Typography variant="body2" css={{ color: '#cbd5e1' }}>
                Average Efficiency
              </Typography>
            </div>
            <div data-testid="projects-active">
              <Typography
                variant="h2"
                css={{ color: '#f59e0b', marginBottom: '8px' }}>
                12
              </Typography>
              <Typography variant="body2" css={{ color: '#cbd5e1' }}>
                Active Projects
              </Typography>
            </div>
            <div data-testid="satisfaction-score">
              <Typography
                variant="h2"
                css={{ color: '#8b5cf6', marginBottom: '8px' }}>
                4.7/5
              </Typography>
              <Typography variant="body2" css={{ color: '#cbd5e1' }}>
                Satisfaction Score
              </Typography>
            </div>
          </Wrapper>
        </CardContent>
      </Card>
    </div>
  );
};

// For backward compatibility
export const AnotherPage = StaffDashboard;
