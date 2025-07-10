import Link from "next/link"

import { mainNavigationLinks } from "@/app/d"

function Navigation() {
  return (
    <nav className='w-full bg-red-700 flex gap-4 p-4'>
      {mainNavigationLinks.map((link) => (
        <Link key={link.id} href={`/${link.href}`}>
          {link.text}
        </Link>
      ))}
    </nav>
  )
}

export default Navigation
