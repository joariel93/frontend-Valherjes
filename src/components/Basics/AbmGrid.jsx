import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';


const AbmGrid = ({
    data,
    columns,
    onDelete,
    onEdit,
    fetchData
}) => {
    const menu = useRef(null);
    const toast = useRef(null);
    const [selectedRow, setSelectedRow] = useState(null);

    const menuItems = [{
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: () => handleEdit(selectedRow)
    },
    {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: () => confirmDelete(selectedRow)
    }
    ];

    const handleEdit = (rowData) => {
        if (onEdit) {
            onEdit(rowData);
        }
    }

    const confirmDelete = (rowData) => {
        confirmDialog({
            message: '¿Estás seguro de que deseas eliminar?',
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: () => handleDelete(rowData),
            reject: () => {
                toast.current.show({
                    severity: 'info',
                    summary: 'Cancelado',
                    detail: 'No se eliminó el registro',
                    life: 3000
                });
            }
        });
    }

    const handleDelete = async (rowData) => {
        try {
            await onDelete(rowData.id); // Llama a la función de eliminar del padre
            toast.current.show({
                severity: 'success',
                summary: 'Eliminado',
                detail: 'Registro eliminado correctamente',
                life: 3000
            });
        }
        catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar el registro',
                life: 3000
            });
        }
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex justify-content-end">
                <Button
                    icon="pi pi-ellipsis-v"
                    rounded
                    text
                    severity="secondary"
                    onClick={(e) => {
                        setSelectedRow(rowData);
                        menu.current.toggle(e);
                    }}
                    aria-controls="popup_menu"
                    aria-haspopup
                />
            </div>
        )
    };



    return (
        <div className="card w-full overflow-hidden">
            <Toast ref={toast} />
            <Menu model={menuItems} popup ref={menu} />
            <DataTable
                value={data}
                scrollable
                stripedRows
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 20, 50]}
                scrollHeight="400px"
                style={{ minWidth: '95vw' }}
            >
                {columns.map((column) => (
                    <Column
                        key={column.field}
                        field={column.field}
                        header={column.header}
                        sortable
                    />
                ))}
                <Column
                    body={actionBodyTemplate}
                    exportable={false}
                    style={{ width: '4rem' }}
                />
            </DataTable>
        </div>
    );
};

export default AbmGrid;