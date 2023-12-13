import getAllDemoApplications from "./getAllDemoApplications";

/**
 * - Will return an application id
 * - Incremented 1 after the last application created
 */
export default function getNewDemoApplicationId() {
  const applications = getAllDemoApplications("dateCreated");

  return applications.length + 1;
}
