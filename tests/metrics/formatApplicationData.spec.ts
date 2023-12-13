import formatApplicationData from "@/src/components/Metrics/formatApplicationData";
import { statusColors } from "@/src/types/global";
import {
  ApplicationsInDateRangeType,
  FormattedChartDataType,
} from "@/src/types/metrics";
import { expect, test } from "vitest";

test("returns data in correct format", () => {
  const mockData: ApplicationsInDateRangeType[] = [
    {
      label: "Apr",
      applications: [
        {
          id: 4,
          position: "Project Manager",
          company: "Mason Consulting",
          status: "needToApply",
          contacts: [],
          notes: [],
          dateCreated: "2023-04-28T04:00:00.000Z",
          dateModified: "2023-10-12T20:00:00.000Z",
        },
        {
          id: 5,
          position: "Senior Data Analyst",
          company: "Acme Inc.",
          status: "needToApply",
          contacts: [],
          notes: [],
          dateCreated: "2023-04-28T04:00:00.000Z",
          dateModified: "2023-10-12T20:00:00.000Z",
        },
      ],
    },
    {
      label: "May",
      applications: [
        {
          id: 9,
          position: "Human Resources Specialist",
          company: "Amazon",
          postingURL: "example.com",
          status: "interviewing",
          contacts: [],
          notes: [],
          dateCreated: "2023-05-22T04:00:00.000Z",
          dateModified: "2023-05-22T06:00:00.000Z",
          dateApplied: "2023-05-24T04:00:00.000Z",
          dateInterviewing: "2023-05-26T04:00:00.000Z",
        },
      ],
    },
  ];

  const result = formatApplicationData(mockData);

  const resultShouldBe: FormattedChartDataType[] = [
    {
      date: "Apr",
      "Need To Apply": 2,
      "Need To ApplyColor": statusColors.needToApply,
      Applied: 0,
      AppliedColor: statusColors.applied,
      Interviewing: 0,
      InterviewingColor: statusColors.interviewing,
      Offer: 0,
      OfferColor: statusColors.offer,
      Closed: 0,
      ClosedColor: statusColors.closed,
    },
    {
      date: "May",
      "Need To Apply": 0,
      "Need To ApplyColor": statusColors.needToApply,
      Applied: 0,
      AppliedColor: statusColors.applied,
      Interviewing: 1,
      InterviewingColor: statusColors.interviewing,
      Offer: 0,
      OfferColor: statusColors.offer,
      Closed: 0,
      ClosedColor: statusColors.closed,
    },
  ];

  expect(result).toStrictEqual(resultShouldBe);
});
