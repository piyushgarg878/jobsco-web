'use client'

import { filterMenuDataArray } from "@/utils"
import CandidateJobCard from "../candidate-job-card"
import PostNewJob from "../post-new-job"
import RecruiterJobCard from "../recruiter-job-card"
import FilterMenuBar from "../filter-menu-bar"

export default function JobsList({user,profileInfo,Jobs,JobApplications,filterMenuItems}) {
    const filterMenus=filterMenuDataArray.map((item)=>({
        id:item.id,
        name:item.label,
        options:[
            ...new Set(filterMenuItems.map(listitem=>listitem[item.id]))
        ]
    }))
    return(
    <div>
        <div className="mx-auto max-w-7xl ">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                    {
                        profileInfo?.role==='candidate'?'Explore all Jobs':'Jobs Dashboard'
                    }
                </h1>
                    <div className="flex items-center">
                        {
                            profileInfo?.role==='candidate'?<FilterMenuBar filterMenus={filterMenus}/>:
                            <PostNewJob user={user} profileInfo={profileInfo}/>
                        }
                    </div>
            </div>
            <div className="pt-6 pb-24">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3 ">
                    <div className="lg:col-span-4">
                        <div className="container mx-auto p-0 space-y-8">
                            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                                    {
                                        Jobs&&Jobs.length>0?
                                        Jobs.map((Job,index)=>(
                                            profileInfo?.role==='candidate'?<CandidateJobCard key={index} profileInfo={profileInfo} Job={Job} JobApplications={JobApplications}/>
                                            :<RecruiterJobCard key={index} Job={Job} JobApplications={JobApplications}/>
                                        ))
                                        :null
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}