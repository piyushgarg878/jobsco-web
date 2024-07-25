"use client";

import CandidateList from "../candidate-list";
import { Drawer, DrawerContent } from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";

export default function JobApplicants({
  showApplicantsDrawer,
  setShowApplicantsDrawer,
  setCurrentCandidateDetails,
  setShowCurrentCandidateDetailsModal,
  currentCandidateDetails,
  showCurrentCandidateDetailsModal,
  JobApplications,
  Job,
}) {
  return <Drawer open={showApplicantsDrawer} onOpenChange={setShowApplicantsDrawer}>
    <DrawerContent className="max-h-[50vh]">
        <ScrollArea className="h-auto overflow-y-auto">
            <CandidateList currentCandidateDetails={currentCandidateDetails} showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal} setShowCurrentCandidateDetailsModal={setShowCurrentCandidateDetailsModal} Candidates={JobApplications} setCurrentCandidateDetails={setCurrentCandidateDetails}
            />
        </ScrollArea>
    </DrawerContent>
  </Drawer>
}
