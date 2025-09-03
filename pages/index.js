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
