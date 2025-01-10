import { JSONObject } from '../../types';

export const translationConfig: JSONObject = {
  en: {
    messages: {
      noDataYet: 'No data yet',
    },
    pages: {
      dashboard: {
        indicators: {
          employees: 'Employees',
          fte: 'FTE',
          utilization: 'Utilization',
          onBench: 'On Bench',
          seniorityLevel: 'Seniority Level',
          employeeTenure: 'Employee Tenure',
          staffTurnover: 'Staff Turnover',
          years: 'years',
        },
      },
    },
    widgets: {
      gender: {
        title: 'Gender',
        male: 'Male',
        female: 'Female',
        others: 'Others',
      },
      staffType: {
        title: 'Staff Type',
        administrative: 'Administrative',
        production: 'Production',
      },
      workSchedule: {
        title: 'Work Schedule',
        fullTime: 'Full time',
        partTime: 'Part time',
      },
      employmentType: {
        title: 'Employment Type',
        contractors: 'Contractors',
        staff: 'Staff',
      },
      seniorityLevel: {
        title: 'Seniority Level',
      },
      ageChart: {
        title: 'Age',
      },
      educationLevel: {
        title: 'Education Level',
      },
      departments: {
        title: 'Departments',
      },
      events: {
        title: 'Events',
        next: 'Next',
        more: 'More',
        noEvents: 'No events',
        birthdays: 'Birthdays',
        anniversaries: 'Anniversaries',
        newComers: 'Newcomers',
        trialEnds: 'Trial Ends',
        assessments: 'Assessments',
        terminations: 'Terminations',
        nextBirthday: 'next birthday',
        nextBirthdays: 'next birthdays',
        nextAnniversary: 'next anniversary',
        nextAnniversaries: 'next anniversaries',
        nextTrialEndDate: 'next trial end date',
        nextTrialEndDates: 'next trial end dates',
        nextTrialTerminationDate: 'next termination date',
        nextTrialTerminationDates: 'next termination dates',
      },
      fte: {
        title: 'FTE',
      },
      headCountByFullCompany: {
        title: 'Headcount',
      },
      seniorityOfProductionEmployees: {
        title: 'Seniority of Production Employees',
      },
      productionAdministrative: {
        title: 'Production / Administrative',
      },
      utilization: {
        title: 'Utilization, %',
      },
      resourcesOnBench: {
        title: 'Resources on bench',
      },
    },
  },
};
