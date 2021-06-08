import { mount } from "enzyme";
import React from "react";
import { Forhandsvisning } from "../../src/components/dialogmote/Forhandsvisning";
import {
  Element,
  Innholdstittel,
  Normaltekst,
  Sidetittel,
} from "nav-frontend-typografi";
import { expect } from "chai";
import { Hovedknapp } from "nav-frontend-knapper";
import Lukknapp from "nav-frontend-lukknapp";
import {
  DocumentComponentDto,
  DocumentComponentType,
} from "../../src/data/dialogmote/types/dialogmoteTypes";
import Lenke from "nav-frontend-lenker";

describe("Forhandsvisning", () => {
  it("inneholder tittel, undertittel og knapper", () => {
    const wrapper = mount(
      <Forhandsvisning
        title={"Tittel her"}
        subtitle={"(undertittel)"}
        contentLabel={"Test"}
        isOpen={true}
        handleClose={() => {}}
        documentComponents={() => []}
      />
    );

    expect(wrapper.find(Sidetittel).text()).to.equal("Tittel her");
    expect(wrapper.find(Innholdstittel).text()).to.equal("(undertittel)");
    expect(wrapper.find(Hovedknapp).text()).to.equal("Lukk");
    expect(wrapper.find(Lukknapp)).to.have.length(1);
  });
  it("rendrer document components", () => {
    const documentComponents: DocumentComponentDto[] = [
      {
        type: DocumentComponentType.LINK,
        title: "Her er en link",
        texts: ["www.test.no"],
      },
      {
        type: DocumentComponentType.PARAGRAPH,
        texts: ["En paragraph"],
      },
      {
        type: DocumentComponentType.PARAGRAPH,
        title: "Paragraph title",
        texts: ["A paragraph", "Other paragraph"],
      },
    ];
    const wrapper = mount(
      <Forhandsvisning
        title={"Tittel her"}
        subtitle={"(undertittel)"}
        contentLabel={"Test"}
        isOpen={true}
        handleClose={() => {}}
        documentComponents={() => documentComponents}
      />
    );

    expect(wrapper.find(Element).at(0).text()).to.equal("Her er en link");
    expect(wrapper.find(Lenke).text()).to.equal("www.test.no");
    expect(wrapper.find(Lenke).prop("href")).to.equal("www.test.no");

    expect(wrapper.find(Normaltekst).at(0).text()).to.equal("En paragraph");
    expect(wrapper.find(Element).at(1).text()).to.equal("Paragraph title");
    expect(wrapper.find(Normaltekst).at(1).text()).to.equal("A paragraph");
    expect(wrapper.find(Normaltekst).at(2).text()).to.equal("Other paragraph");
  });
});
