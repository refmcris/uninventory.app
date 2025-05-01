import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export const EquipmentTable = ({ equipments, openEditModal, openDeleteModal }) => {
    console.log("EquipmentTable props:", { equipments, openEditModal, openDeleteModal });
    console.log("Equipments data:", equipments);

    const formatDate = (date) => {
        try {
            return date.toLocaleDateString();
        } catch (error) {
            console.error("Error formatting date: ", date, error);
            return ""; // Handle invalid dates gracefully
        }
    };

    const editButtonTemplate = (rowData) => {
        return (
            <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success mr-2"
                onClick={() => openEditModal(rowData)}
            />
        );
    };

    const deleteButtonTemplate = (rowData) => {
        return (
            <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-warning"
                onClick={() => openDeleteModal(rowData)}
            />
        );
    };

    return (
        <DataTable value={equipments} responsiveLayout="scroll">
            <Column field="equipmentId" header="ID" />
            <Column field="name" header="Name" />
            <Column field="serialNumber" header="Serial Number" />
            <Column field="location" header="Location" />
            <Column field="status" header="Status" />
            <Column field="purchaseDate" header="Purchase Date" body={(rowData) => formatDate(rowData.purchaseDate)} />
            <Column field="warrantyDate" header="Warranty Date" body={(rowData) => formatDate(rowData.warrantyDate)} />
            {/* <Column field="categoryId" header="Category ID" /> */}
            {/* <Column field="createdAt" header="Created At" /> */}
            <Column body={editButtonTemplate} header="Edit" />
            <Column body={deleteButtonTemplate} header="Deactivate" />
        </DataTable>
    );
};
