import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { GetCategories, UploadImage, useForm } from "../../helpers";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";

export const EditEquipmentDialog = ({
  visible,
  onHide,
  onEditEquipment,
  selectedEquipment
}) => {
  //states
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageUploadedUrl, setImageUploadedUrl] = useState(null);

  const {
    formState,
    onChange,
    setUpFormState,
    disabledButtonSave,
    onChangeManual
  } = useForm(selectedEquipment || {}, [
    "name",
    "serialNumber",
    "categoryId",
    "status",
    "purchaseDate",
    "warrantyDate",
    "model",
    "description",
    "specifications",
    "location",
    "image"
  ]);

  //body
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
          label="Editar"
          icon="pi pi-check"
          style={{ backgroundColor: "#cd1f32" }}
          onClick={onEdit}
        />
      </div>
    );
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

  const onEdit = async (e) => {
    e.preventDefault();
    let imageUrl = null;

    if (selectedFile) {
      await UploadImage(
        selectedFile,
        setLoading,
        (url) => {
          imageUrl = url;
          formState.image = imageUrl;
          setImageUploadedUrl(url);
        },
        () => {}
      );
    }

    onEditEquipment(formState);

    handleHide();
  };
  const handleHide = () => {
    onHide && onHide();
    setSelectedFile(null);
    setPreviewUrl(null);
    setImageUploadedUrl(null);
  };

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

  useEffect(() => {
    if (selectedEquipment) {
      setUpFormState(selectedEquipment);
    }
  }, [selectedEquipment]);

  return (
    <Dialog
      visible={visible}
      draggable={false}
      resizable={false}
      onHide={handleHide}
      header="Editar equipo"
      footer={BodyFooter}
      className="w-4 "
    >
      <div className="flex align-items-center ">
        <form className="flex flex-column w-full  " onSubmit={onEdit}>
          <div className="flex flex-column ">
            <label>Nombre</label>
            <InputText
              value={formState?.name}
              onChange={onChange}
              name="name"
              className="w-full"
            />
          </div>

          <div className="flex flex-column gap-2">
            <label>Número de serie</label>
            <InputText
              value={formState?.serialNumber}
              onChange={onChange}
              name="serialNumber"
              className="w-full"
            />
          </div>
          <div className="flex flex-column gap-2">
            <label>Categoria</label>
            <Dropdown
              name="categoryId"
              placeholder="Seleccione una categoria"
              value={formState?.categoryId}
              onChange={onChange}
              options={categories}
              className="w-full"
            />
          </div>
          <div className="flex flex-column gap-2">
            <label>Estado</label>
            <Dropdown
              name="status"
              placeholder="Seleccione una opcion"
              value={formState?.status}
              onChange={onChange}
              options={status}
              className="w-full"
            />
          </div>
          <div className="flex flex-column gap-2">
            <label>Fecha de compra</label>
            <Calendar
              name="purchaseDate"
              placeholder="Seleccione una fecha"
              value={
                formState?.purchaseDate
                  ? new Date(formState.purchaseDate)
                  : null
              }
              onChange={(e) => onChangeManual({ purchaseDate: e.value })}
              className="w-full"
              showIcon
            />
          </div>
          <div className="flex flex-column gap-2">
            <label>Vencimiento de garantia</label>
            <Calendar
              name="warrantyDate"
              placeholder="Seleccione una fecha"
              value={
                formState?.warrantyDate
                  ? new Date(formState.warrantyDate)
                  : null
              }
              onChange={(e) => onChangeManual({ warrantyDate: e.value })}
              className="w-full"
              showIcon
            />
          </div>

          <div className="flex flex-column gap-2">
            <label>Modelo</label>
            <InputText
              name="model"
              placeholder="Modelo"
              value={formState?.model}
              onChange={onChange}
              className="w-full"
            />
          </div>
          <div className="flex flex-column gap-2">
            <label>Descripción</label>
            <InputText
              name="description"
              value={formState?.description}
              onChange={onChange}
              placeholder="Descripción"
              className="w-full"
            />
          </div>
          <div className="flex flex-column gap-2">
            <label>Especificaciones</label>
            <InputText
              name="specifications"
              value={formState?.specifications}
              onChange={onChange}
              placeholder="Especificaciones"
              className="w-full"
            />
          </div>
          <div className="flex flex-column gap-2">
            <label>Ubicación</label>
            <InputText
              name="location"
              value={formState?.location}
              onChange={onChange}
              className="w-full"
            />
          </div>

          <div className="flex flex-column gap-2">
            <label>Imagen</label>
            <FileUpload
              mode="basic"
              name="imagen"
              accept="image/*"
              maxFileSize={5 * 1024 * 1024}
              chooseLabel="Seleccionar imagen"
              customUpload
              onSelect={(e) => {
                const file = e.files[0];
                if (!file) return;

                setSelectedFile(file);
                setPreviewUrl(URL.createObjectURL(file));
              }}
            />

            {previewUrl && (
              <img
                src={previewUrl}
                alt="Vista previa"
                style={{
                  maxHeight: "150px",
                  marginTop: "10px",
                  borderRadius: "8px"
                }}
              />
            )}
          </div>
        </form>
      </div>
    </Dialog>
  );
};
