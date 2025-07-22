import { useState, useMemo, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Icon,
  Wrapper,
} from '@ssa-ui-kit/core';

// Office interface
interface Office {
  id: number;
  title: string;
  streetAddress: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Form data interface
interface OfficeFormData {
  title: string;
  streetAddress: string;
  isActive: boolean;
}

// Mock data for demonstration
const generateMockOffices = (): Office[] => {
  const offices = [
    { title: 'New York Headquarters', streetAddress: '123 Broadway, New York, NY 10001', isActive: true },
    { title: 'San Francisco Office', streetAddress: '456 Market Street, San Francisco, CA 94102', isActive: true },
    { title: 'Chicago Branch', streetAddress: '789 Michigan Avenue, Chicago, IL 60611', isActive: false },
    { title: 'Los Angeles Studio', streetAddress: '321 Hollywood Blvd, Los Angeles, CA 90028', isActive: true },
    { title: 'Boston Office', streetAddress: '654 Boylston Street, Boston, MA 02116', isActive: true },
    { title: 'Seattle Hub', streetAddress: '987 Pine Street, Seattle, WA 98101', isActive: false },
    { title: 'Miami Branch', streetAddress: '147 Ocean Drive, Miami, FL 33139', isActive: true },
    { title: 'Austin Office', streetAddress: '258 Congress Avenue, Austin, TX 78701', isActive: true },
    { title: 'Denver Location', streetAddress: '369 16th Street, Denver, CO 80202', isActive: false },
    { title: 'Portland Office', streetAddress: '741 SW Morrison Street, Portland, OR 97205', isActive: true },
    { title: 'Phoenix Branch', streetAddress: '852 Central Avenue, Phoenix, AZ 85004', isActive: true },
    { title: 'Atlanta Hub', streetAddress: '963 Peachtree Street, Atlanta, GA 30309', isActive: false },
    { title: 'Philadelphia Office', streetAddress: '159 Market Street, Philadelphia, PA 19106', isActive: true },
    { title: 'San Diego Studio', streetAddress: '357 Harbor Drive, San Diego, CA 92101', isActive: true },
    { title: 'Dallas Branch', streetAddress: '468 Main Street, Dallas, TX 75201', isActive: false },
  ].map((office, index) => ({
    id: index + 1,
    ...office,
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
  }));
  
  return offices;
};

type SortField = 'title' | 'streetAddress' | 'isActive' | 'createdAt';
type SortDirection = 'asc' | 'desc';

export const OfficeManagement = () => {
  // State management
  const [offices, setOffices] = useState<Office[]>(generateMockOffices());
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<SortField>('title');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffice, setEditingOffice] = useState<Office | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState<OfficeFormData>({
    title: '',
    streetAddress: '',
    isActive: true,
  });

