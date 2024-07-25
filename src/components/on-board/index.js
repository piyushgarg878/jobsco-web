'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommonForm from "../common-form";
import { candidateOnboardFormControls, initialCandidateFormData, initialRecruiterFormData, recruiterOnboardFormControls } from "@/utils";
import { useEffect, useState } from "react";
import createProfile from "@/actions";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

const supabaseClient=createClient('https://yszjyfwrzlyluuvxepgw.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzemp5Zndyemx5bHV1dnhlcGd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE1NjE5NjMsImV4cCI6MjAzNzEzNzk2M30.szGv5EONd673B1mb5NmCmaYxQObWpasrTnX1Fmr5LxM');


export default function OnBoard(){
    const [currentTab,setCurrentTab]=useState('candidate');
    const [recruiterFormData,setRecruiterFormData]=useState(initialRecruiterFormData);
    const [candidateFormData,setCandidateFormData]=useState(initialCandidateFormData);
    const [file,setFile]=useState(null);
    const currentAuthUser=useUser();
    const {user}=currentAuthUser;
    async function hanflefileuploadpdftosupabase(){
        const {data,error}=await supabaseClient.storage.from('Job-Board-Public').upload(`/public/${file.name}`,file,{
            cacheControl:3600,
            upsert:false,
        })
        if(data){
            setCandidateFormData({...candidateFormData,resume:data.path});
        }
    }
    function handleFileChange(event){
        event.preventDefault();
        setFile(event.target.files[0]);
    }
    useEffect(()=>{
        if(file) hanflefileuploadpdftosupabase();
    },[file])
    function handleTabChange(value){
        setCurrentTab(value);
    }
    function handleRecruiterFormValid(){
        return recruiterFormData.name && recruiterFormData.companyName && recruiterFormData.companyRole;
    }
    function handleCandidateFormValid(){
        return Object.keys(candidateFormData).every(key=>candidateFormData[key].trim()!=='');
    }
    async function createProfileAction(){
        const data=currentTab==='candidate'?{
            candidateInfo:candidateFormData,
            role:'candidate',
            isPremiumUser:false,
            userId:user?.id,
            email:user?.primaryEmailAddress?.emailAddress, 
        }
        :{
            recruiterInfo:recruiterFormData,
            role:'recruiter',
            isPremiumUser:false,
            userId:user?.id,
            email:user?.primaryEmailAddress?.emailAddress,  
        }
        await createProfile(data,'/onboard');
    }
    return(
        <div className="bg-white">
        <Tabs value={currentTab} onValueChange={handleTabChange}>
            <div className="w-full">
                <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Welcome to Onboarding</h1>
                    <TabsList>
                        <TabsTrigger value="candidate">Candidate</TabsTrigger>
                        <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="candidate">
                    <CommonForm formcontrols={candidateOnboardFormControls}buttonText={'Onboard as Candidate'} formData={candidateFormData} setFormData={setCandidateFormData} isBtnDisabled={!handleCandidateFormValid()} action={createProfileAction} handleFileChange={handleFileChange}></CommonForm>
                </TabsContent>
                <TabsContent value="recruiter">
                    <CommonForm formcontrols={recruiterOnboardFormControls}buttonText={'Onboard as Recruiter'} formData={recruiterFormData} setFormData={setRecruiterFormData}isBtnDisabled={!handleRecruiterFormValid()} action={createProfileAction}></CommonForm>
                </TabsContent>
            </div>
        </Tabs>
    </div>
    )
}