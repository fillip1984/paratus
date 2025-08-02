"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "~/trpc/react";
import CollectionView from "../_components/CollectionView";
import LoadOrRetry from "../_components/LoadOrRetry";
import { notFound } from "next/navigation";
import { use } from "react";

export default function CollectionPage({
  params,
}: {
  params: Promise<{ collectionId: string }>;
}) {
  const { collectionId } = use(params);
  const trpc = api.useUtils();
  const {
    data: collection,
    isLoading,
    isError,
    refetch: retry,
  } = useQuery(trpc.collection.readOne.queryOptions({ id: collectionId }));

  if (isLoading || isError) {
    return (
      <LoadOrRetry isLoading={isLoading} isError={isError} retry={retry} />
    );
  } else if (collection) {
    return <CollectionView collection={collection} />;
  } else {
    return notFound();
  }
}
