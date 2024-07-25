import qs from 'query-string'

export const recruiterOnboardFormControls = [
    {
        label:'Name',
        name:'name',
        placeholder:'Enter your name',
        componentType:'input',
    },
    {
        label:'Company-Name',
        name:'companyName',
        placeholder:'Enter your company name',
        componentType:'input',
    },
    {
        label:'Company-Role',
        name:'companyRole',
        placeholder:'Enter your Role in the company',
        componentType:'input',
    }
]
export const initialRecruiterFormData={
    name:'',
    companyName:'',
    companyRole:'',
}

export const candidateOnboardFormControls = [
    {
        label:'Resume',
        name:'resume',        
        componentType:'file',
    },
    {
        label:'Name',
        name:'name',
        placeholder:'Enter your name',
        componentType:'input',
    },
    {
        label:'Current-Company',
        name:'currentCompany',
        placeholder:'Enter your current company',
        componentType:'input',
    },
    {
        label:'current-Job-location',
        name:'currentJobLocation',
        placeholder:'Enter your current job location',
        componentType:'input',
    },
    {
        label:'Preferred-Job-location',
        name:'preferredJobLocation',
        placeholder:'Enter your preferred job location',
        componentType:'input',
    },
    {
        label:'currentsalary',
        name:'currentSalary',
        placeholder:'Enter your currentsalary',
        componentType:'input',
    },
    {
        label:'Notice-Period',
        name:'noticePeriod',
        placeholder:'Enter your notice period',
        componentType:'input',
    },
    {
        label:'Skills',
        name:'skills',
        placeholder:'Enter your Skills',
        componentType:'input',
    },
    {
        label:'Previous-Company',
        name:'previousCompany',
        placeholder:'Enter your previous company',
        componentType:'input',
    },
    {
        label:'Total-experiece',
        name:'totalExperience',
        placeholder:'Enter your total experience',
        componentType:'input',
    },
    {
        label:'college',
        name:'college',
        placeholder:'Enter your college',
        componentType:'input',
    },
    {
        label:'college-location',
        name:'collegeLocation',
        placeholder:'Enter your college location',
        componentType:'input',
    },
    {
        label:'Graduated-Year',
        name:'graduatedYear',
        placeholder:'Enter your graduated year',
        componentType:'input',
    },
    {
        label:'linkedin',
        name:'linkedin',
        placeholder:'Enter your linkedin profile',
        componentType:'input',
    },
    {
        label:'Github',
        name:'github',
        placeholder:'Enter your Github profile',
        componentType:'input',
    }
]
export const initialCandidateFormData={
    resume:'',
    name:'',
    currentCompany:'',
    currentJobLocation:'',
    preferredJobLocation:'',
    currentSalary:'',
    noticePeriod:'',
    skills:'',
    previousCompany:'',
    totalExperience:'',
    college:'',
    collegeLocation:'',
    graduatedYear:'',
    linkedin:'',
    github:'',
}

export const initialUpdateCandidateFormData={
    name:'',
    currentCompany:'',
    currentJobLocation:'',
    preferredJobLocation:'',
    currentSalary:'',
    noticePeriod:'',
    skills:'',
    previousCompany:'',
    totalExperience:'',
    college:'',
    collegeLocation:'',
    graduatedYear:'',
    linkedin:'',
    github:'',
}


export const postNewJobFormControls=[
    {
        label:'Company-Name',
        name:'companyName',
        placeholder:'Enter your company name',
        componentType:'input',
        disabled:true,
    },
    {
        label:'title',
        name:'title',
        placeholder:'Enter your Job title',
        componentType:'input',
    },
    {
        label:'Type',
        name:'type',
        placeholder:'Enter your Job Type',
        componentType:'input',
    },
    {
        label:'Location',
        name:'location',
        placeholder:'Enter your location',
        componentType:'input',
    },
    {
        label:'Experience',
        name:'experience',
        placeholder:'Enter your required experiece',
        componentType:'input',
    },
    {
        label:'Description',
        name:'description',
        placeholder:'Enter your Job description',
        componentType:'input',
    },
    {
        label:'Skills',
        name:'skills',
        placeholder:'Enter your required skills',
        componentType:'input',
    }
]


export const initialPostNewJobFormData={
    companyName:'',
    title:'',
    type:'',
    location:'',
    experience:'',
    description:'',
    skills:'',
}

export const filterMenuDataArray=[
    {
        id:'companyName',
        label:'Company Name',
    },
    {
        id:'title',
        label:'Title',
    },
    {
        id:'type',
        label:'Type',
    },
    {
        id:'location',
        label:'Location',
    },
]

export function formUrlQuery({params,dataToAdd}){
    let currentUrl =qs.parse(params);
    if (Object.keys(dataToAdd).length > 0) {
        Object.keys(dataToAdd).forEach((key) => {
            if (dataToAdd[key].length === 0) {
                delete currentUrl[key];
            } else {
                currentUrl[key] = dataToAdd[key].join(',');
            }
        });
    }
    let a= qs.stringifyUrl({
        url:window.location.pathname,
        query:currentUrl,
    },{
        skipNull:true,
    })
    return a;
}
