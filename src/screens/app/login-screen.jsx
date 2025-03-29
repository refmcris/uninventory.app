import React,  {useState} from "react";
import { LandingWrapperLogin } from "../../wrappers";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';


export const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
      };

  return (
    <LandingWrapperLogin className="bg-gray-100">
        <section className="w-11 py-8 md:py-8 relative overflow-hidden mt-5rem">
            <div className="flex align-items-center justify-content-center min-h-screen w-full">
                <Card className="w-11 md:w-30rem mx-auto">
                    <div className="flex justify-content-center mb-5">
                        <div className="w-10rem">
                            <img src="../" alt="Uninventory" className="w-full" />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-column gap-4">
                        <span className="p-input-icon-left w-full">
                            <i className="pi pi-user" />
                            <InputText
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nombre de usuario"
                            className="w-full custom-input"
                            />
                        </span>

                        <span className="p-input-icon-left w-full">
                            <i className="pi pi-lock" />
                            <InputText
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                            className="w-full custom-input"
                            />
                        </span>

                        <Button
                            type="submit"
                            label="Entrar"
                            className="w-full custom-button"
                        />
                    </form>

                    <div className="mt-4 text-center flex flex-column gap-2">
                        <a href="#" className="custom-link text-sm">    
                            ¿Olvidó su nombre de usuario o contraseña?
                        </a>
                        <a href="./register" className="custom-link text-sm">
                            ¿No estás registrado aún? crea tu cuenta aquí
                        </a>
                    </div>
                </Card>
            </div>
        </section>
    </LandingWrapperLogin>);
};