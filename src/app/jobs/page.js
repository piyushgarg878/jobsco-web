import { createFilterCategoryAction, fetchJobApplicationsforCandidate, fetchJobApplicationsforRecruiter, fetchJobsActionForCandidate, fetchJobsActionForrecruiter, fetchProfileAction } from "@/actions";
import JobsList from "@/components/jobs-list";
import { currentUser } from "@clerk/nextjs/server";

export default async function JobsPage({searchParams}){
    const user=await currentUser();
    const profileInfo=await fetchProfileAction(user?.id);
    const Jobs=profileInfo?.role==='candidate'?await fetchJobsActionForCandidate(searchParams):await fetchJobsActionForrecruiter(user?.id);
    const JobApplicationlist=profileInfo?.role==='candidate'?await fetchJobApplicationsforCandidate(user?.id):await fetchJobApplicationsforRecruiter(user?.id);
    const filterMenuItems=await createFilterCategoryAction();
    return (
        <JobsList user={JSON.parse(JSON.stringify(user))} profileInfo={profileInfo} Jobs={Jobs} JobApplications={JobApplicationlist} filterMenuItems={filterMenuItems}/>
    )
}