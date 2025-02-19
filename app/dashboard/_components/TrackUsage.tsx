'use client'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { UpdateContext } from '@/app/(context)/UpdateContext'
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { AIOutput, userSubscription } from '@/utils/schemas'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

function TrackUsage() {
    const {user} = useUser()
    const {totalUsage, setTotalUsage} = useContext(TotalUsageContext);
    const {updateCreditUsage,setUpdateCreditUsage} = useContext(UpdateContext)
    const {userSubscriptions, setuserSubscription} = useContext(UserSubscriptionContext)
    const [maxWords, setmaxWords] = useState(10000)
    const router = useRouter();

    
    useEffect(() => {
        user&&getData()
        user&&IsUserSubscribed();
    }, [user])


    useEffect(() => {
      user&&getData()
    }, [updateCreditUsage&&user])
    
    
    const getData=async()=>{
        {/* @ts-ignore */}
        const result:any[] =  await db.select().from(AIOutput).where(eq(AIOutput.createdBy,user?.primaryEmailAddress?.emailAddress))
        getTotalUsage(result)
    }

    const IsUserSubscribed=async()=>{
        const result = await db.select().from(userSubscription)
        .where(eq(userSubscription.email,user?.primaryEmailAddress?.emailAddress))

        if(result){
            setuserSubscription(true);
            setmaxWords(100000)
        }
    }

    const getTotalUsage=(result:any[])=>{
        let total:number = 0
        result.forEach(element=>{
            total=total+Number(element.aiResponse?.length)
        })
        setTotalUsage(total)
        console.log(total)
    }
    
    return (
        <div>
            <div className='m-5'>
                <div className='bg-blue-800 text-white rounded-lg p-3'>
                    <h2 className='font-medium'>Credits</h2>
                    <div className='h-2 bg-blue-500 w-full rounded-full mt-3'>
                        <div className='h-2 bg-white rounded-full'
                            style={{
                                width: (totalUsage/maxWords)*100+"%"
                            }}
                        >
                        </div>
                    </div>
                    <h2 className='text-sm my-2'>{totalUsage}/{maxWords} credits used</h2>
                </div>
                <Button className='w-full my-3 text-blue-800 bg-blue-100 hover:bg-blue-100'
                onClick={()=>router.push('/dashboard/billing')}>Upgrade</Button>
            </div>
        </div>
    )
}

export default TrackUsage
