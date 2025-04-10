import { HeaderUser } from "../components";

export const UserLandingWrapper = ({ children }) => {
  return (
    <div style={{ position: "relative" }}>
      <HeaderUser />
      <div>{children}</div>
    </div>
  );
};
