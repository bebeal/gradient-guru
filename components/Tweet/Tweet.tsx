'use client'

import { EmbeddedTweet, TweetNotFound, TweetSkeleton, useTweet, type TweetProps } from 'react-tweet';

import './tweet.css';

export const Tweet = (props: TweetProps) => {
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
    <div className="tweet my-6">
      <div className={`flex justify-center`}>
        <EmbeddedTweet tweet={data} components={components} {...rest} />
      </div>
    </div>
  );
};
