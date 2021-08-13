export type HistorikkKilde = "MOTER" | "MOTEBEHOV" | "OPPFOELGINGSDIALOG";

export interface HistorikkEvent {
  opprettetAv?: string;
  tekst: string;
  tidspunkt: Date;
  kilde: HistorikkKilde | "LEDER";
}
