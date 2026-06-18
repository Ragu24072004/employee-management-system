import { useState } from 'react';

export default function AddEmployeeForm() {
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAddEmployee = async () => {
    try {
      if (!newEmployee.name || !newEmployee.email) {
        throw new Error('Name and email are required');
      }
      setLoading(true);
      await api.addEmployee(newEmployee);
      // reset form, show success, etc.
      setNewEmployee({ name: '', email: '' });
      setError(null);
    } catch (e) {
      console.error('Add employee failed', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={e => { e.preventDefault(); handleAddEmployee(); }}>
      <input
        type="text"
        placeholder="Name"
        value={newEmployee.name}
        onChange={e => setNewEmployee({ ...newEmployee, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newEmployee.email}
        onChange={e => setNewEmployee({ ...newEmployee, email: e.target.value })}
      />
      <button type="submit" disabled={loading}>Add</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
