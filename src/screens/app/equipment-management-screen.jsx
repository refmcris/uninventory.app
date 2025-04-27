import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { EquipmentTable, AddEquipmentModal, EditEquipmentModal, DeleteEquipmentModal } from '../../components/app/equipmentManagement';
import { UserLandingWrapper } from "../../wrappers";
import { GetEquipment } from "../../helpers/api";

const defaultEquipmentData = [
    {
        equipmentId: 1,
        name: 'Equipo 1',
        serialNumber: 'SN001',
        location: 'Lab A',
        status: 'Available',
        purchaseDate: new Date(),
        warrantyDate: new Date(),
        categoryId: 1,
        createdAt: new Date(),
    },
    {
        equipmentId: 2,
        name: 'Equipo 2',
        serialNumber: 'SN002',
        location: 'Lab B',
        status: 'In Use',
        purchaseDate: new Date(),
        warrantyDate: new Date(),
        categoryId: 2,
        createdAt: new Date(),
    },
];

export const EquipmentManagementScreen = () => {
    const [equipments, setEquipments] = useState(defaultEquipmentData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const [selectedEquipment, setSelectedEquipment] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await GetEquipment();
                if (data && data.length > 0) {
                    setEquipments(data);
                }
            } catch (err) {
                setError("Failed to load equipment data. Please ensure the backend server is running.");
                setEquipments(defaultEquipmentData);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const openCreateModal = () => {
        setCreateModalVisible(true);
    };

    const closeCreateModal = () => {
        setCreateModalVisible(false);
    };

    const openEditModal = (equipment) => {
        setSelectedEquipment(equipment);
        setEditModalVisible(true);
    };

    const closeEditModal = () => {
        setSelectedEquipment(null);
        setEditModalVisible(false);
    };

    const openDeleteModal = (equipment) => {
        setSelectedEquipment(equipment);
        setDeleteModalVisible(true);
    };

    const closeDeleteModal = () => {
        setSelectedEquipment(null);
        setDeleteModalVisible(false);
    };

    const handleCreateEquipment = () => {
        // Logic to create equipment
        closeCreateModal();
    };

    const handleEditEquipment = () => {
        // Logic to edit equipment
        closeEditModal();
    };

    const handleDeleteEquipment = () => {
        // Logic to delete equipment (deactivate)
        closeDeleteModal();
    };

    return (
        <UserLandingWrapper>
            <div className="container">
                <h1>Equipment Management</h1>
                <Button label="Add Equipment" icon="pi pi-plus" onClick={openCreateModal} className="mb-3" />

                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : null}

           
                    <EquipmentTable
                        equipments={equipments}
                        openEditModal={openEditModal}
                        openDeleteModal={openDeleteModal}
                    />
          

                <AddEquipmentModal visible={createModalVisible} onHide={closeCreateModal} onCreate={handleCreateEquipment} />
                <EditEquipmentModal
                    visible={editModalVisible}
                    onHide={closeEditModal}
                    onSave={handleEditEquipment}
                    equipment={selectedEquipment}
                />
                <DeleteEquipmentModal
                    visible={deleteModalVisible}
                    onHide={closeDeleteModal}
                    onDelete={handleDeleteEquipment}
                    equipment={selectedEquipment}
                />
            </div>
        </UserLandingWrapper>
    );
};