// Simula un endpoint para obtener la tendencia de préstamos
// Recibe un rango de fechas (opcional) y retorna datos de ejemplo o vacío

export const getLoanTrends = async (dateRange) => {
  // Simulación: si hay un rango de fechas, filtra (dummy)
  // Si la fecha de inicio es después de junio, retorna vacío
  if (dateRange && Array.isArray(dateRange) && dateRange[0] && dateRange[1]) {
    const start = dateRange[0];
    if (start.getMonth() > 5) {
      // Después de junio, sin datos
      return [];
    }
  }
  // Datos de ejemplo
  return [
    { month: "Ene", value: 12 },
    { month: "Feb", value: 19 },
    { month: "Mar", value: 15 },
    { month: "Abr", value: 22 },
    { month: "May", value: 30 },
    { month: "Jun", value: 25 },
    { month: "Jul", value: 28 }
  ];
}; 