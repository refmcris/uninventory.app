export const LabelInputRow = ({ label, children }) => (
    <div className="w-full flex align-items-center">
      <span className="w-4 md:w-2">{label}</span>
      <div className="w-8 md:w-10">{children}</div>
    </div>
  );
  