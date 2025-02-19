import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req) {
    try {
        // Debugging: Log environment variables
        console.log("Razorpay Key:", process.env.RAZORPAY_KEY_ID);
        console.log("Subscription Plan ID:", process.env.SUBSCRIPTION_PLAN_ID);

        if (!process.env.SUBSCRIPTION_PLAN_ID) {
            return NextResponse.json({ error: "Subscription Plan ID is missing" }, { status: 400 });
        }

        let instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const result = await instance.subscriptions.create({
            plan_id: process.env.SUBSCRIPTION_PLAN_ID,
            customer_notify: 1,
            quantity: 1,
            total_count: 1,
            addons: [],
            notes: {
                key1: "note"
            }
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error creating subscription:", error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
