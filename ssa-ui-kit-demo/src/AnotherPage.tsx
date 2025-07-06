import { Typography, Card, CardHeader, CardContent } from '@ssa-ui-kit/core';

export const AnotherPage = () => {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Card css={{ maxWidth: '600px', width: '100%' }}>
        <CardHeader>
          <Typography variant="h1">Another Page</Typography>
          <Typography variant="body2">
            This is another page in the SSA UI Kit demo application
          </Typography>
        </CardHeader>
        <CardContent>
          <Typography variant="body1">
            This page demonstrates the routing capabilities of the application
            with the CollapsibleNavBar component from SSA UI Kit.
          </Typography>
          <br />
          <Typography variant="body2">
            You can navigate between pages using the collapsible navigation
            on the left side of the screen.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
