export default async function SearchPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const { query } = await searchParams;
	return (
		<div>
			SearchPage for
			{query}
		</div>
	);
}
