import React, { useState, useEffect } from "react";
import { UserLandingWrapper } from "../../wrappers";
import { DataView } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { GetCategories, GetEquipment, PostLoan } from "../../helpers/api";
import { AddLoan } from "../../components";

export const Equipment = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortField, setSortField] = useState("name");
  const [loaders, setLoaders] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const [equipments, setEquipments] = useState([]);
  const [categories, setCategories] = useState([]);

  //hooks

  //handlers

  const handleLoaders = (value) => setLoaders((t) => ({ ...t, ...value }));

  const handleGetEquipment = async () => {
    handleLoaders({ getEquipment: true });
    try {
      const response = await GetEquipment();
      setEquipments(response);
    } catch (error) {
      console.log("error", error);
    } finally {
      handleLoaders({ getEquipment: false });
    }
  };
  const handleGetCategories = async () => {
    handleLoaders({ getCategories: true });
    try {
      const response = await GetCategories();
      setCategories(response);
    } catch (error) {
      console.log("error", error);
    } finally {
      handleLoaders({ getCategories: false });
    }
  };
  const handleAddLoan = async ({ body }) => {
    handleLoaders({ addLoan: true });
    try {
      const response = await PostLoan(body);
    } catch (error) {
      console.log("error", error);
    } finally {
      handleLoaders({ addLoan: false });
    }
  };

  //bodys

  const sortOptions = [
    { label: "Nombre A-Z", value: "name" },
    { label: "Disponibilidad", value: "availability" },
    { label: "Más Recientes", value: "newest" }
  ];

  const getStatusSeverity = (status) => {
    switch (status) {
      case "available":
        return "success";
      case "in_loan":
        return "warning";
      case "repairing":
        return "danger";
      case "in_warranty":
        return "danger";
      default:
        return "info";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "available":
        return "Disponible";
      case "in_loan":
        return "En Uso";
      case "repairing":
        return "En Mantenimiento";
      case "in_warranty":
        return "En Garantía";
      default:
        return "Desconocido";
    }
  };

  const itemTemplate = (equipment) => {
    return (
      <div className="col-12 sm:col-6 lg:col-4 p-2 flex">
        <Card className="h-full flex flex-column w-full">
          <div className="flex flex-column flex-1">
            <div className="w-full h-20rem overflow-hidden">
              <img
                src={equipment.image}
                alt={equipment.name}
                className="w-full h-full object-cover object-center"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
            <div className="flex flex-column flex-1 mt-3">
              <div className="flex align-items-center justify-content-between mb-2">
                <h3 className="text-xl font-semibold m-0">{equipment.name}</h3>
                <Tag
                  severity={getStatusSeverity(equipment.status)}
                  value={getStatusLabel(equipment.status)}
                />
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Modelo: {equipment.model}
              </p>
              <p className="mb-3">{equipment.description}</p>
              <div className="mb-3">
                <h4 className="text-md font-semibold mb-2">
                  Especificaciones:
                </h4>
                <ul className="list-none p-0 m-0">
                  {equipment.specifications}
                </ul>
              </div>
            </div>
            <div className="pt-3 border-top-1 border-gray-200">
              <Button
                label="Solicitar Préstamo"
                className="w-full"
                disabled={equipment.status !== "available"}
                style={{ backgroundColor: "#cd1f32" }}
                onClick={() => {
                  setSelectedEquipment(equipment);
                  setIsDialogOpen(true);
                }}
              />
            </div>
          </div>
        </Card>
      </div>
    );
  };

  useEffect(() => {
    handleGetEquipment();
    handleGetCategories();
  }, []);

  return (
    <UserLandingWrapper>
      <div className="p-4">
        <div className="flex flex-column md:flex-row justify-content-between align-items-center mb-4">
          <h2 className="text-3xl font-bold mb-3 md:mb-0">
            Catálogo de Equipos
          </h2>
          <div className="flex flex-row sm:flex-row gap-3">
            <Dropdown
              value={selectedCategory}
              options={categories?.map((category) => ({
                label: category.name,
                value: category.id
              }))}
              onChange={(e) => setSelectedCategory(e.value)}
              placeholder="Categoría"
              className="w-full sm:w-auto"
            />
            <Dropdown
              value={sortField}
              options={sortOptions}
              onChange={(e) => setSortField(e.value)}
              placeholder="Ordenar por"
              className="w-full sm:w-auto"
            />
          </div>
        </div>

        <AddLoan
          visible={isDialogOpen}
          onHide={() => setIsDialogOpen(false)}
          loaders={loaders}
          selectedEquipment={selectedEquipment}
          handleAddLoan={handleAddLoan}
        />

        <DataView
          value={equipments}
          layout="grid"
          itemTemplate={itemTemplate}
          paginator
          rows={9}
          className="mt-4"
          emptyMessage="No hay equipos disponibles"
        />
      </div>
    </UserLandingWrapper>
  );
};
