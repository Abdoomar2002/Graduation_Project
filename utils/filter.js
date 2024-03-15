import { useSelector } from "react-redux";
export function FilterByTrackID(trackId) {
  const LevelsData = useSelector((state) => state.level?.data);
  return LevelsData.filter((el) => el.TrackId == trackId);
}
export function FilterByLevelID(levelsId) {
  const YearsData = useSelector((state) => state.year?.data);
  return levelsId.flatMap((levelId) =>
    YearsData.filter((el) => el.LevelId == levelId)
  );
}
export function FilterByYearID(yearsId) {
  const DivisionsData = useSelector((state) => state.division?.data);
  return yearsId.flatMap((yearId) =>
    DivisionsData.filter((el) => el.YearId == yearId)
  );
}
export function FilterByDivisionID(divisionsId) {
  const SubjectsData = useSelector((state) => state.subject?.data);
  return divisionsId.flatMap((divisionId) =>
    SubjectsData.filter((el) => el.DivisionID == divisionId)
  );
}
export function GetDivisionsOfSubjects(divisionsId) {
  const DivisionsData = useSelector((state) => state.division?.data);
  return divisionsId.flatMap((divisionId) =>
    DivisionsData.filter((el) => el.YearId == divisionId)
  );
}
