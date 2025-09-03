import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }) {
const { locale, push, asPath } = useRouter();

return (
<div className="min-h-screen bg-gray-100 text-gray-800">
<header className="flex justify-between items-center p-6 bg-white shadow-md">
<h1 className="text-2xl font-bold text-blue-600">ModernSite</h1>
<nav className="flex gap-6">
<Link href="/">Home</Link>
<Link href="/search">Search</Link>
<Link href="/about">About</Link>
<Link href="/contacts">Contacts</Link>
</nav>
<select
value={locale}
onChange={(e) => push(asPath, asPath, { locale: e.target.value })}
className="border rounded px-2 py-1"
>
<option value="en">EN</option>
<option value="ru">RU</option>
<option value="de">DE</option>
</select>
</header>
<main className="p-10">{children}</main>
</div>
);
}
