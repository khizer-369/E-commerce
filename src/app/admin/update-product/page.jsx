"use client";
import UpdateProduct from "@/components/UpdateProduct";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const PageContent = () => {
    const searchParams = useSearchParams();
    const product = {
        _id: searchParams.get("_id"),
        title: searchParams.get("title"),
        description: searchParams.get("description"),
        price: searchParams.get("price"),
        category: searchParams.get("category"),
        units: searchParams.get("units"),
    };

    return <UpdateProduct product={product} />;
};

const Page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageContent />
        </Suspense>
    );
};

export default Page;