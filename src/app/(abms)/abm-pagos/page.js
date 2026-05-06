'use client';

import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import AbmGrid from '@/components/Basics/AbmGrid';
import AbmForm from '@/components/Basics/AbmForm';
import BotonCrearAbm from '@/components/Basics/BotonCrearAbm';
import { fetchPagos, fetchSocios, crearPago, actualizarPago, eliminarPago } from '@/services/api';
import PageSkeleton from '@/components/Basics/PageSkeleton';

export default function AbmPagos() {
  const [pagos, setPagos] = useState([]);
  const [socios, setSocios] = useState([]);
  const [selectedSocioId, setSelectedSocioId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedPago, setSelectedPago] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingPagos, setLoadingPagos] = useState(false);

  // Carga la lista de socios al iniciar
  const fetchSociosList = async () => {
    try {
      const sociosData = await fetchSocios();
      setSocios(sociosData.map(socio => ({
        label: `${socio.Nombre} ${socio.Apellido} (${socio.Dni})`,
        value: socio.id
      })));
    } catch (error) {
      console.error('Error al obtener los socios:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSociosList();
  }, []);

  // Carga los pagos del socio seleccionado
  const fetchPagosBySocio = async (socioId) => {
    if (!socioId) {
      setPagos([]);
      return;
    }
    setLoadingPagos(true);
    try {
      const pagosData = await fetchPagos(socioId);
      setPagos(pagosData);
    } catch (error) {
      console.error('Error al obtener los pagos del socio:', error);
      setPagos([]);
    } finally {
      setLoadingPagos(false);
    }
  };

  useEffect(() => {
    fetchPagosBySocio(selectedSocioId);
  }, [selectedSocioId]);

  const columns = [
    { field: "socio", header: "Socio" },
    {
      field: "periodoPagado",
      header: "Mes Pagado",
      body: (rowData) => {
        if (!rowData.periodoPagado) return '';
        const date = new Date(rowData.periodoPagado);
        return new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(date);
      }
    },
    {
      field: "fechaPago",
      header: "Fecha de Pago",
      body: (rowData) => {
        if (!rowData.fechaPago) return '';
        return new Date(rowData.fechaPago).toLocaleDateString('es-ES');
      }
    }
  ];

  // Campos para el formulario de creación
  const createFormFields = [
    {
      name: "periodoPagado",
      label: "Mes que se abona",
      type: "date",
      rules: { required: 'La fecha del mes pagado es obligatoria' },
      view: 'month',
      dateFormat: 'mm/yy'
    }
  ];

  // Campos para el formulario de edición (incluye todos los campos)
  const editFormFields = [
    { name: "usuarioId", label: "Socio", type: "select", options: socios, rules: { required: 'Debe seleccionar un socio' }, optionLabel: "label", optionValue: "value", placeholder: "Seleccione un socio", disabled: true },
    ...createFormFields,
    { name: "fechaPago", label: "Fecha de Pago", type: "date", rules: { required: 'La fecha de pago es obligatoria' } }
  ];

  const handleNewClick = () => {
    setSelectedPago(null);
    setVisible(true);
  };

  const handleSubmit = async (data) => {
    const isEdit = !!selectedPago;
    try {
      if (isEdit) {
        await actualizarPago({ ...data, id: selectedPago.id });
      } else {
        const periodo = new Date(data.periodoPagado);
        periodo.setDate(1); // Establece el día como 1

        const newPago = {
          ...data,
          periodoPagado: periodo,
          usuarioId: selectedSocioId,
          fechaPago: new Date() // Fecha actual
        };
        await crearPago(newPago);
      }
      fetchPagosBySocio(selectedSocioId); // Recarga los pagos del socio
      setVisible(false);
      setSelectedPago(null);
      return true;
    } catch (error) {
      console.error(`Error al ${isEdit ? 'actualizar' : 'crear'} el pago:`, error);
      return false;
    }
  };

  const handleDelete = async (id) => {
    try {
      await eliminarPago(id);
      fetchPagosBySocio(selectedSocioId); // Recarga los pagos del socio
    } catch (error) {
      console.error('Error al eliminar el pago:', error);
    }
  };

  if (loading) return <PageSkeleton type='list' count={3} />;

  return (
    <ProtectedRoute requiredRole={["Administrador", "Tesorero"]}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Administración de Pagos</h1>
        <div className="card p-fluid mb-4">
          <label htmlFor="socioDropdown" className="font-bold mb-2 block">Seleccione un Socio</label>
          <Dropdown
            id="socioDropdown"
            value={selectedSocioId}
            options={socios}
            onChange={(e) => setSelectedSocioId(e.value)}
            placeholder="Buscar socio por nombre, apellido o DNI"
            filter
            showClear
            className="w-full"
          />
        </div>

        <BotonCrearAbm label="Nuevo" entity="Pago" onClick={handleNewClick} severity="success" disabled={!selectedSocioId} />

        <AbmGrid
          columns={columns}
          data={pagos}
          onDelete={handleDelete}
          onEdit={(pago) => { setSelectedPago(pago); setVisible(true); }}
          loading={loadingPagos}
        />

        <AbmForm
          visible={visible}
          onHide={() => { setVisible(false); setSelectedPago(null); }}
          onSubmit={handleSubmit}
          fields={selectedPago ? editFormFields : createFormFields}
          initialData={selectedPago}
          title={selectedPago ? "Editar Pago" : "Nuevo Pago"}
          isEdit={!!selectedPago}
        />
      </div>
    </ProtectedRoute>
  );
}
