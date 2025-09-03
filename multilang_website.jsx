// next.config.js
module.exports = {
  i18n: {
    locales: ["en", "ru", "de"],
    defaultLocale: "en",
  },
};

// tailwind.config.js
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};

// components/Layout.js
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

// pages/_app.js
import "../styles/globals.css";
import { appWithTranslation } from "next-i18next";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(MyApp);

// pages/index.js
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  const { t } = useTranslation("common");
  return (
    <div>
      <h2 className="text-4xl font-bold mb-4">{t("welcome")}</h2>
      <p className="text-lg text-gray-600">{t("aboutText")}</p>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

// pages/search.js
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Search() {
  const { t } = useTranslation("common");
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">{t("search")}</h2>
      <input placeholder={t("searchText")} className="w-full border rounded p-3" />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

// pages/about.js
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function About() {
  const { t } = useTranslation("common");
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">{t("about")}</h2>
      <p>{t("aboutText")}</p>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

// pages/contacts.js
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Contacts() {
  const { t } = useTranslation("common");
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">{t("contacts")}</h2>
      <p>{t("contactsText")}</p>
      <form className="mt-4 space-y-3">
        <input type="text" placeholder="Name" className="w-full border rounded p-3" />
        <input type="email" placeholder="Email" className="w-full border rounded p-3" />
        <textarea placeholder="Message" className="w-full border rounded p-3"></textarea>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700">{t("send")}</button>
      </form>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

// public/locales/en/common.json
{
  "home": "Home",
  "search": "Search",
  "about": "About Us",
  "contacts": "Contacts",
  "welcome": "Welcome to Our Website!",
  "searchText": "Search for something...",
  "aboutText": "We are a modern company with a passion for design.",
  "contactsText": "Contact us through the form below.",
  "send": "Send"
}

// public/locales/ru/common.json
{
  "home": "Главная",
  "search": "Поиск",
  "about": "О нас",
  "contacts": "Контакты",
  "welcome": "Добро пожаловать на наш сайт!",
  "searchText": "Найдите что-нибудь...",
  "aboutText": "Мы современная компания со страстью к дизайну.",
  "contactsText": "Свяжитесь с нами через форму ниже.",
  "send": "Отправить"
}

// public/locales/de/common.json
{
  "home": "Startseite",
  "search": "Suche",
  "about": "Über uns",
  "contacts": "Kontakte",
  "welcome": "Willkommen auf unserer Website!",
  "searchText": "Suche nach etwas...",
  "aboutText": "Wir sind ein modernes Unternehmen mit Leidenschaft für Design.",
  "contactsText": "Kontaktieren Sie uns über das Formular unten.",
  "send": "Senden"
}
