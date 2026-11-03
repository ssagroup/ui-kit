import { Chip } from '@components/Chip';
import { DataTableColumn, DataTableSort } from '../types';

export type Employee = {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  location: string;
  salary: number;
  status: 'Active' | 'On leave';
};

const names = [
  'Ada Lovelace',
  'Alan Turing',
  'Grace Hopper',
  'Linus Torvalds',
  'Margaret Hamilton',
  'Dennis Ritchie',
  'Barbara Liskov',
  'Ken Thompson',
  'Frances Allen',
  'Edsger Dijkstra',
  'Radia Perlman',
  'Donald Knuth',
  'Hedy Lamarr',
  'John McCarthy',
  'Katherine Johnson',
  'Tim Berners-Lee',
  'Annie Easley',
  'Bjarne Stroustrup',
  'Jean Bartik',
  'Guido van Rossum',
];
const departments = ['Engineering', 'Design', 'Finance', 'People'];
const roles = ['Engineer', 'Lead', 'Manager', 'Analyst'];
const locations = ['Kyiv', 'Lviv', 'Warsaw', 'Lisbon', 'Remote'];

export const employees: Employee[] = names.map((name, index) => ({
  id: `e${index + 1}`,
  name,
  email: `${name.split(' ')[0].toLowerCase()}@example.com`,
  department: departments[index % departments.length],
  role: roles[(index * 3) % roles.length],
  location: locations[(index * 7) % locations.length],
  salary: 3000 + ((index * 937) % 5000),
  status: index % 6 === 5 ? 'On leave' : 'Active',
}));

const formatSalary = (value: number) => `$${value.toLocaleString('en-US')}`;

/** Columns for the stories; `name`, `department` and `salary` sort, server-style. */
export const employeeColumns: DataTableColumn<Employee>[] = [
  { id: 'name', header: 'Name', cell: (row) => row.name, sortable: true },
  { id: 'email', header: 'Email', cell: (row) => row.email },
  {
    id: 'department',
    header: 'Department',
    cell: (row) => row.department,
    sortable: true,
  },
  { id: 'role', header: 'Role', cell: (row) => row.role },
  { id: 'location', header: 'Location', cell: (row) => row.location },
  {
    id: 'salary',
    header: 'Salary',
    cell: (row) => formatSalary(row.salary),
    align: 'right',
    sortable: true,
    sortKey: 'Salary',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (row) => (
      <Chip
        label={row.status}
        variant="outlined"
        color={row.status === 'Active' ? 'success' : 'warning'}
        size="small"
        showIcon={false}
      />
    ),
  },
];

/** Stands in for an API that sorts on the server. */
export const fetchEmployees = (sort: DataTableSort | null) =>
  new Promise<Employee[]>((resolve) => {
    const rows = employees.slice();
    if (sort) {
      const key = sort.columnId as keyof Employee;
      rows.sort((a, b) =>
        String(a[key]).localeCompare(String(b[key]), undefined, {
          numeric: true,
        }),
      );
      if (sort.direction === 'desc') rows.reverse();
    }
    setTimeout(() => resolve(rows), 600);
  });

/** A department with its people, or a person: one row type for a tree. */
export type OrgRow = {
  id: string;
  name: string;
  role: string;
  location: string;
  salary: number;
  members?: OrgRow[];
};

/** Employees grouped under their departments, each with its payroll. */
export const departmentTree: OrgRow[] = [
  ...new Set(employees.map(({ department }) => department)),
].map((department) => {
  const members = employees
    .filter((employee) => employee.department === department)
    .map(({ id, name, role, location, salary }) => ({
      id,
      name,
      role,
      location,
      salary,
    }));
  return {
    id: `dept-${department}`,
    name: department,
    role: `${members.length} people`,
    location: '',
    salary: members.reduce((total, { salary }) => total + salary, 0),
    members,
  };
});

export const orgColumns: DataTableColumn<OrgRow>[] = [
  {
    id: 'name',
    header: 'Name',
    cell: (row) => row.name,
    sortable: true,
    sortFn: (a, b) => a.name.localeCompare(b.name),
  },
  { id: 'role', header: 'Role', cell: (row) => row.role },
  { id: 'location', header: 'Location', cell: (row) => row.location },
  {
    id: 'salary',
    header: 'Salary',
    cell: (row) => formatSalary(row.salary),
    align: 'right',
    sortable: true,
    sortFn: (a, b) => a.salary - b.salary,
  },
];
