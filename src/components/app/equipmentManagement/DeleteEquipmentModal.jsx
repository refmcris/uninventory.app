import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export const DeleteEquipmentModal = ({ visible, onHide, onDelete, equipment }) => {

    const handleDelete = () => {
        onDelete(equipment);
        onHide();
    };

    return (
        <Dialog header="Deactivate Equipment" visible={visible} style={{ width: '50vw' }} modal onHide={onHide}>
            <div>
                <p>Are you sure you want to deactivate this equipment?</p>
                <p>Equipment Name: {equipment?.name}</p>
                <p>Equipment ID: {equipment?.equipmentId}</p>
            </div>
            <Button label="Yes" icon="pi pi-check" onClick={handleDelete} />
            <Button label="No" icon="pi pi-times" onClick={onHide} className="p-button-secondary" />
        </Dialog>
    );
};
