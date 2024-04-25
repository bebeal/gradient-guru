import { FC } from 'react';
import { ComponentMap, ComponentMapper } from '@/components/ComponentMapper/ComponentMapper';
import { Tweet } from '@/components/Tweet/Tweet';

const Tweets: ComponentMap = {
  TweetComponent: () => <Tweet id="1768058551031800134" />,
  TweetComponentWithVideoEmbed: () => <Tweet id="1775175303284797538" />,
};

const TweetsPage: FC = () => {
  return <ComponentMapper title="TailwindCSS Components" components={Tweets} />;
};

export default TweetsPage;
