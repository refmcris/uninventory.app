import PropTypes from "prop-types";

export const DashboardSidebar = ({ menuItems, onMenuClick, isOpen, onClose }) => {
  return (
    <>
      {/* Fondo oscuro (Overlay) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className="fixed top-0 left-0 h-full w-64 bg-white text-gray-800 p-4 shadow-lg z-50 border border-solid"
        style={{
          borderColor: "#cd1f32",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 300ms ease-in-out",
        }}
        role="navigation"
        aria-label="Menú principal del dashboard"
        aria-hidden={!isOpen}
      >
        {/* Botón para cerrar el sidebar */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-red-700 text-2xl leading-none focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
          onClick={onClose}
          aria-label="Cerrar menú"
        >
          ×
        </button>

        {/* Lista de ítems del menú */}
        <nav className="mt-12"> {/* Usamos <nav> para la lista */}
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.label}>
                {/* --- MODIFICACIÓN: Usamos un botón (o Link si usas router) con Flexbox para alinear icono y texto --- */}
                <button
                  className="flex items-center w-full text-left p-3 cursor-pointer hover:bg-gray-100 rounded transition-colors text-gray-800 focus:outline-none focus:bg-gray-100 focus:ring-1 focus:ring-red-500"
                  onClick={() => onMenuClick(item.path)}
                >
                  {/* --- AÑADIDO: Renderizado del icono --- */}
                  {item.icon && ( // Renderiza solo si el icono existe
                    <i className={`${item.icon} mr-3 text-lg text-red-700`}></i> // Icono con margen derecho y color
                  )}
                  <span>{item.label}</span> {/* Texto del item */}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

// --- ACTUALIZADO: PropTypes para incluir 'icon' ---
DashboardSidebar.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.string, // Icono es opcional por si algún item no lo tuviera
    })
  ).isRequired,
  onMenuClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};