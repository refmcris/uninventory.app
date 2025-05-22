import { Header } from "../components";

export const LandingWrapper = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-column bg-gray-50">
      <Header />
      <main className="flex-grow w-full">{children}</main>
    </div>
  );
};
