import { useValgtPersonident } from "@/hooks/useValgtBruker";
import { SYFOPERSON_ROOT } from "@/apiConstants";
import { PersonAdresse } from "@/data/personinfo/types/PersonAdresse";
import { get } from "@/api/axios";
import { useQuery } from "react-query";
import { minutesToMillis } from "@/utils/timeUtils";

const personinfoQueryKeys = {
  personadresse: (fnr: string) => ["personadresse", fnr],
};

const aktorIdQueryKeys = {
  aktorId: (fnr: string) => ["aktorId", fnr],
};

export const usePersonAdresseQuery = () => {
  const fnr = useValgtPersonident();
  const path = `${SYFOPERSON_ROOT}/person/adresse`;
  const fetchPersonAdresse = () => get<PersonAdresse>(path, fnr);
  return useQuery(personinfoQueryKeys.personadresse(fnr), fetchPersonAdresse, {
    enabled: !!fnr,
    staleTime: minutesToMillis(60 * 12),
  });
};

export const useAktorIdQuery = () => {
  const fnr = useValgtPersonident();
  const path = `${SYFOPERSON_ROOT}/person/aktorid`;
  const fetchAktorId = () => get<string>(path, fnr);
  return useQuery(aktorIdQueryKeys.aktorId(fnr), fetchAktorId, {
    enabled: !!fnr,
    staleTime: minutesToMillis(60 * 12),
  });
};
