'use client'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schemas'
import { eq, sql } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import Templates from '@/app/(data)/Templates'
import { Clipboard, Copy, CopyCheck, Handshake } from 'lucide-react'

function page() {
    const [data, setData] = useState([]);
    const [copied, setcopied] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    const getRecords = async () => {
        try {
            if (!email) return;
            const records = await db
                .select()
                .from(AIOutput)
                .where(eq(AIOutput.createdBy, email))
                .orderBy(sql`LENGTH(${AIOutput.aiResponse}) DESC`);
            console.log(records);
            setData(records);
        } catch (error) {
            console.error("Error fetching records:", error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const handlecopy = (id, text) => {
        navigator.clipboard.writeText(text)
        setcopied(id)

        setTimeout(() => {
            setcopied(null)
        }, 2000);
    }

    useEffect(() => {
        getRecords();
    }, [email]);

    useEffect(() => {
        console.log("Fetched AI Output Data:", data);
    }, [data]);

    return (
        <div className="bg-slate-100 flex justify-center p-5">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-full">
                <h2 className="text-lg font-semibold text-gray-700 border-b pb-3 mb-4">
                    History
                </h2>

                <Table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                    <TableCaption className="text-gray-500 text-sm mt-2">
                        A list of your recent AI generations.
                    </TableCaption>

                    <TableHeader className="bg-gray-100 text-gray-600 uppercase text-sm">
                        <TableRow className="border-b border-gray-300">
                            <TableHead className="w-[100px] py-3 px-4">Template</TableHead>
                            <TableHead className="py-3 px-4">AI Response</TableHead>
                            <TableHead className="w-[200px] py-3 px-4">Created At</TableHead>
                            <TableHead className="py-3 px-4 ">Words</TableHead>
                            <TableHead className="py-3 ">Copy</TableHead>
                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody className="text-gray-700 text-sm font-medium">
                        {loading ? (
                            <>
                                {[1, 2, 3, 4, 5].map((item, index) => (
                                    <TableRow key={index} className="border-b border-gray-200 animate-pulse">
                                        <TableCell className="py-3 px-4">
                                            <div className="h-4 w-24 bg-slate-300 rounded"></div>
                                        </TableCell>
                                        <TableCell className="py-3 px-4">
                                            <div className="h-4 w-1/2 bg-slate-300 rounded"></div>
                                        </TableCell>
                                        <TableCell className="py-3 px-4">
                                            <div className="h-4 w-20 bg-slate-300 rounded"></div>
                                        </TableCell>
                                        <TableCell className="py-3 px-4">
                                            <div className="h-4 w-16 bg-slate-300 rounded"></div>
                                        </TableCell>
                                        <TableCell className="py-3 px-4">
                                            <div className="h-4 w-8 bg-slate-300 rounded"></div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        ) : data.length > 0 ? (
                            data.map((item, index) => {
                                let getname = Templates.find(t => t.slug === item.templateSlug);

                                return (
                                    <TableRow key={index} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                        <TableCell className="py-3 px-4 font-medium text-nowrap">
                                            {getname?.name || 'Unknown'}
                                        </TableCell>
                                        <TableCell className="max-w-[300px] truncate whitespace-nowrap overflow-hidden">
                                            {item.aiResponse}
                                        </TableCell>
                                        <TableCell className="max-w-[300px] py-3 px-4 font-medium text-nowrap">
                                            {item.createdAt}
                                        </TableCell>
                                        <TableCell className="max-w-[300px] py-3 px-4 font-medium text-nowrap">
                                            {item.aiResponse.replace(/\s/g, "").length}
                                        </TableCell>

                                        <TableCell>
                                            {copied === item.id ? (
                                                <CopyCheck className="text-black w-4 h-4" />
                                            ) : (
                                                <Copy
                                                    onClick={() => handlecopy(item.id, item.aiResponse)}
                                                    className="text-black w-4 h-4 cursor-pointer"
                                                />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <Clipboard className="w-10 h-10 text-gray-400 mb-2" />
                                        <p className="text-lg font-semibold">No AI Generations Yet</p>
                                        <p className="text-sm text-gray-400">Start exploring the templates to see your history here.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default page
