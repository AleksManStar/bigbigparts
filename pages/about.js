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
