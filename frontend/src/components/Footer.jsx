import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="bg-muted py-6 px-4 md:px-6 border-t">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-xs text-muted-foreground">&copy; 2024 Tender Manager. All rights reserved.</p>
      <nav className="flex gap-4 md:gap-6">
        <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          Terms of Service
        </Link>
        <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          Privacy Policy
        </Link>
        <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          Contact Us
        </Link>
      </nav>
    </div>
  </footer>
  )
}
