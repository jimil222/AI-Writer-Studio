import Templates from '@/app/(data)/Templates'
import React, { useEffect, useState } from 'react'
import TemplateCard from '../TemplateCard'

export interface TEMPLATE {
    name: string,
    desc: string,
    icon: string,
    category: string,
    slug: string,
    aiPrompt: string,
    form?: FORM[]
}

export interface FORM {
    label: string,
    field: string,
    name: string,
    required?: boolean
}

function TemplateListSection({ userSearchInput }: any) {
    const [templatelist, settemplatelist] = useState(Templates)
    
    useEffect(() => {
        if (userSearchInput) {
            const filterData = Templates.filter(item =>
                item.name.toLowerCase().includes(userSearchInput.toLowerCase())
            )
            settemplatelist(filterData)
        } else {
            settemplatelist(Templates)
        }
    }, [userSearchInput])

    return (
        <div className='flex justify-center'>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5 md:p-10 place-items-center'>
        {templatelist.map((item: TEMPLATE, index: number) => (
            <TemplateCard key={index} {...item} />
        ))}
    </div>
</div>

    )
}

export default TemplateListSection
