import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
import "primeicons/primeicons.css";

export const DashboardPrimeReactSidebar = ({ visible, onHide, menuItems, onMenuItemClick, header, className }) => {
    return (
        <Sidebar
            visible={visible}
            onHide={onHide}
            className={`w-72 ${className || ''}`}
            showCloseIcon={true}
            header={header}
            closeOnEscape={true}
            dismissable={true}
            modal={false}
            position="left"
            style={{ width: '18rem', padding: 0 }}
        >
            <div className="flex flex-col h-full w-full">
                <nav className="flex-grow w-full">
                    <ul className="list-none p-0 m-0 w-full">
                        {menuItems.map((item) => (
                            <li key={item.label} className="mb-2 w-full">
                                <Button
                                    className="p-button-text text-left w-full text-gray-700 hover:text-red-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-red-500 flex items-center"
                                    onClick={() => onMenuItemClick(item.path)}
                                    style={{ 
                                        justifyContent: 'flex-start', 
                                        padding: '0.75rem 1rem',
                                        borderRadius: '8px',
                                        transition: 'all 0.2s ease',
                                        width: '100%'
                                    }}
                                >
                                    {item.icon && (
                                        <i className={`${item.icon} mr-3 text-lg text-red-700 transition-transform duration-200`} />
                                    )}
                                    <span className="font-medium">{item.label}</span>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </Sidebar>
    );
};

DashboardPrimeReactSidebar.propTypes = {
    visible: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
            icon: PropTypes.string,
        })).isRequired,
    onMenuItemClick: PropTypes.func.isRequired,
    header: PropTypes.node,
    className: PropTypes.string
};
