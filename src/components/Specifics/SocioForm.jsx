import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';

const SocioForm = ({
  visible,
  onHide,
  onSubmit,
  initialData,
  title,
  isEdit,
  rolesOptions
}) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (visible) {
        if (initialData) {
            // Asegurarse de que las fechas se conviertan a objetos Date si vienen como strings
            const dataToReset = {
                ...initialData,
                EsPeleadorActivo: initialData.EsPeleadorActivo == "Si" ? true : false,
                FechaNacimiento: initialData.FechaNacimiento ? new Date(initialData.FechaNacimiento) : null,
                FechaIngreso: initialData.FechaIngreso ? new Date(initialData.FechaIngreso) : null,
            };
            reset(dataToReset);
        } else {
            reset({
                Nombre: '',
                Apellido: '',
                Direccion: '',
                Apodo: '',
                Dni: null,
                Telefono: null,
                TelefonoContacto: null,
                FechaNacimiento: null,
                FechaIngreso: null,
                Email: '',
                RolId: null,
                Posicion: '',
                EsPeleadorActivo: false
            });
        }
    }
  }, [initialData, visible, reset]);

  const handleFormSubmit = async (data) => {
    const success = await onSubmit(data);
    if (success) {
      onHide();
    }
  };

  const footerContent = (
    <div>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={onHide}
        className="p-button-text"
      />
      <Button
        label={isEdit ? "Guardar" : "Crear"}
        icon="pi pi-check"
        onClick={handleSubmit(handleFormSubmit)}
        autoFocus
      />
    </div>
  );

  const renderError = (name) => errors[name] && (
    <small className="p-error">{errors[name].message}</small>
  );

  return (
    <Dialog
      visible={visible}
      style={{ width: '90vw', maxWidth: '800px' }}
      header={title}
      modal
      className="p-fluid"
      footer={footerContent}
      onHide={onHide}
    >
      <div className="grid p-fluid formgrid">
        {/* Fila 1: Nombre y Apellido */}
        <div className="field col-12 md:col-6">
          <label htmlFor="Nombre">Nombre</label>
          <Controller name="Nombre" control={control} rules={{ required: 'El nombre es obligatorio' }} render={({ field }) => <InputText id="Nombre" {...field} />} />
          {renderError('Nombre')}
        </div>
        <div className="field col-12 md:col-6">
          <label htmlFor="Apellido">Apellido</label>
          <Controller name="Apellido" control={control} rules={{ required: 'El apellido es obligatorio' }} render={({ field }) => <InputText id="Apellido" {...field} />} />
          {renderError('Apellido')}
        </div>

        {/* Fila 2: DNI y Apodo */}
        <div className="field col-12 md:col-6">
          <label htmlFor="Dni">DNI</label>
          <Controller name="Dni" control={control} rules={{ required: 'El DNI es obligatorio' }} render={({ field }) => <InputNumber id="Dni" value={field.value} onValueChange={(e) => field.onChange(e.value)} useGrouping={false} />} />
          {renderError('Dni')}
        </div>
        <div className="field col-12 md:col-6">
          <label htmlFor="Apodo">Apodo</label>
          <Controller name="Apodo" control={control} render={({ field }) => <InputText id="Apodo" {...field} />} />
        </div>

        {/* Fila 3: Email y Rol */}
        <div className="field col-12 md:col-6">
          <label htmlFor="Email">Email</label>
          <Controller name="Email" control={control} rules={{ required: 'El email es obligatorio', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Email inválido' } }} render={({ field }) => <InputText id="Email" {...field} />} />
          {renderError('Email')}
        </div>
        <div className="field col-12 md:col-6">
          <label htmlFor="RolId">Rol</label>
          <Controller name="RolId" control={control} rules={{ required: 'El rol es obligatorio' }} render={({ field }) => (
            <Dropdown id="RolId" value={field.value} options={rolesOptions} onChange={(e) => field.onChange(e.value)} placeholder="Seleccione un rol" />
          )} />
          {renderError('RolId')}
        </div>

        {/* Fila 4: Fecha de Nacimiento e Ingreso */}
        <div className="field col-12 md:col-6">
          <label htmlFor="FechaNacimiento">Fecha de Nacimiento</label>
          <Controller name="FechaNacimiento" control={control} rules={{ required: 'La fecha de nacimiento es obligatoria' }} render={({ field }) => <Calendar id="FechaNacimiento" value={field.value} onChange={(e) => field.onChange(e.value)} dateFormat="dd/mm/yy" showIcon />} />
          {renderError('FechaNacimiento')}
        </div>
        <div className="field col-12 md:col-6">
          <label htmlFor="FechaIngreso">Fecha de Ingreso</label>
          <Controller name="FechaIngreso" control={control} rules={{ required: 'La fecha de ingreso es obligatoria' }} render={({ field }) => <Calendar id="FechaIngreso" value={field.value} onChange={(e) => field.onChange(e.value)} dateFormat="dd/mm/yy" showIcon />} />
          {renderError('FechaIngreso')}
        </div>

        {/* Fila 5: Teléfono y Teléfono de Contacto */}
        <div className="field col-12 md:col-6">
          <label htmlFor="Telefono">Teléfono</label>
          <Controller name="Telefono" control={control} rules={{ required: 'El teléfono es obligatorio' }} render={({ field }) => <InputNumber id="Telefono" value={field.value} onValueChange={(e) => field.onChange(e.value)} useGrouping={false} />} />
          {renderError('Telefono')}
        </div>
        <div className="field col-12 md:col-6">
          <label htmlFor="TelefonoContacto">Teléfono de Contacto</label>
          <Controller name="TelefonoContacto" control={control} render={({ field }) => <InputNumber id="TelefonoContacto" value={field.value} onValueChange={(e) => field.onChange(e.value)} useGrouping={false} />} />
        </div>

        {/* Fila 6: Dirección y Posición */}
        <div className="field col-12 md:col-6">
          <label htmlFor="Direccion">Dirección</label>
          <Controller name="Direccion" control={control} render={({ field }) => <InputText id="Direccion" {...field} />} />
        </div>
        <div className="field col-12 md:col-6">
          <label htmlFor="Posicion">Posición</label>
          <Controller name="Posicion" control={control} render={({ field }) => <InputText id="Posicion" {...field} />} />
        </div>

        {/* Fila 7: Checkbox */}
        <div className="field col-12">
            <Controller
              name="EsPeleadorActivo"
              control={control}
              render={({ field }) => (
                <div className="flex align-items-center gap-2">
                  <Checkbox
                    inputId="EsPeleadorActivo"
                    onChange={e => field.onChange(e.checked)}
                    checked={field.value || false}
                  />
                  <label htmlFor="EsPeleadorActivo" className="cursor-pointer">
                    Es Peleador Activo
                  </label>
                </div>
              )}
            />
        </div>
      </div>
    </Dialog>
  );
};

export default SocioForm;