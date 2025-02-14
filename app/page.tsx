"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle, Zap, Sun, Moon, BotMessageSquare } from "lucide-react"
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Footer from "./dashboard/_components/Footer";


export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const handleGetStarted = async () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  };

  const containerClass = "container mx-auto px-4 sm:px-6 lg:px-8"

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <header className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <BotMessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <span className="text-xl font-bold">AI Writer Studio</span>
        </div>
        <nav className="flex justify-center sm:justify-end w-full sm:w-auto items-center">
          <ul className="flex space-x-6 mr-6">
            <li>
              <Link href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="#how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="#pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Pricing
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="py-20 text-center">
          <div className={containerClass}>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 text-transparent bg-clip-text">
              Generate Engaging Insights in Seconds
            </h1>
            <p className="text-xl mb-8 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Write smarter and better with AI
            </p>
            <button
              onClick={() => window.location.href = "/dashboard"}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full inline-flex items-center transition-colors"
            >
              Get Started <ArrowRight className="ml-2" />
            </button>
          </div>
        </section>

        <section id="features" className="py-20 bg-white dark:bg-gray-800">
          <div className={containerClass}>
            <h2 className="text-3xl font-bold mb-12 text-center">Powerful Features</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "AI-Powered Writing", description: "Leverage advanced AI to generate high-quality content." },
                { title: "Multiple Formats", description: "Create blog posts, social media updates, and more." },
                { title: "SEO Optimization", description: "Automatically optimize your content for search engines." },
              ].map((feature, index) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className={containerClass}>
            <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-8 sm:space-y-0 sm:space-x-4 md:space-x-12">
              {[
                { step: "1", text: "Choose your content type" },
                { step: "2", text: "Provide some basic information" },
                { step: "3", text: "Let AI generate your content" },
                { step: "4", text: "Edit and publish" },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center text-2xl font-bold mb-4 text-white">
                    {item.step}
                  </div>
                  <p className="text-center">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className={containerClass}>
            <h2 className="text-3xl font-bold mb-12 text-center">Simple Pricing</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Basic",
                  price: "$19",
                  features: ["100 AI generations/month", "Basic templates", "Email support"],
                },
                {
                  name: "Pro",
                  price: "$49",
                  features: ["Unlimited AI generations", "Advanced templates", "Priority support", "SEO tools"],
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  features: ["Custom AI model", "Dedicated account manager", "API access", "Advanced analytics"],
                },
              ].map((plan, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <p className="text-4xl font-bold mb-6 text-blue-600 dark:text-blue-400">{plan.price}</p>
                  <ul className="mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center justify-center mb-2 text-gray-700 dark:text-gray-300"
                      >
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="#"
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full inline-block transition-colors"
                  >
                    Choose Plan
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

