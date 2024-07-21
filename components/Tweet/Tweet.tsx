'use client';

import { memo } from 'react';
import { EmbeddedTweet, TweetNotFound, TweetSkeleton, useTweet, type TweetProps } from 'react-tweet';

export const Tweet = memo((props: TweetProps) => {
  const { id, components, ...rest } = props;
  const { data, error, isLoading } = useTweet(id, `/api/tweet/${id}`);

  if (error) {
    const NotFound = components?.TweetNotFound || TweetNotFound;
    return <NotFound error={error} />;
  }
  if (isLoading || !data) {
    return <TweetSkeleton />;
  }
  return (
    // <div className="my-6">
      <div className={`flex justify-center h-full overflow-auto`}>
        <EmbeddedTweet tweet={data} components={components} {...rest} />
      </div>
    // </div>
  );
});
