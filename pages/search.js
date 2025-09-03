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
