'use client'
import React, { useEffect, useRef, useState } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy, CopyCheck } from 'lucide-react';

interface PROPS{
    aiOutput:string
}
function OutputSection({aiOutput}:PROPS) {
    const [copied, setcopied] = useState<Boolean>(false)
    const editorRef:any=useRef();
    useEffect(() => {
      const editorInstance = editorRef.current.getInstance()
      editorInstance.setMarkdown(aiOutput);
    }, [aiOutput])

    const handlecopy = () =>{
        const editorInstance = editorRef.current.getInstance();
        const content = editorInstance.getMarkdown();

        if(content.trim().length>0){
            navigator.clipboard.writeText(aiOutput)
            setcopied(true);

            setTimeout(() => {
                setcopied(false)
            }, 2000);

        }

    }
    
    return (    
        <div className='bg-white shadow-lg border rounded-lg'>
            <div className='flex justify-between items-center p-5'>
                <h2 className='font-medium text-lg'>Your Result</h2>
                <Button className='flex gap-2' onClick={handlecopy}>
                { copied?<CopyCheck className='w-4 h-4'/>:<Copy className='w-4 h-4' />}
                {
                    copied?"Copied":"Copy"
                }
                </Button>
            </div>
            <Editor
            ref={editorRef}
                initialValue="Your Result Will Appear Here"
                initialEditType="wysiwyg"
                height="600px"
                useCommandShortcut={true}
                onChange={()=>console.log(editorRef.current.getInstance().getMarkdown())
                }
            />
        </div>
    )
}

export default OutputSection
