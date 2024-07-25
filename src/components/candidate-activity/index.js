"use client";

import CommmonCard from "../common-card";
import JobIcon from "../job-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function CandidateActivity({ jobList, jobApplications }) {
  const UniqueStatusArray = [
    ...new Set(jobApplications.map((job) => job.status).flat(1)),
  ];
  return (
    <div className="mx-auto max-w-7xl">
      <Tabs defaultValue="Applied" className="w-full">
        <div className="flex items-baseline justify-between border-b pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Your Activity
          </h1>
          <TabsList>
                {
                    UniqueStatusArray.map((status,index)=>
                        <TabsTrigger key={index} value={status}>{status}</TabsTrigger>
                    )
                }
            </TabsList>
        </div>
        <div className="pb-24 pt-6">
                <div className="container mx-auto p-0 space-y-8">
                    <div className="flex flex-col gap-4">
                        {
                            UniqueStatusArray.map((status)=>
                                <TabsContent value={status}>
                                {
                                    jobApplications.filter((job)=>job.status[job?.status?.length-1]===status).map((job)=>
                                    (
                                     jobList.filter((jobItem)=>jobItem._id===job.jobId).map((jobItem,index2)=>(
                                        <CommmonCard key={index2} icon={<JobIcon/>} title={jobItem.title} description={jobItem.companyName}/>
                                     )   
                                    )
                                    ))
                            }
                                </TabsContent>
                            )
                        }
                    </div>

                </div>
            </div>
      </Tabs>
    </div>
  );
}
