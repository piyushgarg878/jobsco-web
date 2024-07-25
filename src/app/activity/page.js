import { fetchJobApplicationsforCandidate, fetchJobsActionForCandidate } from "@/actions";
import CandidateActivity from "@/components/candidate-activity";
import { currentUser } from "@clerk/nextjs/server";




export default async function ActivityPage(){
    const user=await currentUser();
    const jobList= await fetchJobsActionForCandidate();
    const jobApplications=await fetchJobApplicationsforCandidate(user?.id);
    return(<CandidateActivity jobList={jobList} jobApplications={jobApplications} />
    )
}