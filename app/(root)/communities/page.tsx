import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import { fetchUser } from '@/lib/actions/user.actions';
import PostThread from '@/components/forms/PostThread';

async function Page(){

    const user = await currentUser();

    
    if(!user) return null;
    
    const userInfo = await fetchUser(user.id);
    
    if(!userInfo?.onboarded ) redirect('/onboarding')

    console.log(userInfo)
    
    return(
        <>
            <h1 className="head-text">Community</h1>

        </>
)
    
}

export default Page;