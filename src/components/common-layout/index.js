import { fetchProfileAction } from "@/actions";
import Header from "@/components/header";
import { currentUser } from "@clerk/nextjs/server";

export default async function CommonLayout({ children }) {
    const user=await currentUser();
    const profileInfo=await fetchProfileAction(user?.id);
    return (
        <div className="mx-auto max-w-7xl p-6  lg:px-8">
            <Header user={JSON.parse(JSON.stringify(user))} profileInfo={profileInfo}/>
            <main>
                {children}
            </main>

        </div>
    )
}