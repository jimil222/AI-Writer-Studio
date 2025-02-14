'use client'
import React, {useState } from 'react'
import SearchSection from './_components/SearchSection'
import TemplateListSection from './_components/TemplateListSection'

function Dashboard() {

  const [userSearchInput,setuserSearchInput] = useState<string>()
  return (  
    <div>
      {/* Search Section */}
      <SearchSection onSearchInp={(value:string)=>setuserSearchInput(value)}/>
      {/* Template List Section */}
      <TemplateListSection userSearchInput={userSearchInput}/>
    </div>
  )
}

export default Dashboard
