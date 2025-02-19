'use client'
import { Button } from '@/components/ui/button'
import { CheckCircle, Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { db } from '@/utils/db'
import { userSubscription } from '@/utils/schemas'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext'

function billing() {
  const [loading, setloading] = useState(false)
  const {userSubscriptions, setuserSubscription} = useContext(UserSubscriptionContext);
  const {user} = useUser();
  const createSubscription = () => {
    setloading(true)
    axios.post('/api/create-subscription', {})
      .then(resp => {
        console.log(resp.data)
        onPayment(resp.data.id)
      }, (error) => {
        setloading(false)
      })

  }

  const onPayment = (subId: string) => {
    const options = {
      'key': process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      'subscription_id': subId,
      'name': 'AI Writer Studio',
      description: 'Monthly Subscription',
      handler: async (resp: any) => {
        console.log(resp)
        if(resp){
          saveSubscription(resp?.razorpay_payment_id)
        }
        setloading(false)

      }
    }

    // @ts-ignore
    const rzp = new window.Razorpay(options)
    rzp.open()
  }
  const containerClass = "container mx-auto px-4 sm:px-6 lg:px-8"

  const saveSubscription=async(paymentId:string)=>{
    const result = await db.insert(userSubscription).
    values({
      email:user?.primaryEmailAddress?.emailAddress,
      userName:user?.fullName,
      active:true,
      paymentId:paymentId,
      joinDate:moment().format('DD/MM/yyyy')
    });
    console.log(result);
    if(result){
      window.location.reload();
    }
    
  }
  return (
    <div>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <section id="pricing" className="py-20 bg-white">
        <div className={containerClass}>
          <h2 className="text-3xl font-bold mb-12 text-center">Upgrade your plan</h2>
          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-16">

            {/* Free Plan Card */}
            <div className="bg-slate-100 dark:bg-gray-800 p-8 rounded-lg shadow-md text-center w-full sm:max-w-xs md:max-w-xs cursor-pointer">
              <h3 className="text-2xl font-bold mb-4">Free</h3>
              <p className="text-4xl font-bold mb-6 text-blue-600 dark:text-blue-400">$0</p>
              <ul className="mb-8 text-left">
                <li className="flex items-center mb-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  10,000 words
                </li>
                <li className="flex items-center mb-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  Access to all templates
                </li>
                <li className="flex items-center mb-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  Unlimited Download and copy
                </li>
                <li className="flex items-center mb-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  1 month history
                </li>
              </ul>
              <Button className="bg-gray-400 text-white font-bold py-2 px-6 rounded-full inline-block transition-colors">
                Currently Active
              </Button>
            </div>

            {/* Pro Plan Card */}
            <div className="bg-slate-100 dark:bg-gray-800 p-8 rounded-lg shadow-md text-center w-full sm:max-w-xs md:max-w-xs cursor-pointer">
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <p className="text-4xl font-bold mb-6 text-blue-600 dark:text-blue-400">$2.99</p>
              <ul className="mb-8 text-left">
                <li className="flex items-center mb-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  1,00,000 words
                </li>
                <li className="flex items-center mb-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  Access to all templates
                </li>
                <li className="flex items-center mb-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  Unlimited Download and copy
                </li>
                <li className="flex items-center mb-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  1 Year of history
                </li>
              </ul>
              <div className="flex justify-center">
                <Button
                  disabled={loading}
                  onClick={() => createSubscription()}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors flex items-center"
                >
                  {loading && <Loader2Icon className="animate-spin mr-2" />}
                  {userSubscriptions?'Currently Active':'Get Started'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

}

export default billing
