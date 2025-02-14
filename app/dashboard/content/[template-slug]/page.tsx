"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation"; // ✅ Import useParams
import FormSection from "./_components/FormSection";
import OutputSection from "./_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModal";

function CreateNewContent() {
  const params = useParams(); 
  const templateSlug = params["template-slug"]; 

  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === templateSlug
  );
  const [loading, setloading] = useState(false)
  const [aiOutput, setaiOutput] = useState<string>('');
  const generateAiContent = async (formData:any)=>{
    setloading(true)
    const selectedPrompt = selectedTemplate?.aiPrompt;
    const finalAiPrompt = JSON.stringify(formData)+", "+selectedPrompt;

    const result = await chatSession.sendMessage(finalAiPrompt)

    console.log(result.response.text());
    setaiOutput(result.response.text());
    setloading(false)
    
  }

  return (
    <div className="p-10">
        <Link href={'/dashboard'}>
        <Button><ArrowLeft/> Back</Button>
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
    </div>
  );
}

export default CreateNewContent;
