"use client";

import { Fragment, useState } from "react";
import CommmonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import {Drawer,DrawerClose,DrawerContent,DrawerDescription,DrawerFooter,DrawerHeader,DrawerTitle,DrawerTrigger} from "@/components/ui/drawer"
import { ApplyJobAction, createJobAction } from "@/actions";

export default function CandidateJobCard({ Job,profileInfo,JobApplications }) {
const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false);
async function handleJobApply(){
  await ApplyJobAction({
    recruiterUserId: Job?.recruiterId,
    name: profileInfo?.candidateInfo?.name,
    email: profileInfo?.email,
    candidateUserId: profileInfo?.userId,
    status: ['Applied'],
    jobId: Job?._id,
    jobAppliedDate: new Date().toLocaleDateString(),
  },'/jobs');
  setShowJobDetailsDrawer(false);
} 
  return (
    <Fragment>
      <Drawer open={showJobDetailsDrawer} onOpenChange={setShowJobDetailsDrawer}>
      <CommmonCard
        icon={<JobIcon />}
        title={Job?.title}
        description={Job?.companyName}
        footerContent={ 
          <Button onClick={()=>setShowJobDetailsDrawer(true)}className="flex h-11 items-center justify-center ">
            View Details
          </Button>
        }
      />
      <DrawerContent className="p-6">
        <DrawerHeader className="px-0">
            <div className="flex justify-between">
                <DrawerTitle className="text-4xl font-extrabold text-gray-800">{Job?.title}</DrawerTitle>
                <div className="flex gap-3 ">
                  <Button onClick={handleJobApply}className="disabled:opacity-55 flex h-11 items-center justify-center" disabled={
                    JobApplications.findIndex(item=>item.jobId===Job._id)>-1?true:false 
                    } >{
                      JobApplications.findIndex(item=>item.jobId===Job._id)>-1?"Applied":"Apply Now"
                    }
                  </Button>
                  <Button onClick={()=>setShowJobDetailsDrawer(false)}className="flex h-11 items-center justify-center ">Cancel</Button>
                </div>
            </div>
        </DrawerHeader>
        <DrawerDescription className="text-2xl font-medium text-gray-600">
          {Job?.description}
          <span className="text-xl font-normal text-gray-500 ml-4">{Job.location}</span>
        </DrawerDescription>
        <div className="w-[150px] flex justify-center items-center h-[40px] mt-6 bg-black rounded-[4px]"><h2 className="text-xl font-bold text-white">{Job.type} Time</h2></div>
        <h3 className="text-2xl font-medium text-black mt-3">Experience Required :{Job.experience} years</h3>
        <div className="flex gap-4 mt-6">
          {
            Job?.skills?.split(",").map((skill,index)=>(
              <div key={index} className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                <h2 className="text-[13px] font-medium text-white">{skill}</h2>
              </div>
            ))
          }
        </div>
      </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
