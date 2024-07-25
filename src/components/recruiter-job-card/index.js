"use client";

import { useState } from "react";
import CommmonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import JobApplicants from "../job-applicants";

export default function RecruiterJobCard({ Job, JobApplications }) {
  const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false);
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
  const [showCurrentCandidateDetailsModal,setShowCurrentCandidateDetailsModal] = useState(false);

  return (
    <div>
      <CommmonCard
        icon={<JobIcon />}
        title={Job?.title}
        footerContent={
          <Button onClick={()=>setShowApplicantsDrawer(true)}className="disabled:opacity-55 flex h-11 items-center justify-center " disabled={JobApplications.filter((item) => item.jobId === Job._id).length===0}>
            {JobApplications.filter((item) => item.jobId === Job._id).length}{" "}
            Applicants
          </Button>
        }
      />
      <JobApplicants
        showApplicantsDrawer={showApplicantsDrawer}
        setShowApplicantsDrawer={setShowApplicantsDrawer}
        setCurrentCandidateDetails={setCurrentCandidateDetails}
        setShowCurrentCandidateDetailsModal={setShowCurrentCandidateDetailsModal}
        currentCandidateDetails={currentCandidateDetails}
        showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
        JobApplications={JobApplications.filter(item=>item.jobId===Job._id)}
        Job={Job}
      />
    </div>
  );
}
