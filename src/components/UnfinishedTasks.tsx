import React from "react";
import * as menypunkter from "../enums/menypunkter";

const opActivePlanerText = (tasks: number) => {
  const activeText = tasks > 1 ? "aktive" : "aktiv";

  return `(${tasks} ${activeText})`;
};

interface UnfinishedTasksProps {
  tasks: number;
  menypunkt: string;
}

const UnfinishedTasks = (unfinishedTasksProps: UnfinishedTasksProps) => {
  const { tasks, menypunkt } = unfinishedTasksProps;
  return menypunkt === menypunkter.OPPFOELGINGSPLANER ? (
    <p className="antallNytt__oppfolgingsplan">{opActivePlanerText(tasks)}</p>
  ) : (
    <i className="antallNytt">{tasks}</i>
  );
};

export default UnfinishedTasks;
