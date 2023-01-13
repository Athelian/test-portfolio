import "./Planet.sass";

const Planet = (props) => (
  <div className={"Planet" + " " + props.planetClassname}>
    <div className="Sphere" {...props.sphereProps}>
      <div className={"Hemisphere"} {...props.hemisphereProps}>
        {props.children}
      </div>
    </div>
  </div>
);

export default Planet;
