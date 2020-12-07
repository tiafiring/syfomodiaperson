import React from "react";

interface PersonkortInformasjonProps {
  informasjonNokkelTekster: any;
  informasjon: any;
}

const PersonkortInformasjon = (
  personkortInformasjonProps: PersonkortInformasjonProps
) => {
  const { informasjonNokkelTekster, informasjon } = personkortInformasjonProps;
  return (
    <>
      {Object.keys(informasjon).map((nokkel, idx) => {
        return (
          <dl
            key={`${nokkel}.${idx}`}
            className="personkortElement__informasjon"
          >
            <dt>{informasjonNokkelTekster.get(nokkel)}</dt>
            <dd>{informasjon[nokkel]}</dd>
          </dl>
        );
      })}
    </>
  );
};

export default PersonkortInformasjon;
