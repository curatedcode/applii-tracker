import getAllDemoApplications from "./getAllDemoApplications";

export default function getDemoApplication(id: number) {
  const { needToApply, applied, interviewing, offer, closed } =
    getAllDemoApplications();

  const allApplications = needToApply.concat(
    applied,
    interviewing,
    offer,
    closed,
  );

  return allApplications.find((app) => app.id === id);
}
