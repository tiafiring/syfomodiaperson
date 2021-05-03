import React from "react";
import PropTypes from "prop-types";
import { Row, Column } from "nav-frontend-grid";
import Datovelger from "../../Datovelger";
import KlokkeslettField from "../../KlokkeslettField";

const texts = {
  header: "Nytt tidspunkt",
  dateLabel: "Dato",
  datePlaceholder: "dd.mm.åååå",
  timeLabel: "Klokkeslett",
};

const Tidspunkt = ({ tidspunkt }) => {
  const datoName = `tidspunkter[${tidspunkt}].dato`;
  const klokkeslettName = `tidspunkter[${tidspunkt}].klokkeslett`;

  return (
    <div className="motetidspunkter__tidspunkt blokk js-tidspunkt">
      <h4 className="typo-element blokk--s">{texts.header}</h4>
      <div className="blokk">
        <Row>
          <Column className="col-xs-12 col-sm-6">
            <label
              className="skjemaelement__label"
              htmlFor={`dato-${tidspunkt}`}
            >
              {texts.dateLabel}
            </label>
            <Datovelger
              id={`dato-${tidspunkt}`}
              name={datoName}
              placeholder={texts.datePlaceholder}
            />
          </Column>
          <Column className="col-xs-12 col-sm-6">
            <KlokkeslettField
              name={klokkeslettName}
              label={texts.timeLabel}
              id={`klokkeslett-${tidspunkt}`}
            />
          </Column>
        </Row>
      </div>
    </div>
  );
};

Tidspunkt.propTypes = {
  tidspunkt: PropTypes.number,
};

export default Tidspunkt;
