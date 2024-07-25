"use client";

import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { candidateOnboardFormControls, initialCandidateFormData, initialRecruiterFormData, initialUpdateCandidateFormData, recruiterOnboardFormControls } from "@/utils";
import { UpdateProfile } from "@/actions";

export default function AccountInfoPage({ profileInfo }) {
    const [recruiterdata,setrecruiterdata]=useState(initialRecruiterFormData);
    const [candidateData,setcandidateData]=useState(initialUpdateCandidateFormData);
    useEffect(()=>{
        if(profileInfo?.role==='recruiter') setrecruiterdata(profileInfo?.recruiterInfo);
        if(profileInfo?.role==='candidate') setcandidateData(profileInfo?.candidateInfo);
    },[profileInfo]);

    async function handleUpdateAccount(){
        await UpdateProfile(profileInfo?.role==='candidate'?{...profileInfo,candidateInfo:{...candidateData,resume:profileInfo.resume}}:{...profileInfo,recruiterInfo:recruiterdata},'/Account');
    }
  return (
    <div className="mx-auto max-w-7x1">
      <div className="f1ex items-baseline justify-between pb-6 border-b pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Account Details</h1>
          <CommonForm buttonText={'Update Profile'} isBtnDisabled={false} 
          formcontrols={profileInfo?.role==='recruiter'? recruiterOnboardFormControls:candidateOnboardFormControls.filter(control=>control.name!=='resume')} 
          formData={profileInfo?.role==='recruiter'?recruiterdata:candidateData} action={handleUpdateAccount}
          setFormData={profileInfo?.role==='recruiter'?setrecruiterdata:setcandidateData}/>
        
      </div>
    </div>
  );
}
