export default async function WritingPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    return <p>Hello, world!</p>;
}

export function generateStaticParams() {
    return [
        { slug: 'implementing-material-design-3-theme-system' },
    ];
}