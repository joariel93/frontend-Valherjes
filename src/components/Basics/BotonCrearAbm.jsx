import { Button } from 'primereact/button';

const BotonCrearAbm = ({
  label = "Nuevo",
  icon = "pi pi-plus",
  onClick,
  severity = "primary",
  className = "",
  entity = "registro"
}) => {
  return (
    <div className="mb-4">
      <Button
        label={`${label} ${entity}`}
        icon={icon}
        severity={severity}
        onClick={onClick}
        className={`p-button-raised ${className}`}
      />
    </div>
  );
};

export default BotonCrearAbm;