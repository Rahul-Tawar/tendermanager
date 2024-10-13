import React from 'react'
import { BriefcaseIcon, CalendarIcon, ClipboardIcon } from '@/components/iconComponents/Icons'

const Features = () => {
  return (
    <section className="bg-muted py-12 md:py-24 lg:py-32">
    <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <img
          src="/features.png"
          width="600"
          height="400"
          alt="Features"
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
        />
      </div>
      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Key Features</h2>
        <p className="text-muted-foreground md:text-xl">
          Our tender management application offers a range of powerful features to streamline your workflow.
        </p>
        <ul className="grid gap-4">
          <li className="flex items-start gap-4">
            <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-primary-foreground">
              <BriefcaseIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Tender Tracking</h3>
              <p className="text-muted-foreground">
                Stay on top of all your tender opportunities with our comprehensive tracking system.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-primary-foreground">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Deadline Management</h3>
              <p className="text-muted-foreground">
                Never miss a tender deadline with our advanced notification system.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-primary-foreground">
              <ClipboardIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Bid Preparation</h3>
              <p className="text-muted-foreground">
                Streamline your bid preparation process with our customizable templates.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
  )
}

export default Features
