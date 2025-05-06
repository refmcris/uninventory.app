import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
import "primeicons/primeicons.css";

export const DashboardPrimeReactSidebar = ({ visible, onHide, menuItems, onMenuItemClick, header }) => {

    const sidebarContent = (
        <div className="p-4 h-full flex flex-col">
            <nav className="flex-grow"> {/* Permite que la navegación crezca */}
                <ul className="list-none p-0 m-0">
                    {menuItems.map((item) => (
                        <li key={item.label} className="mb-1">
                            <Button
                                className="p-button-text text-left w-full text-gray-700 hover:text-red-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-red-500"
                                onClick={() => onMenuItemClick(item.path)}
                                style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
                            >
                                {item.icon && (
                                    <i className={`${item.icon} mr-3 text-lg text-red-700`} />
                                )}
                                <span>{item.label}</span>
                            </Button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );

    return (
        <Sidebar
            visible={visible}
            onHide={onHide}
            className="w-64"
            showCloseIcon={true}
            header={header}
        >
            {sidebarContent}
        </Sidebar>
    );
};

DashboardPrimeReactSidebar.propTypes = {
    visible: PropTypes.bool.isRequired, // Controla si el sidebar es visible
    onHide: PropTypes.func.isRequired,   // Función que se llama cuando el sidebar debe cerrarse
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
            icon: PropTypes.string,
        })).isRequired, // Lista de ítems del menú
    onMenuItemClick: PropTypes.func.isRequired, // Función para manejar el clic en un ítem
    header: PropTypes.node, // Header for the sidebar
};
