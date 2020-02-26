# Syfomodiaperson
Frontend i Modia for en bruker sin sykefraværsoppfølging  

## TL;DR
React-app for oversikt med all informasjon om en gitt person sitt sykefravaer i Modia for syfoveiledere.
Node-app som kjører på Naiserator, og bygges med GitHub Actions

## Kjøre lokalt
Applikasjonen har en mock som kan brukes lokalt. Her mockes diverse endepunkter, dog ikke alle. 

Du må ha Node installert.

* For å kjøre koden lokalt: 
    - `$ npm install`
    - `$ npm run dev`
    - I et annet vindu `$ npm run start-local`
    - Eventuelt kan komandoene kjøres fra `package.json` i intellij.
* Kjør tester med `npm test` eller `npm test:watch`
* Lint JS-kode med `npm run lint` eller `npm run lint:fix`

Appen nås på [localhost:8080](http://localhost:8080/sykefravaer/fnr) hvor 'fnr' må ha et gyldig format.
Eksempler finnes på https://confluence.adeo.no/display/Digisyfo/Testdata+-+Fiktive+brukere (NAV-intern lenke)
