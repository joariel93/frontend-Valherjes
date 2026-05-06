import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';

const NoticiaForm = ({
    visible,
    onHide,
    onSubmit,
    initialData,
    title,
    isEdit
}) => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (visible) {
            if (initialData) {
                reset({
                    ...initialData,
                    Fecha: initialData.FechaPublicacion ? new Date(initialData.FechaPublicacion) : null
                });
            } else {
                reset({
                    Titulo: '',
                    Contenido: '',
                    LinkFoto: '',
                    Fecha: new Date()
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
                <div className="field col-12">
                    <label htmlFor="Titulo">Título</label>
                    <Controller name="Titulo" control={control} rules={{ required: 'El título es obligatorio' }} render={({ field }) => <InputText id="Titulo" {...field} />} />
                    {renderError('Titulo')}
                </div>

                <div className="field col-12">
                    <label htmlFor="Contenido">Cuerpo</label>
                    <Controller name="Contenido" control={control} rules={{ required: 'El contenido de la noticia es obligatorio' }} render={({ field }) => <InputTextarea id="Contenido" {...field} rows={5} autoResize />} />
                    {renderError('Contenido')}
                </div>

                <div className="field col-12 md:col-6">
                    <label htmlFor="LinkFoto">URL Imagen</label>
                    <Controller name="LinkFoto" control={control} render={({ field }) => <InputText id="LinkFoto" {...field} />} />
                </div>

                <div className="field col-12 md:col-6">
                    <label htmlFor="Fecha">Fecha</label>
                    <Controller name="Fecha" control={control} rules={{ required: 'La fecha es obligatoria' }} render={({ field }) => <Calendar id="Fecha" value={field.value} onChange={(e) => field.onChange(e.value)} dateFormat="dd/mm/yy" showIcon />} />
                    {renderError('Fecha')}
                </div>
            </div>
        </Dialog>
    );
};

export default NoticiaForm;
