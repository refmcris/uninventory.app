import React, { use, useEffect, useRef } from "react";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

import { ctc, GetCategories, useForm } from "../../helpers";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

export const AddEquipmentDialog = ({ visible, onHide, onAddEquipment }) => {
  //states

  const [loading, setLoading] = useState(false);
  const [disableButtonSave, setDisableButtonSave] = useState(true);
  const [categories, setCategories] = useState([]);

  //refs

  const { formState, onChange, onChangeManual } = useForm({
    categoriaId: null,
    nombre: null,
    numeroSerial: null,
    ubicacion: null,
    estado: null,
    fechaDeCompra: null,
    garantia: null,
    imagen: null,
    modelo: null,
    descripcion: null,
    especificaciones: null
  });

  const onSave = async (e) => {
    e?.preventDefault();
    try {
      const body = {
        categoryId: formState?.categoriaId,
        name: formState?.nombre,
        serialNumber: formState?.numeroSerial,
        location: formState?.ubicacion,
        status: formState?.estado,
        purchaseDate: formState?.fechaDeCompra,
        warrantyDate: formState?.garantia,
        image: formState?.imagen,
        model: formState?.modelo,
        description: formState?.descripcion,
        specifications: formState?.especificaciones
      };
      await onAddEquipment(body);
    } catch (error) {
      ctc({
        error: "",
        msg: "Error al agregar el equipo",
        toastRef
      });
    }

    handleHide();
  };

  const handleGetCategories = async () => {
    try {
      const response = await GetCategories();
      const options = response.map((cat) => ({
        label: cat.name,
        value: cat.categoryId
      }));
      setCategories(options);
    } catch (error) {
      console.error("Error fetching categories data:", error);
    }
  };

  const handleHide = () => {
    onChangeManual({
      categoriaId: null,
      nombre: null,
      numeroSerial: null,
      ubicacion: null,
      estado: null,
      fechaDeCompra: null,
      garantia: null,
      imagen: null,
      modelo: null,
      descripcion: null,
      especificaciones: null
    });
    onHide && onHide();
  };

  //bodys

  const BodyFooter = () => {
    return (
      <div className="w-full flex items-center justify-content-center gap-1">
        <Button
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          onClick={handleHide}
        />
        <Button
          label="Agregar"
          icon="pi pi-check"
          style={{ backgroundColor: "#cd1f32" }}
          loading={loading}
          onClick={onSave}
        />
      </div>
    );
  };

  //options
  const status = [
    { label: "Disponible", value: "available" },
    { label: "Inactivo", value: "inactive" },
    { label: "En reparacion", value: "repairing" },
    { label: "En garantia", value: "in_warranty" },
    { label: "En prestamo", value: "in_loan" }
  ];

  useEffect(() => {
    handleGetCategories();
  }, []);

  return (
    <Dialog
      visible={visible}
      draggable={false}
      resizable={false}
      onHide={handleHide}
      header="Agregar equipo"
      footer={BodyFooter}
      className="w-4 "
    >
      <div className="flex align-items-center ">
        <form className="flex flex-column w-full  " onSubmit={onSave}>
          <div className="flex flex-column ">
            <label>Nombre</label>
            <InputText
              value={formState?.nombre}
              name="nombre"
              onChange={onChange}
              className="w-full"
            />
          </div>

          <div className="flex flex-column gap-2">
            <label>Número de serie</label>
            <InputText
              value={formState?.numeroSerial}
              name="numeroSerial"
              onChange={onChange}
              className="w-full"
            />
          </div>
          <div className="flex flex-column gap-2">
            <label>Categoria</label>
            <Dropdown
              name="categoriaId"
              placeholder="Seleccione una categoria"
              value={formState?.categoriaId}
              options={categories}
              onChange={onChange}
              className="w-full"
            />
          </div>
          <div className="flex flex-column gap-2">
            <label>Estado</label>
            <Dropdown
              name="estado"
              placeholder="Seleccione una opcion"
              value={formState?.estado}
              options={status}
              onChange={onChange}
              className="w-full"
            />
          </div>
          <div className="flex flex-column gap-2">
            <label>Fecha de compra</label>
            <Calendar
              name="fechaDeCompra"
              placeholder="Seleccione una fecha"
              value={formState.fechaDeCompra}
              onChange={onChange}
              className="w-full"
              showIcon
            />
          </div>
          <div className="flex flex-column gap-2">
            <label>Vencimiento de garantia</label>
            <Calendar
              name="garantia"
              placeholder="Seleccione una fecha"
              value={formState.garantia}
              onChange={onChange}
              className="w-full"
              showIcon
            />
          </div>

          <div className="flex flex-column gap-2">
            <label>Modelo</label>
            <InputText
              name="modelo"
              placeholder="Modelo"
              value={formState.modelo}
              onChange={onChange}
              className="w-full"
            />
          </div>
          <div className="flex flex-column gap-2">
            <label>Descripción</label>
            <InputText
              name="descripcion"
              value={formState.descripcion}
              onChange={onChange}
              className="w-full"
            />
          </div>
          <div className="flex flex-column gap-2">
            <label>Especificaciones</label>
            <InputText
              name="especificaciones"
              value={formState.especificaciones}
              onChange={onChange}
              className="w-full"
            />
          </div>
          <div className="flex flex-column gap-2">
            <label>Ubicación</label>
            <InputText
              name="ubicacion"
              value={formState.ubicacion}
              onChange={onChange}
              className="w-full"
            />
          </div>

          <div className="flex flex-column gap-2">
            <label>Imagen</label>
            <InputText
              name="imagen"
              value={formState.imagen}
              onChange={onChange}
              className="w-full"
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
};
