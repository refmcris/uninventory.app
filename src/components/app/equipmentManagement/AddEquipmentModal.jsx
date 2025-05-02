import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';

export const AddEquipmentModal = ({ visible, onHide, onCreate }) => {
    const [name, setName] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('');
    const [purchaseDate, setPurchaseDate] = useState(null);
    const [warrantyDate, setWarrantyDate] = useState(null);
    const [categoryId, setCategoryId] = useState(1);

    const handleCreate = () => {
        const newEquipment = {
            name,
            serialNumber,
            location,
            status,
            purchaseDate,
            warrantyDate,
            categoryId,
        };
        onCreate(newEquipment);
        onHide();
    };

    return (
        <Dialog header="Create Equipment" visible={visible} style={{ width: '50vw' }} modal onHide={onHide}>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="p-field">
                    <label htmlFor="serialNumber">Serial Number</label>
                    <InputText id="serialNumber" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
                </div>
                <div className="p-field">
                    <label htmlFor="location">Location</label>
                    <InputText id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div className="p-field">
                    <label htmlFor="status">Status</label>
                    <InputText id="status" value={status} onChange={(e) => setStatus(e.target.value)} />
                </div>
                <div className="p-field">
                    <label htmlFor="purchaseDate">Purchase Date</label>
                    <Calendar id="purchaseDate" value={purchaseDate} onChange={(e) => setPurchaseDate(e.value)} />
                </div>
                <div className="p-field">
                    <label htmlFor="warrantyDate">Warranty Date</label>
                    <Calendar id="warrantyDate" value={warrantyDate} onChange={(e) => setWarrantyDate(e.value)} />
                </div>
                <div className="p-field">
                    <label htmlFor="categoryId">Category ID</label>
                    <InputNumber id="categoryId" value={categoryId} onValueChange={(e) => setCategoryId(e.value)} />
                </div>
            </div>
            <Button label="Create" icon="pi pi-check" onClick={handleCreate} />
            <Button label="Cancel" icon="pi pi-times" onClick={onHide} className="p-button-secondary" />
        </Dialog>
    );
};