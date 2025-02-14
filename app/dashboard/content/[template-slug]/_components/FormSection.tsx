'use client'
import { TEMPLATE } from '@/app/dashboard/_components/TemplateListSection'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

interface PROPS {
    selectedTemplate?: TEMPLATE;
    userFormInput:any,
    loading:boolean;

}

function FormSection({ selectedTemplate,userFormInput,loading }: PROPS) {
    const [formData, setformData] = useState<any>()
    const handleInputChange=(event:any)=>{

        const {name,value} = event.target;
        setformData({...formData,[name]:value})

    }
    const onsubmit = (e: any) => {
        e.preventDefault() 
        userFormInput(formData)       
    }
    return (
        <div className='p-5 shadow-md border rounded-lg bg-white'>
            {/* @ts-ignore */}
            <Image src={selectedTemplate?.icon} alt='img' width={70} height={70} />
            <h2 className='font-bold text-2xl mb-2 mt-2 text-[#1e40af]'>{selectedTemplate?.name}</h2>
            <p className='text-gray-500 text-sm relative top-1'>{selectedTemplate?.desc}</p>

            <form onSubmit={onsubmit} className='mt-6' action="">
                {selectedTemplate?.form?.map((item, index) => (
                    <div className='my-2 flex flex-col gap-2 mb-7 ' key={index}>
                        <label className='text-sm'>{item.label}</label>
                        {item.field == 'input' ?
                            <Input name={item?.name} required={item?.required}
                            onChange={handleInputChange} />
                            : item.field == 'textarea' ?
                                <Textarea name={item?.name} required={item?.required}
                                onChange={handleInputChange}  /> : null
                        }
                    </div>
                ))}
                <Button type='submit' className='w-full py-6'
                disabled={loading}>{loading&&<Loader2Icon className='animate-spin'/>}Generate Content</Button>
            </form>
        </div>
    )
}

export default FormSection
