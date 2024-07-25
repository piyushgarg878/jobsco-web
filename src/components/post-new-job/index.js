'use client'

import { useState } from "react";
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import CommonForm from "../common-form";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils";
import { createJobAction } from "@/actions";
import { set } from "mongoose";

export default function PostNewJob({user,profileInfo}){
    const [showJobDialog,setShowJobDialog]=useState(false);
    const [JobFormData,setJobFormData]=useState({...initialPostNewJobFormData,companyName:profileInfo?.recruiterInfo?.companyName});
    function handlepostbtnDisabled(){
        return Object.keys(JobFormData).every((control) => JobFormData[control].trim() !== "");
    }
    async function createJob(){
        await createJobAction({...JobFormData,recruiterId:user?.id,applicants:[]},'/jobs');
        setJobFormData({...initialPostNewJobFormData,companyName:profileInfo?.recruiterInfo?.companyName});
        setShowJobDialog(false);
    }
    return(
        <div>
            <Button onClick={()=>setShowJobDialog(true)} className="disabled:opacity-60 flex h-11 items-center justify-center ">
                Post a new Job
            </Button>
            <Dialog open={showJobDialog} onOpenChange={()=>{setShowJobDialog(false);
            setJobFormData({...initialPostNewJobFormData,companyName:profileInfo?.recruiterInfo?.companyName})}}>
                <DialogContent className="sm:max-w-screen-md h-[450px] overflow-auto">
                    <DialogHeader>
                        <DialogTitle>Post New Job</DialogTitle>
                        <div className="grid gap-4 py-4">
                            <CommonForm buttonText={'Post Job'} formData={JobFormData} 
                            setFormData={setJobFormData} formcontrols={postNewJobFormControls} isBtnDisabled={!handlepostbtnDisabled()} action={createJob}/>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}