  // Form handlers
  const handleInputChange = (field: keyof OfficeFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Filter and sort offices
  const filteredAndSortedOffices = useMemo(() => {
    let filtered = offices.filter(office =>
      office.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.streetAddress.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort offices
    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'isActive') {
        aValue = aValue ? 1 : 0;
        bValue = bValue ? 1 : 0;
      } else if (sortField === 'createdAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else {
        aValue = aValue.toString().toLowerCase();
        bValue = bValue.toString().toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [offices, searchTerm, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedOffices.length / pageSize);
  const paginatedOffices = filteredAndSortedOffices.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Handlers
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleAdd = () => {
    setEditingOffice(null);
    setFormData({ title: '', streetAddress: '', isActive: true });
    setIsModalOpen(true);
  };

  const handleEdit = (office: Office) => {
    setEditingOffice(office);
    setFormData({ 
      title: office.title, 
      streetAddress: office.streetAddress, 
      isActive: office.isActive 
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      setOffices(prev => prev.filter(office => office.id !== deleteConfirmId));
      setDeleteConfirmId(null);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.streetAddress.trim()) return;
    
    if (editingOffice) {
      // Update existing office
      setOffices(prev => prev.map(office =>
        office.id === editingOffice.id
          ? { ...office, ...formData, updatedAt: new Date() }
          : office
      ));
    } else {
      // Add new office
      const newOffice: Office = {
        id: Math.max(...offices.map(o => o.id)) + 1,
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setOffices(prev => [...prev, newOffice]);
    }
    setIsModalOpen(false);
    setFormData({ title: '', streetAddress: '', isActive: true });
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
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
          background: 'linear-gradient(135deg, #059669 0%, #3b82f6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
        }}>
          Office Management
        </Typography>
        <Typography variant="body2" css={{
          color: '#64748b',
          fontSize: '16px',
        }}>
          Manage company offices with full CRUD operations, search, and sorting
        </Typography>
      </div>

      {/* Controls */}
      <Card css={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
        marginBottom: '24px'
      }}>
        <CardContent>
          <Wrapper direction="row" css={{ 
            gap: '16px', 
            alignItems: 'center',
            flexWrap: 'wrap',
            '@media (max-width: 768px)': {
              flexDirection: 'column',
              alignItems: 'stretch'
            }
          }}>
            {/* Search */}
            <div style={{ flex: 1, minWidth: '250px' }}>
              <input
                type="text"
                placeholder="Search by title or address..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
                data-testid="search-input"
              />
            </div>
            
            {/* Page Size */}
            <div style={{ minWidth: '120px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '4px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#374151'
              }}>
                Per Page:
              </label>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
                data-testid="page-size-select"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            {/* Add Button */}
            <Button
              variant="primary"
              size="medium"
              onClick={handleAdd}
              startIcon={<Icon name="plus" size={16} />}
              data-testid="add-office-btn"
            >
              Add Office
            </Button>
          </Wrapper>
        </CardContent>
      </Card>

      {/* Office Table */}
      <Card css={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
        marginBottom: '24px'
      }}>
        <CardContent css={{ padding: 0 }}>
          <div style={{ overflowX: 'auto' }}>
            <Table data-testid="offices-table">
              <TableHead>
                <TableRow>
                  <TableCell 
                    onClick={() => handleSort('title')}
                    css={{ 
                      cursor: 'pointer',
                      userSelect: 'none',
                      '&:hover': { backgroundColor: '#f8fafc' }
                    }}
                    data-testid="sort-title"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Title {getSortIcon('title')}
                    </div>
                  </TableCell>
                  <TableCell 
                    onClick={() => handleSort('streetAddress')}
                    css={{ 
                      cursor: 'pointer',
                      userSelect: 'none',
                      '&:hover': { backgroundColor: '#f8fafc' }
                    }}
                    data-testid="sort-address"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Address {getSortIcon('streetAddress')}
                    </div>
                  </TableCell>
                  <TableCell 
                    onClick={() => handleSort('isActive')}
                    css={{ 
                      cursor: 'pointer',
                      userSelect: 'none',
                      '&:hover': { backgroundColor: '#f8fafc' }
                    }}
                    data-testid="sort-status"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Status {getSortIcon('isActive')}
                    </div>
                  </TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedOffices.map((office) => (
                  <TableRow key={office.id} data-testid={`office-row-${office.id}`}>
                    <TableCell>
                      <Typography variant="body2" css={{ fontWeight: 'bold' }}>
                        {office.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {office.streetAddress}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        backgroundColor: office.isActive ? '#dcfce7' : '#fee2e2',
                        color: office.isActive ? '#166534' : '#991b1b'
                      }}>
                        {office.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Button
                          variant="secondary"
                          size="small"
                          onClick={() => handleEdit(office)}
                          startIcon={<Icon name="edit" size={14} />}
                          data-testid={`edit-office-${office.id}`}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="attention"
                          size="small"
                          onClick={() => handleDelete(office.id)}
                          startIcon={<Icon name="cross" size={14} />}
                          data-testid={`delete-office-${office.id}`}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedOffices.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} css={{ textAlign: 'center', padding: '40px' }}>
                      <Typography variant="body2" css={{ color: '#6b7280' }}>
                        {searchTerm ? 'No offices found matching your search.' : 'No offices available.'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Simple pagination controls */}
      {totalPages > 1 && (
        <Card css={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid rgba(148, 163, 184, 0.1)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
          marginBottom: '24px'
        }}>
          <CardContent>
            <Wrapper direction="row" css={{ 
              justifyContent: 'space-between', 
              alignItems: 'center',
              '@media (max-width: 768px)': {
                flexDirection: 'column',
                gap: '16px'
              }
            }}>
              <Typography variant="body2" css={{ color: '#6b7280' }}>
                Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredAndSortedOffices.length)} of {filteredAndSortedOffices.length} offices
              </Typography>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: '12px'
              }}>
                <Button
                  variant="secondary"
                  isDisabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <span style={{ padding: '0 16px' }}>
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="secondary"
                  isDisabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </Wrapper>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            minWidth: '500px',
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <Typography variant="h3" css={{ marginBottom: '24px' }}>
              {editingOffice ? 'Edit Office' : 'Add New Office'}
            </Typography>
            
            <form onSubmit={handleFormSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Office Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter office title"
                  required
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                  data-testid="title-input"
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Street Address *
                </label>
                <textarea
                  value={formData.streetAddress}
                  onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                  placeholder="Enter street address"
                  required
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                  data-testid="address-input"
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                    data-testid="active-checkbox"
                  />
                  Office is Active
                </label>
              </div>

              <div style={{ 
                display: 'flex', 
                gap: '12px', 
                justifyContent: 'flex-end'
              }}>
                <Button
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                  data-testid="cancel-button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  data-testid="save-button"
                >
                  {editingOffice ? 'Update Office' : 'Add Office'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            minWidth: '400px',
            maxWidth: '90vw'
          }}>
            <Typography variant="h3" css={{ marginBottom: '16px' }}>
              Confirm Delete
            </Typography>
            <Typography variant="body2" css={{ marginBottom: '24px', color: '#6b7280' }}>
              Are you sure you want to delete this office? This action cannot be undone.
            </Typography>
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              justifyContent: 'flex-end'
            }}>
              <Button
                variant="secondary"
                onClick={() => setDeleteConfirmId(null)}
                data-testid="cancel-delete-btn"
              >
                Cancel
              </Button>
              <Button
                variant="attention"
                onClick={confirmDelete}
                data-testid="confirm-delete-btn"
              >
                Delete Office
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficeManagement;
