import getAllDemoApplications from "./getAllDemoApplications";

/**
 * - Will return an application id
 * - Incremented 1 after the last application created
 */
export default function getNewDemoApplicationId() {
  const { needToApply, applied, interviewing, offer, closed } =
    getAllDemoApplications();

  const allApplications = needToApply.concat(
    applied,
    interviewing,
    offer,
    closed,
  );

  return allApplications.length + 1;
}
