// Global setup for Jest
// Sets timezone for consistent date/time testing across environments
export default () => {
  process.env.TZ = 'Europe/London';
  return Promise.resolve();
};
