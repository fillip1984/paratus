"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "~/trpc/react";
import CollectionView from "../_components/CollectionView";
import LoadOrRetry from "../_components/LoadOrRetry";
import { notFound } from "next/navigation";

export default function InboxPage() {
  const trpc = api.useUtils();
  const {
    data: inbox,
    isLoading,
    isError,
    refetch: retry,
  } = useQuery(trpc.collection.inbox.queryOptions());

  if (isLoading || isError) {
    return (
      <LoadOrRetry isLoading={isLoading} isError={isError} retry={retry} />
    );
  } else if (inbox) {
    return <CollectionView collection={inbox} />;
  } else {
    return notFound();
  }
}
