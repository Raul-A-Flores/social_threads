import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from '@clerk/nextjs'
import { redirect } from "next/navigation";
import Comment from "@/components/forms/Comment";
import Thread from "@/lib/models/thread.model";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { profileTabs } from "@/constants";
import Image from 'next/image';
import ThreadsTab from "@/components/shared/ThreadsTab";


const Page = async ({ params } : { params: { id: string}}) => {


    const user = await currentUser();

    
    if(!user) return null;
    
    const userInfo = await fetchUser(user.id);
    
    if(!userInfo?.onboarded ) redirect('/onboarding')

    console.log(userInfo)

    return (
        <section>
            <ProfileHeader 
                accountId={userInfo.id}
                authUserId={user.id}
                name={userInfo.name}
                username={userInfo.name}
                imgUrl={userInfo.image}
                bio={userInfo.bio}
                />
                <div className="mt-9">
                    <Tabs defaultValue="threads" className="w-full">
                        <TabsList className="tab">
                            {
                                profileTabs.map((tab)=>(
                                    <TabsTrigger key={tab.label} value={tab.value} className="tab">
                                        <Image 
                                            
                                            src={tab.icon}
                                            alt={tab.label}
                                            width={24}
                                            height={24}
                                            className='object-contain'
                                            
                                            />
                                            <p className="max-sm:hidden">{tab.label}</p>
                                            {tab.label === 'Threads' && (
                                                <p className="ml-1 rouned-sm bg-light-4 py-2 px-2 !text-tiny-medium text-light-2">
                                                    {userInfo?.threads?.length}
                                                </p>
                                            )}
                                    </TabsTrigger>
                                ))
                            }

                        </TabsList>
                        {profileTabs.map((tab)=>(
                            <TabsContent key={`content-${tab.label}`} value={tab.value} className="w-full text-light-1">
                                <ThreadsTab currentUserId={user.id} accountId={userInfo.id} accountType="User">

                                </ThreadsTab>
                            </TabsContent>
                        ))}
                    </Tabs>

                </div>
        </section>
    )
}


export default Page;
