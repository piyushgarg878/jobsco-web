import { fetchProfileAction } from '@/actions';
import AccountInfoPage from '@/components/account-info';
import { currentUser } from '@clerk/nextjs/server';




export default  async function AccountInfo(){
    const user=await currentUser();
    const profileInfo=await fetchProfileAction(user?.id);
    return (
        <AccountInfoPage profileInfo={profileInfo}/>
    )
}