"use client";

import React, { useContext, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // ✅ Import useParams
import FormSection from "./_components/FormSection";
import OutputSection from "./_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AwardIcon } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModal";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schemas";
import { useUser } from "@clerk/nextjs";
import moment from 'moment'
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { ToastContainer, toast } from 'react-toastify';
import { UpdateContext } from "@/app/(context)/UpdateContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";

function CreateNewContent() {
  const params = useParams();
  const templateSlug = params["template-slug"];

  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === templateSlug
  );
  const [loading, setloading] = useState(false)
  const [aiOutput, setaiOutput] = useState<string>('');
  const { user } = useUser();
  const router = useRouter();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const {updateCreditUsage,setUpdateCreditUsage} = useContext(UpdateContext)
  const {userSubscriptions, setuserSubscription} = useContext(UserSubscriptionContext);

  /**
 * Used to generate content from AI
 * @param formData
 * @returns 
 */

  const generateAiContent = async (formData: any) => {
    if (totalUsage >= 20000&&!userSubscriptions) {
      console.log("Please upgrade your plan")
      toast.info("Out of credits! Upgrade to continue.");
      setTimeout(() => {
        router.push('/dashboard/billing')
      }, 3000);
      return;
    }
    setloading(true)
    const selectedPrompt = selectedTemplate?.aiPrompt;
    const finalAiPrompt = JSON.stringify(formData) + ", " + selectedPrompt;

    const result = await chatSession.sendMessage(finalAiPrompt)

    console.log(result.response.text());
    setaiOutput(result.response.text());
    await SaveInDb(formData, selectedTemplate?.slug, result.response.text())
    setloading(false)

    setUpdateCreditUsage(Date.now())


  }

  const SaveInDb = async (formData: any, slug: any, aiResp: string) => {
    const result = await db.insert(AIOutput).values({
      formData: JSON.stringify(formData),
      templateSlug: slug || "",
      aiResponse: aiResp || "",
      createdBy: user?.primaryEmailAddress?.emailAddress || "Unknown User",
      createdAt: moment().format("DD/MM/yyyy"),
    });
    console.log(result)
  };


  return (
    <div className="p-10">
      <Link href={'/dashboard'}>
        <Button><ArrowLeft /> Back</Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        {/* FormSection */}
        <FormSection selectedTemplate={selectedTemplate} userFormInput={(v: any) => generateAiContent(v)}
          loading={loading} />

        {/* OutputSection */}
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateNewContent;
