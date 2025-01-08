import * as API from '@/peopleops/types';
import { DateTime } from 'luxon';

export const useDashboardGraphs =
  (): API.CommonAPIResponse<API.DashboardGraphs> => {
    let firstDate = DateTime.now();
    firstDate = firstDate.set({ day: 15, hour: 12 });
    const dynamicTimestamps: number[] = [firstDate.toMillis()];
    for (let i = 1; i < 12; i++) {
      const newDate = firstDate.plus({ month: i });
      dynamicTimestamps.push(newDate.toMillis());
    }
    const queryResult = {
      result: {
        timeStamps: dynamicTimestamps,
        headCountByFullCompanyGraph: [
          {
            values: [55, 53, 50, 50, 48, 47, 45, 43, 44, 45, 44, 44],
            name: 'Production',
            type: 'scatter',
            color: '#4CBFFD',
            selected: true,
          },
          {
            values: [29, 29, 24, 24, 21, 20, 20, 19, 19, 19, 19, 19],
            name: 'Administrative',
            type: 'scatter',
            color: '#FDC67D',
            selected: true,
          },
          {
            values: [74, 72, 64, 63, 59, 57, 54, 51, 53, 54, 52, 52],
            name: 'Staff',
            type: 'scatter',
            color: '#F9F789',
            selected: true,
          },
          {
            values: [10, 10, 10, 11, 10, 10, 11, 11, 10, null, 11, 11],
            name: 'Contractor',
            type: 'scatter',
            color: '#2CBB97',
            selected: true,
          },
          {
            values: [84, 82, 74, 74, 69, 67, 65, 62, 63, 64, 63, 63],
            name: 'All',
            type: 'scatter',
            color: '#9260FC',
            selected: true,
          },
        ],
        fteGraph: [
          {
            values: [
              51.0, 48.5, 45.5, 45.5, 43.5, 42.6, 40.9, 39.4, 40.9, 41.9, 39.9,
              39.9,
            ],
            name: 'Production',
            type: 'scatter',
            color: '#4CBFFD',
            selected: true,
          },
          {
            values: [
              25.9, 25.9, 20.9, 20.9, 18.8, 17.0, 17.0, 16.0, 16.0, 16.0, 15.95,
              15.95,
            ],
            name: 'Administrative',
            type: 'scatter',
            color: '#FDC67D',
            selected: true,
          },
          {
            values: [
              76.9, 74.4, 66.4, 66.4, 62.3, 59.6, 57.9, 55.4, 56.9, 57.9, 55.85,
              55.85,
            ],
            name: 'All',
            type: 'scatter',
            color: '#9260FC',
            selected: true,
          },
        ],
        productionAdministrativeGraph: [
          {
            showOnHover: true,
            valueDimension: '%',
            values: [
              66.32, 65.19, 68.52, 68.52, 69.82, 71.48, 70.64, 71.12, 71.88,
              72.37, 71.44, 71.44,
            ],
            name: 'Production',
            type: 'bar',
            color: '#4CBFFD',
            selected: true,
          },
          {
            showOnHover: true,
            valueDimension: '%',
            values: [
              33.68, 34.81, 31.48, 31.48, 30.18, 28.52, 29.36, 28.88, 28.12,
              27.63, 28.56, 28.56,
            ],
            name: 'Administrative',
            type: 'bar',
            color: '#FDC67D',
            selected: true,
          },
          {
            showOnHover: false,
            valueDimension: '%',
            values: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
            name: '30% (trigger value)',
            type: 'scatter',
            color: '#9260FC',
            selected: true,
          },
          {
            showOnHover: false,
            valueDimension: '%',
            values: [35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35],
            name: '35% (critical value)',
            type: 'scatter',
            color: '#F463EA',
            selected: true,
          },
        ],
        seniorityProductionEmployeesGraph: [
          {
            showOnHover: true,
            valueDimension: '%',
            values: [
              93.0, 93.0, 93.0, 92.0, 92.0, 92.0, 92.0, 92.0, 92.31, 92.31,
              92.0, 92.31,
            ],
            name: 'Fullstack .NET',
            type: 'bar',
            color: '#2CBB97',
            selected: true,
          },
          {
            showOnHover: true,
            valueDimension: '%',
            values: [
              94.0, 94.0, 94.0, 94.0, 94.0, 94.0, 93.0, 93.0, 92.65, 93.06,
              93.0, 93.33,
            ],
            name: 'Data & Desktop',
            type: 'bar',
            color: '#5B8DEC',
            selected: true,
          },
          {
            showOnHover: true,
            valueDimension: '%',
            values: [
              89.0, 93.0, 96.0, 96.0, 96.0, 96.0, 97.0, 96.0, 96.15, 96.15,
              96.0, 96.15,
            ],
            name: 'SSA Data Bundle',
            type: 'bar',
            color: '#BE49EC',
            selected: true,
          },
          {
            showOnHover: true,
            valueDimension: '%',
            values: [
              91.0, 93.0, 94.0, 94.0, 94.0, 94.0, 94.0, 94.0, 93.75, 93.89,
              94.0, 94.0, 93.9,
            ],
            name: 'Total Seniority',
            type: 'scatter',
            color: '#9260FC',
            selected: true,
          },
        ],
        utilizationGraph: [
          {
            showOnHover: true,
            valueDimension: '%',
            values: [
              100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0,
              100.0, 100.0, 100.0,
            ],
            name: 'Fullstack .NET',
            type: 'bar',
            color: '#2CBB97',
            selected: true,
          },
          {
            showOnHover: true,
            valueDimension: '%',
            values: [
              100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0,
              100.0, 100.0, 100.0,
            ],
            name: 'Data & Desktop',
            type: 'bar',
            color: '#5B8DEC',
            selected: true,
          },
          {
            showOnHover: true,
            valueDimension: '%',
            values: [
              91.84, 87.35, 89.0, 89.69, 89.69, 81.56, 85.33, 83.08, 88.33,
              88.33, 84.29, 84.29,
            ],
            name: 'SSA Data Bundle',
            type: 'bar',
            color: '#BE49EC',
            selected: true,
          },
          {
            showOnHover: true,
            valueDimension: '%',
            values: [
              97.96, 96.84, 97.25, 97.42, 96.56, 93.85, 95.11, 94.36, 96.11,
              96.11, 94.76, 94.76, 94.76,
            ],
            name: 'Total Utilization',
            type: 'scatter',
            color: '#FFA069',
            selected: true,
          },
        ],
        resourcesOnBenchGraph: [
          {
            showOnHover: true,
            valueDimension: null,
            values: [
              0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            ],
            name: 'Fullstack .NET',
            type: 'bar',
            color: '#2CBB97',
            selected: true,
          },
          {
            showOnHover: true,
            valueDimension: null,
            values: [
              0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            ],
            name: 'Data & Desktop',
            type: 'bar',
            color: '#5B8DEC',
            selected: true,
          },
          {
            showOnHover: true,
            valueDimension: null,
            values: [
              1.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            ],
            name: 'SSA Data Bundle',
            type: 'bar',
            color: '#BE49EC',
            selected: true,
          },
          {
            showOnHover: false,
            valueDimension: null,
            values: [
              1.0, 1.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            ],
            name: 'Total production',
            type: 'scatter',
            color: '#FDE47D',
            selected: true,
          },
          {
            showOnHover: false,
            valueDimension: null,
            values: [
              0.75, 1.25, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            ],
            name: 'Total FTE',
            type: 'scatter',
            color: '#4CBFFD',
            selected: true,
          },
        ],
        departmentsIndicatorsGraphs: [
          {
            departmentName: 'Fullstack .NET',
            departmentGraphData: [
              {
                values: [
                  14.0, 14.0, 14.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0,
                  13.0, 13.0,
                ],
                name: 'Headcount',
                type: 'bar',
                color: '#9260FC',
                selected: true,
              },
              {
                values: [
                  14.0, 14.0, 14.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0,
                  13.0, 13.0,
                ],
                name: 'FTE',
                type: 'bar',
                color: '#3C4ECF',
                selected: true,
              },
              {
                values: [
                  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                ],
                name: 'Bench',
                type: 'bar',
                color: '#FDE47D',
                selected: true,
              },
            ],
          },
          {
            departmentName: 'Data & Desktop',
            departmentGraphData: [
              {
                values: [
                  17.0, 17.0, 16.0, 16.0, 16.0, 16.0, 15.0, 15.0, 17.0, 18.0,
                  18.0, 15.0,
                ],
                name: 'Headcount',
                type: 'bar',
                color: '#9260FC',
                selected: true,
              },
              {
                values: [
                  17.0, 17.0, 16.0, 16.0, 16.0, 16.0, 15.0, 15.0, 17.0, 18.0,
                  15.0, 15.0,
                ],
                name: 'FTE',
                type: 'bar',
                color: '#3C4ECF',
                selected: true,
              },
              {
                values: [
                  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                ],
                name: 'Bench',
                type: 'bar',
                color: '#FDE47D',
                selected: true,
              },
            ],
          },
          {
            departmentName: 'SSA Data Bundle',
            departmentGraphData: [
              {
                values: [
                  21.0, 19.0, 17.0, 18.0, 18.0, 17.0, 16.0, 14.0, 13.0, 13.0,
                  13.0, 15.0,
                ],
                name: 'Headcount',
                type: 'bar',
                color: '#9260FC',
                selected: true,
              },
              {
                values: [
                  17.8, 15.3, 13.3, 14.3, 14.3, 13.4, 12.7, 11.2, 10.7, 10.7,
                  11.7, 11.7,
                ],
                name: 'FTE',
                type: 'bar',
                color: '#3C4ECF',
                selected: true,
              },
              {
                values: [
                  1.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                ],
                name: 'Bench',
                type: 'bar',
                color: '#FDE47D',
                selected: true,
              },
            ],
          },
        ],
      } as API.DashboardGraphs,
      targetUrl: null,
      success: true,
      unAuthorizedRequest: false,
    };

    return queryResult;
  };

export const useDashboardGraphsData = () => {
  const { result } = useDashboardGraphs();
  return result;
};
