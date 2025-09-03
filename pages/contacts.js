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
