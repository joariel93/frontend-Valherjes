import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';

const AbmForm = ({
  visible,
  onHide,
  onSubmit,
  fields,
  initialData,
  title,
  isEdit
}) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({});
    }
  }, [initialData, reset]);

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={field.rules}
            render={({ field: { onChange, value } }) => (
              <InputText
                id={field.name}
                value={value || ''}
                onChange={onChange}
                className={errors[field.name] ? 'p-invalid' : ''}
              />
            )}
          />
        );

      case 'number':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={field.rules}
            render={({ field: { onChange, value, name } }) => (
              <InputNumber
                id={name}
                value={value}
                onValueChange={(e) => {
                  onChange(e.value);
                }}
                className={errors[name] ? 'p-invalid' : ''}
                useGrouping={false}
                mode="decimal"
                minFractionDigits={0}
                maxFractionDigits={0}
                min={0}
                placeholder={field.Name == "Dni" ? "Ingrese su DNI sin puntos ni letras" : "Ingrese un número"}
              />
            )}
          />
        );

      case 'date':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={field.rules}
            render={({ field: { onChange, value } }) => (
              <Calendar
                id={field.name}
                value={value}
                onChange={(e) => onChange(e.value)}
                dateFormat={field.dateFormat || "dd/mm/yy"}
                className={errors[field.name] ? 'p-invalid' : ''}
                view={field.view || 'date'}
                showIcon
              />
            )}
          />
        );

      case 'select':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={field.rules}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                id={field.name}
                value={value}
                options={field.options}
                onChange={(e) => {
                  onChange(e.value);
                }}
                optionLabel={field.optionLabel}
                optionValue={field.optionValue}
                placeholder={field.placeholder}
                className={errors[field.name] ? 'p-invalid' : ''}
              />
            )}
          />
        );

      case 'checkbox':
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
              <div className="flex align-items-center gap-2">
                <Checkbox
                  inputId={field.name}
                  onChange={e => onChange(e.checked)}
                  checked={value || false}
                />
                <label htmlFor={field.name} className="cursor-pointer">
                  {field.label}
                </label>
              </div>
            )}
          />
        );
      default:
        return null;
    }
  };

  const handleFormSubmit = async (data) => {
    const success = await onSubmit(data); // Llama a la función del padre
    if (success) {
      if (!isEdit) { // Si no estamos en modo edición (es decir, es una creación)
        reset({}); // Reinicia el formulario a un estado vacío
      }
      onHide(); // Cierra el modal
    }
    // Si no hay éxito, el modal permanece abierto para que el usuario pueda corregir.
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

  return (
    <Dialog
      visible={visible}
      style={{
        width: '90vw',
        maxWidth: '600px',
        height: 'auto'
      }}
      breakpoints={{ '960px': '75vw', '641px': '90vw' }}
      header={title}
      modal
      className="p-fluid"
      footer={footerContent}
      onHide={onHide}
      contentStyle={{ maxHeight: '90vh', overflowY: 'auto' }}
      contentClassName="flex flex-col h-full" // Contenedor flex para el contenido
    >
      <div className="flex-1 overflow-y-auto"> {/* Contenedor scrollable */}
        <div className="grid p-fluid">
          {fields.map((field) => (
            <div key={field.name} className="col-12 md:col-6">
              <div className="field">
                <label htmlFor={field.name} className="font-bold">
                  {field.label}
                </label>
                {renderField(field)}
                {errors[field.name] && (
                  <small className="p-error">
                    {errors[field.name].message}
                  </small>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};

export default AbmForm; 