'use server'

import connecttoDb from "@/database"
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

export default async function createProfile(data,pathtorevalidate){
    await connecttoDb();
    await Profile.create(data);
    revalidatePath(pathtorevalidate);
}

export async function fetchProfileAction(id){
    await connecttoDb();
    const result=await Profile.findOne({userId:id});
    return JSON.parse(JSON.stringify(result));
}

export async function createJobAction(data,pathtorevalidate){
    await connecttoDb();
    await Job.create(data);
    revalidatePath(pathtorevalidate);
}

export async function fetchJobsActionForrecruiter(id){
    await connecttoDb();
    const result=await Job.find({recruiterId:id});
    return JSON.parse(JSON.stringify(result));
}


export async function fetchJobsActionForCandidate(filterParams=[]){
    await connecttoDb();
    let updatedParams={};
    Object.keys(filterParams).forEach((filterKey)=>{
        updatedParams[filterKey]={$in:filterParams[filterKey].split(',')};
    })
    const result=await Job.find(filterParams&&Object.keys(filterParams).length>0?updatedParams:{});
    return JSON.parse(JSON.stringify(result));
}

export async function ApplyJobAction(data,pathtorevalidate){
    await connecttoDb();
    await Application.create(data);
    revalidatePath(pathtorevalidate);
}

export async function fetchJobApplicationsforCandidate(id){
    await connecttoDb();
    const result=await Application.find({candidateUserId:id});
    return JSON.parse(JSON.stringify(result));
}

export async function fetchJobApplicationsforRecruiter(id){
    await connecttoDb();
    const result=await Application.find({recruiterUserId:id});
    return JSON.parse(JSON.stringify(result));
}

export async function fetchCandidateDetailsByid(id){
    await connecttoDb();
    const result=await Profile.findOne({userId:id});
    return JSON.parse(JSON.stringify(result));
}


export async function UpdateJobApplicationAction(data,pathtorevalidate){
    await connecttoDb();
    const{recruiterUserId,name,email,candidateUserId,status,jobId,jobAppliedDate,_id}=data;
    await Application.findByIdAndUpdate(_id,{recruiterUserId,name,email,candidateUserId,status,jobId,jobAppliedDate},{new:true});
    revalidatePath(pathtorevalidate);
}


export async function createFilterCategoryAction(){
    await connecttoDb();
    const result=await Job.find({});
    return JSON.parse(JSON.stringify(result));
}

export  async function UpdateProfile(data,pathtorevalidate){
    await connecttoDb();
    const{userId,role,email,isPremiumUser,memberShipType,memberShipStartDate,memberShipEndDate,recruiterInfo,candidateInfo,_id}=data;
    await Profile.findByIdAndUpdate({_id:_id},{userId,role,email,isPremiumUser,memberShipType,memberShipStartDate,memberShipEndDate,recruiterInfo,candidateInfo},{new:true});
    revalidatePath(pathtorevalidate);
}