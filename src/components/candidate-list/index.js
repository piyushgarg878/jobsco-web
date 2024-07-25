"use client";

import { Fragment } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import {
  fetchCandidateDetailsByid,
  UpdateJobApplicationAction,
} from "@/actions";
import { createClient } from "@supabase/supabase-js";
const supabaseClient = createClient(
  "https://yszjyfwrzlyluuvxepgw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzemp5Zndyemx5bHV1dnhlcGd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE1NjE5NjMsImV4cCI6MjAzNzEzNzk2M30.szGv5EONd673B1mb5NmCmaYxQObWpasrTnX1Fmr5LxM"
);

export default function CandidateList({
  currentCandidateDetails,
  setCurrentCandidateDetails,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
  Candidates,
}) {
  function handlePreviewResume() {
    const { data } = supabaseClient.storage
      .from("Job-Board-Public")
      .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume);
    const a = document.createElement("a");
    a.href = data?.publicUrl;
    a.setAttribute(
      "download",
      `${currentCandidateDetails?.candidateInfo?.name}-resume`
    );
    a.setAttribute("target", "_blank");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  async function handleFetchCandidateDetails(userid) {
    const result = await fetchCandidateDetailsByid(userid);
    setCurrentCandidateDetails(result);
    setShowCurrentCandidateDetailsModal(true);
  }
  async function handleUpdateJobStatus(status) {
    let cpyJobApplications = [...Candidates];
    const index = cpyJobApplications.findIndex(
      (candidate) =>
        candidate.candidateUserId === currentCandidateDetails?.userId
    );
    const JobApplicantstoUpdate = {
      ...cpyJobApplications[index],
      status: cpyJobApplications[index].status.concat(status),
    };
    await UpdateJobApplicationAction(JobApplicantstoUpdate, "/jobs");
  }
  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
        {Candidates && Candidates.length > 0
          ? Candidates.map((candidate, index) => (
              <div className="bg-white shadow-lg w-full mx-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                <div className="px-4 my-6 flex flex-row justify-between items-center">
                  <h3 className="text-lg font-bold">{candidate?.name}</h3>
                  <Button
                    onClick={() =>
                      handleFetchCandidateDetails(candidate?.candidateUserId)
                    }
                    className="flex  h-11 items-center justify-center "
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))
          : null}
      </div>
      <Dialog
        open={showCurrentCandidateDetailsModal}
        onOpenChange={() => {
          setCurrentCandidateDetails(null);
          setShowCurrentCandidateDetailsModal(false);
        }}
      >
        <DialogContent>
          <div>
            <h1 className="text-2xl font-bold text-black">
              {currentCandidateDetails?.candidateInfo?.name},
              {currentCandidateDetails?.email}
            </h1>
            <p className="text-xl font-bold text-black">
              {currentCandidateDetails?.candidateInfo.currentCompany}
            </p>
            <p>{currentCandidateDetails?.candidateInfo.currentJobLocation}</p>
            <p>
              Total Experience:
              {currentCandidateDetails?.candidateInfo.totalExperience} Years
            </p>
            <p>
              Salary:{currentCandidateDetails?.candidateInfo.currentSalary}LPA
            </p>
            <p>
              Notice Period:
              {currentCandidateDetails?.candidateInfo.noticePeriod} days
            </p>
            <div className="flex  flex-wrap gap-4 mt-6">
              <h1>Previous Company:</h1>
              {currentCandidateDetails?.candidateInfo?.previousCompany
                ?.split(",")
                .map((skill, index) => (
                  <div
                    key={index}
                    className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]"
                  >
                    <h2 className="text-[13px] font-medium text-white">
                      {skill}
                    </h2>
                  </div>
                ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              {currentCandidateDetails?.candidateInfo?.skills
                ?.split(",")
                .map((skill, index) => (
                  <div
                    key={index}
                    className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]"
                  >
                    <h2 className="text-[13px] font-medium text-white">
                      {skill}
                    </h2>
                  </div>
                ))}
            </div>
          </div>
          <DialogFooter className="flex gap-3">
            <Button
              onClick={handlePreviewResume}
              className="flex  h-11 items-center justify-center "
            >
              Resume
            </Button>
            <Button
              disabled={
                Candidates.find(
                  (candidate) =>
                    candidate.candidateUserId ===
                    currentCandidateDetails?.userId
                )?.status.includes("Selected") ||
                Candidates.find(
                  (candidate) =>
                    candidate.candidateUserId ===
                    currentCandidateDetails?.userId
                )?.status.includes("rejected")
              }
              onClick={() => handleUpdateJobStatus("Selected")}
              className="disabled:opacity-25 disabled:bg-black flex  h-11 items-center justify-center bg-green-300"
            >
              {Candidates.find(
                (candidate) =>
                  candidate.candidateUserId === currentCandidateDetails?.userId
              )?.status.includes("Selected")
                ? "Selected"
                : "Select"}
            </Button>
            <Button
              disabled={
                Candidates.find(
                  (candidate) =>
                    candidate.candidateUserId ===
                    currentCandidateDetails?.userId
                )?.status.includes("rejected") ||
                Candidates.find(
                  (candidate) =>
                    candidate.candidateUserId ===
                    currentCandidateDetails?.userId
                )?.status.includes("Selected")
              }
              onClick={() => handleUpdateJobStatus("rejected")}
              className="disabled:opacity-25 disabled:bg-black flex  h-11 items-center justify-center bg-red-400"
            >
              {
                Candidates.find(
                  (candidate) =>
                    candidate.candidateUserId ===
                    currentCandidateDetails?.userId
                )?.status.includes("rejected")? "Rejected": "Reject"
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
